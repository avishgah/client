import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import Start from '../Start/Start';

import './Return.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useNavigation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as type from "../../store/actions/actionType";
import { StairsOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const ReturnCard = ({ orderAll, orders, props, cust, index, index2 }) => {

    // const nav = useNavigation();
    const { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({
        mode: "all"
    });
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React.useState(10);

    const listOrderD = useSelector(state => state.r.orders);


    const [orderB, setOrderBike] = React.useState([]);



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenAndCount = (id) => {
        setOpen(true);
        // setCount(Math.max(count - 1, 0))
        // console.log(id)


    };

    const handleClose = () => {
        setOpen(false);
    };

    let flagOpenForm = false;

    const dispatch = useDispatch();

    const submit = async (details) => {


        // alert("פרטיך נקלטו")
        // console.log(details);
        // addbike(details);

    }

    var idBikeForReturn = 0;

    const [idBikeForReturnx, setidBikeForReturn] = useState(false);
    let orderses = [];
    let listOrder = [];
    const updateList = async () => {
        console.log("enter update")
        let orderses = orderAll;
        console.log(orders);

        // console.log("hi")
        for (var i = 0; i < orderses.length; i++) {
            //   console.log(i)
            if (orderses[i].isPay == false) {

                console.log("order axios", orderses[i])

                const g = await axios.get(`https://localhost:7207/api/orderBike/ReturnListBikeByIdOrder/${orderses[i].id}`).then(res => {

                    console.log("res list bikes axios", res.data)
                    const x = res.data;
                    for (var i = 0; i < x.length; i++) {
                        listOrder.push(x[i]);
                        // console.log(x[i])
                    }

                }).catch(err => console.log(err))

            }
        }
        dispatch({
            type: type.LIST_ORDER,
            payload: listOrder
        })
        changeHeit(listOrder)
    }
    const station = useSelector(state => state.r.station);

    const ReturnOrder = async (id) => {
        // alert("פרטיך נקלנו בהצלחה")
        console.log("ll")
        console.log(station);
        const orderBike =
        {
            "dateStart": new Date(),
            "dateEnd": new Date(),
            "idBike": station?.id,
            "idPay": 5,
            "status": false,
            "sum": sum
        }
        console.log(orderBike)
        const f = await axios.put(`https://localhost:7207/api/OrderBike/${id}`, orderBike).then(res => {
            console.log("giid")
            alert("נא לחבר את האופנים באמדות הפנויות- " + props.idBike)
            // window.location.reload();
        }).catch(err => console.log(err))
    }

    const end = async (id) => {

        console.log(orders.length);
        if (orders.length == 1) {
            console.log(cust)
            console.log("hii");
            await ReturnOrder(id);
            const t = await axios.get(`https://localhost:7207/api/order/updateSum/${cust.tz}`).then(res => {
                console.log("giid")
                alert("נא לחבר את האופנים באמדות הפנויות- " + idBikeForReturn);
            }).catch(err => console.log(err))
            setisEnd(true);
            navigate("/introduc");
        }
        else {
            await ReturnOrder(id)
        }

        await updateList();

    }
    const [expanded, setExpanded] = React.useState(false);
    const [sum, setSum] = useState(null);
    const [dateDiff, setDate] = useState(null);
    const [isEnd, setisEnd] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    var l = null;

    const navigate = useNavigate();

    useEffect(() => {
        if (props != null) {

            console.log(props);

            axios.get(`https://localhost:7207/api/orderBike/calcSum/${props.id}`).then(res => {
                console.log("sum", res.data)
                setSum(res.data)
            }).catch(err => console.log(err))

            axios.get(`https://localhost:7207/api/orderBike/calcTime/${props.id}`).then(res => {
                console.log("time", res.data)
                setDate(res.data)
            }).catch(err => console.log(err))
            // setindexS(props.dateStart.indexOf('T'))

        }

    }, [])

    const changeHeit = (listOrderD) => {
        console.log(listOrderD);
        if (listOrderD.length <= 3) {
            let elements = document.getElementsByClassName("flex-item-left");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.height = "43vw";
            }
            // Do nothing or perform an action if the length is less than or equal to 3
        } else if (listOrderD.length <= 6) {
            // Set the height of elements with class "flex-item-left" to 500vw
            let elements = document.getElementsByClassName("flex-item-left");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.height = "70vw";
            }
        } else if (listOrderD.length <= 9) {
            // Set the height of elements with class "flex-item-left" to 300vw
            let elements = document.getElementsByClassName("flex-item-left");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.height = "200vw";
            }
        } else {
            // Do nothing or perform an action if the length is greater than 9
        }
    }
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
    return (<>
        {console.log(isEnd)}
        {!isEnd ?
            <>
                {props != null && cust != null ? <>
                    {console.log(props)}
                    {/* {getStationName(props.idStation)} */}
                    {/*  textAlign: 'center', padding: "10px", marginLeft: "50px", marginBottom: "50px",flexShrink:0,flexBasis: "100px"  */}

                    <Card sx={{ maxWidth: 400, direction: "rtl", textAlign: 'right', width: "700px", marginLeft: "20px", lineHeight: "1ch" }} onClick={() => (handleClickOpen())}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            subheader={
                                <b> {new Date().toLocaleDateString()} </b>}
                        />
                        {props != null ?


                            < CardContent >
                                {console.log(props.idBike)}

                                <Typography variant="body2" fontSize={"large"} color="text.secondary">
                                    <b> אופניים מספר: </b>{props.idBike}
                                </Typography><br></br>
                                <Typography variant="body2" fontSize={"large"} color="text.secondary">
                                    <b>זמן תחילת שימוש: </b>{props.dateStart.toLocaleString()}
                                </Typography><br></br>
                                <Typography variant="body2" fontSize={"large"} color="text.secondary">
                                    <b> זמן סיום שימוש: </b>{new Date().toLocaleString()}
                                </Typography><br></br>
                                <Typography variant="body2" fontSize={"large"} color="text.secondary">
                                    <b>סך הכל זמן: </b> {dateDiff}
                                </Typography><br></br>
                                <Typography variant="body2" fontSize={"large"} color="text.secondary">
                                    <b>תשלום: </b>{sum}
                                </Typography><br></br>

                            </CardContent>

                            : null}
                        <Button id="opinB" onClick={() => end(props.id)}>אישור תשלום</Button>
                        <Button id="opinB" onClick={() => navigate('/introduc')}>המשך נסיעה</Button>
                        {/* nav('/Start') */}
                    </Card>
                </> : <Card sx={{ maxWidth: 345 }}>   </Card>

                }


                {
                    idBikeForReturnx == true ? <form id="formLoginR" onSubmit={() => submit()}>
                        <Card sx={{ minWidth: 80 }}>
                            <CardContent>

                                <Typography variant="h5" component="div">
                                    כרטיס אשראי
                                </Typography>
                                <br></br>


                                {/* name */}


                                <TextField fullWidth label="שם מלא" id="fullWidth" {...register("name", { required: "name is required", })} />
                                {errors.name && <p className="errorMsg">{errors.name.message}</p>}
                                <br></br><br></br>

                                {/* id */}

                                <TextField fullWidth id="fullWidth" label="ת.ז" variant="outlined"

                                    {...register("id", {
                                        required: "id is required",
                                        pattern: {
                                            value: /[1-9]{9}/,
                                            message: "Invalid id "
                                        },

                                    })} />
                                {errors.id && <p className="errorMsg">{errors.id.message}</p>}
                                <br></br><br></br>

                                {/* card */}

                                <TextField fullWidth id="fullWidth" label="מספר כרטיס אשראי" variant="outlined"

                                    InputProps={{
                                        startAdornment: <><img id="img" src="visa.png" /> <br></br>
                                            <img id="img" src="israkart.png" />
                                            <img id="img" src="אמריקאן.png" />
                                            <img id="img" src="מאסאר.png" />
                                        </>
                                    }}
                                    {...register("card", {
                                        required: "card is required",
                                        pattern: {
                                            value: /[1-9]{16}/,
                                            message: "Invalid card "
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: "Password should be until 16 numbers."
                                        }

                                    })}
                                />
                                {errors.card && <p className="errorMsg">{errors.card.message}</p>}
                                <br></br><br></br>

                                {/* date */}

                                <TextField id="outlined-basic" label="תאריך תפוגה MM/YY" variant="outlined"
                                    {...register("date", {
                                        required: "date is required",
                                        pattern: {
                                            // ???? יכול לקבל הכל בתנאי שיש את התנאי
                                            value: /^[0-31]-[1-12]$/,
                                            message: "Invalid date "
                                        },

                                    })}
                                />
                                {errors.date && <p className="errorMsg">{errors.date.message}</p>}


                                <TextField id="outlined-basic" label="CVV" variant="outlined"
                                    {...register("cvv", {
                                        required: "cvv is required",
                                        pattern: {
                                            value: /[1-9]{3}/,
                                            message: "Invalid cvv "
                                        },

                                    })}
                                />
                                {errors.cvv && <p className="errorMsg">{errors.cvv.message}</p>}

                            </CardContent>

                            {/* save */}

                            <CardActions>
                                <Button variant="contained" endIcon={<SendIcon />} id="addR" type="submit">שמור</Button>
                            </CardActions>
                        </Card>

                    </form > : null
                }

            </> :
            < BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                style={{ direction: "rtl" }}
                id="autoDismissDialog"
            >
                <DialogTitle sx={{ m: 0, p: 2, color: "rgb(26, 87, 53)" }} id="customized-dialog-title">
                    הוחזר בהצלחה 🚲
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
                        שלום,{cust.name}
                    </Typography>
                    <Typography gutterBottom>
                        בדקות הקרובות תישלח אליך קבלה למייל שלך,
                    </Typography>
                    <Typography gutterBottom>
                        תודה שבחרת להשתמש ברשת פדאל.
                    </Typography>
                    <Typography gutterBottom>
                        נשמח לראותך שוב
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        סגור
                    </Button>
                </DialogActions>

            </BootstrapDialog >
        }
    </>);
}


export default ReturnCard;