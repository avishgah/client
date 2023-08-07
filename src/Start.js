import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PicId from "./PicId";

import * as type from "./store/actions/actionType";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Maps from './Maps';
import AddUser from "./AddUser/AddUser";
import Coun from './Coun';
// import Picture from './Picture'
const Start = () => {
    const nav = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: type.CHANGE_FLAG_FALSE })


    }, [])


    return (<>
        <div className="App">
            <h1>ברוכים הבאים</h1>
            <Stack direction="row" spacing={2}>
                {/* <Button color="secondary">Secondary</Button> */}
                <Button variant="contained" color="success" onClick={() => nav('/Register')} >
                    לקחת
                </Button>

                <Button variant="contained" color="success" onClick={() => nav('/Returns')}>
                    להחזיר
                </Button>

            </Stack>
            <br></br><br></br>
            <Button id="order-button" variant="contained" onClick={() => nav('/Order')}>
                הזמנה מראש
            </Button>
            {/* <Picture/> */}
            {/* <PicId /> */}
            {/* <Coun/> */}
            <Maps />
        </div>
    </>
    )
}



export default Start;