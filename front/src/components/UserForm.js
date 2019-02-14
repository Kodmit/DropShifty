import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.scss';
import '../styles/app.scss';
import axios from 'axios';
import Alert from '../components/includes/alert/Alert';
import $ from "jquery";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './includes/query';
import gql from 'graphql-tag';


  const link = createHttpLink({
    uri: 'http://localhost:8000',
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
        axios.post('http://localhost:8000/login?username='+ user +'&password='+ pass)
        .then((res) => {
          console.log(res.data);
          let response = res.data.response;
            console.log(response);
            if (response == 'ok' && this.checkIfConnected() == true) {
              this.setState({alert_message: 'Connecté avec succes'});
              this.setState({alert_type: 'success'});
              window.location = '/';
          }

          if (response == 'already logged in') {
            this.setState({alert_message: 'Connecté avec succes'});
            this.setState({alert_type: 'success'});
            window.location = '/';
        } 
          
          else {
              this.setState({alert_message: 'Identifiant ou mot de passe inccorect'});
              this.setState({alert_type: 'danger'});
          }
        });
      } else {
          this.setState({alert_message: 'Veuillez entrer vos identifiants'});
          this.setState({alert_type: 'warning'});
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
                <div className="login_view">
                    <div id="user_form" className="container">
                        <img className="logo_drop mx-auto d-block" src="/images/logo-drop.png" alt="Logo dropshifty"/>

                        <div className="mt-4">
                            {this.state.alert_type == 'success'?<Alert type={this.state.alert_type} message={this.state.alert_message} />:null}
                            {this.state.alert_type == 'danger'?<Alert type={this.state.alert_type} message={this.state.alert_message}/>:null}
                            {this.state.alert_type == 'warning'?<Alert type={this.state.alert_type} message={this.state.alert_message}/>:null}
                        </div>

                        <form onSubmit={this.submitLogin}>
                            <div className="form-group">
                                <label htmlFor="username">Login</label>
                                <input required="required" type="text" name="username" className="form-control" id="username" placeholder="Nom utilisateur" />
                                <br/>
                                <label htmlFor="username">Mot de passe</label>
                                <input required="required" type="password" name="password" className="form-control" id="password" placeholder="Mot de passe" />
                            </div>
                            <button onClick={this.loginBtn} type="submit" className="btn_register mt-3">Connexion</button>
                        </form>
                    </div>

                    <div className="mt-3 _center">
                        <a className="_link" href="/register">Inscrivez-vous</a>
                    </div>
                </div>
            </ApolloProvider>
        );
    };

}


export default UserForm;
