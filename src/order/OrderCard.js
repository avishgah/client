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
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


import './order.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

const OrderCard = ({ order, props, cust, index, index2, orderBike }) => {


    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React.useState(10);


    const [orderB, setOrderBike] = React.useState([]);



    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenAndCount = (id) => {
        setOpen(true);
        setCount(Math.max(count - 1, 0))
        console.log(id)

        const orderBike =
        {
            "dateStart": new Date(),
            "dateEnd": new Date(),
            "idBike": 31,
            "idPay": 5,
            "status": true,
            "sum": 0
        }
        console.log(orderBike)
        axios.put(`https://localhost:7207/api/OrderBike/${id}`, orderBike).then(res => {

            console.log("giid")
            alert("הוחזר בהצלחה ! אנא הנח את האופניים בעמדה")
        }).catch(err => console.log(err))

    };

    const handleClose = () => {
        setOpen(false);
    };

    const [expanded, setExpanded] = React.useState(false);
    const [stationO, setStation] = useState(null);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    var l = null;


    const getO = async () => {
        try {
            const resolvedArray = await order(props.id); // Await the resolved array
            console.log('Resolved Array:', resolvedArray); // Output the resolved array
            setOrderBike(resolvedArray)
            // Use the resolved array as needed
        } catch (error) {
            console.error('Error:', error); // Handle errors if the Promise is rejected
        }
    }
    useEffect(() => {
        axios.get(`https://localhost:7207/api/Station/${props.idStation}`).then(res => {
            console.log(res.data)
            l = res.data;
            setStation(res.data);
            setCount(orderB.length)
            // setOrderBike(order(props.id))
            console.log(orderB)
            getO();

        }).catch(err => (console.log(err)))


    }, [])

    const deleteFunc = (id) => {
        console.log(id)
    }

    // const getStationName = async (id) => {
    //     const x = await axios.get(`https://localhost:7207/api/Station/${id}`).then(res => {
    //         console.log(res.data)
    //         l = res.data;
    //         setStation(res.data);
    //     })
    //     return l.name;
    // }


    return (<>
        {props != null && cust != null && orderB.length != 0 ? <>
            {console.log('Resolved Array:', orderB)}
            {console.log("order bike :", orderBike)}
            {
              console.log(count)
            }
            {/* {getStationName(props.idStation)} */}
            {/*  textAlign: 'center', padding: "10px", marginLeft: "50px", marginBottom: "50px",flexShrink:0,flexBasis: "100px"  */}

            <Card onClick={() => (handleClickOpen())} sx={{maxWidth: 800, textAlign: 'center',width:"600px",marginLeft:"20px" }}>
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
                    subheader={props.dateOrder}
                />

                <CardContent>
                    <Typography variant="body2" fontSize={"large"} color="text.secondary">
                        <b> הזמנה : {index}</b>
                    </Typography><br></br>{
                        stationO != null ? <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            <b> לתחנה :{stationO.location} , {stationO.name}</b>
                        </Typography>
                            : null}

                    {
                        orderBike != null ? <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            <b> מספר אופניים :{orderB.length}</b>
                        </Typography>
                            : null
                    }

                </CardContent>
                <Button id="opinB">delete</Button>
                <Button id="opinB">cancele</Button>

            </Card>




            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {" לרשותך "}
                    {count}
                    {" אפניים בהזמנה "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ,תרצה לשחרר אוניים נוספות ? לחיצה על אישור תשחרר אופניים נוספות
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={() => handleClickOpenAndCount(orderB[0].id)}>שיחרור</Button>
                    <Button onClick={handleClose} autoFocus> ביטול </Button>
                </DialogActions>
            </Dialog></> : <Card sx={{ maxWidth: 345 }}>   </Card>

        }

    </>);
}


export default OrderCard;