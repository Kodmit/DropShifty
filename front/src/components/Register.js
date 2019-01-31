import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/register.scss';
import '../styles/app.scss';
import $ from "jquery";
import Alert from '../components/includes/alert/Alert';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert_message: '',
            alert_type: ''
        }
    }

    // Get datas from rest api using axios.
    submitRegister = (e) => {
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
                    <img className="logo_drop mx-auto d-block" src="/images/logo-drop.png" alt="Logo dropshifty"/>

                    <div className="mt-4">
                        {this.state.alert_type == 'success'?<Alert type={this.state.alert_type} message={this.state.alert_message} />:null}
                        {this.state.alert_type == 'danger'?<Alert type={this.state.alert_type} message={this.state.alert_message}/>:null}
                        {this.state.alert_type == 'warning'?<Alert type={this.state.alert_type} message={this.state.alert_message}/>:null}
                    </div>

                    <form onSubmit={this.submitRegister}>
                        <div className="form-group">
                        <label htmlFor="username">Nom utilisateur</label>
                            <input type="text" name="email" className="form-control" id="email" placeholder="Email" />
                            <br/> 
                            <label htmlFor="username">Nom utilisateur</label>
                            <input type="text" name="username" className="form-control" id="username" placeholder="Nom utilisateur" />
                            <br/>
                            <label htmlFor="username">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Mot de passe" />
                            <br/>
                            <label htmlFor="username">Password</label>
                            <input type="password" name="confirm_password" className="form-control" id="confirm_password" placeholder="Confirmer Mot de passe" />
                        </div>
                        <button onClick={this.registerBtn} type="submit" className="btn_login mt-3">Inscription</button>
                    </form>
                </div>
            </div>
        );
    };
};

export default Register;