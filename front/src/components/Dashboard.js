import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboad.scss';

const Dashboard = () => {
    return (
        <div>
            <div className="container mt-4">
                <h3>Total des ventes</h3>  

                <div className="mt-4"></div>

                <div className="row">
                    <div className="col-sm-8">
                        <div className="graph-sales">
                        </div>  
                    </div>
                    <div className="col-sm-4">
                        <div className="overview">
                            <p className="p-2 bold">Vue d'ensemble</p>

                            <div className="separator"></div>

                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="bold">Ventes</p>
                                    </div>
                                    <div className="col-sm-6"></div>
                                    <div className="col-sm-4">
                                        <p className="bold">19.90 EUR</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p className="bold">Commandes</p>
                                    </div>
                                    <div className="col-sm-8"></div>
                                    <div className="col-sm-2">
                                        <p>3</p>
                                    </div>
                                </div>
                            </div>

                            <div className="separator"></div>

                        </div>
                    </div>
                </div>

                <div className="mt-5"></div>

                <h3>Produits les mieux vendus</h3>  
                
                <div className="container selling-products mt-4">
                    <div className="row mt-3 p-3">
                        <div className="col-sm-8">
                            <p>Bracelet argent</p>
                        </div>
                        <div className="col-sm-2">
                            <p>2 achats</p>
                        </div>
                        <div className="col-sm-2">
                            <p>34,90 EUR</p>
                        </div>
                    </div>

                    <div className="separator"></div>

                    <div className="row p-3">
                        <div className="col-sm-8">
                            <p>Bracelet acier</p>
                        </div>
                        <div className="col-sm-2">
                            <p>3 achats</p>
                        </div>
                        <div className="col-sm-2">
                            <p>32,90 EUR</p>
                        </div>
                    </div>
                </div>

            </div> 
        </div>
    );
};

export default Dashboard;

