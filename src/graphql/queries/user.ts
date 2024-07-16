import { gql } from "@apollo/client";

export const NOTIFICATION_QUERY_GET_BY_RESOURCE_ID = gql`
query ExecuteGetCurrentUserByParams($params: FindUserInput!) {
  executeGetCurrentUserByParams(params: $params) {
    clerk_id
  }
}
`

export const DRIVE_FILES_QUERY_GET_BY_PARAMS = gql`
  query ExecuteGetCurrentUserByParams($params: FindUserInput!) {
  executeGetCurrentUserByParams(params: $params) {
    google_resource_id
  }
}
`

export const DRIVE_ACTIVITY_QUERY_UPDATE_USER = gql`
mutation ExecuteUpdateUser($clerkId: String!, $data: UpdateUserInput!) {
  executeUpdateUser(clerk_id: $clerkId, data: $data) {
    message
  }
}
`