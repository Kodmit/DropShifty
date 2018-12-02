import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importedProducts.scss';
import '../styles/app.scss';

const ImportedProducts = () => {
    return (
        <div className="main">
            <div className="container mt-4">
                <h3>Produits importés</h3>

                <div className="content-import">
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

                <div className="content-import">
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
        </div>
    );
};

export default ImportedProducts;