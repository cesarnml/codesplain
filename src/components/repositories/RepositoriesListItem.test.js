import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import RepositoriesListItem from './RepositoriesListItem'

const pause = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 100)
  })

// jest.mock('../tree/FileIcon', () => () => 'File Icon Component')

test('it displays a link to repository', async () => {
  const repoWithLanguage = {
    full_name: 'huandu/facebook',
    description: 'this is a description',
    owner: {
      login: 'huandu',
    },
    name: 'facebook',
    language: 'Python',
    html_url: 'https://github.com/huandu/facebook',
  }

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repoWithLanguage} />
    </MemoryRouter>,
  )
  await screen.findByRole('img', { name: repoWithLanguage.language })
  const repoLink = screen.getByRole('link', { name: /github repository/i })
  expect(repoLink).toHaveAttribute('href', repoWithLanguage.html_url)
})

test('it displays a github icon for the repository link, correct language icon, and link to repo code', async () => {
  const repoWithLanguage = {
    full_name: 'huandu/facebook',
    description: 'this is a description',
    owner: {
      login: 'huandu',
    },
    name: 'facebook',
    language: 'Python',
    html_url: 'https://github.com/huandu/facebook',
  }

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repoWithLanguage} />
    </MemoryRouter>,
  )
  const languageIcon = await screen.findByRole('img', { name: repoWithLanguage.language })
  const repositoryRouteLink = screen.getByRole('link', {
    name: new RegExp(repoWithLanguage.owner.login, 'i'),
  })
  const link = screen.getByRole('link', { name: /github repository/i })

  expect(repositoryRouteLink).toHaveAttribute('href', `/repositories/${repoWithLanguage.full_name}`)
  expect(languageIcon).toHaveClass('python-icon')
  expect(within(link).getByRole('img', { hidden: true })).toHaveClass('octicon octicon-mark-github')
})
