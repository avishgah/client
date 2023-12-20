import './Payment2.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, Link, Stack, colors } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as type from "./store/actions/actionType";
import { useDispatch, useSelector } from 'react-redux';

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
    const currentNumBike = useSelector(state => state.r.count);
    const [count, setCount] = React.useState(currentNumBike != 1 ? currentNumBike : 1);
    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });



    const dispatch = useDispatch();

    const submit = (details) => {

        dispatch({ type: type.COUNT_BIKE, payload: count })

        // alert("פרטיך נקלטו")
        // console.log(details);
        // addbike(details);
        onSubmit(details)
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

                    {/* <div id="div-pic">
            <Box
                component="img"
                sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                }}
                src={r}
            />

            <Button
                endIcon={<AttachmentIcon />}
                variant="contained"
                component="label"
                id="pid-button"
            >
                בחירת קובץ

                <input
                    type="file"
                    hidden
                />
            </Button>

        </div> */}<br></br><br></br>
                    <Stack direction="row" spacing={5} marginRight="24vw">

                        <Button color="inherit" style={{ fontSize: "15px", fontWeight: "bold", backgroundColor: "#1976d2", color: "white", width: "125px" }} type="submit" textAlign="right">
                            הבא
                        </Button>

                    </Stack><br></br>
                </CardContent>
            </Card>
        </form>

    </>)
}

export default PicId;



