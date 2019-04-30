import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importedProducts.scss';
import '../styles/app.scss';


class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="main">
                <div className="container mt-4">
                    <h3>Product name</h3>
                        {this.items}
                </div>
            </div>
        );
    }
};

export default ProductDetails;