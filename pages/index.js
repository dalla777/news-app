import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {

  const [searchQuery, setSearchQuery] = useState('')
  const [articleList, setArticleList] = useState([])

  const newsApiUrl = 'https://newsapi.org/v2/everything'
  const apiKey = 'aae4090dda494124b1d4a31f0bf042e6'

  var searchHandler = (e) => {  
    e.preventDefault();
    fetch(`${newsApiUrl}?q=${searchQuery}&apiKey=${apiKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      }).then(data => {
        setArticleList(data.articles);
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to News App
        </h1>
        <form onSubmit={ searchHandler }>
          <label htmlFor="search">Search News Stories</label>
          <input name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ></input>
          <button type="submit">Search</button>
        </form>
        <div>
          ARTICLES: {articleList.length}
        {articleList.map(article => {
          return (<p key={article.url}> > {article.title} </p>)
        })}
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
