import React from 'react'
import '../styles/HomeUser.css'
import NavBar from '../components/NavBar'
import axios from 'axios'
import iconDelete from '../images/trash.png'


class HomeUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaClientes: {},
            search: ''
        }

        this.select = this.select.bind(this);
        this.handelData = this.handelData.bind(this);
    }

    componentDidMount() {
        const nombreUser = localStorage.getItem('Nombre');
        const correo = localStorage.getItem('UsuarioSession');
        this.setState({ nombreUser });
        this.setState({ correo });
        axios.get(`http://localhost:8030/api/register/informacionCliente/correo/${correo}`)
            .then(res => {
                if (res.data == "") {
                    console.log("correo no existe")
                } else {
                    const tipo_usuario = res.data[0].tipo_usuario;
                    this.setState({ tipo_usuario })
                }
            })
            .catch(error => {
                console.log(error)
            });

        axios.get('http://localhost:8030/api/register/findInfoUsuarioById')
            .then(res => {
                const listaClientes = res.data;
                console.log(res.data)
                this.setState({ listaClientes });
            })
            .catch(error => {
                console.log(error)
            });
    }


    select(id) {
        axios.post(`http://localhost:8030/api/register/deleteUsuarioById/${id}`)
            .then(res => {
            })
            .catch(error => {
                console.log(error)
            });
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


    render() {

        let obj = Array.from(this.state.listaClientes);
        let filterData = obj.filter(
            (cliente) => {
                return cliente.numero_documento.indexOf(this.state.search) !== -1;
            })

        return (

            <div className="mainHome">
                <NavBar usuario={this.state.nombreUser}></NavBar>

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
                <br />
                <div className="container">
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
                                                <img src={iconDelete} width="25" onClick={() => this.select(listaCliente.id_cliente)} />
                                            </td>
                                        </tr >
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }

}

export default HomeUser;