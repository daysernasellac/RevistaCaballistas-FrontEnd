import React from 'react'
import imgMadera from '../images/madera.png';
import './../styles/Login.css';
import userIcon from '../images/login.png'
import logoBlanco from '../images/logo_blanco.png'
import hourse from '../images/caballo.jpg'
import { Link } from 'react-router-dom'


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            errorEmail: '',
            estilosCss: '',
            marginBottom: "17px"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ email: event.target.value });
    }
    handleSubmit(event) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(this.state.email)) {
            this.setState({
                estilosCss: 'none'
            })
        } else {
            this.setState({
                errorEmail: "El correo electrónico no es válido"
            })
            this.setState({
                estilosCss: "inline-block"
            })
            this.setState({
                marginBottom: "15px"
            })
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="mainLogin">
                <div className="containerImg">
                    <center>
                        <img src={hourse} alt="img" className="hourseImg" />
                    </center>
                </div>
                <div className="containerForm">
                    <form action="#" className="formLogin" onSubmit={this.handleSubmit}>
                        <center className="groupImg">
                            <img src={imgMadera} alt="img" className="imgMadera" />
                            <img src={logoBlanco} alt="img" className="imgLogoBlanco" />
                        </center>
                        <div className="containerMainForm">
                            <br />
                            <center className="userCont">
                                <img src={userIcon} alt="img" className="imgUserIcon" />
                            </center>
                            <br />
                            <div className="groupInputLogin">
                                <div className="groupInput2" style={{ marginBottom: this.state.marginBottom }}>
                                    <input type="text" className="inputCorreoLogin" required value={this.state.value} onChange={this.handleChange} />
                                    <span className="highlight2"></span>
                                    <span className="bar2"></span>
                                    <label className="labelLogin">Correo Electronico</label>
                                    <span className="errorEmail" style={{ display: this.state.estilosCss }}>{this.state.errorEmail}</span>
                                </div>
                                <div className="groupInput2">
                                    <input type="password" className="inputContrasena" required />
                                    <span className="highlight2"></span>
                                    <span className="bar2"></span>
                                    <label className="labelLogin">Contraseña</label>
                                </div>
                            </div>
                            <br />
                            <div className="containerSubmit">
                                <Link to="/Login2">
                                    <input type="submit" value="Ingresar" className="submitLogin" />
                                </Link>
                                <br />
                                <br />
                                <a href="https://getbootstrap.com/" className="link-pass">Olvidaste tu Contraseña?</a>
                                <br />
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;