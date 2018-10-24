import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarSide = () => {
    return (
        <nav className="navbar-side">
            <ul className="">
                <li><a href="#"><img src="images/icons/line-chart.svg"></img></a></li>
                <li><a href="#"><img src="images/icons/smartphone.svg"></img></a></li>
                <li><a href="#"><img src="images/icons/shopping-bag.svg"></img></a></li>
                <li><a href="#"><img src="images/icons/notifications-button.svg"></img></a></li>
            </ul>
        </nav>
    );
};

export default NavbarSide;