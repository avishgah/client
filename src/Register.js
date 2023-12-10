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
import { Link, Stack } from '@mui/material';

// count
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

import { json, useNavigate } from 'react-router-dom';
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


// import { useHistory } from 'react-router-dom';


import './Payment2.css';

// import './AddUser.scss';


// ,, כתובת, , , עיר, , , תאריך לידה, תצלום תעודת זהות, סוג לקוח(לקוח, מנהל), לא פעיל, אישור קריאת תקנון






const Register = () => {


  const flag = useSelector(state => state.r.Flag_next);
  // count
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  ///

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: type.CHANGE_FLAG_TRUE })
    // someFunctionFromAnotherComponent();

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

  // const submit = (details) => {

  //   console.log(value.$D + "/" + value.$M + "/" + value.$y)
  //   alert("פרטיך נקלטו")
  //   console.log(details);
  //   // addbike(details);
  // }

  useEffect(() => {
    sessionStorage.setItem('myData', JSON.stringify(false))
    // sessionStorage.setItem('myData', JSON.stringify(''))

  }, [])

  const dispatch2 = useDispatch();



  const submit =async (details) => {
    console.log(flag)
    console.log(details);
    //     console.log(value.$D + "/" + value.$M + "/" + value.$y)

    //     // const user = {
    //     //     name: details.name,
    //     //     Phon: details.Phon,
    //     //     Password: details.password,
    //     //     Mail: details.email,

    //     // }\\
    // const user =
    // {
    //   "name": details.name,
    //   "address": details.adress,
    //   "mail": details.email,
    //   "password": details.password,
    //   "toun": details.toun,
    //   "phon": details.phon,
    //   "tz": details.id,
    //   "dateBirth": new Date(),
    //   "pic": " ",
    //   "isManager": false,
    //   "status": true,
    //   "readTerms": true
    // }

    // axios.post(`https://localhost:7207/api/user`, user).then(res => {

    //   console.log(res + "kkkk");

    //   if (res.data == null) {
    //     alert("error")
    //     return null;

    //   }

    //   else {
    //   }
    // }).catch(alert("משתמש קיים"))

    // const order = {
    //   "id": count,
    //   "datePay": "2023-10-23T21:47:49.242Z",
    //   "idStation": 2,
    //   "dateOrder": new Date(),
    //   "code": "string",
    //   // צריכה לשמור אותו בסטייט כללי
    //   "idCust": 3,
    //   "endSum": 0,
    //   "isPay": true,
    //   "custName": "string"

    // }
    // axios.post(`https://localhost:7207/api/Order`, order).then(res => {

    //   console.log(res + "kkkk");
    //   alert("add")
    //   if (res.data == null) {
    //     alert("error")
    //     return null;

    //   }

    // })

    const myObject = { details };
    // const encodedObject = encodeURIComponent(JSON.stringify(myObject));
    // window.location.href = `Stepper?data=${encodedObject}`;

    // document.getElementById("nextB").style.disabled=false;
    await dispatch2({ type: type.CHANGE_FLAG_TRUE2 })


    console.log(flag)
    sessionStorage.setItem('myData', JSON.stringify(true))

    // nav('/Stepper')
    // window.location.reload(); 


  }

  return <>

    <form id="formLoginR" onChange={handleSubmit(submit)}>
      <Card sx={{ minWidth: 80 }}>
        <CardContent>

          <Typography variant="h5" component="div">
            פרטים אישיים
          </Typography>
          <br></br>

          {/* name */}

          <TextField fullWidth label="שם מלא" id="fullWidth" {...register("name", { required: "name is required", })} /><br></br><br></br>
          {errors.name && <p className="errorMsg">{errors.name.message}</p>}

          {/* id */}

          <TextField fullWidth id="fullWidth" label="ת.ז" variant="outlined"

            {...register("id", {
              required: "id is required",
              pattern: {
                value: /^\d{9}$/,
                message: "Invalid id "
              },

            })} />
          {errors.id && <p className="errorMsg">{errors.id.message}</p>}
          <br></br><br></br>

          {/* phon */}

          <TextField fullWidth label="טלפון" id="fullWidth"
            {...register("phon", {
              required: "phon is required",
              pattern: {
                value: /^[1-9]{10}$/,
                message: "Invalid phon "
              },

            })} /><br></br><br></br>
          {errors.phon && <p className="errorMsg">{errors.phon.message}</p>}

          {/* address */}

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
            {...register("toun", {})}
          /><br></br><br></br>

          {/* email */}

          <TextField fullWidth id="fullWidth" label="מייל" variant="outlined"  {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email"
            }
          })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          <br></br><br></br>

          {/* password */}


          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" fullWidth id="fullWidth" >
            <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
            <OutlinedInput

              fullWidth
              id="fullWidth"
              type={showPassword ? 'text' : 'password'}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters."
                }
              })}
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
            {errors.password && <p className="errorMsg">{errors.password.message}</p>}

            {/* date */}

          </FormControl>
          {/* זמן עושה בעיות */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker']} {...register("date", { required: true })}>
              <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
            </DemoContainer>
          </LocalizationProvider> */}

          <br></br><br></br>
          <div><b>מספר אופניים להשכרה </b></div><br></br>
          {/* count */}

          <Box>
            <div>
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>

                <div id="p2">{count}</div>

                <Button
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </div>

          </Box>



          {/* save */}

        </CardContent>
        <CardActions>
          {/* <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">שמור</Button> */}
          <Stack direction="row" spacing={2}>

            {/* <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">
              הבא
            </Button> */}

          </Stack><br></br>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              nav('/Connection')
            }}
          >
            ? משתמש רשום
          </Link>
        </CardActions>
      </Card>


    </form >
  
  </>
}


export default Register;