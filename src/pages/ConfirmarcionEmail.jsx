import React from 'react'
import logoBlanco from '../images/logo_blanco.png'
import '../styles/confirmacionEmail.css'

class ConfirmacionEmail extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <br/>
                    <div className="row">
                        <div className="col-sm columnaImg">
                            <img src={logoBlanco} alt="img" className="img-fluid logo" />
                        </div>
                    </div>
                    <br/>
                    <div className="container textEmail2">
                    <b>Ya casi!</b>
                    </div>
                    <br/>
                    <div className="container textEmail">
                    Por favor revise su correo electrónico para confirmar su cuenta
                    </div>

                </div>
            </div>
        )
    }
}

export default ConfirmacionEmail;