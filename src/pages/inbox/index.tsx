import React from 'react'

import Layout from '../../components/Layout'
import TodoContainer from '../../components/todo/TodoContainer'
import useCheckSession from '../../hooks/useCheckSession'

const Inbox: React.VFC = () => {
  // const result = useCheckSession()
  // if (result === null) return null

  // TODO: 本番では差し替えておく
  const result = {
    id: 'cl2myuo0x00297kiby38pl87e',
  }

  return (
    <Layout>
      <TodoContainer user={result} />
    </Layout>
  )
}

export default Inbox
