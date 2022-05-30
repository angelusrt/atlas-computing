import {useState, useEffect} from "react"
import Navbar from "./components/navbar"
import PostCard from "./components/PostCard"
import Post from "./components/Post"
import Posts from "./posts.json"
import './App.css'

function App() {
  //Dark theme
  const[isDT, setIsDT] = useState(false)
  const[isPost, setIsPost] = useState(false)
  const[post, setPost] = useState({})

  useEffect(()=> {
    document.body.style.background = isDT?"#171717":"#f6f6f6"
  },[isDT])

  return (
    <div className={"App " + (isDT?"App-dark":"App-light")}>
      <Navbar 
        isDT={isDT} 
        isPost={isPost}
        setIsDT={() => setIsDT(!isDT)}
        onFunc={() => setIsPost(false)}
      />
      {
        !isPost?
        Posts.posts.map((post, key) =>
          <PostCard 
            key={key} 
            tags={post.tags} 
            title={post.title}
            onFunc={() => {
              setIsPost(true)
              setPost(post)
            }}
          />
        ):
        <Post post={post}/>
      }
    </div>
  )
}

export default App
