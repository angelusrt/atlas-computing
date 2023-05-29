"use client"

import { useContext, useEffect, useState } from "react"
import { ButtonLink } from "../components/Button/Button"
import { header } from "../utils/utils"
import { langDic } from "../utils/types"
import "./Home.css"
import { langContext } from "./layout"

type PostType = {
  id: number,
  title: string,
  date: number,
  tags: {name: string}[],
}

const Home = () => {
  const language = langDic[useContext(langContext)]

  const [posts, setPosts] = useState<PostType[]>()
  const [lang, setLang] = useState<string>(language)

  const getPosts = async (language: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post/${language}`, header)
      .then(res => res.json())
      .then((posts: PostType[]) => {
        setPosts(posts)
        localStorage.setItem('posts', JSON.stringify(posts))
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    const item = localStorage.getItem('posts')

    if(item == null || language !== lang) {
      setLang(language)
      getPosts(language)
    }
    else {
      setPosts(JSON.parse(item))
    }
  },[language])
  
  return(
    <div className="home">
      <main>
        {posts && posts.map((e, i) => 
          <article key={i}>
            <div>
              {e.tags.map((e, i) => <a key={i}>{`#${e.name}`}</a>)}
            </div>
            <ButtonLink to={`/post/${lang}/${e.id}`}> 
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
