import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import createServer from '../../test/server'
import AuthButtons from './AuthButtons'
import { SWRConfig } from 'swr'

const init = async () => {
  render(
    <MemoryRouter>
      <SWRConfig value={{ provider: () => new Map() }}>
        <AuthButtons />
      </SWRConfig>
    </MemoryRouter>,
  )
  await screen.findAllByRole('link')
}

describe('when a user is logged in', () => {
  const serverConfig = [
    {
      path: '/api/user',
      res: () => {
        return { user: 1, email: 'cmejia@gmail.com' }
      },
    },
  ]

  createServer(serverConfig)

  test('signout is visible', async () => {
    await init()

    const signoutButton = screen.getByRole('link', { name: /sign out/i })
    expect(signoutButton).toBeInTheDocument()
  })

  test('sign in and sign up are not', async () => {
    await init()

    const signinButton = screen.queryByRole('link', { name: /sign in/i })
    expect(signinButton).not.toBeInTheDocument()

    const signupButton = screen.queryByRole('link', { name: /sign up/i })
    expect(signupButton).not.toBeInTheDocument()
  })
})

describe('when a user is not logged in', () => {
  const serverConfig = [
    {
      path: '/api/user',
      res: () => {
        return { user: null }
      },
    },
  ]

  createServer(serverConfig)
  test('sign in and sign up are visible', async () => {
    await init()

    const signinButton = screen.getByRole('link', { name: /sign in/i })
    expect(signinButton).toBeInTheDocument()

    const signupButton = screen.getByRole('link', { name: /sign up/i })
    expect(signupButton).toBeInTheDocument()
  })

  test('sign out is not visible', async () => {
    await init()

    const signoutButton = screen.queryByRole('link', { name: /sign out/i })
    expect(signoutButton).not.toBeInTheDocument()
  })
})
