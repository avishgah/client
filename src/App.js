import './App.css';

import { Fragment } from 'react';
import Header from './header';
import Routes from './routes';
import Footer from './footer';

function App() {


  return (
    <Fragment>
      <Header />
      <Routes />
      <Footer />
    </Fragment>
  );
}


export default App;
