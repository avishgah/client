import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PasswordResset from './PasswordResset';
import * as type from "../../store/actions/actionType";
// import { getUserByEmail } from '../../store/actions/UserActions';
import { Fragment } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};




export default function ForgetPassword({ email, setOpen }) {
    const [mail, setMail] = React.useState(email);
    const [user, setUser] = React.useState(null);
    const [isError, setIsError] = React.useState(true);
    const [flag, setFlag] = React.useState(false);
    let defaultUser=null;

    const getUserByEmail = async (mail) => {

        const x = await axios.get(`https://localhost:7207/api/user/GetUserByMail/${mail}`).then(res => {
            console.log("sum", res.data)
            defaultUser = res.data;
            setUser(res.data);
        }).catch(err => console.log(err))

    }


    const resetPassword = async () => {
        await getUserByEmail(mail);
        console.log(user);
        if (defaultUser != '') {
            setIsError(true);
            setFlag(true);
        }
        else {
            setIsError(false);
            setFlag(false);
        }

    }

    return <div>
        <Modal
            keepMounted
            open={true}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description">

            <Box sx={style}>
                {!flag ? <Fragment>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        <label className="small-text bold-text">הכנס כתובת מייל</label> <br />
                        <input type="text" defaultValue={mail} name="Email" onChange={(e) => { setMail(e.target.value); }} />
                    </Typography>
                    {!isError ? <span style={{ color: "red" }}>משתמש זה אינו קיים</span> : null}
                    <br />
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        <Button variant="contained" size="medium" onClick={resetPassword}>  איפוס סיסמא  </Button>
                    </Typography></Fragment> :

                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <PasswordResset email={mail} setOpen={setOpen} />
                    </Typography>}
            </Box>
        </Modal>
    </div>
}
