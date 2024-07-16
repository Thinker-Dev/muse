import { gql } from "@apollo/client";

export const SLACK_CONNECTION_MUTATION_ON_CONNECTION = gql`
mutation OnSlackConnection($data: SlackConnectionInput!) {
  onSlackConnection(data: $data) {
    message
  }
}
`

export const SLACK_CONNECTION_QUERY_CONNECTION = gql`
query GetSlackConnections($userId: String!) {
  getSlackConnections(user_id: $userId) {
    id
    authed_user_id
    app_id
    authed_user_token
    slack_access_token
    bot_user_id
    team_id
    team_name
    connections {
      slack_id
      id
    }
  }
}
`