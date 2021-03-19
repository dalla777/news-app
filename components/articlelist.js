import Link from 'next/link'

export default function ArticleList({articles}) {
    return (
        <ul>
          {articles.map(article => {
            return <li key={article.url}><Link href={'/article/' + encodeURIComponent(article.url)}>{article.title}</Link></li>
          })}
        </ul>
    )
}