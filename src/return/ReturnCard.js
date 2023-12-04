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

import Start from '../Start';
import './Return.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigation } from 'react-router-dom';

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

const ReturnCard = ({ order, props, cust, index, index2, orderBike }) => {

    // const nav = useNavigation();

    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React.useState(10);


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

    const end = (id) => {
        console.log("ll")
        const orderBike =
        {
            "dateStart": new Date(),
            "dateEnd": new Date(),
            "idBike": 31,
            "idPay": 5,
            "status": false,
            "sum": sum
        }
        console.log(orderBike)
        axios.put(`https://localhost:7207/api/OrderBike/${id}`, orderBike).then(res => {

            console.log("giid")
            alert("  שוחרר בהצלחה, אנא קח את  האופניים העונות לקוד מספר - " + id)
        }).catch(err => console.log(err))

    }
    const [expanded, setExpanded] = React.useState(false);
    const [sum, setSum] = useState(null);
    const [dateDiff, setDate] = useState(null);
    const [indexS, setindexS] = useState(0);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    var l = null;


    useEffect(() => {
        if (props != null) {
            axios.get(`https://localhost:7207/api/orderBike/calcSum/${props.id}`).then(res => {
                console.log("sum", res.data)
                setSum(res.data)
            }).catch(err => console.log(err))

            axios.get(`https://localhost:7207/api/orderBike/calcTime/${props.id}`).then(res => {
                console.log("time", res.data)
                setDate(res.data)
            }).catch(err => console.log(err))
            setindexS(props.dateStart.indexOf('T'))

        }

    }, [])


    const deleteFunc = (id) => {
        console.log(id)
    }

    return (<>
        {props != null && cust != null ? <>
            {/* {getStationName(props.idStation)} */}
            {/*  textAlign: 'center', padding: "10px", marginLeft: "50px", marginBottom: "50px",flexShrink:0,flexBasis: "100px"  */}

            <Card onClick={() => (handleClickOpen())} sx={{ maxWidth: 1000, textAlign: 'right', width: "700px", marginLeft: "20px" }}>
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
                        <b>{new Date().toLocaleDateString()}</b>}
                />
                {props != null ?

                    <CardContent>
                        <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            <b> אופניים מספר : </b>{props.id}
                        </Typography><br></br>
                        <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            {props.dateStart.substring(0, indexS) + ', ' + props.dateStart.substring(indexS + 1)} <b>  -זמן תחילת שימוש</b>
                        </Typography><br></br>
                        <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            {new Date().toLocaleString()} <b>   -זמן סיום שימוש</b>
                        </Typography><br></br>
                        <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            {dateDiff} <b> -סך הכל זמן </b>
                        </Typography><br></br>
                        <Typography variant="body2" fontSize={"large"} color="text.secondary">
                            <b>תשלום: </b>{sum}
                        </Typography><br></br>

                    </CardContent> : null}
                <Button id="opinB" onClick={() => end(props.id)}>אישור תשלום</Button>
                <Button id="opinB" >המשך נסיעה</Button>
                {/* nav('/Start') */}
            </Card>
        </> : <Card sx={{ maxWidth: 345 }}>   </Card>

        }

    </>);
}


export default ReturnCard;