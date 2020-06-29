import React from 'react';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }

        this.cerrarSesion = this.cerrarSesion.bind(this);
    }

    cerrarSesion(){
        localStorage.removeItem('UsuarioSession');
        localStorage.removeItem('Nombre');
        localStorage.removeItem('Electronico');
        window.location.href= '/';
    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand logoNav" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item element active">
                            <a className="nav-link" href="#">Clientes registrados<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">Pagos realizados</a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">Ediciones</a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">Planes de suscrpcion</a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">PQR</a>
                        </li>
                    </ul>
                    <li className="nav-item dropdown">
                        <span className="dropdown-toggle navbar-text mr-3 nombreUser" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.usuario}</span>
                        <div className="dropdown-menu opcionesUser" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item listCerrarSesion" onClick={this.cerrarSesion} href="#">Cerrar Sesion</a>
                        </div>

                    </li>
                    <span className="navbar-text userIcon mr-2"></span>
                

                </div>
            </nav>
        )
    }
}

export default NavBar;