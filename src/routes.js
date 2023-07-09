import React from 'react'
import Payment from './Payment';
import { Route, Routes } from 'react-router-dom'
import Returns from './return/Returns';

const Rout = () => {
    return (
        <>
            <Routes>
                <Route path="/Payment" element={<Payment />}></Route>
            </Routes>
            <Routes>
                <Route path="/Returns" element={<Returns />}></Route>
            </Routes>
        </>
    )
}

export default Rout
