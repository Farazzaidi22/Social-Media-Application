import React from 'react';
import Container from '@mui/material/Container';
import './post.styles.css'


const Post = ({id, title,body}) => {


    return (
        <Container component="main" maxWidth="xs">
            
            <div >
                <div style={{border:'1px solid black',padding:'5px',marginBottom:'5px'}}>
                    <h4 className='title'> {title} </h4>
                    <p> { body }</p>
                </div>
            </div>

        </Container>
    );

}

export default Post