import React from 'react'
import '../../styles/Login2.css'
import userIcon from '../../images/avatar2.png'
import candadoIcon from '../../images/restricted.png'
import { Link } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';


class createPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            nombreStateError: "form-control",
            show: false,
            contrasena: '',
            confContrasena: '',
            correo: ''

        }

        this.handleModal = this.handleModal.bind(this);
        this.handleChangeContrase = this.handleChangeContrase.bind(this);
        this.handleChangeConfContrase = this.handleChangeConfContrase.bind(this);

    }
    handleChangeContrase(event) {
        this.setState({ contrasena: event.target.value });
    }

    handleChangeConfContrase(event) {
        this.setState({ confContrasena: event.target.value });
    }

    handleModal() {
        this.setState({
            show: !this.state.show
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const inf = {
            correo: 'alexius900@gmail.com',
            contrasena: "holi",
            tipo_estado: 1
        };
        axios.post(`http://localhost:8030/api/register/finalizarRegistro`, { inf })
            .then((res) => {
                debugger;
                console.log("holi")
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
                            <h3 className="tituloForm">Establece tu contraseña</h3>

                            <form className="formularioLogin">

                                <div className="col-sm-12 my-1 groupInputLogin groupEmail">
                                    <label htmlFor="labelEmail" ><b>Constraseña</b><span className="obligatorio">*</span></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><img src={candadoIcon} alt="user" width="18px" /></div>
                                        </div>
                                        <input type="password" className="form-control" id="labelEmail" placeholder="Nueva contraseña" required="true" onChange={this.handleChangeContrase} value={this.state.value}/>
                                    </div>
                                </div>
                                <hr className="separador" />
                                <div className="col-sm-12 my-1 groupInputLogin groupContrasena">
                                    <label htmlFor="inputContrasenaLogin" ><b>Confirme contraseña</b><span className="obligatorio">*</span></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><img src={candadoIcon} alt="candado" width="18px" /></div>
                                        </div>
                                        <input type="password" className="form-control" id="inputContrasenaLogin" placeholder="Confirme nueva contraseña" required="true"  onChange={this.handleChangeConfContrase} value={this.state.value}/>
                                    </div>
                                </div>

                                <div className="col text-center submitContenedorLogin">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block btn-dark submitLogin" onClick={this.handleSubmit}>Establece contraseña</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default createPassword;