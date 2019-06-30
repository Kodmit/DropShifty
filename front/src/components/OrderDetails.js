import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orderDetails.scss';
import '../styles/app.scss';
import Header from './includes/Header';
import NavbarSide from './includes/NavbarSide';
import axios from 'axios';
import $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import 'moment';

let moment = require('moment');

const config = require('../components/includes/config.json');


class OrderDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orderInfos: [],
            line_items: [],
            orderId: '',
        }
    }

    passOrder(orderId) {
        //console.log(this.state.line_items.sku);

       axios.post(config.config.api_url, {
        query: `{
            WC_GetOrder(id:` + orderId +`)
        }`,
        }, {
            headers: {
            'Content-Type': 'application/json'
            }
        }).then((result) => {
            let orderInfos = result.data.data.WC_GetOrder;
            let lineItems = orderInfos.line_items;
            let line_items_arr = [];

            $(lineItems).each(function(index, value) {
                line_items_arr.push(value);
            });

            console.log(line_items_arr);
            console.log(orderInfos.billing)

            let content = "";


            axios.post(config.config.api_url, {
                query: `mutation PlaceOrder($data: PlaceOrderInput!) {
                    PlaceOrder(input: $data) {
                    content
                  }
                }`,
                variables: {
                  "data": {
                      sku: line_items_arr[0].sku,
                      qty: line_items_arr[0].quantity,
                      order_id: orderId,
                      first_name: orderInfos.billing.first_name,
                      last_name: orderInfos.billing.last_name,
                      address: orderInfos.billing.last_name,
                      city: orderInfos.billing.city,
                      postal_code: orderInfos.billing.postcode,
                      remark: "Remarque de test"
                  }
                }
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            }).then((result) => {
                console.log(result.data.data)
                content = JSON.parse(result.data.data.PlaceOrder.content);
                //let errors = JSON.parse(result.data.errors) || "";
                //let content = JSON.parse(result);
                //console.log(content.msg[orderId]);
                
                
                if (content.msg[orderId].msg == "success") {
                    Swal.fire({
                        title: '<strong>Commande passée !</strong>',
                        type: 'success',
                        html: 'La commande a été passée avec succes.' + '<br><a href="'+ config.config.chinabrand_login_url +'" target="_blank">Passer commande chez le fournisseur</a>',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    });
                }

                if (content.msg[orderId].msg == "Order already placed") {
                    Swal.fire({
                        title: '<strong>Commande déjà passée !</strong>',
                        type: 'warning',
                        html: 'La commande a déjà été passée.' + '<br><a href="'+ config.config.chinabrand_login_url +'" target="_blank">Consulter la commande chez le fournisseur</a>',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    });
                }
                
                if (content.msg[orderId].msg == "Shipping method is not available") {
                    Swal.fire({
                        title: "<strong>Méthode d'envoi non renseignée !</strong>",
                        type: 'warning',
                        html: "La méthode d'envoi n'a pas été renseignée, vous pouvez l'ajouter à partir de votre compte" + '<br><a href="'+ config.config.chinabrand_login_url +'" target="_blank">Consulter la commande chez le fournisseur</a>',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    });
                }
                
                if (content === null || content === undefined) {
                    Swal.fire({
                        title: '<strong>Commande déjà passée !</strong>',
                        type: 'warning',
                        html: 'La commande a déjà été passée.' + '<br><a href="'+ config.config.chinabrand_login_url +'" target="_blank">Consulter la commande chez le fournisseur</a>',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    });
                }

                
                
            });
        });

    }

    componentDidMount() {
        let order_id = this.props.match.params.id;
        this.setState({
            orderId: order_id
        })
        this.getOrderDetails(order_id);
    }

    getOrderDetails(order_id) {
        this.ds_call("WC_GetOrder(id:" + order_id + ")");
    }

    ds_call(arg, handledata) {
        $("#loader-import").css("display", "block");

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetOrder;

                self.setState({
                    orderInfos: objectParsed,
                    line_items: objectParsed.line_items
                });

                $("#loader-import").css("display", "none");
                
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
                            <button style={{ width: '250px' }} onClick={() => this.passOrder(orderInfos.id)} className="btn-import float-right mt-5 mr-5">Passer la commande</button>
                        </div>
                        
                        <img id="loader-import" src="../images/loader.svg" />
                    </div>
                </div>
            </div>
        );
    }
};

export default OrderDetails;