import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PicId from "./PicId";   

import * as type from "./store/actions/actionType";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AddUser from "./AddUser/AddUser";

// import Picture from './Picture'
const Start = () => {
    const nav = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({type:type.CHANGE_FLAG_FALSE})
  
      
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
            {/* <Picture/> */}
            {/* <PicId /> */}

        </div>
    </>
    )
}



export default Start;