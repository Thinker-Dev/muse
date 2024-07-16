'use server'

import { CONNECTION_DISCORD_CREATE, CONNECTION_QUERY_DISCORD_URL } from '@/graphql/queries/discord'
import { getClient } from '@/lib/data/graphql/client'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import axios from 'axios'


export const onDiscordConnect = async (
  channel_id: string,
  webhook_id: string,
  webhook_name: string,
  webhook_url: string,
  id: string,
  guild_name: string,
  guild_id: string
) => {

  const { data, errors } = await getClient().mutate({
    mutation: CONNECTION_DISCORD_CREATE,
    variables: {
      data: {
        channel_id,
        webhook_id,
        webhook_name,
        webhook_url,
        id,
        guild_name,
        guild_id,
      }
    }
  })
}

export const getDiscordConnectionUrl = async () => {
  const user = await currentUser()
  if (user) {
    const { data, errors } = await getClient().mutate({
      mutation: CONNECTION_QUERY_DISCORD_URL,
      variables: {
        userId: user.id,
      }
    })
    console.log(data)
    if (data.getDiscordConnectionUrl.url) return data.getDiscordConnectionUrl
  }
}
export const getDiscordConnectionUrlWithUserId = async (user_id: string) => {
  if (user_id) {
    const { data, errors } = await getClient().mutate({
      mutation: CONNECTION_QUERY_DISCORD_URL,
      variables: {
        userId: user_id,
      }
    })
    console.log(data)
    if (data.getDiscordConnectionUrl.url) return data.getDiscordConnectionUrl
  }
}
export const postContentToWebHook = async (content: string, url: string) => {
  console.log(content)
  console.log(url)
  if (content != '') {
    const posted = await axios.post(url, { content })
    if (posted) {
      return { message: 'success' }
    }
    return { message: 'failed request' }
  }
  return { message: 'String empty' }
}
