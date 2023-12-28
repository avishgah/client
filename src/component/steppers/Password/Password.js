import { OutlinedInput } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const Password = ({ errors, register, labelName, name }) => {
    const [showPassword, setshowPassword] = useState(false);
    const currentUser = useSelector(state => state.r.user);

    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" style={{ backgroundColor: "white", width: "40vw", marginRight: "1vw" }} >
            <label style={{ textAlign: "right", marginRight: "1vw" }}> {labelName} <span style={{ color: 'red' }}>
                * {/* אייקון של כוכב */}
            </span></label>
            <InputLabel htmlFor="outlined-adornment-password" style={{ position: "relative", left: "4rem", top: "1.2rem", width: "23vw" }}></InputLabel>
            <OutlinedInput
                style={{ backgroundColor: "white" }}
                {...register(name)}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                defaultValue={currentUser == null ? '' : currentUser.tz}
                endAdornment={
                    <InputAdornment position="start">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setshowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            // label="{labelName}"
            />
            <span style={{ color: "red" }}>{errors[name]?.message}</span> <br />
        </FormControl>
    )
}
export default Password;