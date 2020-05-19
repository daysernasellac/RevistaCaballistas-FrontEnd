import React from 'react';
import Login from './../components/Login';
import Login2 from './../pages/Login2';
import Registry from './../components/Registry'
import  Registro2 from '../pages/Registro2'
import HomePage from '../pages/home/home';
import {BrowserRouter, Swith, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <Route exact path="/Registro" component={Registry}/>
      <Route exact path="/Registro2" component={Registro2}/>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/Login2" component={Login2}/>
    </BrowserRouter>
  );
}

export default App;
