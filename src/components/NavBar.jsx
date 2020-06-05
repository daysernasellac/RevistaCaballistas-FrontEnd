import React from 'react';

class NavBar extends React.Component {
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
                            <a className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">Planes de suscripcion</a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">Ediciones</a>
                        </li>
                        <li className="nav-item element">
                            <a className="nav-link" href="#">PQR</a>
                        </li>
                    </ul>
                    
                    <span className="navbar-text mr-3 nombreUser">{this.props.usuario}</span>
                    <span className="navbar-text userIcon mr-2"></span>
                    
                </div>
            </nav>
        )
    }
}

export default NavBar;