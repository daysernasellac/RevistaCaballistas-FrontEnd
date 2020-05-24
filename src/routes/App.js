import React from 'react';
import Login2 from './../pages/Login2';
import  Registro2 from '../pages/Registro2'
import HomePage from '../pages/home/home';
import {BrowserRouter, Swith, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/registro" component={Registro2}/>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={Login2}/>
    </BrowserRouter>
  );
}

export default App;
