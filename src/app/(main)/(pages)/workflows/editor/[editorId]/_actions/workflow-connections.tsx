'use server'

import { EDITOR_MUTATION_NODES, EDITOR_WORKFLOW_MUTATION_PUBLISH_FLOW } from '@/graphql/queries/automations'
import { getClient } from '@/lib/data/graphql/client'


export const onCreateNodesEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string
) => {
  const client = getClient()
  const { data, errors } = await client.mutate({
    mutation: EDITOR_MUTATION_NODES,
    variables: {
      data: {
        flowId,
        nodes,
        edges,
        flowPath
      }
    }
  })
  if (errors) return "could not create nodes"
  if (data.createNodesEdges) return { message: "flow saved" }
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  const client = getClient()
  console.log(workflowId)
  const { data, errors } = await client.mutate({
    mutation: EDITOR_WORKFLOW_MUTATION_PUBLISH_FLOW,
    variables: {
      automationId: workflowId,
      state: state
    }
  })

  if (errors) return 'Workflow unpublished'
  return 'Workflow published'
}
