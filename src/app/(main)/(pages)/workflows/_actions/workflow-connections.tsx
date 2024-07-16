'use server'
import { Option } from '@/components/ui/multiple-selector'
import { EDITOR_MUTATION_NODES, EDITOR_MUTATION_NODE_TEMPLATE, EDITOR_QUERY_NODE_EDGES, WORKFLOW_MUTATION_AUTOMATION_CREATE, WORKFLOW_QUERY_AUTOMATION_BY_USER_ID } from '@/graphql/queries/automations'
import { DRIVE_FILES_QUERY_GET_BY_PARAMS } from '@/graphql/queries/user'
import { getClient } from '@/lib/data/graphql/client'
import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'

//TODO
export const getGoogleListener = async () => {
  const { userId } = auth()

  if (userId) {
    const { data } = await getClient().query({
      query: DRIVE_FILES_QUERY_GET_BY_PARAMS,
      variables: {
        params: {
          clerk_id: userId
        }
      }
    })
    if (data.executeGetCurrentUserByParams.google_resource_id) return data.executeGetCurrentUserByParams.google_resource_id
  }
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  const client = getClient()
  const { data, errors } = await client.mutate({
    mutation: EDITOR_MUTATION_NODES,
    variables: {
      automation_id: workflowId,
      state: state
    }
  })

  if (errors) return 'Workflow unpublished'
  return 'Workflow published'
}

export const onCreateNodeTemplate = async (
  content: string,
  type: string,
  workflowId: string,
  channels?: Option[],
  accessToken?: string,
  notionDbId?: string
) => {
  const client = getClient()
  console.log("this is something", content, type, workflowId, channels, accessToken, notionDbId)
  const { data, errors } = await client.mutate({
    mutation: EDITOR_MUTATION_NODE_TEMPLATE,
    variables: {
      data: {
        content,
        type,
        workflowId,
        channels,
        accessToken,
        notionDbId
      }
    }
  })
  if (errors) return "unable to create node template"
  return "node template created"
}


export const onCreateWorkflow = async (name: string, description: string) => {
  const client = getClient();
  const user = await currentUser()

  if (user) {
    const { data } = await client.mutate({
      mutation: WORKFLOW_MUTATION_AUTOMATION_CREATE,
      variables: {
        data: {
          name,
          user_id: user.id,
          description,
        }
      }
    });
    if (data.createAutomation) return { message: 'workflow created' }
    return { message: 'Oops! try again' }
  }
}

export const onGetNodesEdges = async (flowId: string) => {
  const client = getClient();
  const { data, error } = await client.query({
    query: EDITOR_QUERY_NODE_EDGES,
    variables: {
      flowId
    }
  });
  if (error) return
  if (data.onGetNodesEdges.nodes) return data.onGetNodesEdges
}

export const onGetWorkflows = async () => {
  const user = await currentUser()
  const client = getClient();
  if (user) {
    const { data } = await client.query({
      query: WORKFLOW_QUERY_AUTOMATION_BY_USER_ID,
      variables: {
        clerkId: user.id
      }
    });
    if (data.executeGetUserAutomations) return data.executeGetUserAutomations
  }
}