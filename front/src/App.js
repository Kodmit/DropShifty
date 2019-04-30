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
//import NoMatch from './components/NoMatch';
import { Route, BrowserRouter } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import axios from 'axios';
import ProductDetails from './components/ProductDetails';


const client = new ApolloClient({
    uri: 'https://ds-api2.herokuapp.com/',
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

        setTimeout(() => {
            let uriRegister = 'http://localhost:3000/register';
            let uriLogin = 'http://localhost:3000/login';
            if (window.location.href == uriRegister || window.location.href == uriLogin) {
                document.getElementById("login").style.display = "none";            
            }
        }, 2100);
        
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator');
            if (ele) {
              // fade out
              ele.classList.add('available')
              setTimeout(() => {
                // remove from DOM
                ele.outerHTML = ''
              }, 2000);
            }
          });

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + 'CheckIfConnected' + " \\n}\"}";
        let xhr = new XMLHttpRequest();

        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
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
        axios.get('https://ds-api2.herokuapp.com/logout')
        .then((res) => {
          console.log(res.data);
          let response = res.data.response;
            console.log(response);
            this.setState({
                connected: false
            });
        });
    }

    render() {
        if (this.state.connected == true) {
            return (
                <ApolloProvider client={client}>
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
                                <Route path="/product/:id" render={(props) => <ProductDetails {...props}/>} />
                                <Route path="/notifications" component={Notifications}/>
                                <Route path="/parameters" component={Parameters}/>
                            </div>
                        </div>
                    </BrowserRouter>
                </ApolloProvider>
            );
        } else if (this.state.connected == false){
            return (
                <BrowserRouter>
                    <div>
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Login/>
                    </div>
                </BrowserRouter>
            );
        }
  };
}

export default App;
