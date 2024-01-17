import { Alert, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './order.css'

import axios from "axios";
import OrderCard from "./OrderCard";

import { ConstructionOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import * as type from "../../store/actions/actionType";
import ForgetPassword from "../ForgetPassword/ForgetPass";


const Order = () => {

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const [order, setorder] = React.useState([])

    const station = useSelector(state => state.r.station);
    const cust = useSelector(state => state.r.user);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => { event.preventDefault(); };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = React.useState("");

    // איפוס סיסמא
    const openReset = () => {
        setMail(getValues('Email'))
        setOpen(true)
    }

    useEffect(() => {
        if (cust && station) {
            GetOrderById()
        }
    }, [cust, station])

    // לוקח את כל ההזמנות לפי הקוד לקוח וקוד תחנה
    const GetOrderById = () => {
        axios.get(`https://localhost:7207/api/order/GetOrderByIdCustNotDone/${cust.id}/${station.id}`).then(res => {
            console.log(res.data, "list order")

            setorder(res.data);
            // setList(listOrderByIdStation)
            if (res.data.length == 0) {
                console.log("hii")
                navToStart()
            }
            else {
                changeHeit(order);
            }
            console.log(res.data, "aftaer map")
        }).catch(error => {
            console.log(error.config);
        });
    }


    // התחברות
    const Connect = async (details) => {
        axios.post('https://localhost:7207/api/User/Connect', details)
            .then(res => {
                console.log(res.data)

                if (res.data != '') {

                    alert(res.data.name);

                    dispatch({
                        type: type.CURRENT_USER,
                        payload: res.data
                    })
                }
                else {
                    document.getElementById('alert').style.visibility = "visible";
                }
            }).catch(err => console.log(err))
    }

    // ספירה לאחור
    const navToStart = () => {
        const timeout = setTimeout(() => {
            navigate('/introduc'); // Replace '/introduc' with the path you want to navigate to
            dispatch({
                type: type.LOG_OUT
            })
        }, 5000);
    }



    // עיצוב גובה צג שמאל לפי כמות הזמנות
    const changeHeit = (listOrderD) => {
        console.log(listOrderD);
        if (listOrderD.length <= 3) {
            let elements = document.getElementsByClassName("flex-item-left");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.height = "43vw";
            }
            // Do nothing or perform an action if the length is less than or equal to 3
        } else if (listOrderD.length <= 6) {
            // Set the height of elements with class "flex-item-left" to 500vw
            let elements = document.getElementsByClassName("flex-item-left");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.height = "70vw";
            }
        } else if (listOrderD.length <= 9) {
            // Set the height of elements with class "flex-item-left" to 300vw
            let elements = document.getElementsByClassName("flex-item-left");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.height = "200vw";
            }
        } else {
            // Do nothing or perform an action if the length is greater than 9
        }
    }

    const submit = (details) => {
        console.log(details);
        Connect(details);
    }



    return (<>
        <div style={{ backgroundColor: "#525252" }}>

            <div class="flex-container">

                <div class="flex-item-left" style={{ direction: "rtl", flex: "60%" }}>

                    {cust != null && order != null ?
                        <>
                            <h1 id="l">שלום, {cust.name}</h1>

                            <div id="parent">
                                <ul id="ul">

                                    {
                                        order.length != 0 ?

                                            <>
                                                {order.map((item, index) => <li className="li" key={index}>  <OrderCard setOrder={GetOrderById} cust={cust} order={item} index={index + 1} /></li>)}
                                            </> :

                                            <>
                                                <p id="pOrder">אין לך הזמנות בתחנה זו.</p>
                                            </>

                                    }


                                </ul>

                            </div>
                        </> :
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


                                </FormControl>  </Box>
                            <br></br>

                            {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}


                            <Alert id="alert" severity="error">מייל או סיסמא שגויים</Alert>

                            <Button variant="contained" color="success" type="submit" style={{ marginRight: "4vw" }}>
                                סיום
                            </Button>

                        </form>}

                </div>

                {/* עיצוב צד שמאל */}
                {
                    cust == null ?

                        <div class="flex-item-right" style={{ flex: "40%" }} id="show">
                            <Box
                                component="img"
                                sx={{
                                    marginTop: "30%",
                                    marginLeft: "10%",
                                    height: 300,
                                    display: 'block',
                                    // maxWidth: 50,
                                    overflow: 'hidden',
                                    width: '400px',
                                }}
                                // src={logo}
                                src='/logo2.png'
                            />
                            <div className="helpper" onClick={openReset} >
                                שכחתי סיסמא
                            </div>
                            <div className="helpper" onClick={() => navigate('/introduc')} >
                                יציאה
                            </div>


                        </div>
                        : null
                }
            </div>
        </div>
    </>)

}

export default Order;