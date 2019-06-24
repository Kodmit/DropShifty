import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/register.scss';
import '../styles/app.scss';
import $ from "jquery";
//import Alert from '../components/includes/alert/Alert';
import gql from 'graphql-tag';
import { withApollo } from "react-apollo";
import ApolloClient from "apollo-boost";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const config = require('../components/includes/config.json');


const client = new ApolloClient({
    uri: config.config.api_url
});
  

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert_message: '',
            alert_type: ''
        }
    }

    runQuery(email, username, password) {
        client.mutate({
            mutation: gql`
          mutation NewUser($user: UserInput!) {
              NewUser(input: $user) {
                  content
              }
          }`,
          variables: { 
              "user": {
                "username": username,
                "password": password,
                "email": email
            } },
        }).then(result => console.log(result.data));
      }
    

    // Get datas from rest api using axios.
    submitRegister = (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const user = e.target.elements.username.value;
        const pass = e.target.elements.password.value;
        const confirmPass = e.target.elements.confirmpassword.value;

        if (email && user && pass && confirmPass) {
            if (pass == confirmPass) {
                this.runQuery(email, user, pass);

                Swal.fire({
                    type: 'sucess',
                    title: 'Inscription validée',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false,
                    html: 'Vous allez être redirigé vers la page de connexion',
                });
                
                setTimeout(function() {
                     window.location = '/login';
                }, 4000); 
                
            } else {
                console.log("Mots de passe différents");

                Swal.fire({
                    type: 'error',
                    title: 'Oups...',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false,
                    html: 'Les mots de passe sont différents',
                });
            }
            
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oups...',
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                html: "Une erreur s'est produite",
            });
        }
        console.log("Click on submit register")
    };

    registerBtn = () => {
        if (this.alert_message != '') {
            $('.alert').fadeIn("slow");
        }
    };

    render() {
        return (
            <div className="login_view">
                <style>{'body, html { background-color: #4e73df !important; }'}</style>
                <div id="user_form" className="container register_form">                    
                    <h1 className="_center">DropShifty</h1>

                    <div className="mt-4"></div>

                    <form onSubmit={this.submitRegister}>
                        <div className="form-group">
                        <label htmlFor="email">Email</label>
                            <input required="required" type="email" name="email" className="_form-control" id="email" placeholder="Email" />
                            <br/> 
                            <label htmlFor="username">Nom utilisateur</label>
                            <input required="required" type="text" name="username" className="_form-control" id="username" placeholder="Nom utilisateur" />
                            <br/>
                            <label htmlFor="password">Mot de passe</label>
                            <input required="required" type="password" name="password" className="_form-control" id="password" minLength="8" placeholder="Mot de passe" />
                            <br/>
                            <label htmlFor="confirmpassword">Confirmer mot de passe</label>
                            <input required="required" type="password" name="confirmpassword" className="_form-control" id="confirmpassword" minLength="8" placeholder="Confirmer Mot de passe" />
                        </div>
                        <button onClick={this.registerBtn} type="submit" className="btn-import mt-3">Inscription</button>
                    </form>
                    <div className="mt-3 _center">
                        <a className="_link" href="/login">Connectez-vous</a>
                    </div>  
                </div>
            </div>
        );
    };
};

withApollo(Register);

export default Register;