import { gql } from "@apollo/client";

export const NOTION_CONNECTION_MUTATION_ON_CONNECTION = gql`
  mutation OnNotionConnect($data: NotionConnectInput!) {
  onNotionConnect(data: $data) {
    message
  }
}
`

export const NOTION_CONNECTION_QUERY_CONNECTIONS = gql`
query GetNotionConnections($userId: String!) {
  getNotionConnections(user_id: $userId) {
    user_id
    id
    database_id
    workspace_id
    workspace_name
    access_token
  }
}
`
