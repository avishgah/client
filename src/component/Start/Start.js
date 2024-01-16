import { Box, Button, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PicId from "../steppers/PicId";

import * as type from "../../store/actions/actionType";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AddUser from "../../component/AddUser/AddUser";

import './page.css';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import Picture from './Picture'
const Start = () => {
    const nav = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: type.CHANGE_FLAG_FALSE })


    }, [])

    const currentStation = useSelector(state => state.r.station);

    return (<>
        <div class="flex-container">

            <div class="flex-item-left" style={{ direction: "rtl", flex: "60%" }}>
                <div >
                    <h2>איזו פעולה תרצו לבצע ?</h2>

                    {/* <Button color="secondary">Secondary</Button> */}
                    <Button variant="contained" color="success" onClick={() => nav('/TakeOrder')} >
                        לקחת
                    </Button><br></br>

                    <Button variant="contained" color="success" onClick={() => nav('/Returns')}>
                        להחזיר
                    </Button><br></br>
                </div>

            </div>

            <div class="flex-item-right" style={{ flex: "40%" }} >
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

                <div className="helpper" style={{ marginTop: "14%" }} onClick={() => nav('/introduc')} >
                    יציאה
                </div>


            </div>
        </div>



    </>
    )
}



export default Start;