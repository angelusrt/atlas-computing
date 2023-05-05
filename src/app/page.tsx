"use client"

import { useEffect, useState } from "react"
import { ButtonLink } from "../components/Button/Button"
import { header } from "../utils/utils"
import "./Home.css"

type PostType = {
  id: number,
  contents: {title: string}[],
  date: number,
  tags: {name: string}[],
}

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>()

  const getPosts = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post/pt-br`, header)
      .then(res => res.json())
      .then((posts: PostType[]) => 
        localStorage.setItem('posts', JSON.stringify(posts))
      ).catch(err => console.log(err))
  }

  useEffect(() => {
    const item = localStorage.getItem('posts')

    if(item === null) 
      getPosts()
    else 
      setPosts(JSON.parse(item))
  },[])
  
  return(
    <div className="home">
      <main>
        {posts && posts.map((e, i) => <Post key={i} data={e}/>)}
      </main>
    </div>
  )
}

function Post({data}: {data: PostType}) {
  const {date, tags, contents, id} = data
  const {title} = contents[0]

  return (
    <article>
      <div>
        {tags.map((e, i) => <a key={i}>{`#${e.name}`}</a>)}
      </div>
      <ButtonLink to={`/post/${id}`}> 
        <h2>{title}</h2>
      </ButtonLink>
      <h4>{new Date(date).toLocaleDateString('en-GB')}</h4>
    </article>
  )
}

export default Home