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
                    <Link to={"/"} activeClassName="active">Dashboard</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/smartphone.svg" alt="smartphone"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/orders"} activeClassName="active">Commandes</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/shopping-bag.svg" alt="shopping"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/import"} activeClassName="active">Importer produit</Link>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <Link to={"/imported"} activeClassName="active">Produits importés</Link>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <Link to={"/products"} activeClassName="active">Mes produits</Link>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/notification.svg" alt="notifications"></img>
                </div>
                <div className="col-sm-10">
                    <Link to={"/notifications"} activeClassName="active">Notifications</Link>
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
                    <Link to={"/parameters"} activeClassName="active">Parametres</Link>
                </div>
            </div>

        </nav>
    );
};

export default NavbarSide;