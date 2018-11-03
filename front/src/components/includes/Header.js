import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <header>
            <a href="/"><img className="logo" src="/logo.png" alt="logo"></img></a>
        </header>
    );
};

export default Header;