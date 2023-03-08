import { render, screen } from '@testing-library/react'
import RepositoriesSummary from './RepositoriesSummary'

test('it should not display the repo language if not defined', () => {
  const repoWithoutLanguage = {
    stargazers_count: 5,
    open_issues: 3,
    forks: 2,
    language: null,
  }
  render(<RepositoriesSummary repository={repoWithoutLanguage} />)
  const language = screen.queryByText(new RegExp(repoWithoutLanguage.language, 'i'))
  expect(language).toBeNull()
})

test('it should display the repo language if it is defined', () => {
  const repoWithLanguage = {
    stargazers_count: 5,
    open_issues: 3,
    forks: 2,
    language: 'Python',
  }
  render(<RepositoriesSummary repository={repoWithLanguage} />)
  const language = screen.getByText(new RegExp(repoWithLanguage.language, 'i'))
  expect(language).toBeInTheDocument()
})

test('it displays repository info', () => {
  const repoWithLanguage = {
    stargazers_count: 5,
    open_issues: 3,
    forks: 2,
    language: 'Python',
  }
  render(<RepositoriesSummary repository={repoWithLanguage} />)
  Object.keys(repoWithLanguage).forEach((key) => {
    const info = screen.getByText(new RegExp(repoWithLanguage[key], 'i'))
    expect(info).toBeInTheDocument()
  })
})
