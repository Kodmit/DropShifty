import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';
import Header from './components/includes/Header';
import NavbarSide from './components/includes/NavbarSide';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import {Route, BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <div className="grid-container">
                <Header/>
                <NavbarSide/>
                <Route path="/" component={Dashboard} exact/>
                <Route path="/orders" component={Orders}/>
            </div>
      
        </div>
      </BrowserRouter>
    );
  };
};

export default App;
