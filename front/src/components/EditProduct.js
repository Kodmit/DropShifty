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
        let product_id = this.props.match.params.id;
    }

    submitEditProfile = (e) => {
        e.preventDefault();

        let product_id = this.props.match.params.id;

        console.log("edit product form");
        
        const title  = e.target.elements.edit_title.value;
        const description = e.target.elements.edit_description.value;
        const price = e.target.elements.edit_price.value;
        const stock = e.target.elements.edit_stock.value;


        axios.post("https://ds-api2.herokuapp.com/", {
            query: 
               `EditProduct(input: $product) {
                  content
                }
              `,
              variables: {
                "product": {
                    name: title,
                    description: description,
                    price: price,
                    stock: stock          
                }
              }
            }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((result) => {
            console.log(result);
          });
    }

    render() {
        
        return (
            <div className="main">
                <div className="container mt-4">
                    <div className="row mt-3">
                        <div className="col-9 mx-auto d-block">
                            <form className="edit_form" onSubmit={this.submitEditProfile}>
                                <h3>Editer produit</h3>

                                <div className="mt-3"></div>
                                
                                <div className="form-group">
                                    <label htmlFor="edit_title">Titre</label>
                                    <input required="required" type="text" name="edit_title" className="_form-control" id="edit_title" placeholder="Titre du produit"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_description">Description</label>
                                    <input required="required" type="text" name="edit_description" className="_form-control" id="edit_description" placeholder="Description"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_description">Prix</label>
                                    <input required="required" type="number" name="edit_description" className="_form-control" id="edit_description" placeholder="Prix"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit_description">Stock</label>
                                    <input required="required" type="number" name="edit_description" className="_form-control" id="edit_description" placeholder="Stock"/>
                                </div>

                                <input type="submit" className="btn-import mt-3" value="Editer produit" />
                            </form>         
                        </div>
                    </div>

                    
                </div>
                <img id="loader-import" src={process.env.PUBLIC_URL + "/images/loader.svg"} />
            </div>
        );
    }
};

export default EditProduct;