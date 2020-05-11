import React from 'react'
import '../styles/Registro2.css'
import logoBlanco from '../images/logo_blanco.png'
import hourse from '../images/caballo.jpg'
import { Link } from 'react-router-dom'



class Registro2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColorHeader: 'none'
        }

        this.handleScroll = this.handleScroll.bind(this);

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        if (window.scrollY > 90) {
            this.setState({
                backgroundColorHeader: "black"
            })
        }
        if (window.scrollY < 90) {
            this.setState({
                backgroundColorHeader: "transparent"
            })
        }


    }

    render() {
        return (
            <div className="container-fluid wrapper">
                <div className="container-fluid main">
                    <div className="container-fluid sticky-top headerContenedor" style={{ backgroundColor: this.state.backgroundColorHeader }} onScroll={this.handleScroll}>
                        <div className="row">
                            <div className="col-sm columnaImg">
                                <img src={logoBlanco} alt="img" className="img-fluid logo" />
                            </div>
                            <div className="col-sm columnaLogin">
                                <div className="d-inline-flex p-2 bd-highlight loginContenedor">
                                    <p className="textCuenta">¿Ya tienes una cuenta? </p><Link to="/"><p className="botonInicioSesion">Inicia sesión</p></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container textHeader">
                        <h4><b>Regístrese gratis y obtén tu Revista!</b></h4>
                    </div>


                    <form className="formularioContenedor">
                        <div className="container inputsContenedor">
                            <div className="form-group">
                                <label htmlFor="inputNombres">Nombres</label>
                                <input type="text" className="form-control" id="inputNombres" placeholder="Nombres" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputApellido">Apellidos</label>
                                <input type="text" className="form-control" id="inputApellido" placeholder="Apellidos" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputEmail">Email</label>
                                <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
                                <small id="emailHelp" className="form-text text-muted">
                                    Ejemplo: " example@gmail.com "
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCelularTelefono">Numero de contacto</label>
                                <input type="tel" className="form-control" id="inputCelularTelefono" aria-describedby="numeroHelp" placeholder="Numero de contacto" />
                                <small id="numeroHelp" className="form-text text-muted">
                                    Ingrese su celular ó telefono fijo
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDireccion">Direccion residencial</label>
                                <input type="text" className="form-control" id="inputDireccion" placeholder="Direccion residencial" />
                            </div>

                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="selectTipoDocumento">Tipo de documento</label>
                                    <select className="custom-select" id="selectTipoDocumento">
                                        <option defaultValue>Elegir...</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="inputNumeroDocumento">Numero de documento</label>
                                    <input type="text" className="form-control" id="inputNumeroDocumento" placeholder="Numero de documento" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="selectDepartamento">Departamento</label>
                                    <select className="custom-select" id="selectDepartamento">
                                        <option defaultValue>Elegir...</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="selectCiudad">Ciudad</label>
                                    <select className="custom-select" id="selectCiudad">
                                        <option defaultValue>Elegir...</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col text-center submitContenedor">
                                <button type="submit" className="btn btn-primary submit">Submit</button>
                            </div>
                        </div>
                    </form>
                    <br/>
                </div>
            </div>

        );
    }
}

export default Registro2;