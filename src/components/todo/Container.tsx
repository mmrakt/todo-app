import { Container } from '@material-ui/core'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import InputText from './InputText'
import List from './List'

function TodoContainer(): React.ReactElement {
  const statuses = ['ALL', 'TODO', 'DONE']
  const [checked, setChecked] = useState(false)
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      setChecked(true)
    } else if (status === 'unauthenticated') {
      Router.push('/signin')
    }
  }, [status])

  if (!checked) return null

  return (
    <Container maxWidth="sm">
      <InputText />
      {statuses.map((status, index) => (
        <List key={index} status={status} />
      ))}
    </Container>
  )
}

export default TodoContainer
