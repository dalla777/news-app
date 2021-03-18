import React, { useState } from 'react'
import styles from '../../styles/SearchBar.module.css'
import { AVAILABLE_LANGUAGES } from '../helpers/lenguages'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [articleList, setArticleList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [language, setLanguage] = useState('all')
  const [showAdvance, setShowAdvance] = React.useState(false);
  const toggle = () => setShowAdvance(!showAdvance);

  const newsApiUrl = 'https://newsapi.org/v2/everything'
  const apiKey = 'aae4090dda494124b1d4a31f0bf042e6'

  var searchHandler = (e) => {
    e.preventDefault();
    console.log("pageNumber: ", pageNumber);
    fetch(`${newsApiUrl}?q=${searchQuery}&apiKey=${apiKey}&pageSize=10&page=${pageNumber}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      }).then(data => {
        console.log("data: ", data);
        setArticleList(data.articles);
      })
  }

  var loadMore = (async (e, increaseType) => {
    increaseType ? setPageNumber(prev => { console.log("PREV: ", prev); return prev + 1; }) : setPageNumber(pageNumber - 1);
    console.log("pageNumber: ", pageNumber);
    await searchHandler(e)
  });
  return (
    <div className={styles.articlesWrapper}>
      <form onSubmit={searchHandler}>
        <label htmlFor="search">Search News Stories</label>
        <div className={styles.wrap}>
          <input className={styles.searchTerm} name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ></input>
          <button className={styles.searchButton} type="submit">Search</button>
        </div>
        <div>
          <button onClick={toggle} >advance Search</button>
          {showAdvance ?
            <div>
              <label>
                Select Language:
                  <select>
                    {AVAILABLE_LANGUAGES.map(language=> {
                      console.log("language: ", language);
                      return (<option key={language} value={language}>{language}</option>)
                    })}
                </select>
              </label>
            </div> :
            <div></div>}
        </div>
      </form>
      <div className={styles.articlesWrapper}>
        {(articleList || []).map(article => {
          return (<p key={article.url}> {article.title} </p>)
        })}
      </div>
      <div> <button className={styles.paginationButton} disabled={pageNumber === 1} onClick={e => loadMore(e, false)}> PREV PAGE </button> | <button className={styles.paginationButton} onClick={e => loadMore(e, true)}> NEXT PAGE </button></div>
    </div>
  );
}

export default SearchBar