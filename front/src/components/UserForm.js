import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.scss';
import '../styles/app.scss';
import Login from './Login';
import axios from 'axios';


class UserForm extends Component {

    state = {
        name: null
      }
    
    // Get datas from rest api using axios.
     getUser = (e) => {
      e.preventDefault();
      const user = e.target.elements.username.value;
      if (user) {
        axios.get('https://swapi.co/api/people/?name="' + user + '"')
        .then((res) => {
          console.log(res.data.name);
          const name = res.data.public_repos;
          this.setState({name});
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
                        <label htmlFor="username">Login</label>
                        <input type="text" name="username" className="form-control" id="username" placeholder="Enter name" />
                        <br/>
                        <label htmlFor="username">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Enter name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="mt-2">
                    { this.state.repos ? <p>Number of repos: {this.state.repos}</p> :
                    <p>Please enter a username.</p> }
                </div>
                
            </div>
        );
    };

};

export default UserForm;
