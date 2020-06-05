import React, { useState }  from 'react';
import './header.scss';
import { IMG_BENEFICIO8, IMG_USER,IMG_TRIANGULO } from '../../../images/images';

export default function Header(){

    const [isShow, setIsShow] = useState(false);
    let firstName = localStorage.getItem('Nombre');

    const cerrarSesion = function() {
        debugger;
        localStorage.removeItem('Nombre');
        window.location.href= '/';
    }

    return (
    <div className='o-header'>
        <div>
            <img src={IMG_BENEFICIO8} alt="image" />
        </div>
        <div class='user' onClick={() => setIsShow(!isShow)} >
            <img src={IMG_USER} />
            <span className='name' >{firstName}</span>
            <img src={IMG_TRIANGULO} />
            <span className='name'  >Cerrar sesion</span>
            { isShow && <div className='options' >
                <a  onClick={cerrarSesion()} className='option' >Cerrar Sesion</a>
            </div>}
        </div>
    </div>
    )
}