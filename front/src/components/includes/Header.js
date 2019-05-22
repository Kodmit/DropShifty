import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import $ from 'jquery';


class Header extends Component {

    componentDidMount() {
        $('.profile_icon').click(function() {
            $('.profile_links').fadeToggle();
        });
    }

    logout() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://ds-api2.herokuapp.com/logout', true);
        xhr.withCredentials = true;
        xhr.send(null);

        setTimeout(function() {
            window.location = '/login';
        }, 1500);
      }

    
    render() {
        return (
            <header>
                <div className="row">
                    <div className="col-3">
                        {/*<a href="/"><img className="logo" src="/logo.png" alt="logo" /></a>*/}
                    </div>
                    <div className="col-9">
                        {/*<a className="logout_btn mt-1" onClick={logout}><i style={{ color: 'red', fontSize: '20px' }} class="fas fa-power-off"></i></a>*/}
                        <i class="_shadow profile_icon fas fa-user-circle"></i>
                        <div className="profile_links">
                            <p>Link One</p>
                        </div>
                    </div>
    
                </div>
            </header>
        );
    }
    
};

export default Header;