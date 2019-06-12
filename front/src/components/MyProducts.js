import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importedProducts.scss';
import '../styles/app.scss';
import Pagination from "react-js-pagination";
import $ from 'jquery';

const config = require('../components/includes/config.json');


class MyProducts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productList: [],
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
        this.getProductsList();
    }

    getProductsList() {
        this.ds_call("WC_GetProductsList");
    }

    ds_call(arg, handledata) {
        document.getElementById("loader-import").style.display = "block";

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetProductsList;

                self.setState({
                    productList: objectParsed
                });

                document.getElementById("loader-import").style.display = "none";

            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", config.config.api_url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

      if (this.state.productList != null) {

        const { productList, activePage, totalPerPage } = this.state;
        const indexOfLastTodo = activePage * totalPerPage;
        const indexOfFirstTodo = indexOfLastTodo - totalPerPage;
        const currentTodos = productList.slice(indexOfFirstTodo, indexOfLastTodo);

        this.items = currentTodos.map((item, key) =>
            <div key={item.id} className="content-import">
                <Link className="link_details" to={"/product/" + item.id}>
                    <div className="box-product-import _shadow mt-5">
                        <div style={{ width: '100%', height: '100%' }} className="row">
                            <div  className="col-4 img_container">
                                <img className="product-import mx-auto d-block" src={item.images[0].src} alt="mug licorne" />
                            </div>
                            <div className="col-8 p-4">
                                <p className="descProduct">{item.name}</p>
                                <div className="actions-container d-flex">
                                    <Link className="btn-import" to={"/product/" + item.id}><i className="fas fa-eye"></i></Link>
                                    <Link className="btn-import ml-3" to={"/product/edit/" + item.id}><i className="fas fa-edit"></i></Link>
                                    <Link className="btn-import ml-3" to={"/product/" + item.id}><i className="far fa-trash-alt"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );

        return (
            <div className="main">
                <div className="container mt-4">
                    <h3>Mes Produits</h3>
                    {this.items}
                    <img id="loader-import" style={{ display: 'none' }} src="images/loader.svg" />
                </div>

                <div className="_pagination mt-5 mx-auto">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={this.state.productList.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass={'page-item'}
                        linkClass={'page-link'}
                    />
                </div>
            </div>
        );
      } else {
          return (
            <div className="main">
                <div className="container mt-4">
                    <h3>Aucun produit importé</h3>
                    <img id="loader-import" style={{ display: 'none' }} src="images/loader.svg" />
                </div>
            </div>
          );
      }
    }
};

export default MyProducts;
