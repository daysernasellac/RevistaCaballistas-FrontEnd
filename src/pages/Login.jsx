import React from 'react'
import '../styles/Login.css'
import userIcon from '../images/avatar2.png'
import candadoIcon from '../images/restricted.png'
import { Link } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombreStateError: "form-control",
            show: false,
            correo: '',
            constrasena: '',
        }

        this.handleModal = this.handleModal.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.login = this.login.bind(this);
        this.buscarUsuario = this.buscarUsuario.bind(this);

        
    }

    handleChangeUser(event) {
        this.setState({ correo: event.target.value });
    }

    handleChangePass(event) {
        this.setState({ contrasena: event.target.value });
    }

    handleModal() {
        this.setState({
            show: !this.state.show
        });
    }

    login(event) {
        event.preventDefault();
        let datos ={
            correo : this.state.correo,
            contrasena : this.state.contrasena

        }
        debugger;
        axios.post(`http://localhost:8030/api/login/login`, {datos})
        .then(res => {
            debugger;
            if (res.data === "") {
                console.log("usuario no registrado en la base de datos");
            } else {
                this.buscarUsuario(res.data.cliente);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    buscarUsuario(id_cliente) {
        axios.get(`http://localhost:8030/api/register/informacionClienteById/${id_cliente}`)
            .then(res => {
                if (res.data == "") {
                   console.log("usuario")
                } else{
                    debugger;
                    localStorage.setItem('Nombre', res.data.nombres)
                    window.location.href= '/home';
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <div className="container-fluid wrapper2">
                <div className="container contenedorAll">

                    <h1 className="containerLink">
                        <a href="https://www.revistacaballistas.com/" title="Revista Caballistas" className="linkHome"></a>
                    </h1>

                    <div className="container-fluid contenedorMain">
                        <div className="container contenedorForm">
                            <h3 className="tituloForm">Ingrese a su cuenta</h3>

                            <form className="formularioLogin" autocomplete="off" action="/Registro" method="POST">

                                <div className="col-sm-12 my-1 groupInputLogin groupEmail">
                                    <label htmlFor="labelEmail" ><b>Email</b></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><img src={userIcon} alt="user" width="18px" /></div>
                                        </div>
                                        <input type="text" className="form-control" id="labelEmail" placeholder="Email" onChange={this.handleChangeUser} value={this.state.value} />
                                    </div>
                                </div>
                                <hr className="separador" />
                                <div className="col-sm-12 my-1 groupInputLogin groupContrasena">
                                    <label htmlFor="inputContrasenaLogin" ><b>Contraseña</b></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><img src={candadoIcon} alt="candado" width="18px" /></div>
                                        </div>
                                        <input type="password" className="form-control" id="inputContrasenaLogin" placeholder="Contraseña" onChange={this.handleChangePass} value={this.state.value} />
                                    </div>
                                </div>

                                <div className="col text-center submitContenedorLogin">
                                    <button type="submit" to="/Registro" className="btn btn-primary btn-lg btn-block btn-dark submitLogin" onClick={this.login} onSu>Ingresar</button>
                                </div>
                            </form>

                            <hr className="separadorInferior" />

                            <div className="container-fluid footerLogin">
                                <p>Aun no tienes una cuenta? <Link to="/Registro"><b className="linkRegistroLogin">Regístrate</b></Link></p>
                            </div>

                        </div>
                        <p className="textContrasena" onClick={this.handleModal}>¿Olvidaste tu contraseña?</p>

                        <Modal show={this.state.show} onHide={this.handleModal}>
                            <Modal.Header closeButton><b>Restablecer la contraseña</b></Modal.Header>
                            <Modal.Body>
                                Ingrese su dirección de correo electrónico a continuación
                                y le enviaremos un enlace para restablecer su contraseña.
                                
                                <Form className="formModal">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Button className="btn-dark submitModal" onClick={this.handleModal}>
                                        Enviar
                                    </Button>
                                </Form>
                            </Modal.Body>


                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;