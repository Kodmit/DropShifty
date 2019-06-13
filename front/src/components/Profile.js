import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/parameters.scss';
import '../styles/app.scss';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Header from './includes/Header';
import NavbarSide from './includes/NavbarSide';
import $ from 'jquery';

const config = require('../components/includes/config.json');


class Profile extends Component {

    constructor(props) {
      super(props)

      this.state = {
        userInfos: [],
    }

      this.handleChange = this.handleChange.bind(this);
    }

    
    componentDidMount() {
      if (sessionStorage.getItem('username') != null) {
        this.getUserInfos();
      }
      this.getUserInfos();
    }

    submitEditProfile = (e) => {
        e.preventDefault();

        const username = e.target.elements.edit_username.value;
        const email = e.target.elements.edit_email.value;
        const password = e.target.elements.edit_password.value;

        axios.post(config.config.api_url, {
          query: `mutation NewUser($user: UserInput!) {
            NewUser(input: $user) {
              content
            }
          }`,
          variables: {
            "user": {
                username: username,
                email: email,
                password: password
            }
          }
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((result) => {
            console.log(result.data);

            if(result.data.data.NewUser.content == 'user_edited') {
                Swal.fire({
                    title: '<strong>Utilisateur modifié !</strong>',
                    type: 'success',
                    html: 'Vos informations ont bien été modfiées',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Fermer',
                    confirmButtonAriaLabel: 'Fermer'
                });
            } else {
                Swal.fire({
                    title: '<strong>Oups !</strong>',
                    type: 'error',
                    html: "Une erreur s'est produite lors de l'édition",
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Fermer',
                    confirmButtonAriaLabel: 'Fermer'
                });
            }
          });
    }

    handleChange(event) {
      this.setState({
          shopInfos: event.target.value,
          userInfos: event.target.value,
      });
    }

    getUserInfos() {
      let session_username = sessionStorage.getItem('username');

      axios.post(config.config.api_url, {
        query: `{
          User(username: ` + `"` + session_username + `"` + `) {
            id,
            username,
            lastname,
            email,
            shops {
              id,
              name,
              description,
              city,
              address_line_1,
              postal_code,
              url,
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

          let userInfos = [];

          userInfos.push(this.state.userInfos);

          let infos = [];

          if (this.state.userInfos != null || this.state.userInfos != undefined) {
            $(userInfos).each(function(index, element) {
              $(element.shops).each(function(i, elem) {
                infos.push(elem)
              });
            });
          }

          let shopInfos = infos[0];

          this.setState({
            shopInfos: shopInfos,
          });

        })
  }

  

    render() {   

        let userInfos = this.state.userInfos;

        console.log(userInfos)

        return (
            <div className="grid-container">
                <Header/>
                <NavbarSide/>
                <div className="main">
                    <div className="container mt-3">
                        <h3>Mon Profil</h3>

                        <div className="row">
                            <div className="col-lg-6 col-sm-12">
                                <div style={{ width: '95%' }} className="parm_form_1 container mt-4 ml-2">  
                                    <h4>Mes informations</h4>
                                    <div className="container mt-3">
                                        <p>Nom d'utilisateur : {userInfos.username || "-"}</p>
                                        <p>Nom : {userInfos.lastname || "-"}</p>
                                        <p>Adresse e-mail : {userInfos.email || "-"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-sm-12">
                                <div style={{ width: '95%' }} className="parm_form_1 container mt-4 ml-2">
                                    <h4>Editer votre profil</h4>
                                    <form onSubmit={this.submitEditProfile}>
                                        <div className="form-group mt-4">
                                            <label htmlFor="edit_username">Nom d'utilisateur</label>
                                            <input required="required" type="text" name="edit_username" className="_form-control" id="edit_username" placeholder="Nom d'utilisateur" value={userInfos.username} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="edit_email">Email</label>
                                            <input required="required" type="text" name="edit_email" className="_form-control" id="edit_email" placeholder="Email" value={userInfos.email} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="edit_password">Mot de passe</label>
                                            <input required="required" type="password" name="edit_password" className="_form-control" id="edit_password" placeholder="Mot de passe"/>
                                        </div>

                                        <input type="submit" className="btn-import mt-3" value="Editer" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

      }

};

export default Profile;
