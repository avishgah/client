import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Returns from '../return/Returns';
import Payment2 from './Payment2';
import { useEffect } from 'react';
import { useState } from 'react';

import * as type from "../../store/actions/actionType";

import { useDispatch, useSelector } from 'react-redux';
import PicId from './PicId';
import axios from 'axios';
import { DialogContent, DialogTitle } from '@mui/material';

import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import * as types from "../../store/actions/actionType";
import RegisterYup from './RegisterYup';
import Camera from './Camera';
// import cv2 from 'opencv';

const steps = ['כמות אופניים', 'פרטים אישיים', 'תשלום', 'תצלום תעודה'];



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


    const [isFinish, setIsFinish] = useState(false);
    const [isExist, setIsExist] = useState(false);


    const nav = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    var decodedObject;

    const flag = useSelector(state => state.r.Flag_next);
    const currentStation = useSelector(state => state.r.station);

    useEffect(() => {
        console.log(currentStation)
        if (currentStation != null) {
            const c = currentStation.id;
            console.log(c);
            axios.get(`https://localhost:7207/api/order/isExist/${c}/${1}`).then(res => {

                console.log(res.data + ";;;;;;");

                if (res.data) {
                    setIsExist(true);
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

    }, [])

    const [object, setObject] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data)
        const o = { ...object }
        console.log("o:", o);

        console.log(activeStep);
        switch (activeStep) {
            case 0:
                setObject({ ...o });
                break;
            case 1:
                dispatch({
                    type: types.CURRENT_USER,
                    payload: data
                })
                setObject({ ...o });
                break;
            case 2:
                setObject({ ...o });
                break;
            case 3:
                setObject({ ...o });
                break;
            default:
                break;
        }
        setActiveStep(activeStep + 1);

    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <PicId onSubmit={onSubmit} />;

            case 1:
                return <RegisterYup onSubmit={onSubmit} />;
            case 2:
                return <Payment2 onSubmit={onSubmit} />;
            case 3:
                return <Camera onSubmit={onSubmit} />;

            default:
                return;
        }
    }

    

    const handleBack = () => {
        
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

   
    const handleReset = () => {
        setActiveStep(0);
        nav('/Start')
    };
    const styles = {
        customStepLabel: {
            fontSize: '30px', // Change this value to the desired font size
        },
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        nav('/introduc');
    };

    //that dissapaer after 5 second
    useEffect(() => {
        // Show the modal when the component mounts
        showAutoDismissDialog();
      }, []);
    
      const showAutoDismissDialog = () => {
        const dialog = document.getElementById('autoDismissDialog');
        if (dialog) {
          const modal = new window.bootstrap.Modal(dialog);
          modal.show();
    
          setTimeout(() => {
            modal.hide();
          }, 5000); // 5000 milliseconds = 5 seconds
        }
      };

    return (
        <>
            {
                !isExist ?

                    < BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        style={{ direction: "rtl" }}
                    >
                        <DialogTitle sx={{ m: 0, p: 2, color: "rgb(135 5 5)" }} id="customized-dialog-title">
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
                    </BootstrapDialog > :

                    <Box sx={{ width: '100%', direction: "rtl" }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption"></Typography>
                                    );
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel style={styles.customStepLabel} {...labelProps} ><b>{label}</b></StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    {alert("פרטיך נקלטו בהצלחה הנאה נעימה")}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment><br></br>
                                <Typography sx={{ mt: 2, mb: 1, mr: "30vw" }}>
                                    {getStepContent(activeStep)}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        חזור
                                    </Button>

                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
            }


            
        </>);
}