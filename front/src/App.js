import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './styles/app.scss';
import '../src/components/includes/app';
//import Header from './components/includes/Header';
//import NavbarSide from './components/includes/NavbarSide';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import ImportProducts from './components/ImportProducts';
import ImportedProducts from './components/ImportedProducts';
import MyProducts from './components/MyProducts';
import Notifications from './components/Notifications';
import Parameters from './components/Parameters';
import Login from './components/class/Login';
import Register from './components/Register';
import NoMatch from './components/NoMatch';
import { Route, BrowserRouter as Router, Switch  } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import axios from 'axios';
import ProductDetails from './components/ProductDetails';
import OrderDetails from './components/OrderDetails';
import EditProduct from './components/EditProduct';
import Profile from './components/Profile';
import $ from 'jquery';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const config = require('./components/includes/config.json');

const client = new ApolloClient({
    uri: config.config.api_url,
});


class App extends Component {

    state = {
        connected: false
    };

    authenticate() {
        return new Promise(
            resolve => setTimeout(resolve, 1900)
        );
    }

    componentDidMount() {

        //sessionStorage.removeItem('username');
        
        if (sessionStorage.getItem('username') == "" || sessionStorage.getItem('username') == undefined) {
            this.logout();
        }
        
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator');
            if (ele) {
              ele.classList.add('available')
              setTimeout(() => {
                ele.outerHTML = ''
              }, 2000);
            }
          });

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + 'CheckIfConnected' + " \\n}\"}";
        let xhr = new XMLHttpRequest();

        xhr.withCredentials = true;
        xhr.open("POST", config.config.api_url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let object = JSON.parse(this.response);
                let res = object.data['CheckIfConnected'];

                //console.log(res)

                self.setState({
                    connected: res
                });

            }
        });
    }

    logout() {
        axios.get(config.config.api_url + '/logout')
        .then((res) => {
          let response = res.data.response;
            this.setState({
                connected: false
            });
        });
    }

    render() {

        if (this.state.connected === true) {
            return (
                <ApolloProvider client={client}>
                    <Router>
                        <div>
                            <Route path="/login" component={Login} exact />
                            <Route path="/register" component={Register} exact />

                            <Route render={({location}) => (
                                <TransitionGroup>
                                    <CSSTransition
                                    key={location.key}
                                    timeout={450}
                                    classNames="fade"
                                    >

                                        <Switch>
                                            <Route path="/" component={Dashboard} exact/>
                                            <Route path="/orders" component={Orders} exact />
                                            <Route path="/order/:id" render={(props) => <OrderDetails {...props}/>} exact />
                                            <Route path="/import" component={ImportProducts} exact />
                                            <Route path="/imported" component={ImportedProducts} exact />
                                            <Route path="/products" component={MyProducts} exact />
                                            <Route path="/product/:id" render={(props) => <ProductDetails {...props}/>} exact />
                                            <Route path="/product/edit/:id" render={(props) => <EditProduct {...props}/>} exact />
                                            <Route path="/notifications" component={Notifications} exact />
                                            <Route path="/profile" component={Profile} exact />
                                            <Route path="/parameters" component={Parameters} exact />
                                            <Route path="" component={NoMatch} exact />
                                        </Switch>

                                    </CSSTransition>
                                </TransitionGroup>
                            )} />
                        </div>
                    </Router>
                </ApolloProvider>
            );
        } else if (this.state.connected === false) {
            return (
                <Router>
                    <div>
                        <Switch>
                            <Route path="/register" component={Register} exact />
                            <Route path="/login" component={Login} exact />
                            <Route path="/" component={Login} exact />
                            <Route path="" component={NoMatch} />
                        </Switch>
                    </div>
                </Router>
            );
        }
  };
}

export default App;
