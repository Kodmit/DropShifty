import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/notifications.scss';
import '../styles/app.scss';

const Notifications = () => {
    return (
        <div className="main">
            <div className="container mt-4">
                <h3>Notifications</h3>
                <div className="mt-4"></div>

                <div id="notification_1" className="notification-box mt-4">
                    <div className="row">
                        <div className="col-5">
                            <p>Le prix du produit Iphone X a changé</p>
                        </div>
                        <div className="col-6"></div>
                        <div className="col-1">
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </div>

                <div id="notification_2" className="notification-box mt-4">
                    <div className="row">
                        <div className="col-5">
                            <p>Le produit Changeur n'existe plus</p>
                        </div>
                        <div className="col-6"></div>
                        <div className="col-1">
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </div>

                <div id="notification_3" className="notification-box mt-4">
                    <div className="row">
                        <div className="col-5">
                            <p>Le prix du produit Film incassable a changé</p>
                        </div>
                        <div className="col-6"></div>
                        <div className="col-1">
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;