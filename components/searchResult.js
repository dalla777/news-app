import Link from 'next/link'
import styles from '../styles/Result.module.css'

export default function SearchResult({ article, searchQuery }) {
    const { author, description, publishedAt, title, url, urlToImage } = article

    let dateItem = new Date(publishedAt)

    dateItem = dateItem.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })

    function getHighlightedText(text, highlight) {
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

      return <span> { parts.map((part, i) =>
          <span key={i} class={part === highlight ? 'highlight' : '' }>
              { part }
          </span>)
      } </span>;
    }

    return (
      <div className={styles.wrapper}>
          <Link href={'/article/' + encodeURIComponent(url)}>
              <a className={styles.linkwrapper}>
                  {urlToImage &&
                    <div className={styles.imgwrapper}>
                      <img className={styles.imgholder} src={urlToImage}></img>
                    </div>
                  }
                  <div className={styles.details}>
                      <h2 className={styles.title}>{ getHighlightedText(title, searchQuery) }</h2>
                      <p className={styles.authordate}>{author && <span className={styles.author}>By: {author}</span>}<span>{dateItem}</span></p>
                      <p>{ getHighlightedText(description.slice(0, 150) + '...', searchQuery) }</p>
                  </div>
              </a>
          </Link>
      </div>
    )
}