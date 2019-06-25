import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.scss';
import axios from 'axios';
//import Alert from '../components/includes/alert/Alert';
import $ from "jquery";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './includes/query';
import gql from 'graphql-tag';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const config = require('../components/includes/config.json');


const link = createHttpLink({
    uri: config.config.api_url,
    withCredentials: true
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

client
    .query({
        query: gql`
        {
            CheckIfConnected
        }`
    });


class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert_message: '',
            alert_type: ''
        }
    }

    // Get datas from rest api using axios.
    submitLogin = (e) => {
        e.preventDefault();
        const user = e.target.elements.username.value;
        const pass = e.target.elements.password.value;

        if (user && pass) {
            axios.defaults.withCredentials = true;
            axios.post(config.config.api_url + '/login?username=' + user + '&password=' + pass)
                .then((res) => {
                    //console.log(res.data);
                    let response = res.data.response;
                    //console.log(response);

                    let self = this;
                    let data = "{\"query\":\"{\\n\\t " + 'CheckIfConnected' + " \\n}\"}";
                    let xhr = new XMLHttpRequest();

                    xhr.withCredentials = true;
                    xhr.open("POST", config.config.api_url);
                    xhr.setRequestHeader("content-type", "application/json");
                    xhr.send(data);

                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === this.DONE) {
                            let object = JSON.parse(this.response);
                            let res = object.data['CheckIfConnected'];

                            if (response == 'ok' && res == true) {
                                sessionStorage.setItem('username', user);
                                Swal.fire({
                                    type: 'success',
                                    title: 'Connexion réssie',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    focusConfirm: false,
                                    html: 'Connexion réussie, vous allez être redirigé vers votre tableau de bord',
                                });
                                window.location.replace('/');
                            }

                            if (response == 'already logged in') {
                                Swal.fire({
                                    type: 'success',
                                    title: 'Connexion réssie',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    focusConfirm: false,
                                    html: 'Connexion réussie, vous allez être redirigé vers votre tableau de bord',
                                });
                                window.location.replace('/');
                            }

                            if (response == 'invalid user' || response == 'password incorrect') {
                                Swal.fire({
                                    type: 'error',
                                    title: 'Oups...',
                                    showCloseButton: false,
                                    showCancelButton: false,
                                    focusConfirm: false,
                                    html: 'Identifiant ou mot de passe inccorect',
                                });
                            }
                        }
                    });

                });
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oups...',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                html: 'Veuillez entrer vos identifiants',
            });
        }
    };

    loginBtn = () => {
        if (this.alert_message != '') {
            $('.alert').fadeIn("slow");
        }
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <style>{'body, html { background-color: #4e73df !important; }'}</style>
                <div className="login_view container">
                    <div id="user_form" className="container">
                        <h1 className="_center">DropShifty</h1>

                        <div className="mt-4"></div>

                        <form onSubmit={this.submitLogin}>
                            <div className="form-group">
                                <label htmlFor="username">Login</label>
                                <input required="required" type="text" name="username" className="_form-control" id="username" placeholder="Nom utilisateur" />
                                <br/>
                                <label htmlFor="username">Mot de passe</label>
                                <input required="required" type="password" name="password" className="_form-control" id="password" placeholder="Mot de passe" />
                            </div>
                            <button onClick={this.loginBtn} type="submit" className="btn-import mt-3">Connexion</button>
                        </form>
                        <div className="mt-3 _center">
                            <a className="_link _center" href="/register">Inscription</a>
                        </div>
                    </div>
                </div>
            </ApolloProvider>
        );
    };

}


export default UserForm;
