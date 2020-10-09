import React from 'react';
import '../styles/ClientesRegistrados.css';
import NavBar from '../components/NavBar';
import axios from 'axios';
import environment from '../environments';
class PagosRealizados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaPagos: {},
            search: ''
        }

        this.handelData = this.handelData.bind(this);

    }

    componentDidMount() {
        const nombreUser = localStorage.getItem('Nombre');
        const correo = localStorage.getItem('UsuarioSession');
        const navActive = "PagosR";
        this.setState({ navActive });
        this.setState({ nombreUser });
        this.setState({ correo });

        axios.get(environment.apiUrl + 'pagos/findPagos')
            .then(res => {
                const listaPagos = res.data;
                console.log(res.data)
                this.setState({ listaPagos });
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

        let objPagos = Array.from(this.state.listaPagos);
        let filtroPagos = objPagos.filter(
            (pago) => {
                return pago.numero_documento.indexOf(this.state.search) !== -1;
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
                    <table className="table table-striped table-light table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Tipo Plan</th>
                                <th scope="col">Documento Cliente</th>
                                <th scope="col">Nombre Completo</th>
                                <th scope="col">Fecha Pago</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filtroPagos.map((listaCliente, index) => {
                                    return (
                                        <tr key={index} >
                                            <td >{listaCliente.nombre_plan}</td>
                                            <td>{listaCliente.numero_documento}</td>
                                            <td>{listaCliente.nombres + " " + listaCliente.apellidos}</td>
                                            <td>{(listaCliente.fecha_pago).substr(0, 10)}</td>
                                            <td>{"$ "+listaCliente.valor_pago + ".000"}</td>
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

export default PagosRealizados;