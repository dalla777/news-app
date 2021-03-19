import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DynamicArticle = dynamic(
  () => import('../../components/articleinfo'),
  { ssr: false }
)

export default function Article () {
  const router = useRouter()
  const { id } = router.query

  return (
    <DynamicArticle id={id}></DynamicArticle>
  )
}
