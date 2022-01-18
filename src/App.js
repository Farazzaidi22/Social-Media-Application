import './App.css';

import { Routes, Route, Navigate  } from 'react-router-dom'

import React from 'react';

import SignIn from './pages/signin/signin'
import Home from './pages/home-page/home-page.component';
import AddPost from './pages/add-post-page/add-post.component';


import { useSelector } from 'react-redux'
import { selectUser } from "./redux/features/userSlice"

function App(props) {

  const user = useSelector(selectUser)
  console.log("user", user)

  const [posts, setPosts] = React.useState([])

  React.useEffect( () => {
    fetchData()
    console.log(fetchData())
  }, [])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="App">

    <Routes>
        <Route exact path='/signin' element={ 
            user ? (<Navigate to='/'/>) :  
            <SignIn/>
          }/>
        <Route exact path='/' element={ user ? <Home posts={posts}/> : (<Navigate to='/signin'/>)}/>
        <Route path='/addpost' element={<AddPost posts={posts}/>}/>
    </Routes>

    </div>
  );
}

export default App;
