import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <Header/>
                <div class="container">
                    <p>Body homepage</p>
                </div>
            <Footer/>
        </div>
    );
};

export default Home;

