import React from 'react';
import './home-layout.scss';
import Header from '../organisms/header/header';
import Menu from '../organisms/menu/menu';

export default function HomeLayout({children}) {
    return(
        <div className='l-home-layout' >
            <header  className='header' >
                <Header />
            </header>
            <div className='l-container' >
                <nav className='l-nav' >
                    <Menu />
                </nav>
                <main className='l-main' >
                    {children}
                </main>
            </div>
            
        </div>
        
    )
}