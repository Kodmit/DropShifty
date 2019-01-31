import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';
import '../src/components/includes/app';
import Header from './components/includes/Header';
import NavbarSide from './components/includes/NavbarSide';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import ImportProducts from './components/ImportProducts';
import ImportedProducts from './components/ImportedProducts';
import MyProducts from './components/MyProducts';
import Notifications from './components/Notifications';
import Parameters from './components/Parameters';
import Login from './components/class/Login';
import Register from './components/Register';
import {Route, BrowserRouter, PrivateRoute} from "react-router-dom";
import $ from "jquery";
import { request, GraphQLClient } from 'graphql-request';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connected: 'true',
        }
    }

    componentDidMount() {
        this.checkIfConnected();
        if (this.checkIfConnected() == 'true') {
            console.log("checkifconnected egal true");
        }
    }

    checkIfConnected() {
        const client = new GraphQLClient('http://localhost:8000', {
            headers: {
                Authorization: 'Bearer my-jwt-token',
            },
        });

        const query = `{
          CheckIfConnected
        }`;

        client.request(query).then(data => console.log(data));
    }


    render() {
        if (this.state.connected == 'true') {
            return (
                <BrowserRouter>
                    <div>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <div className="grid-container">
                            <Header/>
                            <NavbarSide/>
                            <Route path="/" component={Dashboard} exact/>
                            <Route path="/orders" component={Orders}/>
                            <Route path="/import" component={ImportProducts}/>
                            <Route path="/imported" component={ImportedProducts}/>
                            <Route path="/products" component={MyProducts}/>
                            <Route path="/notifications" component={Notifications}/>
                            <Route path="/parameters" component={Parameters}/>
                        </div>
                    </div>
                </BrowserRouter>
            );
        } else {
            return (
                <div>
                    <p>user not connected</p>
                </div>
            )
        }

  };
}

export default App;
