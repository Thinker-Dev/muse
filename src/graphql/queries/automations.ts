import { gql } from "@apollo/client";

export const NOTIFICATION_QUERY_AUTOMATION_BY_USER_ID = gql`
query ExecuteGetUserAutomations($clerkId: String!) {
  executeGetUserAutomations(clerk_id: $clerkId) {
    id
    nodes
    edges
    name
    discord_template
    notion_template
    slack_template
    slack_channels
    slack_access_token
    notion_access_token
    notion_db_id
    flow_path
    cron_path
    publish
    description
    workflow_id
  }
}
`






export const WORKFLOW_MUTATION_AUTOMATION_CREATE = gql`
mutation CreateAutomation($data: CreateAutomationInput!) {
  createAutomation(data: $data) {
    id
  }
}
`
export const WORKFLOW_QUERY_AUTOMATION_BY_USER_ID = gql`
query ExecuteGetUserAutomations($clerkId: String!) {
  executeGetUserAutomations(clerk_id: $clerkId) {
    id
    name
    description
    publish
  }
}
`

export const EDITOR_MUTATION_NODES = gql`
mutation CreateNodesEdges($data: CreateNodesInput!) {
  createNodesEdges(data: $data) {
    message
  }
}`

export const EDITOR_WORKFLOW_MUTATION_PUBLISH_FLOW = gql`
mutation PublishFlow($state: Boolean!, $automationId: String!) {
  publishFlow(state: $state, automation_id: $automationId) {
    message
  }
}
`

export const EDITOR_QUERY_NODE_EDGES = gql`
query OnGetNodesEdges($flowId: String!) {
  onGetNodesEdges(flowId: $flowId) {
    nodes
    edges
  }
}
`

export const EDITOR_MUTATION_NODE_TEMPLATE = gql`
mutation CreateNodeTemplate($data: CreateNodeTemplateInput!) {
  createNodeTemplate(data: $data) {
    message
  }
}
`