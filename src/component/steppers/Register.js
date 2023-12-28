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

import * as type from "../../store/actions/actionType";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
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

  const [value, setValue] = React.useState('');

  const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
    mode: "all"
  });
  const nav = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showDate, setShoDate] = React.useState(false);

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

  const israeliCities = [
    "ירושלים", "תל אביב-יפו", "חיפה", "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה", "באר שבע", "בני ברק", "חולון", "רמת גן", "בית שמש", "אשקלון", "רחובות",
    "בת ים", "הרצליה", "חדרה", "כפר סבא", "מודיעין-מכבים-עילית", "רעננה", "נצרת", "רמלה", "רהט", "ראש העין", "הוד השרון", "ביתר עילית", "נהריה", "גבעתיים",
    "קריית גת", "קריית אתא", "עפולה", "יבנה", "אילת", "נס ציונה", "עכו", "אלעד", "רמת השרון", "טבריה", "צפת"
  ]

  function validateForm() {
    var checkbox = document.getElementById('myCheckbox');

    if (!checkbox.checked) {
      alert('Please agree to the terms and conditions');
      return false; // מניעת השליחה של הטופס
    }
    return true; // אישור שליחת הטופס כאשר ה-checkbox נבחר
  }
  let lastUser = null;
  let curentStation = null;
  let countB = null;
  const { currentUser } = useSelector(state => {
    return {
      currentUser: state.r.user
    }
  }, shallowEqual);
  const currentStation = useSelector(state => state.r.station);
  const countBike = useSelector(state => state.r.count);
  const [listUsers, setlistUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7207/api/User')
      .then(res => {
        console.log(res.data)
        setlistUsers(res.data)
        console.log(currentStation);
        curentStation=currentStation;
        countB=countBike

        // nav('/NavB')
        getLastUserAdd();
      }).catch(err => console.log(err))
  }, [])
  useEffect(() => { }, [currentUser])

  const dispatch2 = useDispatch();
  let flagIsExist = false;
  const IsExistUser = async (details) => {
    console.log("hii")
    const listUser = listUsers;

    listUser.forEach(user => {
      if (user.tz == details.id || user.mail == details.email) {
        console.log("שם משתמש קיים");
        flagIsExist = true;
      }

    });
    return flagIsExist;

  }
  const AddUser = async (details) => {

    console.log("helow fron add")
    console.log(details)
    const x = await axios.post(`https://localhost:7207/api/user`, details).then(res => {
      console.log(res.data + "add");

      if (res.data == null) {
        alert("error")
        return null;

      }
    }).catch(error => {
      console.log("משתמש קיים");
      console.error(error)
    })
  }

  const getLastUserAdd = async () => {
    const v = await axios.get('https://localhost:7207/api/User')
      .then(res => {
        console.log(res.data[res.data.length - 1], "last")
        lastUser = res.data[res.data.length - 1];
        dispatch({
          type: type.CURRENT_USER,
          payload: res.data[res.data.length - 1]
        })

      }).catch(err => console.log(err))
  }

  const AddOrders = async () => {

    console.log(countB)
    // console.log(user, "llll")

    const IsPay = false;
    const s = await axios.post(`https://localhost:7207/api/Order`, {
      countB, IsPay, id: 0, datePay: null, IdCust: lastUser?.id,
      idStation: curentStation?.id,
      dateOrder: new Date(), EndSum: 0
    }).then(res => {

      console.log(res)
      console.log(res.data)

    })

  }

  const submit = async (details) => {
    console.log(flag)
    console.log(details);

    const andIsE = await IsExistUser(details);

    console.log(andIsE);

    if (andIsE) {
      alert("משתמש קיים")
    }
    else {
      await AddUser(details);
      await getLastUserAdd();
      await AddOrders();
    }
  }

  const isDateValid = () => {
    // alert("lll")
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

  const [valueDate, setValueDate] = React.useState('');

  const minLength = 12;


  var l = '';
  const func = () => {
    l = document.getElementById("k").value;
    console.log(l)
  }
  const [selectPoin, setSlectedPoint] = useState('ירושלים')


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
            defaultValue={currentUser == null ? '' : currentUser.name}
            style={errors.name ? { border: "red solid 1px", borderRadius: "5px" } : null}
            {...register("Name", { required: "name is required", })} /><br></br><br></br>

          {/* id */}
          <label>  תעודת זהות<span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField fullWidth id="fullWidth"
            style={errors.name ? { border: "red solid 1px", borderRadius: "5px" } : null}

            defaultValue={currentUser == null ? '' : currentUser.id}
            {...register("Tz", {
              required: "id is required",
              pattern: {
                value: /^\d{9}$/,
                message: "Invalid id "
              },

            })} />

          {/* phon */}

          <label>טלפון <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField fullWidth id="fullWidth"
            defaultValue={currentUser == null ? '' : currentUser.phon}

            style={errors.phon ? { border: "red solid 1px", borderRadius: "5px" } : null}

            {...register("Phon", {
              required: "phon is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phon "
              },

            })} /><br></br><br></br>

          <label> עיר<span style={{ color: 'red' }}>

            * {/* אייקון של כוכב */}
          </span></label><br></br>

          <select style={{ padding: "10px", width: "100%" }} onChange={({ target }) => setSlectedPoint(target.value)}>
            {israeliCities.map(marker => (
              <option key={marker} value={marker} selected={selectPoin === marker}>
                {marker}
              </option>
            ))}
          </select>

          {/* <TextField
            style={errors.toun ? { border: "red solid 1px", borderRadius: "5px" } : null}
            defaultValue={currentUser == null ? '' : currentUser.toun}

            fullWidth
            helperText=""
            id="fullWidth"

            {...register("toun", { required: "toun is required" })}
          /> */}
          <br></br><br></br>

          {/* address */}
          <label> כתובת <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField
            style={errors.adress ? { border: "red solid 1px", borderRadius: "5px" } : null}
            defaultValue={currentUser == null ? '' : currentUser.adress}

            fullWidth
            helperText=""
            id="fullWidth"

            {...register("Address", { required: "adress is required" })}
          />
          <br></br><br></br>


          {/* email */}
          <label> מייל<span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>
          <TextField fullWidth id="fullWidth" variant="outlined"
            defaultValue={currentUser == null ? '' : currentUser.email}

            style={errors.email ? { border: "red solid 1px", borderRadius: "5px" } : null}
            {...register("Mail", {
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
          </span></label>
          <Stack
            spacing={0.5}
            sx={{
              '--hue': Math.min(value.length * 10, 120),
            }}
          >
            <Input
              style={errors.password ? { border: "red solid 1px", borderRadius: "5px" } : null}


              {...register("Password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters."
                }
              })}
              defaultValue={currentUser == null ? '' : currentUser.password}

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


          {/* date */}
          {/* <label>  תאריך לידה <span style={{ color: 'red' }}>
              * 
            </span></label> */}
          {/* </FormControl> */}
          {/* זמן עושה בעיות */}
          <label>תאריך לידה <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
          </span></label>

          {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer fullWidth components={['DatePicker']} {...register("date", {
              validate: {
                validDate: () => isDateValid(),
                message: "in valid date"
              }
            })} >
              <DatePicker value={valueDate} onChange={(newValue) => { setValueDate(newValue) }} />
            </DemoContainer>
          </LocalizationProvider> */}


          <br></br><br></br>

          {/* <input
            type='date'
            {...register("test", {
              validate: (value, formValues) => isDateValid() == true ? setShoDate(true) : setShoDate(false),
              message: showDate ? "good" : "bad"
            })}
          />
          {errors.test == true && <p className="errorMsg">{errors.test.message}</p>} */}

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
              {...register("ReadTerms", {
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


        </CardActions>
        <Stack direction="row" spacing={5} marginRight="24vw">
          <Link
            style={{ marginLeft: "20px", direction: "rtl" }}

            component="button"
            variant="body2"
            onClick={() => {
              nav('/Connection')
            }}
          >
            משתמש רשום?
          </Link>
          <Button color="inherit" style={{ fontSize: "15px", fontWeight: "bold", backgroundColor: "#1976d2", color: "white", width: "125px" }} type="submit" textAlign="right">
            הבא
          </Button>

        </Stack><br></br>
      </Card>


    </form >

  </>
}


export default Register;