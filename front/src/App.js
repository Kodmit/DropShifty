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
import {Route, BrowserRouter, PrivateRoute} from "react-router-dom";

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route path="/login" component={Login} />
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
  };
};

export default App;
