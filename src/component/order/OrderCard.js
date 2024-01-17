import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


import './order.css';

import * as type from '../../store/actions/actionType';
import { useDispatch, useSelector } from 'react-redux';


const OrderCard = ({ order, cust, index, setOrder }) => {

    const station = useSelector(state => state.r.station);
    // שחרור האופניים ועידכון הרשימה
    const handleClickOpenAndCount = async () => {
        axios.put(`https://localhost:7207/api/OrderBike/${order.id}`, {})
            .then(res => {

                console.log(res.data);
                console.log("giid")
                setOrder();
                alert("שוחרר בהצלחה 👍, לשרותך אופניים מספר: " + res.data.idBike)

            }).catch(err => console.log(err))
    }
    return (<>

        {<>
            <Card sx={{ maxWidth: 400, direction: "rtl", textAlign: 'right', width: "700px", marginLeft: "20px", lineHeight: "1ch" }}>

                {/* <Card onClick={() => (handleClickOpen())} sx={{ maxWidth: 800, textAlign: 'center', width: "600px", marginLeft: "20px" }}> */}
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
                    subheader={order.dateOrder}
                />

                <CardContent>
                    <Typography variant="body2" fontSize={"large"} color="text.secondary">
                        <b> הזמנה : {index}</b>
                    </Typography>
                    {
                        station != null ? <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            <b> לתחנה :{station.location} , {station.name}</b>
                        </Typography>
                            : null}

                    {
                        <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            <b> מספר אופניים :{order.count}</b>
                        </Typography>

                    }

                </CardContent>

                <Button onClick={() => handleClickOpenAndCount()}>שיחרור אופניים</Button>
                <Button onClick={() => navigator('/introduc')} autoFocus> ביטול </Button>

            </Card>


        </>
        }

    </>);

}


export default OrderCard;