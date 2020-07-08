import React from 'react'
import '../styles/ClientesRegistrados.css'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
import iconDelete from '../images/trash.png'
import { MDBDataTableV5, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import $ from 'jquery';


class ClientesRegistrados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaClientes: {},
            search: '',
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
        this.handelData = this.handelData.bind(this);
        this.operatorAction = this.operatorAction.bind(this);
        this.buscarUsuarios = this.buscarUsuarios.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleModal2 = this.handleModal2.bind(this);
    }

    componentDidMount() {
        const nombreUser = localStorage.getItem('Nombre');
        const correo = localStorage.getItem('UsuarioSession');
        const navActive = "ClientesR";
        this.setState({ navActive });
        this.setState({ nombreUser });
        this.setState({ correo });
        axios.get(`http://localhost:8030/api/register/informacionCliente/correo/${correo}`)
            .then(res => {
                if (res.data == "") {
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
        axios.post(`http://localhost:8030/api/register/deleteUsuarioById/${id}`)
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

    buscarUsuarios() {
        axios.get('http://localhost:8030/api/register/findInfoUsuarioById')
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
    }


    render() {

        let obj = Array.from(this.state.listaClientes);
        let filterData = obj.filter(
            (cliente) => {
                return cliente.numero_documento.indexOf(this.state.search) !== -1;
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
                                placeholder="Buscar por cedula..." onChange={this.handelData}
                            />
                            <span className="search_icon">
                                <i className="fas fa-search" />
                            </span>
                        </div>
                    </div>


                </div>



                <br />

                <div className="container">
                    <button type="button" class="btn btn-danger" style={{ marginRight: "5px", display: this.state.styleButtoms }} onClick={this.handleModal}>Eliminar</button>
                    <button type="button" class="btn btn-primary" style={{ display: this.state.styleButtoms }} onClick={this.handleModal2}>Agregar</button>
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

                                                <input style={{ marginLeft: '40px' }} class="form-check-input" type="radio" value={listaCliente.id_cliente} name="checkOperator" onClick={this.operatorAction} />

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
                                <input type="text" className="form-control" id="id_cliente" value="" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo" className="col-form-label">Correo:</label>
                                <input type="text" className="form-control" id="correo" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numero_documento" className="col-form-label">Numero documento:</label>
                                <input type="text" className="form-control" id="numero_documento" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombres" className="col-form-label">Nombres:</label>
                                <input type="text" className="form-control" id="nombres" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos" className="col-form-label">Apellidos:</label>
                                <input type="text" className="form-control" id="apellidos" />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal2}>Cancelar</Button>
                        <Button variant="primary" onClick={() => this.select(this.state.id_cliente)}>Continuar</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}

export default ClientesRegistrados;