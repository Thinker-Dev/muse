"use server"
import { getDiscordConnectionUrl, getDiscordConnectionUrlWithUserId, postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { NOTIFICATION_QUERY_AUTOMATION_BY_USER_ID } from '@/graphql/queries/automations'
import { CONNECTION_QUERY_DISCORD_URL } from '@/graphql/queries/discord'
import { NOTIFICATION_QUERY_GET_BY_RESOURCE_ID } from '@/graphql/queries/user'
import { getClient } from '@/lib/data/graphql/client'
import { db } from '@/lib/db'
import axios from 'axios'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import DriveService from '@/lib/drive' // import the singleton

export async function POST(req: NextRequest) {
  const client = getClient();
  const headersList = headers();
  console.log('🍆 pepino')
  let channelResourceId;
  headersList.forEach((value, key) => {
    if (key === 'x-goog-resource-id') {
      channelResourceId = value;
    }
  });

  if (channelResourceId) {
    const { data } = await client.query({
      query: NOTIFICATION_QUERY_GET_BY_RESOURCE_ID,
      variables: {
        params: {
          resource_id: channelResourceId
        }
      }
    });

    const user = data.executeGetCurrentUserByParams;
    if (user) {
      const driveService = DriveService.getInstance();
      const changes = await driveService.getChanges();

      console.log('Changes detected:', changes);
      const { data } = await client.query({
        query: NOTIFICATION_QUERY_AUTOMATION_BY_USER_ID,
        variables: {
          clerkId: user.clerk_id
        }
      });
      const workflow = data.executeGetUserAutomations;
      if (workflow) {
        workflow.map(async (flow: any) => {
          const flowPath = JSON.parse(flow.flow_path!);
          let current = 0;
          while (current < flowPath.length) {
            if (flowPath[current] === 'Discord') {
              const change = changes[0];
              if (change.file) {
                const fileMetadata = await driveService.getFileMetadata(change.fileId);
                if (fileMetadata) {
                  const currentTime = new Date().getTime();
                  const createdTime = new Date(fileMetadata.createdTime).getTime();
                  const timeDiff = currentTime - createdTime;
                  const threshold = 20 * 1000;
                  const isFileAdded = timeDiff < threshold;
                  if (isFileAdded) {
                    const discordMessage = await getDiscordConnectionUrlWithUserId(user.clerk_id);
                    if (discordMessage) {
                      await postContentToWebHook(
                        "file " + fileMetadata.name + " added to your google drive",
                        discordMessage.url
                      );
                      flowPath.splice(current, 1);
                    }
                  } else {
                    console.log('File modified:', change.fileId);
                    const discordMessage = await getDiscordConnectionUrlWithUserId(user.clerk_id);
                    if (discordMessage) {
                      await postContentToWebHook(
                        flow.discord_template!,
                        discordMessage.url
                      );
                      flowPath.splice(current, 1);
                    }
                  }
                }
              } else if (change.removed) {
                console.log('File removed:', change.fileId);
                const discordMessage = await getDiscordConnectionUrlWithUserId(user.clerk_id);
                if (discordMessage) {
                  await postContentToWebHook(
                    change.file.name + ' removed from your google drive',
                    discordMessage.url
                  );
                  flowPath.splice(current, 1);
                }
              }
            }
            if (flowPath[current] === 'Slack') {
              const channels = flow.slack_channels.map((channel: any) => {
                return {
                  label: '',
                  value: channel,
                };
              });
              await postMessageToSlack(
                flow.slack_access_token!,
                channels,
                flow.slack_template!
              );
              flowPath.splice(current, 1);
            }
            if (flowPath[current] === 'Notion') {
              await onCreateNewPageInDatabase(
                flow.notionDbId!,
                flow.notionAccessToken!,
                JSON.parse(flow.notionTemplate!)
              );
              flowPath.splice(current, 1);
            }

            if (flowPath[current] === 'Wait') {
              const res = await axios.put(
                'https://api.cron-job.org/jobs',
                {
                  job: {
                    url: `${process.env.NGROK_URI}?flow_id=${flow.id}`,
                    enabled: 'true',
                    schedule: {
                      timezone: 'Europe/Istanbul',
                      expiresAt: 0,
                      hours: [-1],
                      mdays: [-1],
                      minutes: ['*****'],
                      months: [-1],
                      wdays: [-1],
                    },
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              if (res) {
                flowPath.splice(current, 1);
                const cronPath = await db.workflows.update({
                  where: {
                    id: flow.id,
                  },
                  data: {
                    cronPath: JSON.stringify(flowPath),
                  },
                });
                if (cronPath) break;
              }
              break;
            }
            current++;
          }
        });
        return new Response(
          JSON.stringify({ message: 'flow completed' }),
          { status: 200 }
        );
      }
    }
  }


  return new Response(
    JSON.stringify({ message: 'success' }),
    { status: 200 }
  );
}
