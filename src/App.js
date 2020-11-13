import React, { useState, useEffect } from 'react';
import Header from './Header';
import Post from './Post';
import SideBar from './SideBar';
import { db, auth } from './firebase'
import './App.css';


function App() {

  const [posts, setPosts] = useState([]);
  const [user,setUser] = useState(null);
  
  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
      else {
        setUser(null)
      }
    })
    return () => {
      unscribe();
    }
  }, [])
  console.log(user);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      }))
    })
  }, [])
  return (
    <div className="app">
      <div className='app__containerHeader'>
        
        <Header user = {user}/>
      </div>
      <div className='app__content'>
        <div className='app__contentPost'>
          {posts && posts.map(post => {
            return (
              <Post id={post.id}
                username={post.username}
                caption={post.caption}
                imgurl={post.imgurl}
                likes={post.likes}
                avatar={post.avatar}
                key={post.id}
              />
            )
          })}
        </div>
        <div className='app__contentSidebar' >
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default App;