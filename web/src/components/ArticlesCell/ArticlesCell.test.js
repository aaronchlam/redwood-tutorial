import { render, screen, within } from '@redwoodjs/testing'

import { Loading, Empty, Failure, Success } from './ArticlesCell'
import { standard } from './ArticlesCell.mock'

describe('ArticlesCell', () => {
  test('Loading renders successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  test('Empty renders successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  test('Failure renders successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  test('Success renders successfully', async () => {
    const articles = standard().articles
    render(<Success articles={articles} />)

    articles.forEach((article => {
      expect(screen.getByText(article.title)).toBeInTheDocument()
      expect(screen.queryByText(article.body)).not.toBeInTheDocument()
      const matchedBody = screen.getByText(article.body.substring(0, 10), { exact: false })
      expect(matchedBody).toBeInTheDocument()
      expect(within(matchedBody).getByText('...', { exact: false })).toBeInTheDocument()
    }));
  })
})
