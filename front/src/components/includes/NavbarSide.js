import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const NavbarSide = () => {
    return (
        <nav className="navbar-side">

            <div className="row  mt-2">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/line-chart.svg" alt="graph"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/"}>Dashboard</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/smartphone.svg" alt="smartphone"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/orders"}>Commandes</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/shopping-bag.svg" alt="shopping"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/import"}>Importer produit</Link>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <Link to={"/imported"}>Produits importés</Link>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <Link to={"/products"}>Mes produits</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/notification.svg" alt="notifications"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/notifications"}>Notifications</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/web.svg" alt="web"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={""}>My website</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/settings.svg" alt="parametres"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/parameters"}>Parametres</Link>
                </div>
            </div>

        </nav>
    );
};

export default NavbarSide;