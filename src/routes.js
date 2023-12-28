import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ChooseStation from './component/Start/ChooseStation'
import Register from './component/steppers/Register'
import Returns from './component/return/Returns'
import Payment2 from './component/steppers/Payment2'
import PicId from './component/steppers/PicId'
import Order from './component/order/Order'
import Connection from './component/Connection'
import Introduc from './component//Start/Introduc'
import Start from './component/Start/Start';
import Camera from './component/steppers/Camera'
import TakeOrder from './component/Start/TakeOrder';
import Stepper from './component/steppers/Stepper';
const Rout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ChooseStation />}></Route>
            </Routes>
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
            <Routes>
                <Route path="Camera" element={<Camera />}></Route>
            </Routes>
            <Routes>
                <Route path="TakeOrder" element={<TakeOrder />}></Route>
            </Routes>


        </>
    )
}

export default Rout
