import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import NavbarSide from './navbar-side';
import Main from './Main';

const Home = () => {
    return (
        <div>
            <div className="grid-container">
                <Header/>

                <NavbarSide/>
                <Main/>
            </div>
        </div>
    );
};

export default Home;

