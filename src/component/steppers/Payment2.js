import * as React from 'react';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Link, Stack } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import './Payment2.css';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import * as type from "../../store/actions/actionType";
import { useEffect } from 'react';

const Payment2 = ({ onSubmit }) => {

  const { register, handleSubmit, getValues, formState: { isValid, errors} } = useForm({
    mode: "all"
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: type.CHANGE_FLAG_TRUE
    })
  }, [])

  const flag = useSelector(state => state.r.Flag);

  const currentUser = useSelector(state => state.r.user);

  const submit = (details) => {
    console.log(flag)
    onSubmit(details)
  }

  return <>
    <form id="formLoginR" style={{ width: "85vw", mr: "15vw", direction: "rtl" }} onSubmit={handleSubmit(submit)}>
      <Card sx={{ minWidth: 80 }}>
        <CardContent>

          <Typography variant="h5" component="div">
            כרטיס אשראי
          </Typography>
          <br></br>
          {/* name */}
          <TextField fullWidth label="שם של בעל הכרטיס" id="fullWidth" {...register("name", { required: "name is required", })}
            style={errors.name ? { border: "red solid 1px", borderRadius: "5px" } : null}
            defaultValue={currentUser == null ? '' : currentUser.name} />
          <br></br><br></br>
          {/* id */}
          <TextField fullWidth id="fullWidth" label="ת.ז של בעל הכרטיס" variant="outlined"
            defaultValue={currentUser == null ? '' : currentUser.tz}
            style={errors.id ? { border: "red solid 1px", borderRadius: "5px" } : null}
            {...register("id", {
              required: "id is required",
              pattern: {
                value: /^\d{9}$/,
                message: "Invalid id "
              },

            })} />
          <br></br><br></br>

          {/* card */}
          <TextField fullWidth id="fullWidth" variant="outlined"
            style={errors.card ? { border: "red solid 1px", borderRadius: "5px" } : null}
            // style={{direction:"rtl"}}
            defaultValue={currentUser == null ? 'מספר כרטיס אשראי' : currentUser.card}

            InputProps={{
              endAdornment: <>
                <img id="img" src="israkart.png" />
                <img id="img" src="אמריקאן.png" />
                <img id="img" src="מאסאר.png" />
                <img id="img" src="visa.png" />
              </>
            }}
            {...register("card", {
              required: "card is required",
              pattern: {
                value: /[1-9]{16}/,
                message: "Invalid card "
              },
              maxLength: {
                value: 16,
                message: "Password should be until 16 numbers."
              }

            })}
          />
          <br></br><br></br>

          {/* date */}

          <TextField id="outlined-basic" label=" תוקף MM/YY" variant="outlined"
            style={errors.date ? { border: "red solid 1px", borderRadius: "5px" } : null}
            // style={{ width: "20vw" }}
            defaultValue={currentUser == null ? '' : currentUser.date}
            {...register("date", {
              required: "date is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/(2[4-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])$/,
                message: "Invalid date "
              },
            })}
          />

          <TextField id="outlined-basic" label="CVV" variant="outlined"
            style={errors.cvv ? { border: "red solid 1px", borderRadius: "5px",marginRight:"20px",width:"100px" } : {marginRight:"20px",width:"100px" }}
            defaultValue={currentUser == null ? '' : currentUser.cvv}
            {...register("cvv", {
              required: "cvv is required",
              pattern: {
                value: /[1-9]{3}/,
                message: "Invalid cvv "
              },
            })}
          />

        </CardContent>
        {/* save */}

        <CardActions>
          <Stack direction="row" spacing={5} marginRight="32.5vw">

            <Button color="inherit" style={{ fontSize: "15px", fontWeight: "bold", backgroundColor: "#1976d2", color: "white", width: "125px" }} type="submit" textAlign="right">
              הבא
            </Button>

          </Stack><br></br>
        </CardActions>
      </Card>

    </form >
  </>
}


export default Payment2;

