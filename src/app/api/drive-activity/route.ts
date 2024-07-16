import { google } from 'googleapis';
import { auth, clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { getClient } from '@/lib/data/graphql/client';
import { DRIVE_ACTIVITY_QUERY_UPDATE_USER } from '@/graphql/queries/user';
import DriveService from '@/lib/drive'; // Import the singleton

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  );

  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'User not found' });
  }

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    'oauth_google'
  );

  const accessToken = clerkResponse[0].token;
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const driveService = DriveService.getInstance(); // Get the singleton instance
  driveService.setAuth(oauth2Client); // Set the OAuth2 client

  const startPageToken = await driveService.getStartPageToken();
  if (startPageToken == null) {
    throw new Error('startPageToken is unexpectedly null');
  }

  const channelId = uuidv4();
  const listener = await driveService.watchChanges(channelId, startPageToken, `${process.env.NGROK_URI}/api/drive-activity/notification`);

  if (listener.status === 200) {
    const client = getClient();

    const { data, errors } = await client.mutate({
      mutation: DRIVE_ACTIVITY_QUERY_UPDATE_USER,
      variables: {
        data: {
          google_resource_id: listener.data.resourceId
        },
        clerkId: userId
      }
    });

    if (data.executeUpdateUser.message) {
      return new NextResponse('Listening to changes...');
    }
  }

  return new NextResponse('Oops! something went wrong, try again');
}
