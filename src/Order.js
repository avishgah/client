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

const Order = () => {
    const nav = useNavigate();



    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React.useState(10);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenAndCount = () => {
        setOpen(true);
        setCount(Math.max(count - 1, 0))
    };

    const handleClose = () => {
        setOpen(false);
    };



    const submit = (details) => {

        handleClickOpen();
        console.log(details);
        // for (var i = 0; i < 8; i++) {
        {/* {console.log(i)} */ }

        // }
        // alert(" נא לשים את האפנים בעמדה פנויה, תודה ולהתראות")
        // nav('/Start')
    }

    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });


    return <>
        <h1>wellcome</h1>

        <div>

            <Dialog
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
            </Dialog>
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
    </>
}


export default Order;