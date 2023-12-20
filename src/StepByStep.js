import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import { addAttraction, updateAttraction } from '../../store/actions/AttractionActions';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Register from './Register';
import Payment2 from './Payment2';
import PicId from './PicId';
import * as types from "./store/actions/actionType";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiStepContent-root': { borderLeft: "none" }
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['פרטים אישיים', 'תשלום', 'תצלום תעודה'];
}

export default function EditAndAddAttraction({ type }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [category, setCategory] = useState(null);
    const [object, setObject] = useState(null);
    const dispatch = useDispatch();
    const steps = getSteps();
    const { id } = useParams();

    //   useEffect(() => {
    //     if (activeStep == steps.length && type == "new")
    //     //   dispatch(addAttraction(object));
    //   }, [activeStep]);

    const currentStation = useSelector(state => state.r.station);

    const onSubmit = (data) => {
        console.log(data)
        const o = { ...object }
        console.log("o:", o);

        console.log(activeStep);
        switch (activeStep) {
            case 0:
                dispatch({
                    type: types.CURRENT_USER,
                    payload: data
                })
                setObject({ ...o });
                break;
            case 1:
                setObject({ ...o });
                break;
            case 2:
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
                return <Register onSubmit={onSubmit} />;
            case 1:
                return <Payment2 onSubmit={onSubmit} />;
            case 2:
                return <PicId onSubmit={onSubmit} />;
            case 3:

            default:
                return;
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return <div className='editForm'  style={{direction:"rtl"}}>
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel style={{ color: "orange" }} >
                            <h2 className="secondHeader"> {label} </h2></StepLabel>
                        <StepContent>
                            <div>{getStepContent(index)}</div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    {index != 0 && <Button
                                        onClick={handleBack}
                                        className={classes.button}
                                        style={{ color: "white", backgroundColor: "orange" }}>
                                        חזרה
                                    </Button>}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep == steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Alert severity="success" style={{ fontSize: "larger" }}>
                        <AlertTitle style={{ fontSize: "x-large" }}>סיימנו!</AlertTitle>
                        האטרקציה {id ? "עודכנה" : "התווספה"} <strong>בהצלחה.</strong>
                    </Alert>
                    {type == "new" ? <Button onClick={handleReset} className={classes.button} style={{ color: "white", backgroundColor: "orange" }}>
                        להוספת אטרקציה נוספת
                    </Button> : null}
                </Paper>
            )}
        </div>
    </div>
}