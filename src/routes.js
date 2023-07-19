import React from 'react'
import Payment from './Payment';
import { Route, Routes } from 'react-router-dom'
import Returns from './return/Returns';
import Payment2 from './Payment2';
import PicId from './PicId';
import Start from './Start';

const Rout = () => {
    return (
        <>
            <Routes>
                <Route path="/Payment" element={<Payment />}></Route>
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
                <Route path="" element={<Start />}></Route>
            </Routes>

        </>
    )
}

export default Rout
