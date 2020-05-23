import React, { useState }  from 'react';
import './header.scss';
import { IMG_BENEFICIO8, IMG_USER,IMG_TRIANGULO } from '../../../images/images';


export default function Header(){

    const [isShow, setIsShow] = useState(false);

    return (
    <div className='o-header'>
        <div>
            <img src={IMG_BENEFICIO8} alt="image" />
        </div>
        <div class='user' onClick={() => setIsShow(!isShow)} >
            <img src={IMG_USER} />
            <span className='name' >Usuario</span>
            <img src={IMG_TRIANGULO} />
            { isShow && <div className='options' >
                <a  href='/' className='option' >Cerrar Sesion</a>
            </div>}
        </div>
    </div>
    )
}