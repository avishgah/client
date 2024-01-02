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

import * as type from '../../store/actions/actionType';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';


import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
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



const OrderCard = ({ order, cust, index, setOrder }) => {

    const station = useSelector(state => state.r.station);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenAndCount = async () => {
        axios.put(`https://localhost:7207/api/OrderBike/${order.id}`, {})
            .then(res => {

                console.log(res.data);
                console.log("giid")
                setOrder()
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