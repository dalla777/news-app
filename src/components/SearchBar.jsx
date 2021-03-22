import React, { useState, useEffect } from 'react'
import styles from '../../styles/SearchBar.module.css'
import { AVAILABLE_LANGUAGES } from '../helpers/lenguages'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [articleList, setArticleList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [language, setLanguage] = useState('')
  const [totalResults, setTotalResults] = useState()
  const newsApiUrl = 'https://newsapi.org/v2/everything'
  const apiKey = 'a2d7385492214e739b0bac196fe5fef0'

  var searchHandler = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;

    const params = {
      q: searchQuery,
      language: language,
      page: pageNumber
    },
      queryString = Object.entries(params).reduce((accumulator, [key, value]) => value ? accumulator + `&${key}=${value}` : accumulator + '', '');

    fetch(`${newsApiUrl}?apiKey=${apiKey}${queryString}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      }).then(data => {
        setArticleList(data.articles);
        setTotalResults(Math.round(data.totalResults/10));
      })
  }

  useEffect(async () => {
    await searchHandler();
  }, [pageNumber]);

  return (
    <div className={styles.articlesWrapper}>
      <form onSubmit={searchHandler}>
        <label htmlFor="search">Search News Stories</label>
        <div className={styles.wrap}>
          <input className={styles.searchTerm} name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ></input>
          <button className={styles.searchButton} disabled={!searchQuery}>Search</button>
        </div>
        <div>
          <div className={styles.optionsWrapper}>
            <label>
              <select className={styles.selectStyles} onChange={(e) => setLanguage(e.target.value)}>
                <option value="" disabled selected>Select Language</option>
                {AVAILABLE_LANGUAGES.map(language => {
                  return (<option key={language} value={language}>{language}</option>)
                })}
              </select>
            </label>
          </div>
          <div></div>
        </div>
      </form>
      <div className={styles.articlesWrapper}>
        {(articleList || []).map(article => {
          return (<p key={article.url}> {article.title} </p>)
        })}
      </div>
      <div> 
        PAGE {pageNumber} out of {totalResults}
        <button className={styles.paginationButton} disabled={pageNumber === 1} onClick={e => setPageNumber(prev => prev - 1)}> PREV PAGE </button>
         | <button className={styles.paginationButton} onClick={e => setPageNumber(prev => prev + 1)}> NEXT PAGE </button>
      </div>
    </div>
  );
}

export default SearchBar