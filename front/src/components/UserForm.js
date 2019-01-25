import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.scss';
import '../styles/app.scss';
import {Redirect, BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';
import Dashboard from "./Dashboard";
import createRouterHistory from "react-router/es/createRouterHistory";

class UserForm extends Component {
    
    // Get datas from rest api using axios.
     login = (e) => {
      e.preventDefault();
      const user = e.target.elements.username.value;
      const pass = e.target.elements.password.value;

      if (user && pass) {
          axios.post('http://localhost:8000/login?username='+ user +'&password='+ pass)
        .then((res) => {
          console.log(res.data);
          let response = res.data.response;
          if (response == 'ok') {
              console.log("data is OK");
              this.state.redirect = true;
              window.location = '/';
          }
        });
      } else {
        return;
      }    
    };

    render() {
        return (
            <div id="user_form" className="container">
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <label htmlFor="username">Login</label>
                        <input type="text" name="username" className="form-control" id="username" placeholder="Nom utilisateur" />
                        <br/>
                        <label htmlFor="username">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Mot de passe" />
                    </div>
                    <button type="submit" className="btn btn-primary">Connexion</button>
                </form>
            </div>
        );
    };

};

export default UserForm;
