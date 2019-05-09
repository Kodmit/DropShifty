import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orders.scss';
import '../styles/app.scss';
import './includes/app';
import 'moment';

let moment = require('moment');


class Orders extends Component {

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
        this.ds_call("WC_GetOrdersList");
    }

    ds_call(arg, handledata) {
        document.getElementById("loader-import").style.display = "block";

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetOrdersList;

                self.setState({
                    ordersList: objectParsed
                })

                console.log(self.state.ordersList);

                document.getElementById("loader-import").style.display = "none";
                
            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

        this.items = this.state.ordersList.map((item, key) =>
            <div key={item.id} className="container mt-4">
                {console.log(item)}
                <Link className="link_details" to={"/order/" + item.id}>
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <div className="order-box _shadow">
                                <div className="order-box-up container text-order-box">
                                    <div className="text-order-box mt-2">
                                        <p>Commande <strong style={{ color: '#4e73df' }}>#{item.id}</strong></p>
                                        <p>Date de paiement <strong style={{ color: '#4e73df' }}>{moment(item.date_created).format('DD/MM/YYYY')}</strong></p>
                                        <p>Client <strong style={{ color: '#4e73df' }}>{item.shipping.first_name} {item.shipping.last_name}</strong></p>
                                    </div>
                                </div>
                                <div className="order-box-down">
                                    <div className="separator"></div>
                                    <div className="container text-order-box mt-2">
                                        <p>Total de la commande <strong style={{ color: '#4e73df' }}>{item.total} {item.currency}</strong></p>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );

        return (
            <div className="main">
                <div className="container mt-4">
                    <h3>Liste des commandes</h3>
                    {this.items}
                    <img id="loader-import" style={{ display: 'none' }} src="images/loader.svg" />
                </div>
                <div className="mb-5"></div>
            </div>
        );
    }
    
};

export default Orders;