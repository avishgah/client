import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as type from "../store/actions/actionType";

import './Return.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Returns = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({type:type.CHANGE_FLAG_FALSE})
  
      
  }, [])

    const submit = (details) => {
        console.log(details);
        alert(" נא לשים את האפנים בעמדה פנויה, תודה ולהתראות")
        nav('/Start')
    }

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });


    return (<>

        <h1>הקש תעודת זהות</h1>
        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <Box component="form" noValidate autoComplete="off">
                <TextField id="outlined-basic" className="tz-filed" label="id" variant="outlined"        {...register("id", {
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
    </>
    )
}

export default Returns;