import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Returns from './return/Returns';
import Payment2 from './Payment2';
import PicId from './PicId';
import Start from './Start/Start';
import Register from './Register'
import Connection from './Connection';
import Order from './order/Order';
// import { Stepper } from '@mui/material';

import Stepper from './Stepper';
import Introduc from './Start/Introduc';
import ChooseStation from './Start/ChooseStation';



const Rout = () => {
    return (
        <>
            <Routes>
                <Route path="/Register" element={<Register />}></Route>
            </Routes>
            <Routes>
                <Route path="/Stepper" element={<Stepper />}></Route>
            </Routes>
            <Routes>
                <Route path="/Returns" element={<Returns />}></Route>
            </Routes>
            <Routes>
                <Route path="/Payment2" element={<Payment2 />}></Route>
            </Routes>

            <Routes>
                <Route path="/PicId" element={<PicId />}></Route>
            </Routes>
            <Routes>
                <Route path="/Start" element={<Start />}></Route>
            </Routes>
            <Routes>
                <Route path="/Returns/Start" element={<Start />}></Route>
            </Routes>
            <Routes>
                <Route path="/Order" element={<Order />}></Route>
            </Routes>

           

            <Routes>
                <Route path="/Connection" element={<Connection />}></Route>
            </Routes>
            {/* <Routes>
                <Route path="" element={<Start />}></Route>
            </Routes> */}
            <Routes>
                <Route path="/introduc" element={<Introduc />}></Route>
            </Routes>
            <Routes>
                <Route path="chooseStation" element={<ChooseStation />}></Route>
            </Routes>
    
        </>
    )
}

export default Rout
