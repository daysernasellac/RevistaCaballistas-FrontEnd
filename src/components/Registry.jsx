import React from 'react';
import './../styles/Registry.css'
import logoNegro from '../images/logo_negro.png'
import imgMadera from '../images/madera.png';
import { Link } from 'react-router-dom'
import InputMask from 'react-input-mask';

class Registry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formatoNumero: '',
            errorEmail: '',
            errorNombre: '',
            errorCelular: '',
            errorDireccion: '',
            estilosCssEmail: 'none',
            estilosCssNombre: 'none',
            estilosCssCelular: 'none',
            estilosCssSpanNombre: 'inline',
            estilosCssDireccion: 'none',
            estilosCssSpanCelular: 'inline',
            estilosCssSpanDireccion: 'inline',
            estilosCssSpanApellido: 'inline',
        }
        this.handleEmailValidation = this.handleEmailValidation.bind(this);
        this.handleNombreValidation = this.handleNombreValidation.bind(this);
        this.handleApellidoValidation = this.handleApellidoValidation.bind(this);
        this.handleCelularValidation = this.handleCelularValidation.bind(this);
        this.formatear = this.formatear.bind(this);
        this.handleDireccionValidation = this.handleDireccionValidation.bind(this);
    }

    handleEmailValidation(event) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(event.target.value)) {
            this.setState({
                estilosCssSpanEmail: "none",
                estilosCssEmail: "none"
            })
        } else {
            if (event.target.value === '') {
                this.setState({
                    errorEmail: 'Por favor digita tu email.',
                    estilosCssEmail: "inline-block",
                    estilosCssSpanEmail: 'inline'
                })
            } else {
                this.setState({
                    errorEmail: 'El email no es válido.',
                    estilosCssEmail: "inline-block"
                })
            }
        }
        event.preventDefault();
    }
    handleNombreValidation(event) {
        if (event.target.value === '') {
            this.setState({
                errorNombre: 'Por favor digita tu nombre.',
                estilosCssNombre: 'inline-block',
                estilosCssSpanNombre: 'inline'
            })
        } else {
            this.setState({
                estilosCssSpanNombre: 'none',
                estilosCssNombre: 'none'
            })
        }
        event.preventDefault();
    }
    handleApellidoValidation(event) {
        if (event.target.value === '') {
            this.setState({
                errorNombre: 'Por favor digita tu apellido.',
                estilosCssNombre: 'inline-block',
                estilosCssSpanApellido: 'inline'
            })
        } else {
            this.setState({
                estilosCssSpanApellido: 'none',
                estilosCssNombre: 'none'
            })
        }
        event.preventDefault();
    }
    formatear(event) {
        var str = event.target.value.replace(/[-+()\s]/g, '');
        event.target.value = str;
        this.setState({
            formatoNumero: ''
        });
    }
    handleCelularValidation(event) {
        if (event.target.value.length === 7 || event.target.value.length === 10) {
            if (/\d{3}\d{4}/.test(event.target.value) || /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/.test(event.target.value)) {
                if (event.target.value.length === 7) {
                    this.setState({
                        estilosCssSpanCelular: "none",
                        estilosCssCelular: "none",
                        formatoNumero: "999-9999"
                    })
                } else {
                    this.setState({
                        estilosCssSpanCelular: "none",
                        estilosCssCelular: "none",
                        formatoNumero: "999-999-9999"
                    })
                }
            } else {
                this.setState({
                    errorCelular: 'El celular ó telefono no es válido.',
                    estilosCssCelular: "inline-block"
                })
            }
        } else {
            if (event.target.value === '') {
                this.setState({
                    errorCelular: 'Por favor digita tu numero.',
                    estilosCssCelular: "inline-block",
                    estilosCssSpanCelular: 'inline'
                })
            } else {
                if (event.target.value.length < 7 || event.target.value.length > 10 || event.target.value.length === 8 || event.target.value.length === 9) {
                    this.setState({
                        errorCelular: 'El celular ó telefono no es válido.',
                        estilosCssCelular: "inline-block",
                        estilosCssSpanCelular: 'inline'
                    })
                }
            }
        }
        event.preventDefault();
    }
    handleDireccionValidation(event) {
        if (event.target.value === '') {
            this.setState({
                errorDireccion: 'Por favor introduce tu direccion.',
                estilosCssDireccion: 'inline-block',
                estilosCssSpanDireccion: 'inline'
            })
        } else {
            this.setState({
                estilosCssSpanDireccion: 'none',
                estilosCssDireccion: 'none'
            })
        }
        event.preventDefault();
    }


    render() {
        return (
            <div className="mainRegistry">
                <div className="contenMain">
                    <form className="formRegistry" id="formRegistry">
                        <br />
                        <img src={imgMadera} alt="img" className="maderaImg" />
                        <center>
                            <img src={logoNegro} alt="img" className="logoNegro" />
                        </center>
                        <br />

                        <div className="groupInputsCont">

                            <div className="groupInputNombre">
                                <input type="text" className="inputNombreC" required maxLength="25" value={this.state.value} onBlur={this.handleNombreValidation} />
                                <span className="highlight4"></span>
                                <span className="barNombre"></span>
                                <label className="labelNombre"><b>Nombres</b> <span style={{ color: "red", display: this.state.estilosCssSpanNombre }}>*</span></label>
                                <div className="triangunloNombre" style={{ display: this.state.estilosCssNombre }}></div>
                            </div>

                            <div className="groupInputApellido">
                                <input type="text" className="inputApellido" required maxLength="25" value={this.state.value} onBlur={this.handleApellidoValidation} />
                                <span className="highlight3"></span>
                                <span className="barApellido"></span>
                                <label className="labelApellido"><b>Apellidos</b> <span style={{ color: "red", display: this.state.estilosCssSpanApellido }}>*</span></label>
                            </div>

                            <div className="errorNombreRegistry" style={{ display: this.state.estilosCssNombre }}>
                                <p className="errorN">{this.state.errorNombre}</p>
                            </div>

                        </div>
                        <br className="separador" />
                        <br className="separador" />

                        <div className="groupInput">

                            <input type="text" className="inputCorreo" required value={this.state.value} onBlur={this.handleEmailValidation} />
                            <span className="highlight4"></span>
                            <span className="barCentro"></span>
                            <label className="labelCentro"><b>Correo Electronico</b> <span style={{ color: "red", display: this.state.estilosCssSpanEmail }}>*</span></label>
                            <div className="triangunloEmail" style={{ display: this.state.estilosCssEmail }}></div>

                            <div className="errorEmailRegistry" style={{ display: this.state.estilosCssEmail }}>
                                <p className="errorE">{this.state.errorEmail}</p>
                            </div>
                        </div>

                        <div className="groupInput">
                            <InputMask type="tel" className="inputCelular" mask={this.state.formatoNumero} maskChar="-" maxLength="10" required value={this.state.value} onBlur={this.handleCelularValidation} onClick={this.formatear} />
                            <span className="highlight4"></span>
                            <span className="barCentro"></span>
                            <label className="labelCentro"><b>Celular / Telefono</b> < span style={{ color: "red", display: this.state.estilosCssSpanCelular }}>*</span></label>
                            <div className="triangunloCelular" style={{ display: this.state.estilosCssCelular }}></div>

                            <div className="errorCelularRegistry" style={{ display: this.state.estilosCssCelular }}>
                                <p className="errorC">{this.state.errorCelular}</p>
                            </div>
                        </div>
                        <div className="groupInput">
                            <input type="text" className="inputDireccion" required maxLength="70" value={this.state.value} onBlur={this.handleDireccionValidation} />
                            <span className="highlight4"></span>
                            <span className="barCentro"></span>
                            <label className="labelCentro"><b>Direccion </b><span style={{ color: "red", display: this.state.estilosCssSpanDireccion }}>*</span></label>
                            <div className="triangunloDireccion" style={{ display: this.state.estilosCssDireccion }}></div>

                            <div className="errorDireccion" style={{ display: this.state.estilosCssDireccion }}>
                                <p className="errorD">{this.state.errorDireccion}</p>
                            </div>

                        </div>

                        <div className="selectTipoNumeroDocumentoCont">
                            <div className="selectTipoDocumentoCont">
                                <select className="selectTipoDocumento">
                                    <option defaultChecked >Tipo de Documento</option>
                                    <option required ></option>
                                </select>
                            </div>
                            <div className="inputNumeroDocumentoCont">
                                <input type="text" className="inputNumeroDocumento" required />
                                <span className="highlight5"></span>
                                <span className="barNumeroDocumento"></span>
                                <label className="labelNumeroDocumento"><b>Numero de Documento </b><span style={{ color: "red", display: this.state.estilosCssSpanDireccion }}>*</span></label>
                            </div>
                        </div>

                        <br className="separador" />
                        <div className="selectDepartamentoCiudadCont">
                            <select className="selectDepartamento" required>
                                <option >Departamento</option>
                            </select>
                            <select className="selectCiudad" required>
                                <option >Ciudad</option>
                            </select>
                        </div>
                        <br className="separador" />
                        <br />
                        <div className="groupSubmit">
                            <input type="submit" value="Ingresar" className="submitRegistry" />
                        </div>
                        <img src={imgMadera} alt="img" className="maderaImg2" />
                        <br />
                        <br />
                    </form>
                    <div className="textCon">
                        <br className="separado" />
                        <br />
                        <br />
                        <p>
                            <span className="title"><b>INFORMAR + FORMAR + ENTRENER</b></span>
                            <br />
                            <br />
                            <span className="letter"><b>S</b></span>omos un exclusivo medio de comunicacion impreso y digital que promueve,
                            difunde y reconoce las actividades caballistas en el país, entregando informacion
                            veraz y responsable, formación en diferentes áreas del conocimiento y entretenimiento
                            con todo lo que gira entorno a la industria equina colombiana.
                            <br />
                            <br />
                            <span className="letter"><b>S</b></span>omos una vitrina comercial ideal para promover e impulsar marcas de productos
                            o servicios dirigidas directa o indirectamente al público caballista, a través de la cual ofrecemos una propuesta de valor
                            para desarrollar contenidos pertinentes y coherentes que estén alineados con el propósito de las misma (publireportajes).
                        </p>
                    </div>
                </div>
            </div >
        );
    }
}

export default Registry;