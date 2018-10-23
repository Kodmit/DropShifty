import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';
import Home from './components/Home';
import Contact from './components/Contact';
import {Route, BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route path="/" component={Home} exact/>
            <Route path="/contact" component={Contact}/>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;
