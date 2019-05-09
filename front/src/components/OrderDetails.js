import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orderDetails.scss';
import '../styles/app.scss';
import $ from 'jquery';
import 'moment';

let moment = require('moment');


class OrderDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orderInfos: [],
        }
    }

    componentDidMount() {
        let order_id = this.props.match.params.id;
        this.getOrderDetails(order_id);
    }

    getOrderDetails(order_id) {
        this.ds_call("WC_GetOrder(id:" + order_id + ")");
    }

    ds_call(arg, handledata) {
        document.getElementById("loader-import").style.display = "block";

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetOrder;

                self.setState({
                    orderInfos: objectParsed
                })

                console.log(self.state.orderInfos);

                document.getElementById("loader-import").style.display = "none";
                
            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

        let orderInfos = this.state.orderInfos;
        
        return (
            <div className="main">
                <div className="container mt-4">
                    <h2>Detail de la commande</h2>
                    <div className="row">
                        <div className="col-6">
                            <div className="order_detail container ml-2 mt-4">
                                <p>N° de la commande : #{orderInfos.id}</p>
                                <p>Montant TTC : {orderInfos.total} {orderInfos.currency}</p>
                                <p>Méthode de paiement : {orderInfos.payment_method_title}</p>
                                <p>Date de la commande : {moment(orderInfos.date_created).format('DD/MM/YYYY')}</p>
                                <p></p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="order_detail container ml-2 mt-4">
                                <p>Frais de livraison : {orderInfos.shipping_total} {orderInfos.currency}</p>
                                <p>Taxes : {orderInfos.total_tax} {orderInfos.currency}</p>
                                <p>Montant HT : {orderInfos.total - orderInfos.shipping_total} {orderInfos.currency}</p>
                                <p></p>
                            </div>
                        </div>                         
                    </div>
                    
                    <img id="loader-import" src="../images/loader.svg" />
                </div>
            </div>
        );
    }
};

export default OrderDetails;