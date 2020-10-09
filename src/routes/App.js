import React from 'react';
import Login from './../pages/Login';
import Registro2 from '../pages/Registro2';
import pass from '../pages/createPassword/createPassword';
import confirmacionCorreo from '../pages/ConfirmarcionEmail'
import {BrowserRouter, Route} from 'react-router-dom'
import ClientesRegistrados from '../pages/ClientesRegistrados';
import PagosRealizados from '../pages/PagosRealizados';


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/registro" component={Registro2}/>
      <Route exact path="/" component={Login}/>
      <Route exact path="/pass" component={pass}/>
      <Route exact path="/registro/confirmarCorreo" component={confirmacionCorreo}/>
      <Route exact path="/Clientes_Registrados" component={ClientesRegistrados}/>
      <Route exact path="/Pagos_Realizados" component={PagosRealizados}/>
    </BrowserRouter>
  );
}

export default App;
