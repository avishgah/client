import './App.css';

import { Fragment, useEffect } from 'react';
import Header from './header';
import Routes from './routes';
import Footer from './footer';
import { Button, Stack } from '@mui/material';
import Takes from './take/Takes';
import AddUser from './AddUser/AddUser';
import { Route, useNavigate } from 'react-router-dom';
import Payment from './Register';
import Start from './Start';
// import Picture from "./Picture"
import Returns from './return/Returns';
import Stepper from './Stepper';
import Coun from './Coun';
import { useDispatch, useSelector } from 'react-redux';
import * as type from "./store/actions/actionType";
import Register from './Register';


function App() {
  <Coun />
  const nav = useNavigate();
  const flag = useSelector(state => state.r.Flag);

  return (<>
    {/* איך משנים FLAGלFALSE */}
    {/* {flag = false} */}
    {/* {flag == true ? <Stepper /> : null} */}
    <Routes>
      <Route path="" element={<Start />} />
      <Route path="/Register" element={<Register />}></Route>
      <Route path="/Start" element={<Start />}></Route>
      <Route path="/Returns" element={<Returns />}></Route>
    </Routes>



  </>);
}


export default App;
