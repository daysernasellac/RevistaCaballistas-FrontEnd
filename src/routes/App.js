import React from 'react';
import Login from './../pages/Login';
import Registro2 from '../pages/Registro2';
import pass from '../pages/createPassword/createPassword';
import HomeUser from '../pages/HomeUser'
import confirmacionCorreo from '../pages/ConfirmarcionEmail'
import {BrowserRouter, Swith, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/registro" component={Registro2}/>
      <Route exact path="/" component={Login}/>
      <Route exact path="/pass" component={pass}/>
      <Route exact path="/registro/confirmarCorreo" component={confirmacionCorreo}/>
      <Route exact path="/HomeUser" component={HomeUser}/>
    </BrowserRouter>
  );
}

export default App;
