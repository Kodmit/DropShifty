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
        const apiKey = e.target.elements.apikey.value;

        client.mutate({
            mutation: gql`
          mutation NewUser($user: UserInput!) {
              NewUser(input: $user) {
                  content
              }
          }`,
          variables: { 
              "shop": {
                "name": "Mon shop de test",
                "categoryId": 2,
                "countryId": 752,
                "city": "Paris",
                "url": "http://wordpress.dev.dropshifty.com",
                "wcApiUrl": "http://wordpress.dev.dropshifty.com",
                "postalCode": 75013,
                "description": "Description du shop de test qui peut aussi être null",
                "addressLine1": "6 rue de la meute",
                "addressLine2": null,
                "picturePath": null
            } },
        }).then(result => console.log(result.data));
    };

    parameterBtn = (e) => {
        e.preventDefault();
        console.log("click on param btn");
    };

    render() {

        return (
            <div className="main">
                <div className="container mt-3">
                    <h3>Paramètres</h3>

                    <div className="row">
                        <div className="col-6">
                            <div className="parm_form_1 container mt-4 ml-2">
                                <h4>Créer votre boutique China Brand</h4>

                                <div className="mt-3">
                                    <form onSubmit={this.submitParameters}>
                                        <div className="form-group">
                                            <label htmlFor="apikey">Clé api</label>
                                            <input required="required" type="text" name="apikey" className="_form-control" id="apikey" placeholder="Email"/>
                                        </div>
                                        <button onClick={this.parameterBtn} type="submit" className="btn-import mt-3">Enregistrer</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            {/* Other form */}
                        </div>

                    </div>
                    
                </div>
            </div>
        );
    }
};

export default Parameters;