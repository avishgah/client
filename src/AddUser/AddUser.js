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


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';



import './AddUser.scss';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// ,, כתובת, , , עיר, , , תאריך לידה, תצלום תעודת זהות, סוג לקוח(לקוח, מנהל), לא פעיל, אישור קריאת תקנון



const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];




const AddUser = () => {
    
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

        console.log(details);
        console.log(value.$D+"/"+value.$M+"/"+value.$y)

        const user = {
            name: details.Name,
            phon: details.Phon,
            password: details.password,
            email: details.email
        }
        axios.post(`http://localhost:8080/User/addUser`, user).then(res => {
        alert("jjj")
         console.log(res.data+";;;;;;");

        if (res.data == null) {
                alert("error")
                return null;

            }


            else {
                //לשגר לסטייט הכללי
                // console.log( res.data.user)

                // dispatchEvent({
                //     type: type.CURRENT_USER,
                //     payload: res.data
                // })

                // nav("/ToDo")
                // nav("/ToDo")

            } 
        })




    }

    return <>



{/* step */}


<Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
        {/* name */}
        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& > :not(style)': { m: 1 },
                }}
            >
                <Stack>
                    <TextField
                        helperText="Please enter your name"
                        id="demo-helper-text-aligned"
                        label="Name"
                        {...register("Name", {})}
                    />
                             <TextField
                        helperText="Please enter your phon"
                        id="demo-helper-text-aligned"
                        label="tz"
                        {...register("tz", {})}
                    />
                    <TextField
                        helperText="Please enter your phon"
                        id="demo-helper-text-aligned"
                        label="Phon"
                        {...register("Phon", {})}
                    />
                       <TextField
                        helperText="Please enter your phon"
                        id="demo-helper-text-aligned"
                        label="Adress"
                        {...register("adress", {})}
                    />
                          <TextField
                        helperText="Please enter your phon"
                        id="demo-helper-text-aligned"
                        label="town"
                        {...register("town", {})}
                    />
                         <TextField
                        helperText="Please enter your phon"
                        id="demo-helper-text-aligned"
                        label="dateBirth"
                        {...register("dateBirth", {})}
                    /> 
                    <TextField
                    helperText="Please enter your phon"
                    id="demo-helper-text-aligned"
                    label="pic"
                    {...register("pic", {})}
                />

                    <br></br>
                    <TextField id="outlined-basic" label="mail" variant="outlined"  {...register("email", { required: true, pattern: /^[0-9A-Za-z]{1,}@gmail.com$/ })} />
                    {errors.email?.type == "pattern" && <div className="error">
                        מייל לא בתבנית הנכונה
                    </div>}
                    {errors.email?.type == "required" &&
                        <div className="error">
                            שדה חובה
                        </div>}
                    <br></br>



                    <TextField id="outlined-basic" label="id" variant="outlined"  {...register("ID", { required: true, pattern: /^[0-9]{1,9}/ })} />
                    {errors.ID?.type == "pattern" && <div className="error">
                        תעודת זהות לא תקינה
                    </div>}
                    {errors.ID?.type == "required" &&
                        <div className="error">
                            שדה חובה
                        </div>}
                    <br></br>

                    {/* calender */}

                    {/* <TextField id="outlined-basic" label="calender" variant="outlined"  {...register("calender", { required: true, pattern: /^[0-9]{1,9}/ })} />
                    {errors.calender?.type == "pattern" && <div className="error">

                    </div>}
                    {errors.calender?.type == "required" &&
                        <div className="error">
                            שדה חובה
                        </div>} */}

                    <br></br>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                        </DemoContainer>
                    </LocalizationProvider>
  

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput

                            {...register("password", { required: true })}

                            id="outlined-adornment-password"
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
                            label="Password"
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
                    <br></br>
                </Stack>
            </Box>
            <input aria-invalid="false" autocomplete="off" id=":r1:" placeholder="DD/MM/YYYY" type="text" inputmode="tel" class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" value="05/04/2023" />

            <Stack direction="row" spacing={2}>

                <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">
                    התחבר
                </Button>

            </Stack>
        </form>
        {/* {document.getElementById("formLogin").style.display = "none"} */}
    </>
}


export default AddUser;