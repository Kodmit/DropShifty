import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/parameters.scss';
import '../styles/app.scss';
import axios from "axios";
import gql from 'graphql-tag';
import { Mutation, withApollo } from "react-apollo";
import ApolloClient from "apollo-boost";

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

       var data = '{\"query\":\"mutation NewShop($shop: ShopInput!) {\\n  NewShop(input: $shop) {\\n content\\n }\\n}\",\"variables\":{\"shop\":{\"name\":' + '\\\"' + name + '\\\"' + ',\"categoryId\":2,\"countryId\":752,\"city\":' + '\\\"' + city + '\\\"' + ',\"url\":' + '\\\"' + shopUrl + '\\\"' + ',\"wcApiUrl\":' + '\\\"' + shopUrl + '\\\"' + ',\"postalCode\":' + '\\\"' + postalCode + '\\\"' + ',\"description\":' + '\\\"' + description + '\\\"' + ',\"addressLine1\":' + '\\\"' + postalCode + '\\\"' + ',\"addressLine2\":null,\"picturePath\":null}},\"operationName\":\"NewShop\"}';

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "https://ds-api2.herokuapp.com/");
      xhr.setRequestHeader("cookie", "PHPSESSID=004a4e235e607f64b9080c94d91477d9");
      xhr.setRequestHeader("content-type", "application/json");

      xhr.send(data);
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
