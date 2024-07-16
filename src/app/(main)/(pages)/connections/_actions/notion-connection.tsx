'use server'

import { NOTION_CONNECTION_MUTATION_ON_CONNECTION, NOTION_CONNECTION_QUERY_CONNECTIONS } from '@/graphql/queries/notion'
import { getClient } from '@/lib/data/graphql/client'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import { Client } from '@notionhq/client'

export const onNotionConnect = async (
  access_token: string,
  workspace_id: string,
  workspace_icon: string,
  workspace_name: string,
  database_id: string,
  id: string
) => {
  'use server'
  const client = getClient()
  if (!access_token) return
  const { data, errors } = await client.mutate(
    {
      mutation: NOTION_CONNECTION_MUTATION_ON_CONNECTION,
      variables: {
        data: {
          workspace_id: workspace_id,
          access_token: access_token,
          workspace_icon: workspace_icon,
          workspace_name: workspace_name,
          database_id: database_id,
          id: id
        }
      }
    }
  )
  if (data.onNotionConnect.message) return data.onNotionConnect.message;
}
export const getNotionConnection = async () => {
  const user = await currentUser()
  const client = getClient()
  if (!user) return null;
  const { data, errors } = await client.query(
    {
      query: NOTION_CONNECTION_QUERY_CONNECTIONS,
      variables: {
        userId: user.id
      }
    }
  )
  if (data.getNotionConnections) return data.getNotionConnections;
}

export const getNotionDatabase = async (
  databaseId: string,
  accessToken: string
) => {
  const notion = new Client({
    auth: accessToken,
  })

  const response = await notion.databases.retrieve({ database_id: databaseId })
  return response
}

export const onCreateNewPageInDatabase = async (
  databaseId: string,
  accessToken: string,
  content: string
) => {
  const notion = new Client({
    auth: accessToken,
  })

  console.log(databaseId)
  console.log(content)
  const response = await notion.pages.create({
    parent: {
      type: 'database_id',
      database_id: databaseId,
    },
    properties: {
      title: [
        {
          type: 'text', // Specify the type explicitly
          text: {
            content: content,
          },
        },
      ],
    },
  })
  console.log(response)
  if (response) {
    return response
  }
}
