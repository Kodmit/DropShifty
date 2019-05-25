import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/edit_product.scss';
import '../styles/app.scss';
import $ from 'jquery';
import 'moment';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


class EditProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productInfos: [],
        }
    }

    componentDidMount() {
        //let product_id = this.props.match.params.id;
        //console.log(product_id)
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
                        type: 'success',
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

        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("cookie", "PHPSESSID=dbdf85c6a55ebbca573330402391fddc");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send(data);
              
    }

    render() {
        
        return (
            <div className="main">
                <div className="container mt-4">
                    <div className="row mt-3">
                        <div className="col-9 mx-auto d-block">
                            <form className="edit_form" onSubmit={this.submitEditProfile}>
                                <h3>Editer produit</h3>

                                <div className="mt-4"></div>

                                <div className="form-group">
                                    <label htmlFor="edit_title">Titre</label>
                                    <input required="required" type="text" name="edit_title" className="_form-control" id="edit_title" placeholder="Titre du produit"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_description">Description</label>
                                    <input required="required" type="text" name="edit_description" className="_form-control" id="edit_description" placeholder="Description"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_price">Prix</label>
                                    <input required="required" type="number" name="edit_price" className="_form-control" id="edit_price" placeholder="Prix"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_stock">Stock</label>
                                    <input required="required" type="number" name="edit_stock" className="_form-control" id="edit_stock" placeholder="Stock"/>
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