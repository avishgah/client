

import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

// import cv2 from 'opencv';

import { cv2 } from 'react-opencv';

import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConstructionOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import * as types from "../../store/actions/actionType";
import RegisterYup from './RegisterYup';
// import cv2 from 'opencv';
import Typography from '@mui/material/Typography';
import { DialogContent, DialogTitle } from '@mui/material';


import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Camera = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema)
    });
    const webcamRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [isIDCardDetected, setIsIDCardDetected] = useState(false);
    const [endProsses, setendProsses] = useState(false);
    const [imageLink, setImageLink] = useState(null);

    const [open, setOpen] = React.useState(false);


    const currentUser = useSelector(state => state.r.user);
    const currentStation = useSelector(state => state.r.station);
    const countBikes = useSelector(state => state.r.count);
    let currentU = currentUser;
    const navigator = useNavigate();


    const isIDCard = async () => {
        try {
            const cv = window.cv; // Access the OpenCV object
            if (!cv) {
                throw new Error('OpenCV library not initialized or loaded.');
            }

            // ... rest of your OpenCV processing code
        } catch (error) {
            console.error('Error processing image:', error);
        }
        const cv = window.cv; // Access the OpenCV object
        const imageElement = document.createElement('img');
        console.log(fileInputRef);
        const file = fileInputRef.current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imageElement.src = event.target.result;

                imageElement.onload = () => {
                    const mat = cv.imread(imageElement);
                    const gray = new cv.Mat();
                    const edges = new cv.Mat();

                    cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);
                    cv.Canny(gray, edges, 50, 150, 3);

                    const contours = new cv.MatVector();
                    const hierarchy = new cv.Mat();

                    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                    let validContours = 0;
                    for (let i = 0; i < contours.size(); ++i) {
                        const approx = new cv.Mat();
                        const contour = contours.get(i);
                        const perimeter = cv.arcLength(contour, true);
                        cv.approxPolyDP(contour, approx, 0.02 * perimeter, true);

                        if (approx.rows === 4) {
                            const area = cv.contourArea(contour);
                            if (area > 5000) { // Adjust this area threshold according to your image sizes
                                validContours++;
                            }
                        }
                        approx.delete();
                    }

                    mat.delete();
                    gray.delete();
                    edges.delete();
                    hierarchy.delete();
                    contours.delete();

                    if (validContours === 1) {
                        setIsIDCardDetected(true)
                        console.log('The image contains only an ID card.');
                        // Perform further actions for when the image contains only an ID card
                    } else {
                        setIsIDCardDetected(false)
                        console.log('The image does not contain only an ID card.');
                    }
                };
            };
            reader.readAsDataURL(file);
        }
        // fileInputRef.current.addEventListener('change', isIDCard);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        navigator('/introduc');
    };


    const handleCameraToggle = () => {
        setCameraActive(!cameraActive);
    };
    let imageSrc = null;
    const capture = () => {
        imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setCameraActive(false)
        if (capturedImage)
            document.getElementById("D-pic").style.display = "block";

    };

    const restart = () => {
        document.getElementById("D-pic").style.display = "none";
        setCameraActive(true);
    }
    useEffect(() => {
        if (imageLink) {
            console.log(imageLink); // Log imageLink when it changes
        }
    }, [imageLink]);
    const handleDownload = () => {
        // Check if an image is captured before attempting to download
        if (capturedImage) {
            const downloadLink = document.createElement('a');
            downloadLink.href = capturedImage;
            downloadLink.download = 'captured_image.jpg'; // Set the image file name here
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }

        // const imageSrc = webcamRef.current.getScreenshot();
        // setCapturedImage(imageSrc);

        // Convert captured image to a data URL and set the link immediately
        if (capturedImage) {
            const dataUrl = capturedImage.split(',')[1]; // Extract base64 data from imageSrc
            setImageLink(`data:image/jpeg;base64,${dataUrl}`);
        }
        console.log(capturedImage, "kk")
    };
    const UpdateUser = () => {
        console.log(currentUser);
        const user = { "Pic": capturedImage, "Name": "change pic" }
        axios.put(`https://localhost:7207/api/User/UpdateUser/${currentUser?.id}`, user).then(res => {
            console.log("kk");
        }).catch(err => console.log(err))
    }

    const AddOrders = async () => {
        console.log(currentUser);
        console.log(currentStation);
        console.log(countBikes);
        const order = { "IdCust": currentUser?.id, "IdStation": currentStation?.id, "count": countBikes, "Code": "station" }
        const s = await axios.post(`https://localhost:7207/api/Order`, order).then(res => {

            setOpen(true);
            console.log(res)
            console.log(res.data)

        })

    }

    const submit = async (data) => {
        console.log(capturedImage);
        await handleDownload();
        await UpdateUser();
        await AddOrders();
        document.getElementById("D-pic").style.display = "none";
        // onSubmit(data)
    }
    return (
        <form onSubmit={handleSubmit(submit)} className="location">
            {
                open ?
                    < BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        style={{ direction: "rtl", textAlign: "right" }}
                    >
                        <DialogTitle sx={{ m: 0, p: 2, color: "rgb(26, 87, 53)" }} id="customized-dialog-title">
                            הזמנתך בוצעה בהצלחה
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
                                שלום, {currentU?.Name}
                            </Typography>
                            <Typography gutterBottom>
                                לרשותך האופניים משוחררות בנורה ירוקה,
                            </Typography>
                            <Typography gutterBottom>
                                בכל מקרה של תקלה או חוסר נוחות פנו אלינו לשירות לקוחות פדאל *2670.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                סיום
                            </Button>
                        </DialogActions>
                    </BootstrapDialog > :
                    <div >
                        <div>
                            {/* 
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={isIDCard} />
                    {isIDCardDetected ? <p>The image contains an ID card.</p> : <p>No ID card detected in the image.</p>}
                     */}
                        </div>

                        {cameraActive && (
                            <div>
                                <Button className='button-pic' onClick={handleCameraToggle}>
                                    {cameraActive ? 'סגור מצלמה' : 'פתח מצלמה'}
                                </Button> <br></br>
                                <p style={{ fontWeight: "bold", fontSize: "20px" }}>הכנס תעודת זהות</p>

                                <Webcam
                                    style={{ height: "30vw", marginLeft: "3vw" }}
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                /><br></br>

                                <Button endIcon={<PhotoCameraIcon style={{ fontSize: "30px" }} />} onClick={capture}></Button>
                            </div>
                        )}
                        {capturedImage && (
                            <div id="D-pic">
                                <h2>תמונה</h2>
                                <img src={capturedImage} alt="Captured" /><br></br>
                                <Button className='button-pic' type='submit'>שמור</Button>
                                <Button className='button-pic' style={{ marginLeft: "10px" }} onClick={restart}>חדש</Button>
                            </div>
                        )}

                        {imageLink && (
                            <div>
                                <h3>קישור לתמונה:</h3>
                                <img src={capturedImage}></img>
                                <a href={imageLink} target="_blank" rel="noopener noreferrer">
                                    תמונה
                                </a>
                            </div>
                        )}
                    </div>
            }

        </form>
    )
}


export default Camera;