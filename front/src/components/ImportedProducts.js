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


class ImportedProducts extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            productList: [],
            shop: [
                {id: 35, name: 'jumper', color: 'red', price: 20},
                {id: 42, name: 'shirt', color: 'blue', price: 15},
                {id: 56, name: 'pants', color: 'green', price: 25},
                {id: 71, name: 'socks', color: 'black', price: 5},
                {id: 72, name: 'socks', color: 'white', price: 5},
            ]
         }
      }

    componentDidMount() {
        this.getProductsList();        
    }

    getProductsList() {
        this.ds_call("WC_GetProductsList");
    }

    ds_call(arg, handledata) {
        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                //console.log(this.response);
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetProductsList;

                
                self.setState({
                    productList: objectParsed
                })

                console.log(self.state.productList)
                
            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

        this.items = this.state.productList.map((item, key) =>
            <div key={item.id} className="content-import">
                {/*console.log("Item : " + item.name)*/}
                <div className="box-product-import mt-5">
                    <div className="row">
                        <div className="col-4">
                            <img className="product-import" src={item.images[0].src} alt="mug licorne" />
                        </div>
                        <div className="col-8 p-4">
                            <p className="descProduct">{item.name}</p>
                            <div className="actions-container d-flex">
                                <button className="btn-submit"><i className="fas fa-eye"></i></button>
                                <button className="btn-submit ml-2"><i className="fas fa-edit"></i></button>
                                <button className="btn-submit ml-2"><i className="far fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="main">
                <div className="container mt-4">
                    <h3>Produits importés</h3>
                        {this.items}
                </div>
            </div>
        );
    }
};

export default ImportedProducts;