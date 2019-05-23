import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/parameters.scss';
import '../styles/app.scss';
import axios from "axios";
import gql from 'graphql-tag';
import { Mutation, withApollo } from "react-apollo";
import ApolloClient from "apollo-boost";
import { print } from 'graphql';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


class Parameters extends Component {

    ds_call(arg, handledata) {

        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.response);
                let object = JSON.parse(this.response);
                handledata(object.data[arg]);
            }
        });
        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    submitEditProfile = (e) => {
        e.preventDefault();

        let self = this;

        const username = e.target.elements.edit_username.value;
        const email = e.target.elements.edit_email.value;
        const password = e.target.elements.edit_password.value;

        axios.post("https://ds-api2.herokuapp.com/", {
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
                    html: 'Vos informations ont bien étés modfiées',
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

    submitParameters = (e) => {
        e.preventDefault();

        let self = this;

        const name = e.target.elements.shop_name.value;
        const description = e.target.elements.shop_description.value;
        const city = e.target.elements.shop_city.value;
        const postalCode = e.target.elements.postal_code.value;
        const address = e.target.elements.shop_address.value;
        const shopUrl = e.target.elements.shop_url.value;

        axios.post("https://ds-api2.herokuapp.com/", {
          query: `mutation NewShop($shop: ShopInput!) {
            NewShop(input: $shop) {
              content
            }
          }`,
          variables: {
            "shop": {
              name: name,
              categoryId: 2,
              countryId: 752,
              city: city,
              url: shopUrl,
              wcApiUrl: shopUrl,
              postalCode: postalCode,
              description: description,
              addressLine1: address,
              addressLine2: null,
              picturePath: null
            }
          }
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((result) => {
              console.log(result.data);
              if (!result.data.errors) {
                Swal.fire({
                    title: '<strong>Boutique créee !</strong>',
                    type: 'success',
                    html: 'Votre boutique a bien été créee ! Vous pouvez à présent importer des produits',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Fermer',
                    confirmButtonAriaLabel: 'Fermer'
                });

                self.ds_call("CheckIfWCApiFilled", function(output) {
                    if(!output) {
                        self.ds_call("GenWcLink", function(link) {
                            console.log(link)
                            Swal.fire({
                                type: 'error',
                                title: 'Oups...',
                                showCloseButton: false,
                                showCancelButton: false,
                                focusConfirm: false,
                                html: 'Nous ne disposons pas de vos informations de connexion à l\'API WooCommerce, veuillez les fournir sur votre compte Dropshifty pour utiliser le plugin.<br><br><a href="'+ link +'" target="_blank">Renseigner les informations automatiquement.</a>',
                            });
                        });
                    }
                });

              } else if(result.data.errors) {
                Swal.fire({
                    title: "<strong>Une erreur s'est produite</strong>",
                    type: 'error',
                    html: "Une erreur s'est produite lors de la création de votre boutique",
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Fermer',
                    confirmButtonAriaLabel: 'Fermer'
                });
              }

            }).catch((error) => {
                console.log(error);
            });
    };

    render() {

        return (
            <div className="main">
                <div className="container mt-3">
                    <h3>Paramètres</h3>

                    <div className="row">
                        <div className="col-6">
                            <div style={{ width: '95%' }} className="parm_form_1 container mt-4 ml-2">
                                <h4>Créer votre boutique</h4>

                                <div className="mt-4">
                                    <form onSubmit={this.submitParameters}>
                                        <div className="form-group">
                                            <label htmlFor="shop_name">Nom de la boutique</label>
                                            <input required="required" type="text" name="shop_name" className="_form-control" id="shop_name" placeholder="Nom de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_description">Description</label>
                                            <input required="required" type="text" name="shop_description" className="_form-control" id="shop_description" placeholder="Description"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_city">Ville</label>
                                            <input required="required" type="text" name="shop_city" className="_form-control" id="shop_city" placeholder="Ville de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_address">Adresse</label>
                                            <input required="required" type="text" name="shop_address" className="_form-control" id="shop_address" placeholder="Ville de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="postal_code">Code postal</label>
                                            <input required="required" type="text" name="postal_code" className="_form-control" id="postal_code" placeholder="Code postal de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_url">Url de la boutique</label>
                                            <input required="required" type="text" name="shop_url" className="_form-control" id="shop_url" placeholder="Url de la boutique"/>
                                        </div>

                                        <input type="submit" className="btn-import mt-3" value="Créer" />
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <div style={{ width: '95%' }} className="parm_form_1 container mt-4 ml-2">
                                <h4>Editer votre profil</h4>
                                <form onSubmit={this.submitEditProfile}>
                                    <div className="form-group mt-4">
                                        <label htmlFor="edit_username">Nom d'utilisateur</label>
                                        <input required="required" type="text" name="edit_username" className="_form-control" id="edit_username" placeholder="Nom d'utilisateur"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edit_email">Email</label>
                                        <input required="required" type="text" name="edit_email" className="_form-control" id="edit_email" placeholder="Email"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edit_password">Mot de passe</label>
                                        <input required="required" type="text" name="edit_password" className="_form-control" id="edit_password" placeholder="Mot de passe"/>
                                    </div>

                                    <input type="submit" className="btn-import mt-3" value="Editer" />
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
};

export default Parameters;
