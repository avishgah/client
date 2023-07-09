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
// import Picture from "./Picture"

function App() {
  const nav = useNavigate();

  return (<>

    <Routes>
      <Route path="/Payment" element={<Payment />}></Route>
      
    </Routes>

    <div className="App">
      <h1>ברוכים הבאים</h1>
      <Stack direction="row" spacing={2}>
        {/* <Button color="secondary">Secondary</Button> */}
        <Button variant="contained" color="success" onClick={() => nav('/Payment')} >
          לקחת
        </Button>

        <Button variant="contained" color="success" onClick="">
          להחזיר
        </Button>
      </Stack>

      <Takes></Takes>
      {/* <Picture /> */}
      <AddUser></AddUser>
    </div>

    <Fragment>
      <Header />
      <Routes />
      <Footer />
    </Fragment>
  </>);
}


export default App;
