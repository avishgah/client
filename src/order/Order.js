import { Alert, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import './order.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import OrderCard from "./OrderCard";
import { useState } from "react";
import { useRef } from "react";
import { createContext, useContext } from 'react';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Order = () => {
    const nav = useNavigate();
    // dataRef="kkk"

    const [open, setOpen] = React.useState(false);
    // const [count, setCount] = React.useState(10);


    const [custo, setCust] = useState(null);
    const [orderBike, setOrderBike] = useState(null);


    const [listOrde, setList] = React.useState([]);



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenAndCount = () => {
        setOpen(true);
        count = Math.max(count - 1, 0)
    };

    const handleClose = () => {
        setOpen(false);
    };

    var cust = null;
    var count = null;
    var listOrder = [];
    const GetOrderById = async (id) => {

        console.log("ll")
        const x = await axios.get(`https://localhost:7207/api/order/GetOrderByIdCustNotDone/${id}`).then(res => {
            console.log(res.data)
            listOrder = res.data;
            count = res.data.length;


            setList(res.data)
            // handleClickOpen();
        }).catch(error => {
            // Handle error
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error:', error.message);
            }
            console.log(error.config);
        });
    }
    const [textFieldValue, setTextFieldValue] = useState(''); // יצירת state עבור ערך התיבה
    const [ans, setAnc] = useState(false); // יצירת state עבור ערך התיבה
    // פונקציה המטפלת בשינויים בתוך התיבה ומעדכנת את הערך ב-state
    const handleTextFieldChange = (event) => {
        setTextFieldValue(event); // עדכון של ערך התיבה
        console.log(event)
        setAnc(is_israeli_id_number(textFieldValue))
        console.log(ans)
    };
    // const getUserByTz = async (id) => {
    //     const y = await axios.get(`https://localhost:7207/api/user/GetUserByTz/${id}`).then(res => {
    //     console.log(res.data)
    //     cust = res.data;
    //     setCust(res.data)
    //     }).catch(err => console.log("user is not defind"))
    // }

    const getNumBike = async (id) => {
        console.log(id)
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7207/api/orderBike/GetOrderByIdOrder/${id}`).then(res => {
                console.log(res.data)

                setOrderBike(res.data)


                // Simulating an asynchronous operation
                setTimeout(() => {
                    const value = res.data; // Set your desired value here
                    resolve(value); // Resolve the Promise with a specific value

                })
            }).catch(err => console.log(err))
        }, 1000);
    }

    const Connect = async (details) => {

        const x =await axios.get(`https://localhost:7207/api/user/GetUserByTzAndPass/${details.id}/${details.password}`).then(res => {
            console.log(res.data)
            console.log(res.data)
            cust = res.data;
            setCust(res.data)
        }).catch(error => {
            // Handle error
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error:', error.message);
            }
            console.log(error.config);
        });

    }
    const submit = async (details) => {

        console.log(details);

        await Connect(details)
        await GetOrderById(details.id);
        // await getUserByTz(details.id);

        console.log(cust);
        console.log(count);
        console.log(listOrder);

    }

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    function is_israeli_id_number(id) {
        id = String(id).trim();
        if (id.length > 9 || isNaN(id)) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            // console.log(counter + (step > 9 ? step - 9 : step))

            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;

    }
    return <>

        <div class="flex-container">

            <div class="flex-item-left" style={{ direction: "rtl", flex: "60%" }}>

            <form id="formLoginRO" onSubmit={handleSubmit(submit)}>
          <h2> הקש תעודת זהות וסיסמא</h2>
          <Box component="form" noValidate autoComplete="off">

            <label>תעודת זהות</label>
            <br></br>
            <TextField id="outlined-basic" className="tz-filed" label="תעודת זהות" variant="outlined"
              style={errors.id ? { border: "red solid 1px", borderRadius: "5px" } : null}
              {...register("id", {
                required: "id is required",
                pattern: {
                  value: /^\d{9}$/,
                  message: "Invalid id "
                },

              })} />
            {/* <TextField
                value={textFieldValue} // ערך ה-input קשור ל-state של הרכיב
                // onChange={(e) => handleTextFieldChange(e)}
                {...register("id", {
                    required: "id is required",
                    // validate:{
                    //     positive: (e)=>handleTextFieldChange(e) === true || 'should be greater than 0',
                    // }
                    // pattern: {
                    //     value: /^\d{9}$/,
                    //     message: "Invalid id "
                    // },
                })}
            /> */}
            {/* {errors.id && <p className="errorMsg">{errors.id.message}</p>} */}
            <br></br>

            {/* password */}

            <label>סיסמא</label>
            <br></br>


            <FormControl sx={{ m: 1, width: '25ch' }} id="outlined-basic" className="tz-filed" label="id" variant="outlined"      >
              <InputLabel htmlFor="standard-adornment-password"></InputLabel>
              <Input
                style={errors.id ? { border: "red solid 1px", borderRadius: "5px" } : null}
                id="standard-adornment-password"
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
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility
                      />}
                    </IconButton>
                  </InputAdornment>
                }
                label="kkk"
              />


            </FormControl>

          </Box>
          <Alert id="alert" severity="error">מייל או סיסמא שגויים</Alert>


          <Button variant="contained" color="success" type="submit" style={{ marginRight: "4vw" }}>
            סיום
          </Button>
        </form>

            </div>

            <div class="flex-item-right" style={{ flex: "40%" }} >
                <Box
                    component="img"
                    sx={{
                        marginTop: "30%",
                        marginLeft: "20%",
                        height: 300,
                        display: 'block',
                        // maxWidth: 50,
                        overflow: 'hidden',
                        width: '400px',
                    }}
                    // src={logo}
                    src='/logo2.png'
                />
                <div id="helpper" >
                    ? עזרה
                </div>


            </div>
        </div>




        {custo != null ? <>

            {document.getElementById("formLoginRO").style.display = 'none'}
            {/* {document.getElementById("formLoginRO").style.visibility="hidden"} */}
            <h1 id="l">שלום, {custo.name}</h1><br></br><br></br>

            <div id="parent">
                <ul id="ul">

                    {console.log(listOrde)}
                    {console.log(custo)}
                    {console.log(orderBike)}
                    {listOrde.map((item, index) => { return <li id="li" key={index}>  <OrderCard order={getNumBike} props={item} cust={custo} index={index + 1} index2={item.id} orderBike={orderBike} /></li> })}

                </ul>

            </div>
        </> : null}


    </>
}


export default Order;