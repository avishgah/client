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

// count
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import * as type from "../store/actions/actionType";

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
import Stepper from './steppers/Stepper'


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
import ForgetPassword from './ForgetPassword/ForgetPass';



// import './Payment2.css';

const Connection = () => {

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


    const submit = (details) => {

        axios.get(`https://localhost:7207/api/User/` + details.id, details.password
            // params:
            // {
            //     id:details.id,
            //     password: details.password
            // }
        ).then(res => {

            console.log(res.data + "kkkk");

            if (res.data == null) {
                alert("error")
                return null;

            }


            else {
                //לשגר לסטייט הכללי
                // console.log( res.data.user)

                // dispatch({
                //     type: type.CURRENT_USER,
                //     payload: res.data
                // })

                // nav("/ToDo")
                alert("ברוכה הבאה")

            }
        })

    }
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");
    const openReset = () => {
        setMail(getValues('Email'))
        setOpen(true)
    }
    return <>

        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <Card sx={{ minWidth: 80 }}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        הכנס תעודת זהות וסיסמא
                    </Typography>
                    <br></br>


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
                    </FormControl>
                    <p className="move" onClick={openReset}>שכחתי סיסמא</p>

                    {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}
                    {/* save */}

                </CardContent>
                <CardActions>
                    <Stack direction="row" spacing={2}>


                        <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">
                            התחבר
                        </Button>

                    </Stack>
                </CardActions>
            </Card>

        </form >


    </>
}


export default Connection;