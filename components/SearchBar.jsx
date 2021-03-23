import React, { useState, useEffect } from 'react'
import styles from '../styles/SearchBar.module.css'
import { AVAILABLE_LANGUAGES, SORT_BY } from '../src/helpers/constants'
import useLocalStorage from '../hooks/localstorage'
import dynamic from 'next/dynamic'
import newsService from '../src/helpers/newsService';

const DynamicArticles = dynamic(
  () => import('./articlelist'),
  { ssr: false }
)

const SearchBar = () => {
  const [articleData, setArticleData] = useLocalStorage('searchResults', []);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [pageNumber, setPageNumber] = useState(1)
  const [language, setLanguage] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [totalResults, setTotalResults] = useState()
  const [from, setFrom] = useState()
  const [to, setTo] = useState()

  var searchHandler = (e, onSubmit) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;

    if (onSubmit) setPageNumber(1)
    const params = {
      q: searchQuery,
      page: pageNumber,
      language,
      from,
      to,
      sortBy,
      pageSize: 10
    },
      fetchData = newsService(params);

    fetchData.then(data => {
      setArticleData(data.articles);
      setTotalResults(Math.ceil(data.totalResults / 10));
    })
  }

  useEffect(async () => {
    await searchHandler();
  }, [pageNumber]);

  return (
    <div className={styles.articlesWrapper}>
      <form onSubmit={(e) => searchHandler(e, true)}>
        <label htmlFor="search">Search News Stories</label>
        <div className={styles.wrap}>
          <input className={styles.searchTerm} name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ></input>
          <button className={styles.searchButton}>Search</button>
        </div>
        <div>
          <div className={styles.optionsWrapper}>
            <select className={styles.selectStyles} onChange={(e) => setLanguage(e.target.value)}>
              <option value='' disabled selected>Select Language</option>
              {AVAILABLE_LANGUAGES.map(language => {
                return (<option key={language} value={language}>{language}</option>)
              })}
            </select>

            <select className={styles.selectStyles} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_BY.map(sortOption => {
                return (<option key={sortOption} value={sortOption}>{sortOption}</option>)
              })}
            </select>
              {/* the min date of the calendar is hardcode to be one month from today ( March 23) because the news api only allows one month before the date for the free users, to do is to make this date not hardcoded */}
            <div className={styles.calendar}> <p className={styles.pagination}> FROM: </p><input id="date" className={styles.datePicker} type="date" min='2021-02-23' defaultValue={from} onChange={(e) => setFrom(e.target.value)}></input></div>
            <div className={styles.calendar}> <p className={styles.pagination}> TO: </p><input id="date" className={styles.datePicker} type="date" min='2021-02-23' defaultValue={to} onChange={(e) => setTo(e.target.value)}></input></div>
          </div>
          <div></div>
        </div>
      </form>
      <div className={styles.articlesWrapper}>
        <DynamicArticles articles={articleData}></DynamicArticles>
      </div>
      <div>
        <p className={styles.pagination}> PAGE {pageNumber} out of {totalResults} </p>
        <div>
          <button className={styles.paginationButton} disabled={pageNumber === 1} onClick={e => setPageNumber(prev => prev - 1)}>Previous</button>
          | <button className={styles.paginationButton} disabled={pageNumber === totalResults} onClick={e => setPageNumber(prev => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar