import { render, screen } from '@testing-library/react'
import RepositoriesSummary from './RepositoriesSummary'

const testRepository = {
  stargazer_count: 5,
  open_issues: 3,
  forks: 2,
  language: 'Python',
}

test('it should display the repo language', () => {
  render(<RepositoriesSummary repository={testRepository} />)
  const language = screen.getByText(new RegExp(testRepository.language, 'i'))
  expect(language).toBeInTheDocument()
})
