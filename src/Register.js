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
import { Checkbox, FormControlLabel, Link, Stack, colors } from '@mui/material';

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

import AttachmentIcon from '@mui/icons-material/Attachment';

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

import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Key from '@mui/icons-material/Key';
import { useState } from 'react';



const Register = ({ setIsFinish }) => {


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

  const [value, setValue] = React.useState('');

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

  function validateForm() {
    var checkbox = document.getElementById('myCheckbox');

    if (!checkbox.checked) {
      alert('Please agree to the terms and conditions');
      return false; // מניעת השליחה של הטופס
    }
    return true; // אישור שליחת הטופס כאשר ה-checkbox נבחר
  }

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



  const submit = async (details) => {
    console.log(flag)
    console.log(details);
    // console.log(value.$D + "/" + value.$M + "/" + value.$y)

    // const user = {
    //     name: details.name,
    //     Phon: details.Phon,
    //     Password: details.password,
    //     Mail: details.email,

    // }\\
    const user =
    {
      "name": details.name,
      "address": details.adress,
      "mail": details.email,
      "password": details.password,
      "toun": details.toun,
      "phon": details.phon,
      "tz": details.id,
      "dateBirth": new Date(),
      "pic": " ",
      "isManager": false,
      "status": true,
      "readTerms": true
    }

    console.log(user)
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

    setIsFinish(true);

    // nav('/Stepper')
    // window.location.reload(); 


  }

  const isDateValid = () => {
    alert("lll")
    const date1 = new Date(value.$y, value.$M, value.$D);
    const date2 = new Date();
    // console.log(date1);
    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // if (diffDays / 365 >= 16) {
    //   console.log("תקין")
    // }
    // console.log(diffDays + " days");
    const years = Math.abs(date2.getFullYear() - date1.getFullYear());
    if (years > 16) {
      console.log("heyy1")
      return true;
    } if (years == 16 && date1.getMonth() > date2.getMonth() || years == 16 && date1.getMonth() == date2.getMonth() && date1.getDate() <= date2.getDate()) {
      console.log("heyy2")
      return true;
    }
    return false;
  }
  const [valuePass, setValuePass] = React.useState('');
  const minLength = 12;


  var l = '';
  const func = () => {
    l = document.getElementById("k").value;
    console.log(l)
  }

  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return <>

    <form id="formLoginR" style={{ width: "85vw", mr: "15vw", direction: "rtl" }} onSubmit={handleSubmit(submit)}>
      <Card sx={{ minWidth: 80 }}>
        <CardContent>

          <Typography variant="h5" component="div">
            פרטים אישיים
          </Typography>
          <br></br>

          {/* name */}

          <label>  שם מלא <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>

          <TextField fullWidth id="fullWidth"
            style={errors.name ? { border: "red solid 1px", borderRadius: "5px" } : null}
            {...register("name", { required: "name is required", })} /><br></br><br></br>

          {/* id */}
          <label>  תעודת זהות<span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField fullWidth id="fullWidth" variant="outlined"
            style={errors.id ? { border: "red solid 1px", borderRadius: "5px" } : null}
            {...register("id", {
              required: "id is required",
              pattern: {
                value: /^\d{9}$/,
                message: "Invalid id "
              },

            })} />
          <br></br><br></br>

          {/* phon */}

          <label>טלפון <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField fullWidth id="fullWidth"
                style={errors.phon ? { border: "red solid 1px", borderRadius: "5px" } : null}

            {...register("phon", {
              required: "phon is required",
              pattern: {
                value: /^[1-9]{10}$/,
                message: "Invalid phon "
              },

            })} /><br></br><br></br>

          <label> עיר<span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField
                  style={errors.toun ? { border: "red solid 1px", borderRadius: "5px" } : null}
            fullWidth
            helperText=""
            id="fullWidth"

            {...register("toun", { required: "toun is required" })}
          />
          <br></br><br></br>

          {/* address */}
          <label> כתובת <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField
                  style={errors.adress ? { border: "red solid 1px", borderRadius: "5px" } : null}
            fullWidth
            helperText=""
            id="fullWidth"

            {...register("adress", { required: "adress is required" })}
          />
          <br></br><br></br>


          {/* email */}
          <label> מייל<span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField fullWidth id="fullWidth" variant="outlined"
                  style={errors.email ? { border: "red solid 1px", borderRadius: "5px" } : null}
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email"
            }
          })}
          />
          <br></br><br></br>

          {/* password */}
          <label>צור סיסמא <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <Stack
            spacing={0.5}
            sx={{
              '--hue': Math.min(value.length * 10, 120),
            }}
          >
            <Input
                    style={errors.password ? { border: "red solid 1px", borderRadius: "5px" } : null}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters."
                }
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Type in here…"
              startDecorator={<InputAdornment position="end">
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
              value={value}
              onChange={(event) => setValue(event.target.value)}

            />
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((value.length * 100) / minLength, 100)}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              sx={{
                bgcolor: 'background.level3',
                color: 'hsl(var(--hue) 80% 40%)',
              }}
            />

            <Typography
              level="body-xs"
              sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
              {value.length < 3 && 'Very weak'}
              {value.length >= 3 && value.length < 6 && 'Weak'}
              {value.length >= 6 && value.length < 10 && 'Strong'}
              {value.length >= 10 && 'Very strong'}
            </Typography>
          </Stack>
          {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" fullWidth id="fullWidth" > */}
          {/* <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
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
            {errors.password && <p className="errorMsg">{errors.password.message}</p>} */}

          {/* date */}
          {/* <label>  תאריך לידה <span style={{ color: 'red' }}>
              * 
            </span></label> */}
          {/* </FormControl> */}
          {/* זמן עושה בעיות */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker']} {...register("date", {
              validate: {
                validDate: () => isDateValid()
              }
            })} >
              <DatePicker value={value} onChange={(newValue) => { setValue(newValue) }} />
            </DemoContainer>
          </LocalizationProvider>
          {
            console.log(errors)
          } */}
          <br></br><br></br>
          {/* <div><b>מספר אופניים להשכרה </b></div><br></br>

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

          </Box> */}


          {/* save  */}
          <label id="ll">תצלום תעודת זהות / דרכון</label>
          <br></br>
          <div id="div-pic" direction="rtl"  >

            <Button
              endIcon={<AttachmentIcon />}
              variant="contained"
              component="label"
              id="pid-button"
            >
              <input
                // name="ll"
                id="k"
                type="file"
                onChange={func}

              // hidden
              />
            </Button>
            <p></p>
            <input style={{ color: "red" }} type="checkbox" id="myCheckbox" checked={checked}
              onClick={handleChange}
              {...register("chek", {
                required: true,
              })}
            ></input>
            <a href='/page.txt' download>תקנון שימוש</a>
            {errors.chek && <p className="errorMsg">חובה לאשר</p>}


          </div>



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