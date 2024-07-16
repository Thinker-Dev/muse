import { gql } from "@apollo/client";

export const CONNECTION_DISCORD_CREATE = gql`
mutation DiscordConnect($data: discordCreateInput!) {
  discordConnect(data: $data) {
    message
  }
}
`

export const CONNECTION_QUERY_DISCORD_URL = gql`
query GetDiscordConnectionUrl($userId: String!) {
  getDiscordConnectionUrl(user_id: $userId) {
    url
    name
    id
    guild_name
  }
}
`