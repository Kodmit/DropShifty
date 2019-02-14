import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Header = () => {

    function logout() {
        console.log("Click on logout");
        axios.get('http://localhost:8000/logout')
        .then((res) => {
          console.log(res.data);
          let response = res.data.response;
            console.log(response);
        });
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