import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.scss';
import '../styles/app.scss';
import axios from 'axios';
import Alert from '../components/includes/alert/Alert';

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
          axios.post('http://localhost:8000/login?username='+ user +'&password='+ pass)
        .then((res) => {
          console.log(res.data);
          let response = res.data.response;
          if (response == 'ok') {
              console.log("data is OK");
              this.setState({alert_message: 'Connecté avec succes'});
              this.setState({alert_type: 'success'});
              window.location = '/';
          } else {
              this.setState({alert_message: 'Identifiant ou mot de passe inccorect'});
              this.setState({alert_type: 'danger'});
          }
        });
      } else {
          return;
      }    
    };
/*
    changeAlertType = (type) => {
        this.setState({this.state.alert_type});
    }
*/
    render() {
        return (
            <div id="user_form" className="container">
                {this.state.alert_type == 'success'?<Alert type={this.state.alert_type} message={this.state.alert_message} />:null}
                {this.state.alert_type == 'danger'?<Alert type={this.state.alert_type} message={this.state.alert_message}/>:null}
                <form onSubmit={this.submitLogin}>
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

}

export default UserForm;
