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
function App() {
  const nav = useNavigate();

  return (<>

    <Routes>
      <Route path="/Payment" element={<Payment />}></Route>
    </Routes>
    <Routes>
      <Route path="/Start" element={<Start />}></Route>
    </Routes>
    <Routes>
      <Route path="/Returns" element={<Returns />}></Route>
    </Routes>
<Start></Start>
    <Fragment>
      <Header />
      <Routes />
      <Footer />
    </Fragment>
  </>);
}


export default App;
