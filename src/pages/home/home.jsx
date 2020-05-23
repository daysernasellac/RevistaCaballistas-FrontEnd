import React from 'react';
import HomeLayout from "../../components/Layout/home-layout";
import '../../styles/home.scss';
import { IMG_REINO_EQUINO, IMG_TARJETA, IMG_BENEFICIO1, 
    IMG_BENEFICIO2, IMG_BENEFICIO3, IMG_BENEFICIO4, IMG_BENEFICIO5, IMG_BENEFICIO6, 
    IMG_BENEFICIO7, IMG_BENEFICIO8, IMG_BENEFICIO9
} from '../../images/images';



export default function HomePage () {

    const text = `Suscríbete a nuestro Territorio y recibe la revista en la puerta de tu correo, finca, casa, oficina, criadero, pesebrera u otro,
    y obtén múltiples descuentos con nuestros aliados comerciales y muchas otras sorpresas.`;
    const title = 'MARCAS ALIADAS';

    const data = [
        { 
            img: IMG_BENEFICIO1,
            link: 'https://www.instagram.com/evoluciondentalcol/'
        },{ 
            img: IMG_BENEFICIO2,
            link: 'http://agroperez.com.co/'
        },{ 
            img: IMG_BENEFICIO3,
            link: ''
        },{ 
            img: IMG_BENEFICIO4,
            link: 'http://www.tiendaequinallanogrande.com/'
        },{ 
            img: IMG_BENEFICIO5,
            link: 'https://www.instagram.com/amortiguadoresdelamontana/'
        },{ 
            img: IMG_BENEFICIO6,
            link: 'https://www.instagram.com/kbalpasionporelcaballo/'
        },{ 
            img: IMG_BENEFICIO7,
            link: 'http://www.artequino.com.co/'
        },{ 
            img: IMG_BENEFICIO8,
            link: ''
        },{ 
            img: IMG_BENEFICIO9,
            link: 'https://mesace.co/'
        }
    ]

    return (
        <HomeLayout children={
            <div className='p-home-page' >
                <div className='hp-header'  >
                    <div className='re' >
                        <img src={IMG_REINO_EQUINO} alt='Reino Equino'/>
                        <p>{text}</p>
                    </div>
                    <div className='tarj' >
                        <img src={IMG_TARJETA} alt='Tarjeta' />
                    </div>
                </div>
                <div className='hp-body' >
                    <h2>{title}</h2>
                    <div className='benefs' >
                        {data.map( (dat, index) => (
                            <a target='blank' href={dat.link} key={index} >
                                <img src={dat.img} alt=""/>
                            </a>
                        ) )}
                    </div>
                </div>
            </div>
        } />
    )
}