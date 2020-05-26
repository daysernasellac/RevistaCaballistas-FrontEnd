import axios from 'axios';

export const registrar = function ({ tipoDocumento, numeroDocumento }) {
    return axios.get(`http://localhost:8030/api/register/informacionCliente/${tipoDocumento}&${numeroDocumento}`);
}