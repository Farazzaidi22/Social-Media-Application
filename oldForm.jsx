import React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


import Header from '../../components/header/header';
import CustomButton from '../../components/custom-button/custom-button.component';


import { useFormik } from "formik";
import { withSnackbar, useSnackbar } from 'notistack';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './signin.styles.css'


const SignIn = (props) => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const SpawnSnackBar = name =>
  {
      enqueueSnackbar(name + ' is a Required Field!', { 
      variant: 'error',
    })
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
    // username: Yup.string()
    //   .required('Username is required')
    //   .min(6, 'Username must be at least 6 characters')
    //   .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    // password: Yup.string()
    //   .required('Password is required')
    //   .min(6, 'Password must be at least 6 characters')
    //   .max(40, 'Password must not exceed 40 characters'),
    // confirmPassword: Yup.string()
    //   .required('Confirm Password is required')
    //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (event) => {
    event.preventDefault()
   // console.log(JSON.stringify(data, null, 2));
  };

  const initialValues = {
    name: '', 
    email: '', 
    DoB: ''
  }

  const validate = values => {
    let errors= {}

    if(!values.name)
    {
      errors.name = 'Required'
    }
    if(!values.email)
    {
      errors.email = 'Required'
    }
    if(!values.DoB)
    {
      errors.DoB = 'Required'
    }

    return errors
  }

  const formik = useFormik({
    initialValues,
    validate
  })

  const [open, setOpen] = React.useState(false);

  const handleErrors = () => {

    if(formik.errors)
      {
        setOpen(true);
        // enqueueSnackbar('I love hooks');
      }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    return (
        <Container component="main" maxWidth="xs">
          <Header title='PERSONAL INFO'/>
            <Box
              sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{height: 100, width: 100}}>
              </Avatar>

            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            
              <div>
                <FormLabel component="legend" color="secondary"><strong>NAME <span className="required">*</span></strong></FormLabel>
                <TextField
                required
                id="name"
                name="name"
                label="Full Name"
                fullWidth
                margin="dense"
                {...register('name')}
                error={errors.name ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
              </div>
              
              <div>
                <FormLabel component="legend" color="secondary"><strong>EMAIL <span className="required">*</span></strong></FormLabel>
                <TextField
                  name="email"
                  id="email"
                  value={formik.values.email}
                  placeholder='Enter your Email'
                  required
                  fullWidth
                  margin="normal"
                  autoFocus
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {
                    formik.touched.email && formik.errors.email ?
                      SpawnSnackBar('Email')
                    :
                    null
                }
              </div>
              
              <div>
                <FormLabel component="legend" color="secondary"><strong>DATE OF BIRTH <span className="required">*</span></strong></FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(params) => 
                    <TextField 
                      name="DoB"
                      id="DoB"
                      value={formik.values.DoB}
                      placeholder='Enter your Date of Birth'
                      margin="normal"
                      required
                      fullWidth
                      onBlur={formik.handleBlur}
                      {...params} />
                    }
                    onChange={formik.handleChange}
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

                <CustomButton title='Submit' type='submit'/>
              </Box>
            </Box>
        </Container>
      );
}

export default withSnackbar(SignIn)
