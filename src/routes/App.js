import React from 'react';
import Login from './../pages/Login';
import Registro2 from '../pages/Registro2';
import HomePage from '../pages/home/home';
import pass from '../pages/createPassword/createPassword';
import {BrowserRouter, Swith, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/registro" component={Registro2}/>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={Login}/>
      <Route exact path="/pass" component={pass}/>
    </BrowserRouter>
  );
}

export default App;
