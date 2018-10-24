import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarSide = () => {
    return (
        <nav className="navbar-side">

            <div className="row  mt-1">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/line-chart.svg"></img>
                </div>
                <div className="col-sm-10">
                    <a href="">Dashboard</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/smartphone.svg"></img>
                </div>
                <div className="col-sm-10">
                    <a href="">Commandes</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/shopping-bag.svg"></img>
                </div>
                <div className="col-sm-10">
                    <a href="">Importer produit</a>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <a href="">Produits importés</a>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <a href="">Mes produits</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/notification.svg"></img>
                </div>
                <div className="col-sm-10">
                    <a href="">Notifications</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/web.svg"></img>
                </div>
                <div className="col-sm-10">
                    <a href="">My website</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/settings.svg"></img>
                </div>
                <div className="col-sm-10">
                    <a href="">Parametres</a>
                </div>
            </div>

        </nav>
    );
};

export default NavbarSide;