'use server'

import { Option } from '@/components/ui/multiple-selector'
import { SLACK_CONNECTION_MUTATION_ON_CONNECTION, SLACK_CONNECTION_QUERY_CONNECTION } from '@/graphql/queries/slack'
import { getClient } from '@/lib/data/graphql/client'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import axios from 'axios'

export const onSlackConnect = async (
  app_id: string,
  authed_user_id: string,
  authed_user_token: string,
  slack_access_token: string,
  bot_user_id: string,
  team_id: string,
  team_name: string,
  user_id: string
): Promise<void> => {
  if (!slack_access_token) return
  const client = getClient()
  const { data, errors } = await client.mutate({
    mutation: SLACK_CONNECTION_MUTATION_ON_CONNECTION,
    variables: {
      data: {
        app_id,
        authed_user_id,
        authed_user_token,
        slack_access_token,
        bot_user_id,
        team_id,
        team_name,
        user_id
      }
    }
  })
  if (errors) console.error(errors)
}

export const getSlackConnection = async () => {
  const user = await currentUser()
  const client = getClient()
  if (user) {
    const { data, errors } = await client.query({
      query: SLACK_CONNECTION_QUERY_CONNECTION,
      variables: {
        userId: user.id
      }
    })
    if (errors) console.error(errors)
    if (data.getSlackConnections) return data.getSlackConnections
  }
  return null
}

export async function listBotChannels(
  slackAccessToken: string
): Promise<Option[]> {
  const url = `https://slack.com/api/conversations.list?${new URLSearchParams({
    types: 'public_channel,private_channel',
    limit: '200',
  })}`

  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${slackAccessToken}` },
    })

    if (!data.ok) throw new Error(data.error)

    if (!data?.channels?.length) return []
    const channels = data.channels.filter((ch: any) => ch.is_member)
      .map((ch: any) => {
        return { label: ch.name, value: ch.id }
      })

    return channels
  } catch (error: any) {
    console.error('Error listing bot channels:', error.message)
    throw error
  }
}

const postMessageInSlackChannel = async (
  slackAccessToken: string,
  slackChannel: string,
  content: string
): Promise<void> => {
  try {
    await axios.post(
      'https://slack.com/api/chat.postMessage',
      { channel: slackChannel, text: content },
      {
        headers: {
          Authorization: `Bearer ${slackAccessToken}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
    console.log(`Message posted successfully to channel ID: ${slackChannel}`)
  } catch (error: any) {
    console.error(
      `Error posting message to Slack channel ${slackChannel}:`,
      error?.response?.data || error.message
    )
  }
}

// Wrapper function to post messages to multiple Slack channels
export const postMessageToSlack = async (
  slackAccessToken: string,
  selectedSlackChannels: Option[],
  content: string
): Promise<{ message: string }> => {
  console.log(content)
  if (!content) return { message: 'Content is empty' }
  console.log(selectedSlackChannels)
  if (!selectedSlackChannels?.length) return { message: 'Channel not selected' }
  try {
    selectedSlackChannels
      .map((channel) => channel?.value)
      .forEach((channel) => {
        postMessageInSlackChannel(slackAccessToken, channel, content)
      })
  } catch (error) {
    return { message: 'Message could not be sent to Slack' }
  }

  return { message: 'Success' }
}
