import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/edit_product.scss';
import '../styles/app.scss';
import $ from 'jquery';
import 'moment';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const config = require('../components/includes/config.json');


class EditProduct extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productInfos: [],
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let product_id = this.props.match.params.id;
        this.getProductInfo(product_id);
    }

    handleChange(event) {
        this.setState({
            productInfos: event.target.value,
            description: event.target.value,
        });
    }

    getProductInfo(id) {

        let self = this;

        axios.post(config.config.api_url, {
          query: `{
            WC_GetProduct(id:` + id +`)
        }`,
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((result) => {
              let datas = result.data.data.WC_GetProduct;

              let obj = {"desc": $(datas.description).text()}

              Object.assign(datas, obj);

              self.setState({
                  productInfos: datas
              })

          })
    }

    submitEditProfile = (e) => {
        e.preventDefault();

        document.getElementById("overlay").style.display = "block";

        const id = this.props.match.params.id;
        const title  = e.target.elements.edit_title.value;
        const description = e.target.elements.edit_description.value;
        const price = e.target.elements.edit_price.value;
        const stock = e.target.elements.edit_stock.value;

        let data = "{\"query\":\"{\\n  EditProduct(id:" + id + ", name: " + '\\\"' + title + '\\\"' + ", description: " + '\\\"' + description + '\\\"' + ", price: " + '\\\"' + price + '\\\"' + ", stock: " + stock + ")\\n}\"}";
        
        let xhr = new XMLHttpRequest();

        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                document.getElementById("overlay").style.display = "none";

                let object = JSON.parse(this.response);
                let objectParsed = object.data.EditProduct;

                console.log(objectParsed)

                if (objectParsed == 'product_edited') {
                    Swal.fire({
                        title: '<strong>Produits édité</strong>',
                        type: 'success',
                        html: 'Le produit a été édité avec succes',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    })
                } else {
                    Swal.fire({
                        title: '<strong>Oups !</strong>',
                        type: 'error',
                        html: 'Une erreur s\'est produite lors de l\'édition du produit',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    })
                }

            }
        });

        xhr.open("POST", config.config.api_url);
        xhr.setRequestHeader("cookie", "PHPSESSID=dbdf85c6a55ebbca573330402391fddc");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send(data);
              
    }

    render() {

        let productInfos = this.state.productInfos;

        console.log(productInfos);

        return (
            <div className="main">
                <div className="container mt-4">
                    <div className="row mt-3">
                        <div className="col-9 mx-auto d-block">
                            <form className="edit_form" onSubmit={this.submitEditProfile}>
                                <h3>{"Editer produit"}</h3>

                                <div className="mt-4"></div>

                                <div className="form-group">
                                    <label htmlFor="edit_title">Titre</label>
                                    <input required="required" type="text" name="edit_title" className="_form-control" id="edit_title" placeholder="Titre du produit" value={productInfos.name} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_description">Description</label>
                                    <input required="required" type="text" name="edit_description" className="_form-control" id="edit_description" placeholder="Description" value={productInfos.desc} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_price">Prix</label>
                                    <input required="required" type="number" name="edit_price" className="_form-control" id="edit_price" placeholder="Prix" value={productInfos.regular_price} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_stock">Stock</label>
                                    <input required="required" type="number" name="edit_stock" className="_form-control" id="edit_stock" placeholder="Stock" value={productInfos.stock_quantity} onChange={this.handleChange} />
                                </div>

                                <input type="submit" className="btn-import mt-3" value="Editer produit" />
                            </form>         
                        </div>
                    </div>
                </div>

                <div id="overlay" style={{ display: 'none' }}>
                    <img id="loader" src={process.env.PUBLIC_URL + "/images/loader.svg"} />
                </div>

            </div>
        );
    }
};

export default EditProduct;