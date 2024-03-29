
import react from 'react';
import { Alert, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as type from "../../store/actions/actionType";
import React from "react";
import './Return.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import ReturnCard from './ReturnCard';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ForgetPassword from '../ForgetPassword/ForgetPass';

const Returns = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
    mode: "all"
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [open, setOpen] = React.useState(false);
  const [mail, setMail] = React.useState("");

  const openReset = () => {
    setMail(getValues('Email'))
    setOpen(true)
  }


  const [custo, setCust] = useState(null);
  const listOrderD = useSelector(state => state.r.orders);

  const [orderBike, setOrderBike] = useState([]);

  var listOrder = [];
  var listOrderdeded = [];

  useEffect(() => {
    dispatch({ type: type.CHANGE_FLAG_FALSE })
  }, [])


  //לוקח את כל ההזמנות הפעילות של הלקוח
  const getOrdersByIdCust = async (id) => {
    const x = await axios.get(`https://localhost:7207/api/order/GetOrderByIdCust/${id}`).then(res => {
      console.log("res order", res.data)
      listOrderdeded = res.data;

      setOrderBike(res.data);
      ReturnListBikeByIdOrder();

    }).catch(err => console.log(err))
  }

  //לוקח את כל האופניים של ההזמנות הפעילות
  const ReturnListBikeByIdOrder = async () => {

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
            if (x[i].status == true)
              listOrder.push(x[i]);
          }

        }).catch(err => console.log(err))
      }
    }
    if (listOrder.length == 0) {
      navToStart();
    }
    dispatch({
      type: type.LIST_ORDER,
      payload: listOrder
    })

  }



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
          setCust(res.data)
          //אחרי שהחבר יפה לוקח את כל האופניים של הלקוח
          getOrdersByIdCust(details.id);

        }
        else {
          document.getElementById('alert').style.visibility = "visible";

        }
      }).catch(err => console.log(err))
  }

  const changeHeit = (listOrderD) => {
    console.log(listOrderD);
    if (listOrderD.length <= 3) {
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

  const navToStart = () => {
    const timeout = setTimeout(() => {
      navigate('/introduc'); // Replace '/introduc' with the path you want to navigate to
    }, 5000);
  }


  const submit = async (details) => {
    console.log(details);
    await Connect(details);
  }

  return (<>
    <div style={{ backgroundColor: "#525252" }}>
      <div class="flex-container">

        <div class="flex-item-left" style={{ direction: "rtl", flex: "60%" }}>

          {custo != null && listOrderD != null ?
            <>
              {console.log("res2", listOrderD)}

              <h1 id="l">שלום, {custo.name}</h1>
              {changeHeit(listOrderD)}

              <div id="parent">

                <ul id="ul">

                  {console.log("cust:", custo)}
                  {console.log("order bike 2:", listOrderD.length)}
                  {

                    listOrderD.length != 0 ?

                      <>
                        {listOrderD.map((item, index) => { return <li id="li" key={index}>  <ReturnCard orderAll={orderBike} orders={listOrderD} props={item} cust={custo} index={index + 1} index2={item.id} /></li> })}
                      </> : (<>

                        <p>לא נמצאו אופניים שבשימושך כעת</p>

                      </>)

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


                </FormControl>

                {open ? <ForgetPassword email={mail} setOpen={setOpen} /> : null}

              </Box>
              <Alert id="alert" severity="error">מייל או סיסמא שגויים</Alert>


              <Button variant="contained" color="success" type="submit" style={{ marginRight: "4vw" }}>
                סיום
              </Button>
            </form>}

        </div>
        {
          custo == null ?

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
  </>
  )
}

export default Returns;