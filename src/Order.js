import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";


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
        const x = await axios.get(`https://localhost:7207/api/order/GetOrderById/${id}`).then(res => {
            console.log(res.data)
            listOrder = res.data;
            count = res.data.length;

            setList(res.data)
            // handleClickOpen();
        })
    }

    const getUserByTz = async (id) => {
        const y = await axios.get(`https://localhost:7207/api/user/GetUserByTz/${id}`).then(res => {
            console.log(res.data)
            cust = res.data;
            setCust(res.data)


        })
    }

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
            })
        }, 1000);

    }
    const submit = async (details) => {

        console.log(details);

        await GetOrderById(details.id);
        await getUserByTz(details.id);

        console.log(cust);
        console.log(count);
        console.log(listOrder);

    }

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });


    return <>
        <div>
            {/* {
                listOrder.map((item, index) => { return <OrderCard key={index} cust={cust} props={item} /> })
            } */}
            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {" לרשותך "}
                    {count}
                    {"אפניים בהזמנה "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ,תרצה לשחרר אוניים נוספות ? לחיצה על אישור תשחרר אופניים נוספות
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClickOpenAndCount}>שיחרור</Button>
                    <Button onClick={handleClose} autoFocus> ביטול </Button>
                </DialogActions>
            </Dialog> */}
        </div>

        <h1>הקש תעודת זהות</h1>
        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <Box component="form" noValidate autoComplete="off">
                <TextField id="outlined-basic" className="tz-filed" label="id" variant="outlined"        {...register("id", {
                    required: "id is required",
                    pattern: {
                        value: /^[1-9]{9}$/,
                        message: "Invalid id "
                    },

                })} />
                {errors.id && <p className="errorMsg">{errors.id.message}</p>}
                <br></br><br></br>

            </Box><br></br><br></br>

            <Stack direction="row" spacing={2}>

                <Button variant="contained" id="addRE" type="submit">
                    סיום
                </Button>


            </Stack>



        </form>

        <div><ul>
            {
                custo != null ? <>

                    <p>שלום, {custo.name}</p>
                    {console.log(listOrde)}
                    {console.log(custo)}
                    {console.log(orderBike)}
                    {listOrde.map((item, index) => { return <li key={index}>  <OrderCard order={getNumBike} props={item} cust={custo} index={index + 1} index2={item.id} orderBike={orderBike} /></li> })}



                </>
                    : null

            }
        </ul>

        </div>


    </>
}


export default Order;