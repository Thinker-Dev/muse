'use server'
import { getClient } from '@/lib/data/graphql/client';
import { db } from '@/lib/db'
import { gql } from '@apollo/client'

const GET_USER_BY_CLERK_ID = gql`
query ExecuteGetCurrentUserByParams($params: FindUserInput!) {
  executeGetCurrentUserByParams(params: $params) {
    id
    email
    clerk_id
    name
    profile_img
    is_verified
    hashed_rt
    local_google_id
    google_resource_id
    connections {
      id
      type
      slack_id
      discord_webhook_id
      Notion_id
      user_id
    }
  }
}`




export const getUserData = async (id: string) => {
  const client = getClient();
  const { data } = await client.query({
    query: GET_USER_BY_CLERK_ID,
    variables: {
      params: {
        clerk_id: id
      }
    }
  });
  return data.executeGetCurrentUserByParams
}
