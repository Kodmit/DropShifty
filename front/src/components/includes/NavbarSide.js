import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';

const NavbarSide = () => {

    return (
        <nav className="navbar-side">

            <div className="row navbar-content">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/line-chart.svg" alt="graph"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/"} exact activeStyle={{color: "#33d5db"}}>Dashboard</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/smartphone.svg" alt="smartphone"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/orders"} exact activeStyle={{color: "#33d5db"}}>Commandes</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/shopping-bag.svg" alt="shopping"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/import"} exact activeStyle={{color: "#33d5db"}}>Importer produit</NavLink>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <NavLink to={"/imported"} exact activeStyle={{color: "#33d5db"}}>Produits importés</NavLink>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <NavLink to={"/products"} exact activeStyle={{color: "#33d5db"}}>Mes produits</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/notification.svg" alt="notifications"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/notifications"} exact activeStyle={{color: "#33d5db"}}>Notifications</NavLink>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/web.svg" alt="web"></img>
                </div>
                <div className="col-sm-10">
                    <a href="http://wordpress.dev.dropshifty.com" target="_blank">Mon site</a>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-2">
                    <img className="icons-nav" src="images/icons/settings.svg" alt="parametres"></img>
                </div>
                <div className="col-sm-10">
                    <NavLink to={"/parameters"} exact activeStyle={{color: "#33d5db"}}>Parametres</NavLink>
                </div>
            </div>

        </nav>
    );
};

export default NavbarSide;