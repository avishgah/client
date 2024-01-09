import './Payment2.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, Link, Stack, colors } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as type from "../../store/actions/actionType";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Typography from '@mui/material/Typography';



import { DialogContent, DialogTitle } from '@mui/material';

import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

// import cv2 from 'opencv';




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



let namePic;
let r = "1.png";


const Change = () => {
    alert("ll")

    namePic = document.querySelector('input').value;
    console.log(namePic);
    r = namePic.substring(12);
    console.log(r)

}

const PicId = ({ onSubmit }) => {

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        // nav('/introduc');
    };

    const currentNumBike = useSelector(state => state.r.count);
    const [count, setCount] = React.useState(currentNumBike != 1 ? currentNumBike : 1);
    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    const currentStation = useSelector(state => state.r.station);


    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const submit = (details) => {

        dispatch({ type: type.COUNT_BIKE, payload: count })

        if (currentStation != null) {
            const c = currentStation.id;
            console.log(c);
            axios.get(`https://localhost:7207/api/order/isExist/${c}/${count}`).then(res => {

                console.log(res.data + ";;;;;;");

                if (res.data) {
                    // setIsExist(true);
                    onSubmit(details)
                }
                else {
                    handleClickOpen();
                }

                if (res.data == null) {
                    alert("error")
                    return null;

                }
            }).catch(err => console.log(err))
        }

    }

    return (<>
        <form id="formLoginR" style={{ width: "70vw", direction: "rtl", marginTop: "10vw" }} onSubmit={handleSubmit(submit)}>
            <Card sx={{ minWidth: 80 }}>
                <CardContent>
                    <h2> כמה אופניים תרצה לשחרר ?</h2><br></br>

                    <Box style={{ direction: "center", marginRight: "10vw" }}>
                        <div>
                            <ButtonGroup>
                                <Button
                                    style={{ borderInlineStartColor: "#1976d2" }}

                                    aria-label="reduce"
                                    onClick={() => {
                                        setCount(Math.max(count - 1, 0));
                                    }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>

                                <div id="p2">{count}</div>

                                <Button
                                    aria-label="increase"
                                    onClick={() => {
                                        setCount(count + 1);
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </ButtonGroup>
                        </div>

                    </Box>


                    <br></br><br></br>
                    <Stack direction="row" spacing={5} marginRight="24vw">

                        <Button color="inherit" style={{ fontSize: "15px", fontWeight: "bold", backgroundColor: "#1976d2", color: "white", width: "125px" }} type="submit" textAlign="right">
                            הבא
                        </Button>

                    </Stack><br></br>
                </CardContent>
            </Card>
        </form>
        < BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            style={{ direction: "rtl" }}
        >
            <DialogTitle sx={{ m: 0, p: 2, color: "rgb(26, 87, 53)" }} id="customized-dialog-title">
                שגיאת שירות
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    // right:0,
                    left: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom>
                    שלום,
                </Typography>
                <Typography gutterBottom>
                    מצטערים בתחנה זו אין אופניים פנויים, אנא נסו בתחנות קרובות.
                </Typography>
                <Typography gutterBottom>
                    סליחה ותודה שבחרת להשתמש ברשת פדאל.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    סגור
                </Button>
            </DialogActions>
        </BootstrapDialog >
    </>)
}

export default PicId;



