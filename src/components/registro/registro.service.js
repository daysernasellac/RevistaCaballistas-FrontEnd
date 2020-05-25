import axios from 'axios';

export const registrar = function ({ tipoDocumento, numeroDocumento }) {
    return axios.get(`http://localhost:8030/api/register/informacionCliente/${tipoDocumento}&${numeroDocumento}`);
}

export const validarCampos = function (form) {
    let state = {};

    if (form.nombres === '' || form.nombreStateError === "form-control is-invalid") {
        state = { ...state, nombreStateError: "form-control is-invalid" };
    }
    if (form.apellidos === '' || form.apellidoStateError === "form-control is-invalid") {
        state = { ...state, apellidoStateError: "form-control is-invalid" };
    }
    if (form.email === '' || form.emailStateError === "form-control is-invalid") {
        state = { ...state, emailStateError: "form-control is-invalid" };
        state = { ...state, mensajeErrorEmail: "Por favor digita tu email." };
    }
    if (form.numeroContacto === '' || form.numeroStateError === "form-control is-invalid") {
        state = { ...state, numeroStateError: "form-control is-invalid" };
        state = { ...state, mensajeErrorCelular: "Por favor digita tu numero." };
    }
    if (form.direccion === '' || form.direccionStateError === "form-control is-invalid") {
        state = { ...state, direccionStateError: "form-control is-invalid" };
        state = { ...state, mensajeErrorDireccion: "Por favor digita tu direccion." };
    }
    if (form.tipoDocumento === '') {
        state = { ...state, tipoDocumetoStateError: "custom-select is-invalid" };
    }
    if (form.numeroDocumento === '' || form.numeroDocumentoStateError === "form-control is-invalid") {
        state = { ...state, numeroDocumentoStateError: "form-control is-invalid" };
        state = { ...state, mensajeErrorNumeroDocumento: "Por favor digita tu numero de documento." };
    }
    if (form.departamento === '') {
        state = { ...state, departamentoStateError: "custom-select is-invalid" };
    }
    if (form.ciudad === '') {
        state = { ...state, ciudadStateError: "custom-select is-invalid" };
    }

    return state;
}