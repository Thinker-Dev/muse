
import { getClient } from '@/lib/data/graphql/client';
import { gql } from '@apollo/client';
import { NextResponse } from 'next/server'
const USER_MUTATION = gql`
mutation SignUp($data: SignUpInput!) {
  signUp(data: $data) {
    user {
      email
      clerk_id
      name
    }
    session {
      access_token
      refresh_token
    }
  }
}
`;
export async function POST(req: Request) {
  try {
    const client = getClient();
    const body = await req.json()
    const { id, email_addresses, first_name, image_url } = body?.data

    const email = email_addresses[0]?.email_address

    const { data } = await client.mutate({
      mutation: USER_MUTATION,
      variables: {
        data: {
          email,
          clerk_id: id,
          name: first_name || '',
        }
      }
    });
    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('Error updating database:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  }
}