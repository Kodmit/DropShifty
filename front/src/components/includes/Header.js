import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios';
//import { NavLink } from 'react-router-dom';
//import $ from 'jquery';

const config = require('./config.json');

class Header extends Component {

    /*
    componentDidMount() {
        $('.profile_icon').click(function() {
            $('.profile_links').fadeToggle();
        });
    }
    */

    logout() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', config.config.api_url + '/logout', true);
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
                        {/*<NavLink to={"/edit-profile"}>Editer profil</NavLink>*/}
                        {/*<NavLink to={"/profile"}>Mon profil</NavLink>*/}
                        <a className="logout_btn mt-1" onClick={this.logout}><i style={{ color: 'red', fontSize: '20px' }} class="fas fa-power-off"></i></a>
                    </div>
    
                </div>
            </header>
        );
    }
     
};

export default Header;