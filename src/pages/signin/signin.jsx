import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


import Header from '../../components/header/header';
import CustomButton from '../../components/custom-button/custom-button.component';

import React from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useDispatch } from "react-redux"
import {login} from '../../redux/features/userSlice'

import './signin.styles.css'


const SignIn = (props) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const SpawnSnackBar = message =>
  {
    enqueueSnackbar( message, { 
      variant: 'error',
    })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required(function () { SpawnSnackBar('Email is required') } )
    .email(function () { SpawnSnackBar('Email is invalid') }),
    name: Yup.string()
      .required( function () { SpawnSnackBar('name is required') } ),
    DoB: Yup.date().default(() => new Date()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [signInFields, setSignInFields] = React.useState({
    name: '', 
    email: '',
  });

  const [DoB, setDoB] = React.useState(new Date());

  const changeHandler = ( event ) => {
    console.log("asddasdcas",  event.target.value)
    const { name, value } = event.target;
    setSignInFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  const { name, email } = signInFields;

  const onSubmit = (data, e) => {
    e.preventDefault()
    console.log(data, e);
    dispatch(login({
      name: name,
      email: email,
      DoB: DoB,
      loggedIn: true
    }))
    navigate("/")
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <Header title='PERSONAL INFO'/>
      
        <Box sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
              }}>

        <Avatar sx={{height: 100, width: 100}}></Avatar>
        
        <Box component="form" noValidate sx={{ mt: 1}} classes={'sign-in-form'}>
          <div>
            <FormLabel ><strong>NAME <span className="required">*</span></strong></FormLabel>
            <TextField
               placeholder='Enter your name'
              required
              id="name"
              name="name"
              value={name}
              fullWidth
              margin="normal"
              {...register('name')}
              onChange={changeHandler}
              error={errors.name ? true : false}
            />
          </div>


            <div>
              <FormLabel ><strong>EMAIL <span className="required">*</span></strong></FormLabel>
              <TextField
                placeholder='Enter your email'
                required
                id="email"
                name="email"
                value={email}
                fullWidth
                margin="normal"
                {...register('email')}
                onChange={changeHandler}
                error={errors.email ? true : false}
              />
            </div>

            <div>
              <FormLabel ><strong>DATE OF BIRTH <span className="required">*</span></strong></FormLabel>
              <LocalizationProvider  dateAdapter={AdapterDateFns}>
                {/* <DatePicker
                  id="DoB"
                  name="DoB"
                  value={DoB}
                  onChange={changeHandler}
                  placeholder='Enter your Date of Birth'
                  renderInput={(params) => 
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    {...params}
                    {...register('DoB')}
                    error={errors.DoB ? true : false}
                    />
                  }
                  /> */}

                <DatePicker
                  value={DoB}
                  onChange={(newValue) => {
                    setDoB(newValue);
                  }}
                  {...register('DoB')}
                  error={errors.DoB ? true : false}
                  renderInput={(params) => <TextField required fullWidth margin="normal" {...params} />}
                />

              </LocalizationProvider>
            </div>

            <FormControl component="fieldset">
              <FormLabel component="legend"><strong>GENDER <span className="required">*</span></strong></FormLabel>
              <RadioGroup row defaultValue="male" aria-label="gender" name="row-radio-buttons-group" >
                  <FormControlLabel sx={{ml: 5}} default value="male" control={<Radio />} label="Male" />
                  <FormControlLabel sx={{ml: 5}} value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
            
            <CustomButton title='Submit' type='submit' onClick={handleSubmit(onSubmit)}/>
        </Box>

          {/* <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Box> */}
        </Box>
    </Container>
  );
}

export default SignIn
