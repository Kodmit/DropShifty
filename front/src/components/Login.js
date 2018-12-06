import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './UserForm';

class Login extends Component {
    
    render() {
      return (
          <div>
            <UserForm getUser={this.getUser} />
          </div>
      );
    };
  };
  
  export default Login;
  