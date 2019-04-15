import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importedProducts.scss';
import '../styles/app.scss';
import gql from 'graphql-tag';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Mutation, withApollo } from "react-apollo";
import ApolloClient from "apollo-boost";
import { createApolloFetch } from 'apollo-fetch';

const link = createHttpLink({
    uri: 'https://ds-api2.herokuapp.com/',
    withCredentials: true
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

/*

const fetch = createApolloFetch({
  uri: 'https://ds-api2.herokuapp.com/',
});

*/


class ImportedProducts extends Component {

    componentDidMount() {
        /*
        fetch({
            query: '{ WC_GetProductsList }',
          }).then(res => {
            console.log(res);
          });
        
        client.query({
            method: "POST",
            query: gql`
            {
                WC_GetProductsList
            }`
        }).then(result => console.log(result.data));
        
        

        client.mutate({
            mutation: gql`
            {
                WC_GetProductsList
            }`
        }).then(result => console.log(result.data));
        */

        let obj = this.ds_call("WC_GetProductsList");
        console.log(obj)
        //let res = obj.data['WC_GetProductsList'];
        //console.log(res)
    }

    ds_call(arg, handledata){

        var data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.response);
            let object = JSON.parse(this.response);
            //handledata(object.data[arg]);
        }
        });
        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    
    }

    render() {
        return (
            <div className="main">
                <div className="container mt-4">
                    <h3>Produits importés</h3>

                    <div className="content-import">
                        <div className="box-product-import mt-5">
                            <div className="row">
                                <div className="col-4">
                                    <img className="product-import" src="/images/products/iphonex.jpg" alt="mug licorne" />
                                </div>
                                <div className="col-8 p-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet atque blanditiis consequatur debitis dolorum est eum harum, in minus necessitatibus odio officia quia, repellat repellendus suscipit ut vel voluptate?</p>

                                    <div className="actions-container d-flex">
                                        <button className="btn-submit"><i className="fas fa-eye"></i></button>
                                        <button className="btn-submit ml-2"><i className="fas fa-edit"></i></button>
                                        <button className="btn-submit ml-2"><i className="far fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-import">
                        <div className="box-product-import mt-5">
                            <div className="row">
                                <div className="col-4">
                                    <img className="product-import" src="/images/products/iphonex.jpg" alt="mug licorne" />
                                </div>
                                <div className="col-8 p-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet atque blanditiis consequatur debitis dolorum est eum harum, in minus necessitatibus odio officia quia, repellat repellendus suscipit ut vel voluptate?</p>

                                    <div className="actions-container d-flex">
                                        <button className="btn-submit"><i className="fas fa-eye"></i></button>
                                        <button className="btn-submit ml-2"><i className="fas fa-edit"></i></button>
                                        <button className="btn-submit ml-2"><i className="far fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
};

export default ImportedProducts;