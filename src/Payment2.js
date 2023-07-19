import * as React from 'react';
import Box from '@mui/material/Box';

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




import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';



import './Payment2.css';
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

import Stepper from './Stepper'


// import './AddUser.scss';


// ,, כתובת, , , עיר, , , תאריך לידה, תצלום תעודת זהות, סוג לקוח(לקוח, מנהל), לא פעיל, אישור קריאת תקנון



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const Payment2 = () => {

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
  <h1></h1>
    <form id="formLoginR" onSubmit={() => submit()}>
      <Card sx={{ minWidth: 80 }}>
        <CardContent>

          <Typography variant="h5" component="div">
            כרטיס אשראי
          </Typography>
          <br></br>


          <TextField fullWidth label="שם בעל הכרטיס" id="fullWidth"    {...register("Name", {})} /><br></br><br></br>


          <TextField fullWidth id="fullWidth" label="ת.ז" variant="outlined"  {...register("ID", { required: true, pattern: /^[0-9]{1,9}/ })} />
          {errors.ID?.type == "pattern" && <div className="error">
            תעודת זהות לא תקינה
          </div>}
          {errors.ID?.type == "required" &&
            <div className="error">
              שדה חובה
            </div>}
          <br></br><br></br>


          <TextField fullWidth id="fullWidth" label="מספר כרטיס אשראי" variant="outlined"
          
          InputProps={{
            startAdornment:<><img id="img" src="visa.png"/> <br></br>
            <img  id="img" src="israkart.png"/>
            <img  id="img" src="אמריקאן.png"/>
            <img  id="img" src="מאסאר.png"/>

            
            
            
            </> 
          }}

          {...register("Card", { required: true, pattern: /^[0-9]{1,16}/ })} />
          {errors.ID?.type == "pattern" && <div className="error">
            תעודת זהות לא תקינה
          </div>}
          {errors.ID?.type == "required" &&
            <div className="error">
              שדה חובה
            </div>}
            <br></br><br></br>


          <TextField id="outlined-basic" label="תאריך תפוגה \n MM/YY" variant="outlined"  {...register("Card", { required: true, pattern: /^[0-9]{1,16}/ })} />
          {errors.ID?.type == "pattern" && <div className="error">
            תעודת זהות לא תקינה
          </div>}
          {errors.ID?.type == "required" &&
            <div className="error">
              שדה חובה
            </div>}


            <TextField id="outlined-basic" label="CVV" variant="outlined"  {...register("Card", { required: true, pattern: /^[0-9]{1,16}/ })} />
          {errors.ID?.type == "pattern" && <div className="error">
            תעודת זהות לא תקינה
          </div>}
          {errors.ID?.type == "required" &&
            <div className="error">
              שדה חובה
            </div>}
        
        </CardContent>
        <CardActions>
          <Button  variant="contained" endIcon={<SendIcon />} id="addR" type="submit">שמור</Button>
        </CardActions>
      </Card>

    </form >
    {/* {document.getElementById("formLogin").style.display = "none"} */}
  </>
}


export default Payment2;

