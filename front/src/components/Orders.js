import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orders.scss';
import '../styles/app.scss';

const Orders = () => {
    return (
        <div className="main">
            <div className="container mt-4">
                <h3>Liste des commandes</h3>

                <div className="row mt-5">
                    <div className="col-sm-12">
                        <div className="order-box">
                            <div className="container text-order-box">
                                <p>Commande</p>
                                <p className="nb-order">#1001</p>
                                <p>10/12/2018</p>
                                <p>Client : Roger Horloger</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 mt-5">
                        <div className="order-box">
                            <div className="container text-order-box">
                                <p>Commande</p>
                                <p className="nb-order">#1001</p>
                                <p>10/12/2018</p>
                                <p>Client : Roger Horloger</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 mt-5">
                        <div className="order-box">
                            <div className="container text-order-box">
                                <p>Commande</p>
                                <p className="nb-order">#1001</p>
                                <p>10/12/2018</p>
                                <p>Client : Roger Horloger</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 mt-5">
                        <div className="order-box">
                            <div className="container text-order-box">
                                <p>Commande</p>
                                <p className="nb-order">#1001</p>
                                <p>10/12/2018</p>
                                <p>Client : Roger Horloger</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 mt-5">
                        <div className="order-box">
                            <div className="container text-order-box">
                                <p>Commande</p>
                                <p className="nb-order">#1001</p>
                                <p>10/12/2018</p>
                                <p>Client : Roger Horloger</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Orders;