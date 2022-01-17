import { ClientSafeProvider, getProviders, useSession } from 'next-auth/react'
import Router from 'next/router'
import React from 'react'

import Layout from '../../components/layout'

import SocialButton from './socialButton'

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

function Signin({
  providers,
}: {
  providers: ClientSafeProvider
}): React.ReactNode {
  const [checked, setChecked] = React.useState(false)
  const { data: session, status } = useSession()
  React.useEffect(() => {
    if (status === 'authenticated') {
      Router.push('/')
    }
  }, [status])

  if (!checked) return null

  return (
    <Layout title="ログイン">
      <div className="text-center">
        {Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <SocialButton
              id={provider.id}
              name={provider.name}
              theme={
                provider.name === 'GitHub'
                  ? 'bg-gray-500'
                  : provider.name === 'Google'
                  ? 'bg-red-400'
                  : provider.name === 'Twitter'
                  ? 'bg-blue-500'
                  : ''
              }
              hoverColor={
                provider.name === 'GitHub'
                  ? 'bg-gray-600'
                  : provider.name === 'Google'
                  ? 'bg-red-500'
                  : provider.name === 'Twitter'
                  ? 'bg-blue-600'
                  : ''
              }
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Signin