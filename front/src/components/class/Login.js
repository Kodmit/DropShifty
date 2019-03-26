import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from '../UserForm';
import '../../styles/login.scss';

class Login extends Component {
    
    render() {
      return (
          <div id="login" className="login_form">
            <UserForm login={this.login} />

          </div>

      );
    };
  };
  
  export default Login;
  