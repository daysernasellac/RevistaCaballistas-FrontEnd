import "../styles/Login.css";
import userIcon from "../images/avatar2.png";
import candadoIcon from "../images/restricted.png";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import React from "react";
import environment from '../environments';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      correo: "",
      constrasena: "",
      nombre: "",
      loginStateError: "form-control",
      alertState: "alert alert-danger alert-dismissible fade",
      mensajeErrorLogin: "",
      correoOlvidar: "",
    };

    this.handleModal = this.handleModal.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.login = this.login.bind(this);
    this.buscarUsuario = this.buscarUsuario.bind(this);
    this.changeStateAlert = this.changeStateAlert.bind(this);
    this.buscarNombre = this.buscarNombre.bind(this);
    this.handleChangePassForg = this.handleChangePassForg.bind(this);
    this.olvidasteContrasena = this.olvidasteContrasena.bind(this);
  }

  handleChangeUser(event) {
    this.setState({ correo: event.target.value });
  }

  handleChangePass(event) {
    this.setState({ contrasena: event.target.value });
  }

  handleModal() {
    this.setState({
      show: !this.state.show,
    });
  }

  handleChangePassForg(event) {
    this.setState({ correoOlvidar: event.target.value });
  }

  olvidasteContrasena() {
    const body = {
      correo: this.state.correoOlvidar,
    };
    axios
      .post(environment.apiUrl + `/email/olvidastePassword`, body)
      .then((res) => {
        this.setState({
          alertState: "alert alert-success alert-dismissible fade show",
        });
        this.setState({ mensajeErrorLogin: "Correo enviado!" });
        this.setState({
          show: !this.state.show,
        });
        localStorage.setItem("Electronico", this.state.correoOlvidar);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(event) {
    event.preventDefault();
    let datos = {
      correo: this.state.correo,
      contrasena: this.state.contrasena,
    };

    axios
      .post(environment.apiUrl + `/login/login`, { datos })
      .then((res) => {
        if (res.data === "") {
          this.setState({ loginStateError: "form-control is-invalid" });
          this.setState({
            alertState: "alert alert-danger alert-dismissible fade show",
          });
          this.setState({
            mensajeErrorLogin: "No se pudo encontrar usuario registrado.",
          });
        } else {
          this.buscarUsuario();
          this.setState({ loginStateError: "form-control" });
          this.setState({
            alertState: "alert alert-success alert-dismissible fade show",
          });
          this.setState({ mensajeErrorLogin: "Bienvenido!" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    document.title = "Login";
  }

  buscarUsuario() {
    axios
      .get(
        environment.apiUrl + `/register/informacionCliente/correo/${this.state.correo}`
      )
      .then((res) => {
        if (res.data === "") {
          console.log("usuario");
        } else {
          let obj = res.data;

          //this.buscarNombre(obj[0]["cliente"]);

          axios
            .get(
              environment.apiUrl + `/register/informacionClienteById/${obj[0]["cliente"]}`
            )
            .then((res) => {
              this.setState({ nombre: res.data.nombres });
              localStorage.setItem("Nombre", this.state.nombre);
            })
            .catch((error) => {
              console.log(error);
            });

          localStorage.setItem("UsuarioSession", this.state.correo);

          setTimeout(() => {
            if (obj[0]["tipo_usuario"] === 1) {
              window.location.href = "/Clientes_Registrados";
            } else {
              alert("No puedes acceder, temporalmente se logean los admin...");
            }
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buscarNombre(id_cliente) {
    axios
      .get(
        environment.apiUrl + `/register/informacionClienteById/${id_cliente}`
      )
      .then((res) => {
        debugger;
        this.setState({ nombre: res.data.nombres });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeStateAlert() {
    this.setState({ alertState: "alert alert-danger alert-dismissible fade" });
  }

	render() {
		return (
      <div className="wrapper2">
        <div className="container alerts">
          <div className={this.state.alertState} role="alert">
            {this.state.mensajeErrorLogin}
            <button	type="button"	className="close"	data-dismiss="alert"	aria-label="Close" onClick={this.changeStateAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="container contenedorAll">
          <h1 className="containerLink">
            <a href="https://www.revistacaballistas.com/" title="Revista Caballistas" className="linkHome"/>
          </h1>
        </div>

        <div className="container-fluid contenedorMain">
          <div className="container contenedorForm">
            <h3 className="tituloForm">Iniciar sesión</h3>
            <form className="formularioLogin" autoComplete="off" action="/Registro" method="POST">
              <div className="col-sm-12 my-1 groupInputLogin groupEmail separador">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <img src={userIcon} alt="user" width="18px" />
                    </div>
                  </div>
                  <input type="text" className={this.state.loginStateError} id="labelEmail" placeholder="Correo electrónico" onChange={this.handleChangeUser} value={this.state.value} />
                </div>
              </div>
              <div className="col-sm-12 my-1 groupInputLogin groupContrasena separador">
                <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <img src={candadoIcon} alt="candado" width="18px" />
                      </div>
                    </div>
                    <input
                      type="password"
                      aria-describedby="numeroHelp"
                      className={this.state.loginStateError}
                      id="inputContrasenaLogin"
                      placeholder="Contraseña"
                      onChange={this.handleChangePass}
                      value={this.state.value}
                    />
                  </div>
              </div>

              <div className="col text-center submitContenedorLogin separador">
                  <button
                    type="submit"
                    to="/Registro"
                    className="btn btn-primary btn-lg btn-block btn-dark submitLogin"
                    onClick={this.login}
                  >
                    Ingresar
                  </button>
                </div>
              </form>
              <div className="container-fluid footerLogin">
                <p> ¿Aún no tiene una cuenta?{" "}
                  <Link to="/Registro">
                    <b className="linkRegistroLogin">Regístrate</b>
                  </Link>
                </p>
              </div>
            </div>
            <p className="textContrasena" onClick={this.handleModal}>
              ¿Olvidaste tu contraseña?
            </p>
            <Modal show={this.state.show} onHide={this.handleModal}>
              <Modal.Header closeButton>
                <b>Restablecer la contraseña</b>
              </Modal.Header>
              <Modal.Body>
                Ingrese su dirección de correo electrónico a continuación y le
                enviaremos un enlace para restablecer su contraseña.
                <Form className="formModal">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      className={this.state.loginStateError}
                      placeholder="Ingresa email"
                      onChange={this.handleChangePassForg}
                      value={this.state.value}
                    />
                  </Form.Group>
                  <Button
                    className="btn-dark submitModal"
                    onClick={this.olvidasteContrasena}
                  >
                    Enviar
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
        </div>
      </div>
    );
	}
}

export default Login;
