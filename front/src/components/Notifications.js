import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/parameters.scss';
import '../styles/app.scss';
import '../styles/notifications.scss';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Header from './includes/Header';
import NavbarSide from './includes/NavbarSide';
import $ from 'jquery';
import 'moment';

let moment = require('moment');

const config = require('../components/includes/config.json');


class Notifications extends Component {

    constructor(props) {
        super(props)
  
        this.state = {
          ordersList: [],
        }
    }
  
      
    componentDidMount() {
        this.getOrdersList();
    }

    getOrdersList() {
        axios.post(config.config.api_url, {
            query: `{
                WC_GetOrdersList
            }`,
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            }).then((result) => {
                let res = result.data.data.WC_GetOrdersList;

                this.setState({
                    ordersList: res
                });
            });
    }

    
    render() {

        let orders = this.state.ordersList;

        console.log(orders)

        $(orders).each(function(index, value) {
            if (moment(value.date_created).format('DD/MM/YYYY') == moment().format('DD/MM/YYYY')) {
                $('.content_notifications').append('<div class="notification mt-3"><p>' + 'Une nouvelle commande passée le ' + moment().format('DD/MM/YYYY') +  '</p></div>')
            }
        });

        return (
            <div className="grid-container">
                <Header/>
                <NavbarSide/>
                <div className="main">
                    <div className="container">
                        <h4>Notifications du jour</h4>
                    </div>

                    <div className="content_notifications container mt-4">

                    </div>
                </div>
            </div>
        );
    }
    
};

export default Notifications;