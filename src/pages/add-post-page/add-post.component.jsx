import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormLabel from "@material-ui/core/FormLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Snackbar, Alert } from '@mui/material';
import Fade from '@mui/material/Fade';


import Header from "../../components/header/header";
import CustomButton from "../../components/custom-button/custom-button.component";

import { useNavigate } from "react-router-dom";

import axios from 'axios'
import { useFormik } from "formik";

import './add-post.styles.css'

const AddPost = ({posts}) => {

  const navigate = useNavigate();

  const initialValues = {
    userID: 1, 
    title: '', 
    body: ''
  }

  const onSubmit = values => {
    
    const { userID, title, body } = values;

    let newPost = {userID, title, body}

    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
    .then(response => {
      console.log(response)
      if(response.status)
      {
        posts.push(response.data)
        navigate('/')
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const validate = values => {
    let errors= {}

    if(!values.title)
    {
      errors.title = 'Required'
    }

    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  const [open, setOpen] = React.useState(false);

  const handleErrors = () => {

    if(formik.errors)
      setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

///////////////////////////////////////////////////////////////////////////

  // const [postFields, setPostFields] = React.useState({
  //    userID: 1, 
  //    title: '', 
  //    body: ''
  // });


  // const changeHandler = ( event ) => {
  //   console.log("asddasdcas",  event.target.value)
  //   const { name, value } = event.target;
  //   setPostFields((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //     };
  //   });
  // }


  // const { userID, title, body } = postFields;

  // const submitHandler = ( e ) => {
  //   e.preventDefault();
  //   console.log(userID, title, body)

  //   let newPost = {userID, title, body}
  //   console.log(newPost)

  //   axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
  //   .then(response => {
  //     console.log(response)
  //     if(response.status)
  //     {
  //       navigate('/')
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

///////////////////////////////////////////////////////////////////////////
    
    return (
      <Container component="main" maxWidth="xs">
        <Header title='add post'/>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <FormLabel component="legend" color="secondary">
            <strong>TITLE <span className="required">*</span></strong>
          </FormLabel>
          <div>
            <TextField
              name="title"
              id="title"
              value={formik.values.title}
              placeholder="Enter the Title"
              required
              fullWidth
              margin="normal"
              autoComplete="name"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
              formik.touched.title && formik.errors.title ?
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right' }}  TransitionComponent={Fade}>
                  <Alert severity="error" sx={{ width: '350px' }}>
                    <strong>Title is a Required Field!</strong>
                  </Alert>
                </Snackbar>
              :
              null
            }
          </div>

          <div style={{marginTop:'12px'}} >
            <FormLabel  component="legend" color="secondary">
              <strong>DESCRIPTION</strong>
            </FormLabel>
              <TextareaAutosize
                name="body"
                value={formik.values.body}
                placeholder="Enter the description"
                aria-label="minimum height"
                minRows={10}
                onChange={formik.handleChange}
                style={{ width: "100%", marginTop: "10px" }}
                onBlur={formik.handleBlur}
            />
          </div>

          <div style={{marginTop:'40vh'}}>

          <CustomButton title='Submit' type='submit' onClick={ handleErrors }/> 

          </div>
        </Box>
      </Container>
    );
}

export default AddPost;
