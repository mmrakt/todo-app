import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React, { FC } from 'react'

const StyledMenuItem = ({ text }) => (
  <MenuItem bg="dark.gray" _hover={{ background: 'dark.lightGray' }}>
    {text}
  </MenuItem>
)

const ToggleMenu = React.memo(() => {
  const { data: session }: any = useSession()

  const handleSignout = () => {
    signOut({
      callbackUrl: Router.basePath,
    })
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Avatar}
        icon={
          <Image
            src={session?.user?.image || '/avatar.png'}
            alt="avatar image"
            width={50}
            height={50}
            className="rounded-full"
          />
        }
      />
      <MenuList bg="dark.gray" borderColor="dark.lightGray">
        {session?.user ? (
          <div>
            <Link href={`/settings/${session?.user?.id}`}>
              <a>
                <StyledMenuItem text="Settings" />
              </a>
            </Link>
            <div onClick={handleSignout}>
              <StyledMenuItem text="Sign out" />
            </div>
          </div>
        ) : (
          <div>
            <Link href="/signin">
              <a>
                <StyledMenuItem text="Sign in" />
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <StyledMenuItem text="Sign up" />
              </a>
            </Link>
          </div>
        )}
      </MenuList>
    </Menu>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

export default ToggleMenu
