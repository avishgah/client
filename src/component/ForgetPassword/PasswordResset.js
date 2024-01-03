import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { useDispatch } from "react-redux";
import * as type from "../../store/actions/actionType";

const PasswordReset = ({ email, setOpen }) => {
    const dispatch = useDispatch();
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [eye, setEye] = useState(false);
    const [flag, setFlag] = useState(false);
    const [errorState, setErrorState] = useState("");
    const strongRejex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

    const changePassword = async (user) => {
        console.log(user)
        const x = await axios.put(`https://localhost:7207/api/User/ChangePassword/`,{Mail:user.Email,Password:user.Password}).then(res => {
            console.log(res)
            dispatch({ type: type.CURRENT_USER , payload:user })
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    const handleNewPassword = (event) => {
        setnewPassword(event.target.value);
        if (strongRejex.test(event.target.value))
            setErrorState("");
        else
            setErrorState("סיסמא חייבת להכיל 6 תווים וכן לפחות אות אחת באנגלית ומספר");
    }

    const handleconfirmPassword = (event) => {
        setconfirmPassword(event.target.value);
        if (newPassword != event.target.value) {
            setErrorState("הסיסמא לא מתאימה");
            setFlag(false);
        }
        else
            setErrorState("");
    }
    const resetPassword = async () => {
        if (errorState.length > 0 || newPassword == '' || confirmPassword == '')
            setFlag(true);
        else
            if (newPassword == confirmPassword) {
                await changePassword({ Password: newPassword, Email: email });
                setOpen(false)
            }
    }
    return <div>
        <h4 style={{ textAlign: "center" }}>אתחול סיסמא: </h4>
        <form>
            <label>סיסמא חדשה</label> <br />
            <input
                type="text"
                value={newPassword}
                onChange={handleNewPassword}></input> <br /> <br />

            <label type="text" > אשר סיסמא </label> <br />
            <input
                type={eye ? "text" : "password"}
                value={confirmPassword}
                onChange={handleconfirmPassword}>
            </input>

            <div onClick={() => { setEye(!eye) }} >
                {eye ? <HiEyeOff color="grey" /> : <HiEye color="grey" />}
            </div>
            <span style={{ color: "red" }}>{errorState}</span> 

            {flag && <span style={{ color: "red" }}> יש למלא את כל השדות</span>} <br /> <br />
            <Button variant="contained" color="primary" onClick={()=>resetPassword()}> המשך </Button>
        </form>
    </div>
}
export default PasswordReset;