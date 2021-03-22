import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SearchBar from '../src/components/SearchBar';


export default function Home() {

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
        <SearchBar />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
