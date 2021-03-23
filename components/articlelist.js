import SearchResult from './searchResult'
import styles from '../styles/ResultList.module.css'

export default function ArticleList({ articles, searchQuery }) {
    return (
        <ul className={styles.list}>
          {articles.map(article => {
            return <li key={article.url}><SearchResult article={article} searchQuery={searchQuery}></SearchResult></li>
          })}
        </ul>
    )
}