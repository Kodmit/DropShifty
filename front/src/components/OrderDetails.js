import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orderDetails.scss';
import '../styles/app.scss';
import Header from './includes/Header';
import NavbarSide from './includes/NavbarSide';
import axios from 'axios';
import 'moment';

let moment = require('moment');

const config = require('../components/includes/config.json');


class OrderDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orderInfos: [],
        }
    }

    passOrder() {
        axios.post(config.config.api_url, {
            query: `mutation PlaceOrder($data: PlaceOrderInput!) {
                PlaceOrder(input: $data) {
                content
              }
            }`,
            variables: {
              "data": {
                  sku: "205214501",
                  qty: "1",
                  order_id: "1537",
                  remark: "Remarque de test"
              }
            }
          }, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((result) => {
                let content = JSON.parse(result.data.data.PlaceOrder.content);
                console.log(content);

                if (content.status == 0) {
                    console.log("status = 0")
                }

                if (content.status == 1) {
                    console.log("status = 1")
                }

            });
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
                });

                document.getElementById("loader-import").style.display = "none";
                
            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", config.config.api_url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

        let orderInfos = this.state.orderInfos;
        let htAmount = orderInfos.total - orderInfos.shipping_total || '';
        let dateOrder = moment(orderInfos.date_created).format('DD/MM/YYYY') || '';
        
        return (
            <div className="grid-container">
                <Header/>
                <NavbarSide/>
                <div className="main">
                    <div className="container mt-4">
                        <h2>Detail de la commande</h2>
                        <div className="row mt-4">
                            <div className="col-lg-6 col-sm-12">
                                <div className="order_detail container ml-2 mt-4">
                                    <p>N° de la commande : #{orderInfos.id}</p>
                                    <p>Montant TTC : {orderInfos.total} {orderInfos.currency}</p>
                                    <p>Méthode de paiement : {orderInfos.payment_method_title}</p>
                                    <p>Date de la commande : {dateOrder}</p>
                                    <p></p>
                                </div>
                            </div>
                            
                            <div className="col-lg-6 col-sm-12">
                                <div className="order_detail container ml-2 mt-4">
                                    <p>Frais de livraison : {orderInfos.shipping_total} {orderInfos.currency}</p>
                                    <p>Taxes : {orderInfos.total_tax} {orderInfos.currency}</p>
                                    <p>Montant HT : {htAmount} {orderInfos.currency}</p>
                                    <p></p>
                                </div>
                            </div>                         
                        </div>

                        <div>
                            <button style={{ width: '250px' }} onClick={this.passOrder} className="btn-import float-right mt-5 mr-5">Passer la commande</button>
                        </div>
                        
                        <img id="loader-import" src="../images/loader.svg" />
                    </div>
                </div>
            </div>
        );
    }
};

export default OrderDetails;