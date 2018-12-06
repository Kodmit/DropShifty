import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.scss';
import '../styles/app.scss';
//import Login from './Login';
import axios from 'axios';
import $ from 'jquery';


class UserForm extends Component {

    state = {
        repos: null
      }
    
    // Get datas from rest api using axios.
     getUser = (e) => {
      e.preventDefault();
      const user = e.target.elements.username.value;
      if (user) {
        axios.get('https://api.github.com/users/' + user)
        .then((res) => {
          console.log(res.data.login);
          const repos = res.data.public_repos;
          this.setState({repos});
        });
      } else {
        return;
      }    
    }

    render() {
        return (
            <div id="user_form" className="container">
                <form onSubmit={this.getUser}>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input type="text" name="username" className="form-control" id="username" placeholder="Enter name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                { this.state.repos ? <p>Number of repos: {this.state.repos}</p> :
                <p>Please enter a username.</p> }
            </div>
        );
    };

};

export default UserForm;

$( document ).ready(function() {
    console.log("user form charged")
    $("#user_form").parent().addClass("main");
});