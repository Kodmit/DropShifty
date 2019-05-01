import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Header = () => {

    function logout() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://ds-api2.herokuapp.com/logout', true);
        xhr.withCredentials = true;
        xhr.send(null);

        setTimeout(function() {
            window.location = '/login';
        }, 1500);
      }

    return (
        <header>
            <div className="row">
                <div className="col-3">
                    {/*<a href="/"><img className="logo" src="/logo.png" alt="logo" /></a>*/}
                </div>
                <div className="col-9">
                    <a className="logout_btn" onClick={logout}><i style={{ color: 'red', fontSize: '20px' }} class="fas fa-power-off"></i></a>
                </div>

            </div>
        </header>
    );
};

export default Header;