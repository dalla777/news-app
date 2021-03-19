import Link from 'next/link'
import useLocalStorage from '../hooks/localstorage'

export default function ArticleInfo ({id}) {
    const [ articleData ] = useLocalStorage('searchResults', '');
    var article;

    function getArticle() {
        if (articleData.length) {
            return [...articleData].find(obj => obj.url === decodeURIComponent(id))
        }
        return undefined
    }

    function ShowContent() {
        if (article = getArticle()) {
            return (
                <div>
                    <h1>{article.title}</h1>
                    <p>Author: {article.author}</p>
                    <p>Pub date: {article.publishedAt}</p>
                    <p>Source: {article.source.name}</p>
                    <img src={article.urlToImage} width="300"/>
                    <div>{article.description}</div>
                </div>
            ) 
        }
        return <h1>Whoops, <Link href="/">go back</Link></h1>
    }

    return (
        <div>
            <ShowContent />
        </div>
    )
}