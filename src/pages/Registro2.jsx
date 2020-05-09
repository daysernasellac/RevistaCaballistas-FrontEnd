import React from 'react'
import '../styles/Registro2.css'
import logoBlanco from '../images/logo_blanco.png'
import hourse from '../images/caballo.jpg'


class Registro2 extends React.Component {
    render() {
        return (
            <div className="container main">
                <div class="container-fluid headerContenedor">
                    <div class="row">
                        <div class="col-sm">
                            <img src={logoBlanco} alt="img" className="img-fluid logo" />
                        </div>
                        <div class="col-sm">
                            <div className="d-inline-flex p-2 bd-highlight loginContenedor">
                                <p className="textCuenta">¿Ya tienes una cuenta? </p><a href="#" className="botonInicioSesion">Inicia sesión</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container textHeader">
                    <h4>Regístrese gratis y obtén tu Revista! cambio</h4>
                </div>
                <form className="formularioContenedor">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                            </small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        );
    }
}

export default Registro2;