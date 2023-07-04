import React from 'react'
import Payment from './Payment';
import { Route, Routes } from 'react-router-dom'

const Rout = () => {
    return (
        <>
            <Routes>
                <Route path="/Payment" element={<Payment />}></Route>
            </Routes>
        </>
    )
}

export default Rout
