import React, { useEffect, useState } from "react"
import { ButtonLink } from "../../components/Button/Button"
import { PageEnum } from "../../utils/types"
import { host, header  } from "../../utils/utils"
import "./Home.css"

type HomeType = {
  language: string,
  setPage: () => void
}

const Home = (prop: HomeType) => {
  const{language, setPage} = prop
  
  const[posts, setPosts] = useState<any>()
  
  const getPosts = async () => {
    return await fetch(`${host}/api/post/${language}`, header)
      .then(res => res.json())
      .then(posts => setPosts( posts.map((e: any, i: number) => 
        <Post key={i} data={e} setPage={setPage}/> 
      )))
      .catch(err => console.log(err))
  }

  useEffect(() => {getPosts()},[])
  
  return(
    <div className="home">
      <main>
        {posts}
      </main>
    </div>
  )
}

type PostType = {
  data: {
    id: number,
    contents: {title: string}[],
    date: number,
    tags: {name: string}[],
  },
  setPage: () => void
}

function Post(prop: PostType) {
  const {data, setPage} = prop
  const {date, tags, contents, id} = data
  const {title} = contents[0]

  return (
    <article>
      <div>
        {tags.map((e, i) => <a key={i}>{`#${e.name}`}</a>)}
      </div>
      <ButtonLink to={`/post/${id}`} onClick={setPage}> 
        <h2>{title}</h2>
      </ButtonLink>
      <h4>{new Date(date).toLocaleDateString('en-GB')}</h4>
    </article>
  )
}

export default Home