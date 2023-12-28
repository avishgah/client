import { Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { Fragment } from "react";
import { useSelector } from 'react-redux';
const FormInput = ({ register, errors, name, lableName, type, flag, width }) => {

    const currentUser = useSelector(state => state.r.user);
    return <Fragment> {type != "checkbox" ? <Fragment>
        <label style={{ marginRight: "1vw" }}> {lableName} <span style={{ color: 'red' }}>
            * {/* אייקון של כוכב */}
        </span></label>
        <TextField id="standard-basic"
            fullWidth
            label=
            {
                lableName == "תאריך לידה" ? null : (lableName)
            }


            name={name}
            type={type}
            {...register(name)}
            variant="outlined"
            disabled={flag}
            defaultValue={currentUser == null ? '' : currentUser.tz}
            style={{ backgroundColor: "white", width: "40vw", marginRight: "1vw" }} />
    </Fragment> :
        <Fragment>
            <FormControlLabel
                label={lableName}
                name={name}
                {...register(name)}
                disabled={flag}
                control={<Checkbox defaultChecked />} />
        </Fragment>}
        {/* <div style={{textAlign:"center"}}> */}
        <br /> <span style={{ color: "red",marginRight:"1vw" }}>{errors[name]?.message}</span> <br />
        {errors[name]?.message ? <br></br>: null}

        {/* </div> */}
{/* 
        style={errors[name]?.message ?{ border: "#620808 solid 1px", borderRadius: "5px", backgroundColor: "white", width: "40vw", marginRight: "1vw"  }:
             { backgroundColor: "white", width: "40vw", marginRight: "1vw" }} */}
    </Fragment>
}
export default FormInput;