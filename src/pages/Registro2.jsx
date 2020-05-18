import React from 'react'
import '../styles/Registro2.css'
import logoBlanco from '../images/logo_blanco.png'
import { Link } from 'react-router-dom'
import InputMask from 'react-input-mask';
import axios from 'axios';


class Registro2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColorHeader: 'none',

            //Formatos
            formatoNumero: '',
            //Campos registro
            nombres: '',
            apellidos: '',
            email: '',
            numeroContacto: '',
            direccion: '',
            numeroDocumento: '',
            tipoDocumento: '',
            departamento: '',
            ciudad: '',
            //Control validacion de errores
            nombreStateError: 'form-control',
            apellidoStateError: 'form-control',
            emailStateError: 'form-control',
            numeroStateError: 'form-control',
            direccionStateError: 'form-control',
            tipoDocumetoStateError: 'custom-select',
            numeroDocumentoStateError: 'form-control',
            departamentoStateError: 'custom-select',
            ciudadStateError: 'custom-select',
            //Mensajes error
            mensajeErrorEmail: '',
            mensajeErrorCelular: '',
            mensajeErrorDireccion: '',
            mensajeErrorNumeroDocumento: '',

            tipoDocumentos: {},
            listaDepartamentos: {},
            listaMunicipios: {}

        }

        //is-invalid

        this.handleScroll = this.handleScroll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeCelular = this.handleChangeCelular.bind(this);
        this.handleChangeDireccion = this.handleChangeDireccion.bind(this);
        this.handleChangeTipoDocumento = this.handleChangeTipoDocumento.bind(this);
        this.handleChangeNumeroDocumento = this.handleChangeNumeroDocumento.bind(this);
        this.handleChangeDepartamento = this.handleChangeDepartamento.bind(this);
        this.handleChangeCiudad = this.handleChangeCiudad.bind(this);

        this.handleCelularValidation = this.handleCelularValidation.bind(this);
        this.handleEmailValidation = this.handleEmailValidation.bind(this);
        this.handleDireccionValidation = this.handleDireccionValidation.bind(this);
        this.handleNumeroDocumentoValidation = this.handleNumeroDocumentoValidation.bind(this);
        this.handleNombreValidation = this.handleNombreValidation.bind(this);
        this.handleApellidoValidation = this.handleApellidoValidation.bind(this);
        this.formatear = this.formatear.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        axios.get('http://localhost:8030/api/core/tipoDocumentos')
            .then(res => {
                const tipoDocumentos = res.data;
                this.setState({ tipoDocumentos });
            })
            .catch(error => {
                console.log(error)
            });

        axios.get('http://localhost:8030/api/core/departamentos')
            .then(res => {
                const listaDepartamentos = res.data;
                this.setState({ listaDepartamentos });
            })
            .catch(error => {
                console.log(error)
            });




    }

    parseTipoDocumento(tipoDocumentos) {
        if (tipoDocumentos.length > 0) {
            return tipoDocumentos.map(function (tipoDocumento, index) {
                return (
                    <option key={index}>{tipoDocumento.abreviatura}</option>
                )
            })
        }
    }

    parseDepartamentos(departamentos) {
        if (departamentos.length > 0) {
            return departamentos.map(function (departamento, index) {
                return (
                    <option key={index} value={departamento.id_departamento} >{departamento.nombre_departamento}</option>

                )
            })
        }
    }



    parseMunicipios(municipios) {
        if (municipios.length > 0) {
            return municipios.map(function (municipios, index) {
                return (
                    <option key={index} value={municipios.id_municipio} >{municipios.nombre_municipios}</option>
                )
            })
        }
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

    onClickPrueba(event) {
        console.log("Id " + event.target.value);
        axios.get('http://localhost:8030/api/core/municipios/:tipo_departamento',
            event.target.value)
            .then(res => {
                console.log(this.state.departamento)
                const listaMunicipios = res.data;
                this.setState({ listaMunicipios });
            })
            .catch(error => {
                console.log(error)
            });
    }

    handleSubmit(event) {
        //Validacion campos
        if (this.state.nombres === '' || this.state.nombreStateError === "form-control is-invalid") {
            this.setState({ nombreStateError: "form-control is-invalid" })
            event.preventDefault()
        }
        if (this.state.apellidos === '' || this.state.apellidoStateError === "form-control is-invalid") {
            this.setState({ apellidoStateError: "form-control is-invalid" })
            event.preventDefault()
        }
        if (this.state.email === '' || this.state.emailStateError === "form-control is-invalid") {
            this.setState({ emailStateError: "form-control is-invalid" })
            this.setState({ mensajeErrorEmail: "Por favor digita tu email." })
            event.preventDefault()
        }
        if (this.state.numeroContacto === '' || this.state.numeroStateError === "form-control is-invalid") {
            this.setState({ numeroStateError: "form-control is-invalid" })
            this.setState({ mensajeErrorCelular: "Por favor digita tu numero." })
            event.preventDefault()
        }
        if (this.state.direccion === '' || this.state.direccionStateError === "form-control is-invalid") {
            this.setState({ direccionStateError: "form-control is-invalid" })
            this.setState({ mensajeErrorDireccion: "Por favor digita tu direccion." })
            event.preventDefault()
        }
        if (this.state.tipoDocumento === '') {
            this.setState({ tipoDocumetoStateError: "custom-select is-invalid" })
            event.preventDefault()
        }
        if (this.state.numeroDocumento === '' || this.state.numeroDocumentoStateError === "form-control is-invalid") {
            this.setState({ numeroDocumentoStateError: "form-control is-invalid" })
            this.setState({ mensajeErrorNumeroDocumento: "Por favor digita tu numero de documento." })
            event.preventDefault()
        }
        if (this.state.departamento === '') {
            this.setState({ departamentoStateError: "custom-select is-invalid" })
            event.preventDefault()
        }
        if (this.state.ciudad === '') {
            this.setState({ ciudadStateError: "custom-select is-invalid" })
            event.preventDefault()
        }

    }

    handleApellidoValidation(event) {
        if (event.target.value !== " ") {
            this.setState({ apellidoStateError: "form-control" })
        }
    }

    handleNombreValidation(event) {
        if (event.target.value !== " ") {
            this.setState({ nombreStateError: "form-control" })
        }
    }

    handleDireccionValidation(event) {
        if (event.target.value.length < 10 && event.target.value.length !== 0) {
            this.setState({
                direccionStateError: "form-control is-invalid",
                mensajeErrorDireccion: "La dirreccion debe tener minimo 10 caracteres."
            })
        } else {
            if (event.target.value.length === 0) {
                this.setState({
                    direccionStateError: "form-control is-invalid",
                    mensajeErrorDireccion: "Por favor digita tu direccion."
                })
            } else {
                this.setState({
                    direccionStateError: "form-control",
                    mensajeErrorDireccion: " "
                })
            }
        }

    }

    handleNumeroDocumentoValidation(event) {
        if (event.target.value.length >= 8 && /^\d*$/.test(event.target.value) || event.target.value.length === 11 && /^\d*$/.test(event.target.value)) {
            this.setState({
                numeroDocumentoStateError: "form-control",
                mensajeErrorNumeroDocumento: " "
            })
        } else {
            if (event.target.value.length !== 0) {
                this.setState({
                    numeroDocumentoStateError: "form-control is-invalid",
                    mensajeErrorNumeroDocumento: "Numero de documento invalido."
                })

            } else {
                this.setState({
                    numeroDocumentoStateError: "form-control is-invalid",
                    mensajeErrorNumeroDocumento: "Por favor digita tu numero de documento."
                })
            }

        }

    }

    handleEmailValidation(event) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(event.target.value)) {
            this.setState({
                emailStateError: "form-control",
                mensajeErrorEmail: ""
            })
        } else {
            if (event.target.value === "") {
                this.setState({
                    mensajeErrorEmail: 'Por favor digita tu email.',
                    emailStateError: "form-control is-invalid"
                })
            } else {
                this.setState({
                    mensajeErrorEmail: 'El email no es válido.',
                    emailStateError: "form-control is-invalid"
                })
            }

        }

    }

    handleCelularValidation(event) {
        if (event.target.value.length === 7 || event.target.value.length === 10) {
            if (/\d{3}\d{4}/.test(event.target.value) || /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/.test(event.target.value)) {
                if (event.target.value.length === 7) {
                    this.setState({
                        numeroStateError: 'form-control',
                        formatoNumero: "999-9999",
                        mensajeErrorCelular: '',
                        numeroStateError: 'form-control'
                    })
                } else {
                    this.setState({
                        numeroStateError: 'form-control',
                        formatoNumero: "999-999-9999",
                        mensajeErrorCelular: '',
                        numeroStateError: 'form-control'
                    })
                }
            } else {
                this.setState({
                    mensajeErrorCelular: 'El celular ó telefono no es válido.',
                    numeroStateError: 'form-control is-invalid'
                })
            }
        } else {
            if (event.target.value.length < 7 && event.target.value.length !== 0 || event.target.value.length > 10 || event.target.value.length === 8 || event.target.value.length === 9) {
                this.setState({
                    mensajeErrorCelular: 'El celular ó telefono no es válido.',
                    numeroStateError: "form-control is-invalid"
                })
            } else {
                this.setState({
                    mensajeErrorCelular: 'Por favor digita tu numero.',
                    numeroStateError: "form-control is-invalid"
                })
            }

        }
    }
    formatear(event) {
        var str = event.target.value.replace(/[-+()\s]/g, '');
        event.target.value = str;
        this.setState({
            formatoNumero: ''
        });
    }

    handleChangeNombre(event) {
        this.setState({ nombres: event.target.value });
    }
    handleChangeApellido(event) {
        this.setState({ apellidos: event.target.value });
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleChangeCelular(event) {
        this.setState({ numeroContacto: event.target.value });
    }
    handleChangeDireccion(event) {
        this.setState({ direccion: event.target.value });
    }
    handleChangeTipoDocumento(event) {
        this.setState({ tipoDocumento: event.target.value });
    }
    handleChangeNumeroDocumento(event) {
        this.setState({ numeroDocumento: event.target.value });
    }
    handleChangeDepartamento(event) {
        this.setState({ departamento: event.target.value });
        console.log(this.state.departamento);
    }
    handleChangeCiudad(event) {
        this.setState({ ciudad: event.target.value });
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

                    <form className="formularioContenedor" action="" method="POST" onSubmit={this.handleSubmit}>
                        <div className="container inputsContenedor">
                            <div className="form-group">
                                <label htmlFor="inputNombres">Nombres <span className="obligatorio">*</span></label>
                                <input type="text" className={this.state.nombreStateError} id="inputNombres" placeholder="Nombres" onChange={this.handleChangeNombre} value={this.state.value} onBlur={this.handleNombreValidation} />
                                <div className="invalid-feedback">
                                    Por favor digita tu nombre.
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputApellido">Apellidos <span className="obligatorio">*</span></label>
                                <input type="text" className={this.state.apellidoStateError} id="inputApellido" placeholder="Apellidos" onChange={this.handleChangeApellido} value={this.state.value} onBlur={this.handleApellidoValidation} />
                                <div className="invalid-feedback">
                                    Por favor digita tu apellido.
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputEmail">Email <span className="obligatorio">*</span></label>
                                <input type="email" className={this.state.emailStateError} id="inputEmail" aria-describedby="emailHelp" placeholder="Email" onChange={this.handleChangeEmail} value={this.state.value} onBlur={this.handleEmailValidation} />
                                <div className="invalid-feedback">
                                    {this.state.mensajeErrorEmail}
                                </div>
                                <small id="emailHelp" className="form-text text-muted">
                                    Ejemplo: " example@gmail.com "
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCelularTelefono">Numero de contacto <span className="obligatorio">*</span></label>
                                <InputMask type="text" className={this.state.numeroStateError} mask={this.state.formatoNumero} maskChar="-" id="inputCelularTelefono" aria-describedby="numeroHelp" placeholder="Numero de contacto" onChange={this.handleChangeCelular} value={this.state.value} onBlur={this.handleCelularValidation} onClick={this.formatear} />
                                <div className="invalid-feedback">
                                    {this.state.mensajeErrorCelular}
                                </div>
                                <small id="numeroHelp" className="form-text text-muted">
                                    Ingrese su celular ó telefono fijo
                                </small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDireccion">Direccion residencial <span className="obligatorio">*</span></label>
                                <input type="text" className={this.state.direccionStateError} id="inputDireccion" placeholder="Direccion residencial" onChange={this.handleChangeDireccion} value={this.state.value} onBlur={this.handleDireccionValidation} />
                                <div className="invalid-feedback">
                                    {this.state.mensajeErrorDireccion}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="selectTipoDocumento">Tipo de documento <span className="obligatorio">*</span></label>
                                    <select className={this.state.tipoDocumetoStateError} id="selectTipoDocumento" onChange={this.handleChangeTipoDocumento} value={this.state.value} >
                                        <option defaultValue value=" ">Elegir...</option>
                                        {this.parseTipoDocumento(this.state.tipoDocumentos)}
                                    </select>
                                    <div className="invalid-feedback">Selecciona un tipo de documento.</div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="inputNumeroDocumento">Numero de documento <span className="obligatorio">*</span></label>
                                    <input type="text" className={this.state.numeroDocumentoStateError} id="inputNumeroDocumento" placeholder="Numero de documento" onChange={this.handleChangeNumeroDocumento} value={this.state.value} onBlur={this.handleNumeroDocumentoValidation} />
                                    <div className="invalid-feedback">
                                        {this.state.mensajeErrorNumeroDocumento}
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="selectDepartamento">Departamento <span className="obligatorio">*</span></label>
                                    <select className={this.state.departamentoStateError} onClick={this.onClickPrueba} id="selectDepartamento" onChange={this.handleChangeDepartamento} value={this.state.value} >
                                        <option defaultValue value=" ">Elegir...</option>
                                        {this.parseDepartamentos(this.state.listaDepartamentos)}
                                    </select>
                                    <div className="invalid-feedback">
                                        Selecciona un departamento.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="selectCiudad">Ciudad <span className="obligatorio">*</span></label>
                                    <select className={this.state.ciudadStateError} id="selectCiudad" onChange={this.handleChangeCiudad} value={this.state.value}  >
                                        <option defaultValue value=" ">Elegir...</option>
                                        {this.parseMunicipios(this.state.listaMunicipios)}
                                    </select>
                                    <div className="invalid-feedback">
                                        Selecciona una ciudad.
                                    </div>
                                </div>
                            </div>
                            <div className="col text-center submitContenedor">
                                <button type="submit" className="btn btn-primary submit">Submit</button>
                            </div>
                        </div>
                    </form>
                    <br />
                </div>
            </div>

        );
    }
}

export default Registro2;