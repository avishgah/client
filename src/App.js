import './App.css';

import { Fragment, useEffect } from 'react';
import Routes from './routes';
import { Button, Stack } from '@mui/material';
import AddUser from './component/AddUser/AddUser';
import { Route, useNavigate } from 'react-router-dom';

import Stepper from './component/steppers/Stepper';
import { useDispatch, useSelector } from 'react-redux';
import * as type from "./store/actions/actionType";
import ChooseStation from './component/Start/ChooseStation'
import Camera from './component/steppers/Camera';
import Register from './component/steppers/Register';
import RegisterYup from './component/steppers/RegisterYup';
import Order from './component/order/Order';



function App() {
    const nav = useNavigate();
    const flag = useSelector(state => state.r.Flag);

    return (<>
        <Routes>
            <Route path="/" element={<ChooseStation />}></Route>
        </Routes>

        {/* <Order/> */}
        {/* <RegisterYup /> */}
        {/* <Stepper /> */}
        {/* <Camera /> */}
        {/* <PicId /> */}
        {/* <Order/> */}
        {/* <Returns></Returns> */}
        {/* <Register /> */}

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
