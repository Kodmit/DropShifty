import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import $ from 'jquery';

const config = require('./config.json');


class NavbarSide extends Component {

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

  render() {

    let userInfos = [];

    userInfos.push(this.state.userInfos);

    let shopUrl = '';

    if (this.state.userInfos != null || this.state.userInfos != undefined) {
      $(userInfos).each(function(index, element) {
        $(element.shops).each(function(i, elem) {
          shopUrl = elem.url;
        });
      });
    }

    return (

        <nav className="navbar-side">
            <div className="row">
                <NavLink to={"/"} style={{ padding: '15px' }}><h1 style={{ fontSize: '30px', color: 'white' }}>DropShifty</h1></NavLink>
            </div>

            <div className="row mt-3">
                <div className="col-sm-2">
                    <img className="icons-nav" src={process.env.PUBLIC_URL + '/images/icons/line-chart.svg'} alt="graph"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/"} exact activeStyle={{color: "#FFF"}}>Tableau de bord</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src={process.env.PUBLIC_URL + "/images/icons/smartphone.svg"} alt="smartphone"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/orders"} exact activeStyle={{color: "#FFF"}}>Commandes</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src={process.env.PUBLIC_URL + "/images/icons/shopping-bag.svg"} alt="shopping"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/import"} exact activeStyle={{color: "#FFF"}}>Importer produit</NavLink>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <NavLink to={"/imported"} exact activeStyle={{color: "#FFF"}}>Produits importés</NavLink>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <NavLink to={"/products"} exact activeStyle={{color: "#FFF"}}>Mes produits</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src={process.env.PUBLIC_URL + "/images/icons/notification.svg"} alt="notifications"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/notifications"} exact activeStyle={{color: "#FFF"}}>Notifications</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src={process.env.PUBLIC_URL + "/images/icons/web.svg"} alt="web"></img>
                </div>
                <div className="col-sm-10">
                    <a href={shopUrl || ''} target="_blank">Mon site</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src={process.env.PUBLIC_URL + "/images/icons/user.svg"} alt="profil"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/profile"} exact activeStyle={{color: "#FFF"}}>Mon profil</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src={process.env.PUBLIC_URL + "/images/icons/settings.svg"} alt="parametres"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/parameters"} exact activeStyle={{color: "#FFF"}}>Parametres</NavLink>
                </div>
            </div>
        </nav>
    )

  }


}

export default NavbarSide;
