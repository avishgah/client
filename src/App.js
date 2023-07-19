import './App.css';

import { Fragment } from 'react';
import Header from './header';
import Routes from './routes';
import Footer from './footer';
import { Button, Stack } from '@mui/material';
import Takes from './take/Takes';
import AddUser from './AddUser/AddUser';
import { Route, useNavigate } from 'react-router-dom';
import Payment from './Payment';
import Start from './Start';
// import Picture from "./Picture"
import Returns from './return/Returns';
import Stepper from './Stepper';

import {useSelector} from 'react-redux'
function App() {
  const nav = useNavigate();
  const flag=useSelector(state=>state.r.Flag);

  return (<>  

     {flag==true?<Stepper/>:null}
     <Routes>
      <Route path="" element={<Start/>}/>
      <Route path="/Payment" element={<Payment />}></Route>
      <Route path="/Start" element={<Start />}></Route>
      <Route path="/Returns" element={<Returns />}></Route>
    </Routes>
    
    <Fragment>
      <Header />
      
      <Footer />
    </Fragment>
   

  </>);
}


export default App;
