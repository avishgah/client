import logo from './logo.svg';
import './App.css';
import Returns from './return/Returns';
import Takes from './take/Takes';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddUser from './AddUser/AddUser';
import Picture from './Picture';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Payment from './Payment';

function App() {
  const nav = useNavigate();

  <Routes>
    <Route path="/Payment" element={<Payment />}></Route>
  </Routes>
  return (
    // <BrowserRouter>


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
      <Picture />
      <AddUser></AddUser>
    </div>

    // </BrowserRouter>
  );
}


export default App;
