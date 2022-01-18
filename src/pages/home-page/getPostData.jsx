import React from 'react';
import { useNavigate } from "react-router-dom";

import Post from '../../components/post/post.component';
import Header from '../../components/header/header';
import CustomButton from '../../components/custom-button/custom-button.component';

import Container from '@mui/material/Container';

import './home-page.styles.css'

const Home = () => {

  const [posts, setPosts] = React.useState([])
  const navigate = useNavigate();

  React.useEffect( () => {
    fetchData()
    console.log(fetchData())
  }, [])

  // const handleClick = (route) => {
  //   navigate(route.toString());
  // }

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => {
      console.log(err)
    })
  }

  console.log(posts)

  return(
    <div >
      <Container component="main" maxWidth="xs" >
        <Header title='home'/>
        <div className='container-body'>
          {
            posts.map((post) =>  (
              <Post id={post.id} key={post.id} title={post.title} body={post.body}/>
              ))
          }
        </div>
        <CustomButton title='Add post' onClick={function () { navigate("/addpost"); }}/>
      </Container>

    </div>
  )
}

export default Home
