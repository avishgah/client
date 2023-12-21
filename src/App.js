import './App.css';

import { Fragment, useEffect } from 'react';
import Header from './header';
import Routes from './routes';
import Footer from './footer';
import { Button, Stack } from '@mui/material';
import AddUser from './AddUser/AddUser';
import { Route, useNavigate } from 'react-router-dom';
import Payment from './Register';
import Start from './Start/Start';
// import Picture from "./Picture"
import Stepper from './Stepper';
import Coun from './Coun';
import { useDispatch, useSelector } from 'react-redux';
import * as type from "./store/actions/actionType";
import Register from './Register';
import GetBike from './GetBiKE/GetBike';
import ChooseStation from './Start/ChooseStation';
import Introduc from './Start/Introduc';
import Payment2 from './Payment2';
import PicId from './PicId';
import Connection from './Connection';
import Order from './order/Order';
import Returns from './return/Returns';
import StepByStep from './StepByStep';


function App() {
    <Coun />
    const nav = useNavigate();
    const flag = useSelector(state => state.r.Flag);

    return (<>
        <Routes>
            {/* <Route path="/" element={<ChooseStation />}></Route> */}
        </Routes>


        {/* <Stepper /> */}
        {/* <PicId /> */}
        {/* <Order/> */}
        {/* <Returns></Returns> */}
        <Register/>

        {/* <StepByStep></StepByStep> */}
        {/* <Returns/> */}
        {/* <Order></Order> */}
        {/* איך משנים FLAGלFALSE */}
        {/* {flag = false} */}
        {/* {flag == true ? <ChooseStation /> : null} */}
        {/* <GetBike/> */}
        {/* <ChooseStation /> */}

        {/* <Introduc/> */}
        {/* <Start /> */}
    </>);
}


export default App;
