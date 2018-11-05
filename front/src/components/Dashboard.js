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
                        <div className="overview"></div>
                    </div>
                </div> 
                
            </div> 
        </div>
    );
};

export default Dashboard;

