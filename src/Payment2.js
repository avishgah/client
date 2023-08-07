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
import { useDispatch, useSelector } from 'react-redux';


import * as type from "./store/actions/actionType";


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
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: type.CHANGE_FLAG_TRUE })


  }, [])

  // let currentUser = useSelector(state => state.tr.user);
  // let arr = useSelector(state => state.tr.tasks);

  const flag = useSelector(state => state.r.Flag);

  const submit = (details) => {

    console.log(flag)
    // alert("פרטיך נקלטו")
    // console.log(details);
    // addbike(details);
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


          {/* name */}


          <TextField fullWidth label="שם מלא" id="fullWidth" {...register("name", { required: "name is required", })} />
          {errors.name && <p className="errorMsg">{errors.name.message}</p>}
          <br></br><br></br>

          {/* id */}

          <TextField fullWidth id="fullWidth" label="ת.ז" variant="outlined"

            {...register("id", {
              required: "id is required",
              pattern: {
                value: /[1-9]{9}/,
                message: "Invalid id "
              },

            })} />
          {errors.id && <p className="errorMsg">{errors.id.message}</p>}
          <br></br><br></br>

          {/* card */}

          <TextField fullWidth id="fullWidth" label="מספר כרטיס אשראי" variant="outlined"

            InputProps={{
              startAdornment: <><img id="img" src="visa.png" /> <br></br>
                <img id="img" src="israkart.png" />
                <img id="img" src="אמריקאן.png" />
                <img id="img" src="מאסאר.png" />
              </>
            }}
            {...register("card", {
              required: "card is required",
              pattern: {
                value: /[1-9]{16}/,
                message: "Invalid card "
              },
              maxLength: {
                value: 16,
                message: "Password should be until 16 numbers."
              }

            })}
          />
          {errors.card && <p className="errorMsg">{errors.card.message}</p>}
          <br></br><br></br>

          {/* date */}

          <TextField id="outlined-basic" label="תאריך תפוגה MM/YY" variant="outlined"
            {...register("date", {
              required: "date is required",
              pattern: {
                // ???? יכול לקבל הכל בתנאי שיש את התנאי
                value: /^[0-31]-[1-12]$/,
                message: "Invalid date "
              },

            })}
          />
          {errors.date && <p className="errorMsg">{errors.date.message}</p>}


          <TextField id="outlined-basic" label="CVV" variant="outlined"
            {...register("cvv", {
              required: "cvv is required",
              pattern: {
                value: /[1-9]{3}/,
                message: "Invalid cvv "
              },

            })}
          />
          {errors.cvv && <p className="errorMsg">{errors.cvv.message}</p>}

        </CardContent>

        {/* save */}

        <CardActions>
          <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">שמור</Button>
        </CardActions>
      </Card>

    </form >
    {/* {document.getElementById("formLogin").style.display = "none"} */}
  </>
}


export default Payment2;

