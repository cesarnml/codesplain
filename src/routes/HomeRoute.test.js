import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import HomeRoute from './HomeRoute'
import createServer from '../test/server'

createServer([
  {
    path: '/api/repositories',
    res: (req, res, ctx) => {
      const language = req.url.searchParams.get('q').split('language:')[1]
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      }
    },
  },
])

test('renders two links for each table', async () => {
  const languages = ['javascript', 'typescript', 'go', 'rust', 'java', 'python']
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>,
  )

  for (let lang of languages) {
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${lang}_`, 'i'),
    })
    expect(links).toHaveLength(2)
    links.forEach((link, idx) => {
      const suffix = idx === 0 ? 'one' : 'two'
      expect(link).toHaveTextContent(lang)
      expect(link).toHaveAttribute('href', `/repositories/${lang}_${suffix}`)
    })
  }
})
