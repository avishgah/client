
import react from 'react';
import { Alert, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as type from "../store/actions/actionType";
import React from "react";
import './Return.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import ReturnCard from './ReturnCard';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Returns = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [listOrde, setList] = React.useState([]);

  useEffect(() => {
    dispatch({ type: type.CHANGE_FLAG_FALSE })


  }, [])


  const [custo, setCust] = useState(null);

  const [hiddenStyle, setHiddenStyle] = useState({ display: 'block' });

  const [orderBike, setOrderBike] = useState([]);
  const [orderBikeTrue, setOrderBikeTrue] = useState([]);
  const [orderBikeTrue2, setOrderBikeTrue2] = useState([]);


  var cust = null;
  var count = null;
  var listOrder = [];
  var listOrderdeded = [];
  const getOrdersByIdCust = async (id) => {
    const x = await axios.get(`https://localhost:7207/api/order/GetOrderByIdCust/${id}`).then(res => {
      console.log("res order", res.data)
      listOrderdeded = res.data;
      setOrderBike(res.data);
    }).catch(err => console.log(err))
  }

  const listOrderD = useSelector(state => state.r.orders);

  var arr = [];
  // מקבלת את כל ההזמנות של קוד הזמנה מסוים
  const ReturnListBikeByIdOrder = async () => {
    console.log("enter reture")
    let orders = listOrderdeded;
    console.log(orders);

    // console.log("hi")
    for (var i = 0; i < orders.length; i++) {
      //   console.log(i)
      if (orders[i].isPay == false) {

        console.log("order axios", orders[i])

        const g = await axios.get(`https://localhost:7207/api/orderBike/ReturnListBikeByIdOrder/${orders[i].id}`).then(res => {

          console.log("res list bikes axios", res.data)
          const x = res.data;
          for (var i = 0; i < x.length; i++) {
            listOrder.push(x[i]);
            // console.log(x[i])
          }

        }).catch(err => console.log(err))

      }
    }

    dispatch({
      type: type.LIST_ORDER,
      payload: listOrder
    })

    setOrderBikeTrue2(listOrder);
    // console.log(res.data);

  }



  const Connect = async (details) => {

    let flag = 0;
    console.log("hi")
    for (var i = 0; i < users.length; i++) {
      if (users[i].tz == details.id && users[i].password == details.password) {
        console.log("connect")
        flag = 1;
        alert(users[i].name);
        dispatch({
          type: type.CURRENT_USER,
          payload: users[i]
        })
        setCust(users[i])

        await getOrdersByIdCust(details.id);

        await ReturnListBikeByIdOrder();

        // await getNumBike()
      }
    }
    if (flag == 0) {
      document.getElementById('alert').style.visibility = "visible";
    }



    //   const x = await axios.get(`https://localhost:7207/api/user/GetUserByTzAndPass/${details.id}/${details.password}`).then(res => {

    //   if(res.data!=null){
    //      console.log(res.data)
    //     console.log(res.data)
    //     cust = res.data;
    //     setCust(res.data)
    //   }
    //   else{
    //     // console.log("שם משתמש או סיסמא שגויים")
    //   }

    //   }).catch(err=>console.log("שם משתמש וסיסמא שגויים"))

  }

  const [users, setUsers] = React.useState([])

  useEffect(() => {
    axios.get('https://localhost:7207/api/User')
      .then(res => {
        console.log(res.data)
        setUsers(res.data)
        // nav('/NavB')
      }).catch(err => console.log(err))
  }, [])

  const submit = async (details) => {
    console.log(details);

    console.log(details);
    await Connect(details);
    // nav('/Start')
  }

  const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
    mode: "all"
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (<>

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



    {/* {document.getElementById("formLoginRO").style.visibility="hidden"} */}
    {listOrderD != null && custo != null ? <>
      {console.log("res2", listOrderD)}
      {document.getElementById("formLoginRO").style.display = 'none'}

      <h1 id="l">שלום, {custo.name}</h1><br></br><br></br>

      <div id="parent">

        {/* {
        orderBikeTrue != null?
        setHiddenStyle({display: 'none'})
        
        : null}  */}
        <ul id="ul">

          {console.log("cust:", custo)}
          {console.log("order bike 2:", listOrderD)}

          {listOrderD.map((item, index) => { return <li id="li" key={index}>  <ReturnCard orderAll={orderBike}orders={listOrderD} props={item} cust={custo} index={index + 1} index2={item.id} /></li> })}

        </ul>

      </div>
    </> : null}

  </>
  )
}

export default Returns;