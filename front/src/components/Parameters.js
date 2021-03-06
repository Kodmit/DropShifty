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


class Parameters extends Component {

    constructor(props) {
      super(props)

      this.state = {
        userInfos: [],
        shopInfos: [],
        userHaveShop: "",
    }

      this.handleChange = this.handleChange.bind(this);
    }

    
    componentDidMount() {
      if (sessionStorage.getItem('username') != null) {
        this.getUserInfos();
      }
      this.checkIfHaveShop();
      this.getUserInfos();
      //this.getShopInfos();
    }

    ds_call(arg, handledata) {

        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                //console.log(this.response);
                let object = JSON.parse(this.response);
                handledata(object.data[arg]);
            }
        });
        xhr.withCredentials = true;
        xhr.open("POST", config.config.api_url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
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
            //console.log(result.data);

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

    submitParameters = (e) => {
        e.preventDefault();

        let self = this;

        const name = e.target.elements.shop_name.value;
        const description = e.target.elements.shop_description.value;
        const city = e.target.elements.shop_city.value;
        const postalCode = e.target.elements.postal_code.value;
        const address = e.target.elements.shop_address.value;
        const shopUrl = e.target.elements.shop_url.value;

        axios.post(config.config.api_url, {
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
                    title: '<strong>Informations enregistrées !</strong>',
                    type: 'success',
                    html: 'Les informations ont bien été enregistrées ! Vous pouvez à présent importer des produits',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Fermer',
                    confirmButtonAriaLabel: 'Fermer'
                });

                self.ds_call("CheckIfWCApiFilled", function(output) {
                    if (!output) {
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

              } else if (result.data.errors) {
                Swal.fire({
                    title: "<strong>Une erreur s'est produite</strong>",
                    type: 'error',
                    html: "Une erreur s'est produite lors de l'enregistrement de votre boutique",
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

    checkIfHaveShop() {

      axios.post(config.config.api_url, {
        query: `{
          CheckIfHaveShop
        }`,
      }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((result) => {
          let response = result.data.data.CheckIfHaveShop;

          //console.log(response);

          if (response === true) {
            this.setState({
              userHaveShop: response
            })
          }
          
        });
        
    }

    saveChinabrandAccount = (e) => {
      e.preventDefault();

      /*
      const api_key = e.target.elements.shop_name.value;
      const api_secret = e.target.elements.shop_description.value;
      const username = e.target.elements.shop_city.value;
      const password = e.target.elements.postal_code.value;
      const shop_reseller_id = e.target.elements.shop_address.value;
      */

      Swal.fire({
        title: "<strong>Informations enregistrées !</strong>",
        type: 'success',
        html: "Les informations de votre compte ChinaBrand ont bien été enregistrées",
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Fermer',
        confirmButtonAriaLabel: 'Fermer'
      });

      /*
      axios.post(config.config.api_url, {
        query: `mutation SaveShopResellerAccount($credentials: UserResellerInput!) {
          SaveShopResellerAccount(input: $credentials) {
            content
          }
        }`,
        variables: {
          "credentials": {
            api_key: api_key,
		        api_secret: api_secret,
		        username: username,
		        password: password,
	    	    shop_reseller_id: shop_reseller_id
          }
        }
      }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((result) => {
          console.log(result)
        });
      */
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

      let shopInfos = this.state.shopInfos;
      let userInfos = this.state.userInfos;

      if (this.state.userHaveShop === true) {        

        return (
          <div className="grid-container">
              <Header/>
              <NavbarSide/>
              <div className="main">
                  <div className="container mt-3">
                      <h3>Paramètres</h3>

                      <div className="row">
                          <div className="col-lg-6 col-sm-12">
                              <div style={{ width: '95%' }} className="parm_form_1 container mt-4 ml-2">
                                  <h4>Editer votre boutique</h4>

                                  <div className="mt-4">
                                      <form onSubmit={this.submitParameters}>
                                          <div className="form-group">
                                              <label htmlFor="shop_name">Nom de la boutique</label>
                                              <input required="required" type="text" name="shop_name" className="_form-control" id="shop_name" placeholder="Nom de la boutique" value={shopInfos.name} onChange={this.handleChange}/>
                                          </div>

                                          <div className="form-group">
                                              <label htmlFor="shop_description">Description</label>
                                              <input required="required" type="text" name="shop_description" className="_form-control" id="shop_description" placeholder="Description" value={shopInfos.description} onChange={this.handleChange}/>
                                          </div>

                                          <div className="form-group">
                                              <label htmlFor="shop_city">Ville</label>
                                              <input required="required" type="text" name="shop_city" className="_form-control" id="shop_city" placeholder="Ville de la boutique" value={shopInfos.city} onChange={this.handleChange}/>
                                          </div>

                                          <div className="form-group">
                                              <label htmlFor="shop_address">Adresse</label>
                                              <input required="required" type="text" name="shop_address" className="_form-control" id="shop_address" placeholder="Ville de la boutique" value={shopInfos.city} onChange={this.handleChange}/>
                                          </div>

                                          <div className="form-group">
                                              <label htmlFor="postal_code">Code postal</label>
                                              <input required="required" type="text" name="postal_code" className="_form-control" id="postal_code" placeholder="Code postal de la boutique" value={shopInfos.postal_code} onChange={this.handleChange}/>
                                          </div>

                                          <div className="form-group">
                                              <label htmlFor="shop_url">Url de la boutique</label>
                                              <input required="required" type="text" name="shop_url" className="_form-control" id="shop_url" placeholder="Url de la boutique" value={shopInfos.url} onChange={this.handleChange}/>
                                          </div>

                                          <input type="submit" className="btn-import mt-3" value="Editer" />
                                      </form>
                                  </div>
                              </div>
                          </div>

                          <div className="col-lg-6 col-sm-12">
                              <div style={{ width: '95%' }} className="parm_form_1 container mt-4 ml-2">
                                  <h4>Compte ChinaBrand</h4>
                                    <div className="mt-4">
                                        <form onSubmit={this.saveChinabrandAccount}>
                                            <div className="form-group">
                                                <label htmlFor="reseller_api_key">Clé api</label>
                                                <input required="required" type="text" name="reseller_api_key" className="_form-control" id="reseller_api_key" placeholder="Clé api" value="078bb812d6292a9f78eade8957a1b6a6" onChange={this.handleChange}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="reseller_api_secret">Clé secrete</label>
                                                <input required="required" type="password" name="reseller_api_secret" className="_form-control" id="reseller_api_secret" placeholder="Clé secrete" value="2177686781" onChange={this.handleChange}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="reseller_username">Nom d'utilisateur</label>
                                                <input required="required" type="text" name="reseller_username" className="_form-control" id="reseller_username" placeholder="Nom d'utilisateur" value="alexandre.bly60@gmail.com" onChange={this.handleChange}/>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="reseller_password">Mot de passe</label>
                                                <input required="required" type="password" name="reseller_password" className="_form-control" id="reseller_password" placeholder="Mot de passe" value="totodu93" onChange={this.handleChange}/>
                                            </div>

                                            <input type="submit" className="btn-import mt-3" value="Editer" />
                                        </form>
                                    </div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
        );
      }

      else {
        return (
          <div className="grid-container">
              <Header/>
              <NavbarSide/>
              <div className="main">
                  <div className="container mt-3">
                      <h3>Paramètres</h3>

                      <div className="row">
                          <div className="col-lg-6 col-sm-12">
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

                          <div className="col-lg-6 col-sm-12">
                              <div style={{ width: '95%' }} className="parm_form_1 container mt-4 ml-2">
                                  <h4>Créer compte ChinaBrand</h4>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
        );

      }

    }
};

export default Parameters;
