import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';

const config = require('./config.json');

class Header extends Component {

    state = {
        userInfos: [],
    }

    componentDidMount() {
      if (sessionStorage.getItem('username') != null) {
        this.getUserInfos();
      }

      $("#bars").click(function() {
          $("#mobile_nav").fadeIn(500);
          window.scrollTo(0, 0);
      });

      $("#close_nav").click(function() {
        $("#mobile_nav").fadeOut(500);
      });
      
    }

    getUserInfos() {
        let session_username = sessionStorage.getItem('username');

        axios.post(config.config.api_url, {
          query: `{
            User(username: ` + `"` + session_username + `"` + `) {
              username,
              lastname,
              email,
              shops {
                id,
                url
              }
            }
        }`,
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((result) => {

            let res = result.data.data.User;

            this.setState({
                userInfos: res
            });

          })
    }

    logout() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', config.config.api_url + '/logout', true);
        xhr.withCredentials = true;
        xhr.send(null);

        sessionStorage.removeItem('username');

        setTimeout(function() {
            window.location = '/login';
        }, 1500);
      }


    render() {

        let username = this.state.userInfos.username;

        return (
            <div>
              <header>
                <p style={{ textTransform: 'capitalize' }} className="welcome_user">Bienvenue {sessionStorage.getItem('username')}</p>
                <h3 style={{ display: 'none' }} className="dropshifty_header_mobile">DropShifty</h3>
                <i id="bars" className="burger fa fa-bars" aria-hidden="true"></i>
                <a className="logout_btn mt-1" onClick={this.logout}><i style={{ color: 'red', fontSize: '20px' }} class="fas fa-power-off"></i></a>
                    
              </header>

              <div style={{ display: 'none' }} id="mobile_nav">
                  <div className="container row p-3">
                    <i id="close_nav" className="ml-3 fas fa-times"></i>

                    <div className="mt-5">

                    <div className="col-12 mt-3">
                        <NavLink to={"/"} exact activeStyle={{color: "#000"}}>Tableau de bord</NavLink>
                    </div>

                    <div className="col-12 mt-3">
                        <NavLink to={"/orders"} exact activeStyle={{color: "#000"}}>Commandes</NavLink>
                    </div>

                    <div className="col-12 mt-3">
                        <NavLink to={"/products"} exact activeStyle={{color: "#000"}}>Mes produits</NavLink>
                    </div>

                    <div className="col-12 mt-3">
                        <NavLink to={"/notifications"} exact activeStyle={{color: "#000"}}>Notifications</NavLink>
                    </div>

                    <div className="col-12 mt-3">
                        <NavLink to={"/profile"} exact activeStyle={{color: "#000"}}>Mon profil</NavLink>
                    </div>

                    <div className="col-12 mt-3">
                        <NavLink to={"/parameters"} exact activeStyle={{color: "#2653d4"}}>Parametres</NavLink>
                    </div>


                    </div>

                  </div>
              </div>

            </div>
            
        );
    }

};

export default Header;
