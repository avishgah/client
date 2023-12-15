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
import Start from './Start/Start';
// import Picture from "./Picture"
import Returns from './return/Returns';
import Stepper from './Stepper';
import Coun from './Coun';
import { useDispatch, useSelector } from 'react-redux';
import * as type from "./store/actions/actionType";
import Register from './Register';
import GetBike from './GetBiKE/GetBike';
import ChooseStation from './Start/ChooseStation';
import Introduc from './Start/Introduc';


function App() {
  // <Coun />
  const nav = useNavigate();
  const flag = useSelector(state => state.r.Flag);

  return (<>


    {/* איך משנים FLAGלFALSE */}
    {/* {flag = false} */}
    {/* {flag == true ? <Stepper /> : null} */}
    {/* <GetBike/> */}
    {/* <ChooseStation /> */}

    <Introduc/>


  </>);
}


export default App;
