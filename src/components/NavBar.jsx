import React from 'react';
import { Link } from 'react-router-dom'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import environment from '../environments';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            contrasenaActualaStateError: 'form-control',
            contrasenaNuevaStateError: 'form-control',
            confirmarContrasenaStateError: 'form-control',

            mensajeErrorContraActual: '',
            mensajeErrorNuevasPass: ''

        }

        this.cerrarSesion = this.cerrarSesion.bind(this);
        this.cambiarPassword = this.cambiarPassword.bind(this);
        this.cambiar = this.cambiar.bind(this);
        this.handleChangePassActual = this.handleChangePassActual.bind(this);
        this.handleChangePassNueva = this.handleChangePassNueva.bind(this);
        this.handleChangePassConfir = this.handleChangePassConfir.bind(this);
    }

    handleChangePassActual(event) {
        this.setState({ contrasenaActual: event.target.value });
    }

    handleChangePassNueva(event) {
        this.setState({ contrasenaNueva: event.target.value });
    }

    handleChangePassConfir(event) {
        this.setState({ contrasenaConfirmar: event.target.value });
    }

    navActiveOption(opcion) {
        if (opcion === 'ClientesR') {
            return "nav-item element active"
        }
    }
    navActiveOption2(opcion) {
        if (opcion === 'PagosR') {
            return "nav-item element active"
        }
    }

    cambiarPassword() {
        this.setState({
            show: !this.state.show
        });


    }

    cambiar() {
        if (this.state.contrasenaActual === localStorage.getItem('Password')) {
            if (this.state.contrasenaNueva === this.state.contrasenaConfirmar) {
                const body = {
                    id_usuario: localStorage.getItem('IdUsuario'),
                    contrasena: this.state.contrasenaNueva
                };
                axios.post(environment.apiUrl + '/password/cambiarContrasena', body)
                    .then(res => {
                        this.setState({
                            contrasenaActualaStateError: 'form-control is-valid'
                        })
                        localStorage.removeItem('UsuarioSession');
                        localStorage.removeItem('Nombre');
                        localStorage.removeItem('Electronico');
                        localStorage.removeItem('IdUsuario');
                        localStorage.removeItem('Password');
                        window.location.href = '/';

                    })
                    .catch(error => {
                        console.log(error)
                    });
            } else {
                this.setState({
                    contrasenaNuevaStateError: 'form-control is-invalid',
                    confirmarContrasenaStateError: 'form-control is-invalid',
                    mensajeErrorNuevasPass: 'Las contraseñas deben coincidir.'
                })
            }
        } else {
            this.setState({
                contrasenaActualaStateError: 'form-control is-invalid',
                mensajeErrorContraActual: 'Contraseña actual incorrecta.'
            })
        }
    }

    cerrarSesion() {
        localStorage.removeItem('UsuarioSession');
        localStorage.removeItem('Nombre');
        localStorage.removeItem('Electronico');
        localStorage.removeItem('IdUsuario');
        localStorage.removeItem('Password');
        window.location.href = '/';
    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand logoNav" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <Link to="/Clientes_Registrados">
                            <li className={this.navActiveOption(this.props.navActive)}>
                                <a className="nav-link" href="#">Clientes registrados<span className="sr-only">(current)</span></a>
                            </li>
                        </Link>
                        <Link to="/Pagos_Realizados">
                            <li className={this.navActiveOption2(this.props.navActive)}>
                                <a className="nav-link" href="#">Pagos realizados</a>
                            </li>
                        </Link>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">Ediciones</a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">Planes de suscrpcion</a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">PQR</a>
                        </li>
                    </ul>
                    <li className="nav-item dropdown">
                        <span className="dropdown-toggle navbar-text mr-3 nombreUser" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.usuario}</span>
                        <div className="dropdown-menu opcionesUser" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item listCerrarSesion" onClick={this.cambiarPassword} href="#">Cambiar contraseña</a>
                            <a className="dropdown-item listCerrarSesion" onClick={this.cerrarSesion} href="#">Cerrar Sesion</a>
                        </div>

                    </li>
                    <span className="navbar-text userIcon mr-2"></span>

                </div>

                <Modal show={this.state.show} onHide={this.cambiarPassword} centered size="lg">
                    <Modal.Header closeButton><b>Cambiar contraseña</b></Modal.Header>
                    <Modal.Body>

                        <Form className="formModal">

                            <Row>
                                <Col xs={6} md={4}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Contraseña actual</Form.Label>
                                        <Form.Control type="password" className={this.state.contrasenaActualaStateError} placeholder="Contraseña actual" onChange={this.handleChangePassActual} value={this.state.value} />
                                        <div className="invalid-feedback">
                                            {this.state.mensajeErrorContraActual}
                                        </div>
                                        <div class="valid-feedback">
                                            Contraseña cambiada correctamente
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Contraseña nueva</Form.Label>
                                        <Form.Control type="password" className={this.state.contrasenaNuevaStateError} placeholder="Contraseña nueva" onChange={this.handleChangePassNueva} value={this.state.value} />
                                        <div className="invalid-feedback">
                                            {this.state.mensajeErrorNuevasPass}
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Confirmar contraseña</Form.Label>
                                        <Form.Control type="password" className={this.state.confirmarContrasenaStateError} placeholder="Confirmar contraseña" onChange={this.handleChangePassConfir} value={this.state.value} />
                                        <div className="invalid-feedback">
                                            {this.state.mensajeErrorNuevasPass}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button className="btn-dark submitModal" onClick={this.cambiar}> Cambiar </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </nav>
        )
    }
}

export default NavBar;