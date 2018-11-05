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
                            <p className="p-2">Vue d'ensemble</p>

                            <div className="separator"></div>

                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p>Ventes</p>
                                    </div>
                                    <div className="col-sm-8"></div>
                                    <div className="col-sm-2">
                                        <p>19.90 EUR</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <p>Commandes</p>
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
                
            </div> 
        </div>
    );
};

export default Dashboard;

