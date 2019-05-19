import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/parameters.scss';
import '../styles/app.scss';
import axios from "axios";
import gql from 'graphql-tag';
import { Mutation, withApollo } from "react-apollo";
import ApolloClient from "apollo-boost";
import { print } from 'graphql';


const client = new ApolloClient({
    uri: "https://ds-api2.herokuapp.com/"
});

class Parameters extends Component {

    submitParameters = (e) => {
        e.preventDefault();

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
              name: "Mon shop de test shopbroo 11",
              categoryId: 2,
              countryId: 752,
              city: "Paris",
              url: "https://shopbroo.com",
              wcApiUrl: "https://shopbroo.com",
              postalCode: 75013,
              description: "Description du shop de test qui peut aussi être null",
              addressLine1: "6 rue de la meute",
              addressLine2: null,
              picturePath: null
            }
          }
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((result) => {
            console.log(result.data)
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
                                            <input type="text" name="shop_name" className="_form-control" id="shop_name" placeholder="Nom de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_description">Description</label>
                                            <input type="text" name="shop_description" className="_form-control" id="shop_description" placeholder="Description"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_city">Ville</label>
                                            <input type="text" name="shop_city" className="_form-control" id="shop_city" placeholder="Ville de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_address">Adresse</label>
                                            <input type="text" name="shop_address" className="_form-control" id="shop_address" placeholder="Ville de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="postal_code">Code postal</label>
                                            <input type="text" name="postal_code" className="_form-control" id="postal_code" placeholder="Code postal de la boutique"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="shop_url">Url de la boutique</label>
                                            <input type="text" name="shop_url" className="_form-control" id="shop_url" placeholder="Url de la boutique"/>
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
