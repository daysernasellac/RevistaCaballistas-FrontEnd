import React from 'react';
import Login2 from './../pages/Login2';
import Registro2 from '../pages/Registro2';
import HomePage from '../pages/home/home';
import pass from '../pages/createPassword/createPassword';
import HomeUser from '../pages/HomeUser'
import confirmacionCorreo from '../pages/ConfirmarcionEmail'
import {BrowserRouter, Swith, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/registro" component={Registro2}/>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={Login2}/>
      <Route exact path="/pass" component={pass}/>
      <Route exact path="/registro/confirmarCorreo" component={confirmacionCorreo}/>
      <Route exact path="/HomeUser" component={HomeUser}/>
    </BrowserRouter>
  );
}

export default App;
