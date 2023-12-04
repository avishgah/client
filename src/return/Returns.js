
import react from 'react';
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as type from "../store/actions/actionType";
import React from "react";
import './Return.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import ReturnCard from './ReturnCard';

const Returns = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [listOrde, setList] = React.useState([]);

  useEffect(() => {
    dispatch({ type: type.CHANGE_FLAG_FALSE })


  }, [])


  const [custo, setCust] = useState(null);

  const [hiddenStyle, setHiddenStyle] = useState({ display: 'block'});

  const [orderBike, setOrderBike] = useState(null);
  const [orderBikeTrue, setOrderBikeTrue] = useState([]);


  var cust = null;
  var count = null;
  var listOrder = [];
  const GetOrderByIdCustNotDone = async (id) => {
    const x = await axios.get(`https://localhost:7207/api/order/GetOrderByIdCustNotDone/${id}`).then(res => {

      console.log(res.data)
      // listOrder = res.data;
      // count = res.data.length;
      setList(res.data)
      // handleClickOpen();
      getNumBike(res.data);
    }).catch(err => console.log(err))
  }


  var arr = [];
  // מקבלת את כל ההזמנות של קוד הזמנה מסוים
  const getNumBike = async (id) => {
    console.log(id)
    if (id != null) {
      for (var i = 0; i < id.length; i++) {
        console.log(id[i].id);
        let x = id[i].id
        const k = await axios.get(`https://localhost:7207/api/orderBike/GetOrderByIdOrder/${x}`).then(res => {
          console.log("res", res.data)
          let y = res.data;
          if (y != null) {
            for (var i = 0; i < y.length; i++) {
              if (y[i].dateStart != null) {
                arr.push(y[i]);
              }
            }
            console.log(arr)
            setOrderBikeTrue(arr);
          }

        }).catch(err => console.log(err))
      }
    }

  }


  const getUserByTz = async (id) => {
    const y = await axios.get(`https://localhost:7207/api/user/GetUserByTz/${id}`).then(res => {
      console.log(res.data)
      // cust = res.data;
      setCust(res.data)

    }).catch(err => console.log("user is not defind"))
  }


  const submit = async (details) => {
    console.log(details);

    console.log(details);

    // רשימת ההזמנות של אותו משתמש
    await GetOrderByIdCustNotDone(details.id);
    // מקבלת את כל פרטי המשתמש
    await getUserByTz(details.id);

    // await getOrderBikeTrue();
    await getNumBike()
    // console.log("all list of user :", listOrder)
    // console.log("customer:", cust)
    // console.log("the order that true", arr)
    // nav('/Start')
  }

  const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
    mode: "all"
  });


  return (<>


    <form id="formLoginRO" onSubmit={handleSubmit(submit)} style={hiddenStyle}>
      <h1>הקש תעודת זהות</h1>
      <Box component="form" noValidate autoComplete="off">
        <TextField id="outlined-basic" className="tz-filed" label="id" variant="outlined" {...register("id", {
          required: "id is required",
          pattern: {
            value: /[1-9]{9}/,
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

    {/* {document.getElementById("formLoginRO").style.visibility="hidden"} */}
    {orderBikeTrue != null && custo != null ? <>

      {document.getElementById("formLoginRO").style.display='none'}

      <h1 id="l">שלום, {custo.name}</h1><br></br><br></br>

      <div id="parent">
        
        {/* {
        orderBikeTrue != null?
        setHiddenStyle({display: 'none'})
        
        : null}  */}
        <ul id="ul">

          {console.log("cust:", custo)}
          {console.log("order bike :", orderBikeTrue)}

          {orderBikeTrue.map((item, index) => { return <li id="li" key={index}>  <ReturnCard props={item} cust={custo} index={index + 1} index2={item.id} /></li> })}

        </ul>

      </div>
    </> : null}

  </>
  )
}

export default Returns;