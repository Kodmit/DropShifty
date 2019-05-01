import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/register.scss';
import '../styles/app.scss';
import $ from "jquery";
import Alert from '../components/includes/alert/Alert';
import gql from 'graphql-tag';
import { Mutation, withApollo } from "react-apollo";
import ApolloClient from "apollo-boost";


const client = new ApolloClient({
    uri: "https://ds-api2.herokuapp.com/"
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
                this.setState({alert_message: 'Données valides'});
                this.setState({alert_type: 'success'});
                this.runQuery(email, user, pass);
                
                setTimeout(function() {
                     window.location = '/login';
                }, 4000); 
                
            } else {
                console.log("Mots de passe différents");
                this.setState({alert_message: 'Mot de passe différents'});
                this.setState({alert_type: 'danger'});
            }
            
        } else {
            this.setState({alert_message: 'Données invalides'});
            this.setState({alert_type: 'danger'});
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
                <div id="user_form" className="container register_form">
                    {/*<img className="logo_drop mx-auto d-block" src="/images/logo-drop.png" alt="Logo dropshifty"/>*/}
                    
                    <h1>DropShifty</h1>

                    <div className="mt-4">
                        {this.state.alert_type == 'success'?<Alert type={this.state.alert_type} message={this.state.alert_message} />:null}
                        {this.state.alert_type == 'danger'?<Alert type={this.state.alert_type} message={this.state.alert_message}/>:null}
                        {this.state.alert_type == 'warning'?<Alert type={this.state.alert_type} message={this.state.alert_message}/>:null}
                    </div>

                    <form onSubmit={this.submitRegister}>
                        <div className="form-group">
                        <label htmlFor="email">Email</label>
                            <input required="required" type="email" name="email" className="form-control" id="email" placeholder="Email" />
                            <br/> 
                            <label htmlFor="username">Nom utilisateur</label>
                            <input required="required" type="text" name="username" className="form-control" id="username" placeholder="Nom utilisateur" />
                            <br/>
                            <label htmlFor="password">Mot de passe</label>
                            <input required="required" type="password" name="password" className="form-control" id="password" placeholder="Mot de passe" />
                            <br/>
                            <label htmlFor="confirmpassword">Confirmer mot de passe</label>
                            <input required="required" type="password" name="confirmpassword" className="form-control" id="confirmpassword" placeholder="Confirmer Mot de passe" />
                        </div>
                        <button onClick={this.registerBtn} type="submit" className="btn_login mt-3">Inscription</button>
                    </form>
                </div>

                <div className="mt-3 _center">
                    <a className="_link" href="/login">Connectez-vous</a>
                </div>
            </div>
        );
    };
};

withApollo(Register);

export default Register;