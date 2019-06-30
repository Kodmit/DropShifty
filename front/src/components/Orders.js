import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orders.scss';
import '../styles/app.scss';
import './includes/app';
import Header from './includes/Header';
import NavbarSide from './includes/NavbarSide';
import 'moment';
import Pagination from "react-js-pagination";
import $ from 'jquery';



let moment = require('moment');

const config = require('../components/includes/config.json');


class Orders extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ordersList: [],
            activePage: 1,
            totalPerPage: 5,
         }

         this.handlePageChange = this.handlePageChange.bind(this);
      }

    handlePageChange(pageNumber) {
        $(window).scrollTop(0);
        $(".main").scrollTop(0);

        const bindPageNumber = pageNumber;

        this.setState({
            activePage: bindPageNumber
        });
    }

    componentDidMount() {
        this.getOrdersList();
    }

    getOrdersList() {
        this.ds_call("WC_GetOrdersList");
    }

    ds_call(arg, handledata) {
        $("#loader-import").css("display", "block");

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetOrdersList;

                self.setState({
                    ordersList: objectParsed
                });

                $("#loader-import").css("display", "none");

            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", config.config.api_url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

        if (this.state.ordersList != null) {

          const { ordersList, activePage, totalPerPage } = this.state;
          const indexOfLastTodo = activePage * totalPerPage;
          const indexOfFirstTodo = indexOfLastTodo - totalPerPage;
          const currentTodos = ordersList.slice(indexOfFirstTodo, indexOfLastTodo);

          this.items = currentTodos.map((item, key) =>
              <div key={item.id} className="container mt-4">
                  <Link className="link_details" to={"/order/" + item.id}>
                      <div className="row mt-5">
                          <div className="col-sm-12">
                              <div className="order-box _shadow">
                                  <div className="order-box-up container text-order-box">
                                      <div className="text-order-box mt-2">
                                          <p>Commande <strong style={{ color: '#4e73df' }}>#{item.id}</strong></p>
                                          <p>Date de paiement <strong style={{ color: '#4e73df' }}>{moment(item.date_created).format('DD/MM/YYYY')}</strong></p>
                                          <p>Client <strong style={{ color: '#4e73df' }}>{item.shipping.first_name} {item.shipping.last_name}</strong></p>
                                      </div>
                                  </div>
                                  <div className="order-box-down">
                                      <div className="separator"></div>
                                      <div className="container text-order-box mt-2">
                                          <p>Total de la commande <strong style={{ color: '#4e73df' }}>{item.total} {item.currency}</strong></p>
                                          <p></p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Link>
              </div>
          );

          return (
            <div className="grid-container">
                <Header/>
                <NavbarSide/>
                <div className="main">
                    <div className="container mt-4">
                        <h3>Liste des commandes</h3>
                        {this.items}
                        <img id="loader-import" style={{ display: 'none' }} src="images/loader.svg" />
                    </div>

                    <div className="mb-5"></div>

                    <div className="_pagination mt-5 mx-auto">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={this.state.ordersList.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemClass={'page-item'}
                            linkClass={'page-link'}
                        />
                    </div>
                </div>
            </div>
          );
        } else {
          return (
            <div className="grid-container">
                <Header/>
                <NavbarSide/>
                <div className="main">
                    <div className="container mt-4">
                        <h3>Aucune commande trouvé</h3>
                        <img id="loader-import" style={{ display: 'none' }} src="images/loader.svg" />
                    </div>
                </div>
            </div>
          );
        }
    }

};

export default Orders;
