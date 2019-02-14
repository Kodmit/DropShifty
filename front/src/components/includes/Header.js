import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Header = () => {

    function logout() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8000/logout', true);
        xhr.withCredentials = true;
        xhr.send(null);
        setTimeout(function() {
            window.location = '/login';
        }, 3000);
      }

    return (
        <header>
            <div className="row">
                <div className="col-3">
                    <a href="/"><img className="logo" src="/logo.png" alt="logo"></img></a>
                </div>
                <div className="col-9">
                    <a className="logout_btn" onClick={logout}>Logout</a>
                </div>

            </div>
        </header>
    );
};

export default Header;