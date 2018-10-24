import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import NavbarSide from './navbar-side';

const Home = () => {
    return (
        <div>
            <Header/>
            <NavbarSide/>
            <div class="container">
                <p>Body homepage</p>
            </div>
        </div>
    );
};

export default Home;

