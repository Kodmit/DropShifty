import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/productDetails.scss';
import '../styles/app.scss';
import $ from 'jquery';
import 'moment';

let moment = require('moment');


class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productInfos: [],
        }
    }

    componentDidMount() {
        let self = this;
        let product_id = this.props.match.params.id;

        console.log(product_id);
        this.getProductDetails(product_id);
    }

    getProductDetails(product_id) {
        this.ds_call("WC_GetProduct(id:" + product_id + ")");
    }

    ds_call(arg, handledata) {
        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                //console.log(this.response);
                let object = JSON.parse(this.response);
                let objectParsed = object.data;

                self.setState({
                    productInfos: objectParsed
                })

                console.log(self.state.productInfos);
                
            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

        let productInfos = this.state.productInfos;

        $.each( productInfos, function( key, value ) {
            $(".infosList h2").append(value.name);
            $('.imgsList').append('<img class="img_product_detail mx-auto d-block" src='+value.images[0].src+' />');
            $('.price').append("Prix : " + value.price_html);
            $('.created_at').append("Date d'ajout : " + moment(value.date_created).format('DD/MM/YYYY'));
            console.log($(value.description).html())
            $('.desc').append($(value.description).html());
            if (value.stock_status == 'instock') {
                $('.stock').append("En stock"); 
            } else {
                $('.stock').append("Rupture de stock");
            }
        });
        
        return (
            <div className="main">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="imgsList"></div>
                        </div>
                        <div className="col-6">
                            <div className="infosList">
                                <h2></h2>
                                <div className="mt-4"></div>
                                <p className="price"> </p>
                                <p className="created_at"></p>
                                <p className="stock"></p>
                                <div className="desc"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductDetails;