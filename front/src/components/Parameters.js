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
                        <div className="col-12">
                            <div style={{ width: '70%' }} className="mx-auto d-block parm_form_1 container mt-4 ml-2">
                                <h4>Créer votre boutique China Brand</h4>

                                <div className="mt-3">
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

                                        <input type="submit" className="btn-import mt-3" value="Enregistrer" />
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

export default Parameters;
