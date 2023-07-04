import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';

import { useForm } from 'react-hook-form';


import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField } from '@mui/material';
import Link from '@mui/material/Link';


const submit = (details) => {
    console.log(details);

    console.log(details);
    GetUserList(details);
}

const GetUserList = async (details) => {
    var flag = false;
    var promise = await axios.get("https://localhost:7075/api/User");
    console.log(promise.data);
    for (var i = 0; i < promise.data.length; i++) {
        console.log(promise.data[i].tz.toString())
        if (promise.data[i].tz == details.tz)
            flag = true;
            
        console.log(details.tz)
    }
    if (flag)
        alert("הינך מחובר")
    else
        alert("לא נמצא משתמש-נא להרשם ")

}

const Takes = () => {

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });



    <h1>הכנס תעודת זהות</h1>
    return (

        <form id="formLoginR" onSubmit={handleSubmit(submit)}>
            <Box component="form" noValidate autoComplete="off">
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        console.info("I'm a button.");
                    }}
                >
                    להרשמה
                    {/* מעבר לדף הרשמה */}
                </Link>

                <TextField id="outlined-basic" label="id" variant="outlined" {...register("tz", { required: true, pattern: /^[0-9]{1,9}/ })} />
                {errors.ID?.type == "pattern" && <div className="error">
                    {/* אפשרי גם קטן מ-9 */}
                    תעודת זהות לא תקינה
                </div>}
                {errors.ID?.type == "required" &&
                    <div className="error">
                        שדה חובה
                    </div>}
                <br></br>

            </Box>

            <Stack direction="row" spacing={2}>

                <Button variant="contained" id="addR" type="submit">
                    סיום
                </Button>

            </Stack>
        </form>


    );

}

export default Takes;