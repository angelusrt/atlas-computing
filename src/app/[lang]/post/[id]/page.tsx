import { compiler } from "markdown-to-jsx"
import { ReactNode } from "react"
import { IndexType, langDic, LangEnum } from "../../../../utils/types"
import { getLang, header } from "../../../../utils/utils"
import Link from "../../../../components/Link/Link"
import dotenv from "dotenv"
import "./Post.css"

dotenv.config()

type DataType = {
  id: number,
  date: string,
  name: string,
  description: string,
  title: string,
  markdown: string
  tags: {name: string}[]
}

type PostType = {
  data: DataType, 
  markdown: ReactNode, 
  index: IndexType[]
}

const getPost = async (language: string, id: string) => { 
  const url = `${process.env.NEXT_PUBLIC_HOST}/api/post/${language}/${id}`
  const data: PostType = {data: null!, markdown: '', index: null!}

  await fetch(url, header)
    .then(res => res.json())
    .then((post: DataType[]) => {
      if(post.length === 0) return null

      data.data = post[0]

      const md = compiler(post[0].markdown)
      data.markdown = md

      const index: IndexType[] = md.props.children
      .map((e: any): IndexType => {
        return {id: e.props.id, text: e.props.children[0]}
      }).filter((e: IndexType) => e.id != undefined)
      data.index = index
  }).catch(err => console.log(err))

  return data
}

const Post = async ({params}: {params: {lang: string, id: string}}) => {
  const {data, markdown, index} = await getPost(getLang(params.lang), params.id)

  return (
    <div className="post">
      {data && data.tags && data.title && data.date && 
        <header>
          <div>
            {data.tags.map((e, i) => 
              <Link name={e.name} key={i} link={`#${e.name}`} isSelf/>
            )}
          </div>
          <h1>{data.title}</h1>
          <h4>{new Date(data.date).toLocaleDateString('en-GB')}</h4>
        </header>
      }
      {data && data.name && data.description && markdown &&
        <main>
          <article>
            <div>{markdown}</div>
          </article>
          <aside>
            <section className="post-aside-actor">
              <h3>Autor:</h3>
              <h2>{data.name}</h2>
              <h3>{data.description}</h3>
            </section>
            <section className="post-aside-index">
              <h3>Índice:</h3>
              <div id="index-wrapper">
                {index && index.map((e, i) => 
                  <Link name={e.text} key={i} link={`#${e.id}`} isSelf/>
                )}
              </div>
            </section>
          </aside>
        </main> 
      }
    </div>
  )
}

export default Post
