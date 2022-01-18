import React from 'react';
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


const Post = ({id, title,body}) => {


    return (
        <Container component="main" maxWidth="xs">
            
            <div >
                <div style={{border:'1px solid black',padding:'5px',marginBottom:'5px'}}>
                    <h4> {title} </h4>
                    <p> { body }</p>
                </div>
            </div>

        </Container>
    );

}

export default Post