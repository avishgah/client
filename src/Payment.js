import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import * as type from "./store/actions/actionType";
import { useDispatch, useSelector } from "react-redux";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';


// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Stepper from './Stepper'


// import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';



import './Payment2.css';

// import './AddUser.scss';


// ,, כתובת, , , עיר, , , תאריך לידה, תצלום תעודת זהות, סוג לקוח(לקוח, מנהל), לא פעיל, אישור קריאת תקנון






const Payment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:type.CHANGE_FLAG})

    
}, [])

  const [value, setValue] = React.useState(null);

  const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
    mode: "all"
  });
  const nav = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // let dispatch=useDispatch();

  // step
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  // let currentUser = useSelector(state => state.tr.user);
  // let arr = useSelector(state => state.tr.tasks);

  const submit = (details) => {

    alert("פרטיך נקלטו")
    console.log(details);
    addbike(details);
  }

  const addbike = async (details) => {
    var promise = await axios.post("https://localhost:7075/api/User", details);
    alert(promise.data);
  }
 




  return <>
    {/* <Stepper/> */}  
    
    
    <form id="formLoginR" onSubmit={() => submit()}>
      <Card sx={{ minWidth: 80 }}>
        <CardContent>

          <Typography variant="h5" component="div">
            פרטים אישיים
          </Typography>
          <br></br>


          <TextField fullWidth label="שם" id="fullWidth"    {...register("Name", {})} /><br></br><br></br>


          <TextField fullWidth id="fullWidth" label="ת.ז" variant="outlined"  {...register("ID", { required: true, pattern: /^[0-9]{1,9}/ })} />
          {errors.ID?.type == "pattern" && <div className="error">
            תעודת זהות לא תקינה
          </div>}
          {errors.ID?.type == "required" &&
            <div className="error">
              שדה חובה
            </div>}
          <br></br><br></br>

          <TextField fullWidth label="טלפון" id="fullWidth"    {...register("Phon", {})} /><br></br><br></br>


          <TextField
            fullWidth
            helperText=""
            id="fullWidth"
            label="כתובת"
            {...register("adress", {})}
          /><br></br><br></br>
          <TextField
            fullWidth
            helperText=""
            id="fullWidth"
            label="עיר"
            {...register("town", {})}
          /><br></br><br></br>
          <TextField fullWidth id="fullWidth" label="מייל" variant="outlined"  {...register("email", { required: true, pattern: /^[0-9A-Za-z]{1,}@gmail.com$/ })} />
          {errors.email?.type == "pattern" && <div className="error">
            מייל לא בתבנית הנכונה
          </div>}
          {errors.email?.type == "required" &&
            <div className="error">
              שדה חובה
            </div>}
          <br></br><br></br>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined"  fullWidth id="fullWidth" >
            <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
            <OutlinedInput

              {...register("password", { required: true })}
              fullWidth
              id="fullWidth"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="סיסמא"
            />
            {errors.password?.type == "pattern" &&
              <div className="error">
                סיסמא לא תקינה
              </div>}
            {errors.password?.type == "required" &&
              <div className="error">
                שדה חובה
              </div>}

          </FormControl>

          <LocalizationProvider  fullWidth id="fullWidth"  dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
            </DemoContainer>
          </LocalizationProvider>


        </CardContent>
        <CardActions>
          <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">שמור</Button>
        </CardActions>
      </Card>


    </form >

  </>
}


export default Payment;