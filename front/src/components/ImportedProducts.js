import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importedProducts.scss';
import '../styles/app.scss';


class ImportedProducts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productList: [],
         }
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
                //console.log(this.response);
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetProductsList;

                self.setState({
                    productList: objectParsed
                })

                //console.log(self.state.productList)

                document.getElementById("loader-import").style.display = "none";

            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    render() {

      if (this.state.productList != null) {

        this.items = this.state.productList.map((item, key) =>
            <div key={item.id} className="content-import">
                {/*console.log("Item : " + item.name)*/}
                <Link className="link_details" to={"/product/" + item.id}>
                    <div className="box-product-import _shadow mt-5">
                        <div className="row">
                            <div className="col-4">
                                <img className="product-import" src={item.images[0].src} alt="mug licorne" />
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
                    <h3>Produits importés</h3>
                    {this.items}
                    <img id="loader-import" style={{ display: 'none' }} src="images/loader.svg" />
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

export default ImportedProducts;
