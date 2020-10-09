import React from 'react'
import '../styles/ClientesRegistrados.css'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import environment from '../environments';


class ClientesRegistrados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaClientes: {},
            search: '',
            typeSearh: 'numero_documento',
            styleButtoms: 'none',
            id_cliente: '',
            show: false,
            show2: false,

            editId: '',
            editCorreo: '',
            editNumeroDocumento: '',
            editNombres: '',
            editApellidos: ''
        }

        this.select = this.select.bind(this);
        this.select2 = this.select2.bind(this);
        this.handelData = this.handelData.bind(this);
        this.operatorAction = this.operatorAction.bind(this);
        this.buscarUsuarios = this.buscarUsuarios.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleModal2 = this.handleModal2.bind(this);
        this.handleChangeCorreo = this.handleChangeCorreo.bind(this);
        this.handleChangeCedula = this.handleChangeCedula.bind(this);
        this.handleChangeNombres = this.handleChangeNombres.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangeTypeSearch = this.handleChangeTypeSearch.bind(this);
        
    }

    componentDidMount() {
        const nombreUser = localStorage.getItem('Nombre');
        const correo = localStorage.getItem('UsuarioSession');
        const navActive = "ClientesR";
        this.setState({ navActive });
        this.setState({ nombreUser });
        this.setState({ correo });
        axios.get(environment.apiUrl +`/register/informacionCliente/correo/${correo}`)
            .then(res => {
                if (res.data === "") {
                    console.log("correo no existe")
                } else {
                    const tipo_usuario = res.data[0].tipo_usuario;
                    this.setState({ tipo_usuario })
                    localStorage.setItem('IdUsuario', res.data[0].id_usuario);
                    localStorage.setItem('Password', res.data[0].contrasena);
                    this.buscarUsuarios()
                }
            })
            .catch(error => {
                console.log(error)
            });


    }


    select(id) {
        axios.post(environment.apiUrl + `/register/deleteUsuarioById/${id}`)
            .then(res => {
                this.buscarUsuarios()
                this.setState({
                    show: !this.state.show
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    select2() {
        let datos = {
            id_cliente: this.state.editId,
            numero_documento: this.state.editNumeroDocumento,
            nombres: this.state.editNombres,
            apellidos: this.state.editApellidos,
            correo: this.state.editCorreo
        }


        axios.post(environment.apiUrl + `/register/updateUser`, datos)
            .then(res => {
                this.buscarUsuarios()
                this.setState({
                    show2: !this.state.show2
                })
            })
            .catch(error => {
                console.log(error)
            });
    }

    buscarUsuarios() {
        axios.get(environment.apiUrl + '/register/findInfoUsuarioById')
            .then(res => {
                const listaClientes = res.data;
                this.setState({ listaClientes });
            })
            .catch(error => {
                console.log(error)
            });
    }

    handelData(event) {
        this.setState({
            search: event.target.value.substr(0, 20)
        })

    }

    operatorAction(event) {
        //alert(event.target.value)
        this.setState({
            styleButtoms: "inline",
            id_cliente: event.target.value
        })


    }

    handleModal() {
        this.setState({
            show: !this.state.show
        });
    }

    handleModal2() {
        this.setState({
            show2: !this.state.show2
        });
        let userEdit = this.state.listaClientes;
        var number = parseInt(this.state.id_cliente);

        const result = userEdit.find(x => x.id_cliente === number);

        this.setState({
            editId: result.id_cliente,
            editCorreo: result.correo,
            editNumeroDocumento: result.numero_documento,
            editNombres: result.nombres,
            editApellidos: result.apellidos
        })


    }

    handleChangeCorreo(event) {
        this.setState({ editCorreo: event.target.value });
    }

    handleChangeCedula(event) {
        this.setState({ editNumeroDocumento: event.target.value });
    }

    handleChangeNombres(event) {
        this.setState({ editNombres: event.target.value });
    }

    handleChangeApellido(event) {
        this.setState({ editApellidos: event.target.value });
    }

    handleChangeTypeSearch(event) {
        this.setState({ typeSearh: event.target.value });
    }


    render() {

        let obj = Array.from(this.state.listaClientes);
        let typeS = this.state.typeSearh;
        let filterData = obj.filter(
            (cliente) => {
                if(typeS === 'numero_documento'){
                    return cliente.numero_documento.indexOf(this.state.search) !== -1;
                }else if(typeS === 'correo'){
                    return cliente.correo.indexOf(this.state.search) !== -1;
                }else if(typeS === 'nombres'){
                    return cliente.nombres.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }else if(typeS === 'apellidos'){
                    return cliente.apellidos.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
                
            })

        return (

            <div className="mainHome">
                <NavBar usuario={this.state.nombreUser} navActive={this.state.navActive}></NavBar>

                <br />
                <br />
                <br />
                <br />

                <div className="container search">
                    <div className="d-flex justify-content-center">
                        <div className="searchbar">
                            <input
                                className="search_input"
                                type="text"
                                value={this.state.value}
                                placeholder="Buscar..." onChange={this.handelData}
                            />
                            <span className="search_icon">
                                <i className="fas fa-search" />
                            </span>
                        </div>
                    </div>

                    <center>
                        <select className="custom-select" id="inlineFormCustomSelect" style={{ width: '150px', marginTop: '10px' }} onChange={this.handleChangeTypeSearch} value={this.state.value}>
                            <option selected>Buscar por...</option>
                            <option value="numero_documento">Cedula</option>
                            <option value="nombres">Nombre</option>
                            <option value="apellidos">Apellido</option>
                            <option value="correo">Correo</option>
                        </select>

                    </center>


                </div>



                <br />

                <div className="container">
                    <button type="button" className="btn btn-danger" style={{ marginRight: "5px", display: this.state.styleButtoms }} onClick={this.handleModal}>Eliminar</button>
                    <button type="button" className="btn btn-primary" style={{ display: this.state.styleButtoms }} onClick={this.handleModal2}>Editar</button>
                    <br />
                    <br />
                    <table className="table table-striped table-light table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Cedula</th>
                                <th scope="col">Nombre Completo</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterData.map((listaCliente, index) => {
                                    return (
                                        <tr key={index} >
                                            <td >{listaCliente.numero_documento}</td>
                                            <td>{listaCliente.nombres + " " + listaCliente.apellidos}</td>
                                            <td>{listaCliente.correo}</td>
                                            <td>

                                                <input style={{ marginLeft: '40px' }} className="form-check-input" type="radio" value={listaCliente.id_cliente} name="checkOperator" onClick={this.operatorAction} />

                                            </td>
                                        </tr >
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <Modal show={this.state.show} onHide={this.handleModal} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Verificar eliminacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Esta seguro que desea eliminar este usuario?
                            </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal}>Cancelar</Button>
                        <Button variant="primary" onClick={() => this.select(this.state.id_cliente)}>Continuar</Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.show2} onHide={this.handleModal2} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar datos del usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="id_cliente" className="col-form-label">ID:</label>
                                <input type="text" className="form-control" id="id_cliente" defaultValue={this.state.editId} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo" className="col-form-label">Correo:</label>
                                <input type="text" className="form-control" id="correo" defaultValue={this.state.editCorreo} onChange={this.handleChangeCorreo} value={this.state.value} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numero_documento" className="col-form-label">Numero documento:</label>
                                <input type="text" className="form-control" id="numero_documento" defaultValue={this.state.editNumeroDocumento} onChange={this.handleChangeCedula} value={this.state.value} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombres" className="col-form-label">Nombres:</label>
                                <input type="text" className="form-control" id="nombres" defaultValue={this.state.editNombres} onChange={this.handleChangeNombres} value={this.state.value} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos" className="col-form-label">Apellidos:</label>
                                <input type="text" className="form-control" id="apellidos" defaultValue={this.state.editApellidos} onChange={this.handleChangeApellido} value={this.state.value} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal2}>Cancelar</Button>
                        <Button variant="primary" onClick={() => this.select2()}>Continuar</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}

export default ClientesRegistrados;