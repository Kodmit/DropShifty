import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importProducts.scss';
import '../styles/app.scss';

class ImportProducts extends Component {

    submitImport = (e) => {
        e.preventDefault();
        const sku = e.target.elements.sku.value;

        console.log(sku);
    };

    render () {
        return (
            <div className="main">
                <div className="container mt-4 content-import">
                    <h3>Importer un produit</h3>

                    <form className="form-import-product" onSubmit={this.submitImport}>
                        <div className="form-group">
                            <label htmlFor="sku">Entrer le code SKU du produit à importer</label>
                            <input type="text" className="_form-control" id="sku" name={'sku'} placeholder="Code SKU du produit" />
                            <input className="btn-submit mt-3" type="submit" value="Importer" />
                        </div>
                    </form>

                    <div className="box-product-import mt-5">
                        <div className="row">
                            <div className="col-4">
                                <img className="product-import" src="/images/products/iphonex.jpg" alt="mug licorne" />
                            </div>
                            <div className="col-8 p-4">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet atque blanditiis consequatur debitis dolorum est eum harum, in minus necessitatibus odio officia quia, repellat repellendus suscipit ut vel voluptate?</p>
                                <div className="actions-container d-flex">
                                    <button className="btn-submit"><i className="fas fa-eye"></i></button>
                                    <button className="btn-submit ml-2"><i className="fas fa-edit"></i></button>
                                    <button className="btn-submit ml-2"><i className="far fa-trash-alt"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ImportProducts;