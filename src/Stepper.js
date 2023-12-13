import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Returns from './return/Returns';
import Register from './Register';
import Payment2 from './Payment2';
import { useEffect } from 'react';
import { useState } from 'react';

import * as type from "./store/actions/actionType";

import { useSelector } from 'react-redux';
import PicId from './PicId';
const steps = ['פרטים אישיים', 'תשלום', 'תצלום'];
export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [isFinish, setIsFinish] = useState(false);
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

    useEffect(() => {
     
        // Clean up the timer to avoid memory leaks
        // return () => clearTimeout(timer);
        // }

    }, [])

    const getStepContent = (index) => {
        switch (index) {
            case 0: return <Register setIsFinish = {setIsFinish}/>;
            case 1: return <Payment2 setIsFinish = {setIsFinish} />;
            case 2: return <PicId setIsFinish = {setIsFinish}/>;
            default: return;
        }
    }

    const handleNext = () => {
        const myData = localStorage.getItem('myData');
        decodedObject = JSON.parse(decodeURIComponent(myData));
        console.log(decodedObject); // יציג: { key: 'value' }
        setIsFinish(false);
        // console.log(activeStep)
        // console.log(skipped)
        let newSkipped = skipped;
        // if (activeStep == 0)
        //     nav('/Payment2');
        // if (activeStep == 1)
        //     nav('/PicId');

        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        console.log(activeStep)
        if (activeStep == 1) {
            // ניתן לקרוא את המידע מ-LocalStorage בדף השני

            nav('/Register');
        }
        if (activeStep == 2) {

            nav('/Payment2');
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
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
    return (
        <>
            <Box sx={{ width: '100%', direction: "rtl"}}>
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
                            <Step  key={label} {...stepProps}>
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
                        <Typography sx={{ mt: 2, mb: 1,mr:"30vw"}}>
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
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button onClick={handleNext} id="nextB" disabled={!isFinish}>
                                {activeStep === steps.length - 1 ? 'סיום' : 'הבא'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </>);
}