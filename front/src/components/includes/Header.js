import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
//import { NavLink } from 'react-router-dom';
//import $ from 'jquery';

const config = require('./config.json');

class Header extends Component {

    state = {
        userInfos: [],
    }

    componentDidMount() {
      if (sessionStorage.getItem('username') != null) {
        this.getUserInfos();
      }
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
            <header>
                <div className="row">
                    <div className="col-2">
                        {/*<a href="/"><img className="logo" src="/logo.png" alt="logo" /></a>*/}
                    </div>
                    <div className="col-3">
                        <p style={{ textTransform: 'capitalize' }} className="welcome_user">Bienvenue {username}</p>
                    </div>
                    <div className="col-7">
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
