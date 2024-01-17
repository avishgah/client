import './App.css';

import { Fragment, useEffect } from 'react';
import Routes from './routes';
import { Button, Stack } from '@mui/material';
import { Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChooseStation from './component/Start/ChooseStation'
import { Camera } from '@mui/icons-material';
import Payment2 from './component/steppers/Payment2';




function App() {


    return (<>
        <Routes>
            <Route path="/" element={<ChooseStation />}></Route>
        </Routes>

        {/* <Order/> */}
        {/* <RegisterYup /> */}
        {/* <Camera/> */}
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
