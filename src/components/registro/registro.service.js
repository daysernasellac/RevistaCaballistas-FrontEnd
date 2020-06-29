import axios from 'axios';

export const registrar = function ({ tipoDocumento, numeroDocumento }) {
    alert("tipo de documento: " + tipoDocumento)
    alert("numero documento: " + numeroDocumento)
    return axios.get(`http://localhost:8030/api/register/informacionCliente/${tipoDocumento}&${numeroDocumento}`);
}