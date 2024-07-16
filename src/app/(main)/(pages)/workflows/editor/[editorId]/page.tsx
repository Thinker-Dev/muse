import { ConnectionsProvider } from '@/providers/connections-provider'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'
import EditorCanvas from './_components/editor-canvas'
import { currentUser } from '@clerk/nextjs'
import { getUserData } from '../../../connections/_actions/get-user'

type Props = {}

const Page = async (props: Props) => {
  const user = await currentUser()
  if (!user) return null

  const onUserConnections = async () => {

    const connections: any = {}

    const user_info = await getUserData(user.id)
    console.log(user_info)
    //get user info with all connections
    user_info?.connections.map((connection: any) => {
      connections[connection.type] = true
      return (connections[connection.type] = true)
    }

    )
    return { ...connections, 'Google Drive': true }
  }
  const connections = await onUserConnections()
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas connections={connections} />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  )
}

export default Page
