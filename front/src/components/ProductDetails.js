import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importedProducts.scss';
import '../styles/app.scss';


class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productInfos: []
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
                let objectParsed = object.data.WC_GetProduct;

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
        this.items = this.state.productInfos.map((item, key) =>
            <div key={item.id} className="container mt-4">
                <div className="row">
                    <div className="col-6">
                        <img src={item.images[0].src} />
                    </div>
                    <div className="col-6">
                        {item.name}
                    </div>
                </div>
            </div>
        );
        
        return (
            <div className="main">
                {this.items}
            </div>
        );
    }
};

export default ProductDetails;