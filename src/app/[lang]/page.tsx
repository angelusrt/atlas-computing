"use client"

import { useEffect, useState } from "react"
import { ButtonLink } from "../../components/Button/Button"
import { LangType } from "../../utils/types"
import { getLang, header } from "../../utils/utils"
import "./Home.css"

type PostType = {
  id: number,
  title: string,
  date: number,
  tags: {name: string}[],
}

const Home = ({params}: {params: {lang: string}}) => {
  const [posts, setPosts] = useState<PostType[]>()

  const getPosts = async (lang: LangType) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post/${lang}`, header)
      .then(res => res.json())
      .then((posts: PostType[]) => {
        setPosts(posts)
        localStorage.setItem('posts', JSON.stringify(posts))
        localStorage.setItem('language', lang)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    const item = localStorage.getItem('posts')
    const lang = localStorage.getItem('language')

    if(item == null || getLang(params.lang) !== lang) 
      getPosts(getLang(params.lang))
    else 
      setPosts(JSON.parse(item))
  },[params.lang])
  
  return(
    <div className="home">
      <main>
        {posts && posts.map((e, i) => 
          <article key={i}>
            <div>
              {e.tags.map((e, i) => <a key={i}>{`#${e.name}`}</a>)}
            </div>
            <ButtonLink to={`/${params.lang}/post/${e.id}`}> 
              <h2>{e.title}</h2>
            </ButtonLink>
            <h4>{new Date(e.date).toLocaleDateString('en-GB')}</h4>
          </article>
        )}
      </main>
    </div>
  )
}

export default Home
