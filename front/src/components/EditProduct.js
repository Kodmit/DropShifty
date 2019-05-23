import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/edit_product.scss';
import '../styles/app.scss';
import $ from 'jquery';
import 'moment';

let moment = require('moment');


class EditProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        
        return (
            <div className="main">
                <div>
                    <p>Edit Product</p>
                </div>
                <img id="loader-import" src="../images/loader.svg" />
            </div>
        );
    }
};

export default EditProduct;