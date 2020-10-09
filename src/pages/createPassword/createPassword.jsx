import React from 'react'
import '../../styles/createPassword.css'
import candadoIcon from '../../images/restricted.png'
import axios from 'axios';
import environment from '../../environments';

class createPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            nombreStateError: "form-control",
            show: false,
            contrasena: '',
            confContrasena: '',
            id_cliente: ''

        }

        this.handleModal = this.handleModal.bind(this);
        this.handleChangeContrase = this.handleChangeContrase.bind(this);
        this.handleChangeConfContrase = this.handleChangeConfContrase.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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

    componentDidMount() {
        const correo = localStorage.getItem('Electronico');
        this.setState({ correo });
        axios.get(environment.apiUrl + `/register/informacionCliente/correo/${correo}`)
            .then(res => {
                if (res.data === "") {
                    console.log("correo no existe")
                } else {
                    const id_cliente = res.data[0].cliente;
                    this.setState({ id_cliente })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.confContrasena === this.state.contrasena) {
            const inf = {
                correo: localStorage.getItem('Electronico'),
                contrasena: this.state.contrasena,
                tipo_estado: 1
            };
            axios.post(environment.apiUrl + `/register/finalizarRegistro`, { inf })
                .then((res) => {
                    if (res.status === 200) {
                        this.buscarUsuario();
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            this.setState({ nombreStateError: "form-control is-invalid" });
        }
    }

    buscarUsuario() {
        axios.get(environment.apiUrl + `/register/informacionClienteById/${this.state.id_cliente}`)
            .then(res => {
                if (res.data === "") {
                    console.log("usuario")
                } else {
                    localStorage.setItem('Nombre', res.data.nombres);
                    localStorage.setItem('UsuarioSession', this.state.correo);
                    alert("Contraseña establecida...")
                    localStorage.removeItem('UsuarioSession');
                    localStorage.removeItem('Nombre');
                    localStorage.removeItem('Electronico');
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <div className="wrapper2">
                <div className="container contenedorAll">
                    <h1 className="containerLink">
                        <a href="https://www.revistacaballistas.com/" title="Revista Caballistas" className="linkHome"></a>
                    </h1>
                    <div className="container-fluid contenedorMain">
                        <div className="container contenedorForm">
                            <h3 className="tituloForm">Establece tu contraseña</h3>
                            <form className="formularioLogin" onSubmit={this.handleSubmit}>
                                <div className="col-sm-12 my-1 groupInputLogin groupEmail">
                                    <label htmlFor="labelEmail" ><b>Constraseña</b><span className="obligatorio">*</span></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><img src={candadoIcon} alt="user" width="18px" /></div>
                                        </div>
                                        <input type="password" className={this.state.nombreStateError} id="labelEmail" placeholder="Nueva contraseña" required="true" onChange={this.handleChangeContrase} value={this.state.value} />
                                    </div>
                                </div>
                                <div className="col-sm-12 my-1 groupInputLogin groupContrasena">
                                    <label htmlFor="inputContrasenaLogin" ><b>Confirme contraseña</b><span className="obligatorio">*</span></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><img src={candadoIcon} alt="candado" width="18px" /></div>
                                        </div>
                                        <input type="password" className={this.state.nombreStateError} id="inputContrasenaLogin" placeholder="Confirme nueva contraseña" required="true" onChange={this.handleChangeConfContrase} value={this.state.value} onBlur={this.handleContrasenaValidation} />
                                        <div className="invalid-feedback">
                                            Las contraseñas no coinciden
                                </div>
                                    </div>
                                </div>

                                <div className="col text-center submitContenedorLogin">
                                    <button type="submit" className="btn btn-primary btn-lg btn-block btn-dark submitLogin">Establece contraseña</button>
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