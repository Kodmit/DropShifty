import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importProducts.scss';
import '../styles/app.scss';

const ImportProducts = () => {
    return (
        <div className="main">
            <div className="container mt-4 content-import">
                <h3>Importer un produit</h3>

                <form className="form-import-product" action="#">
                    <div className="form-group">
                        <label htmlFor="url-product-import">Entrer l'url de votre produit à importer</label>
                        <input type="text" className="_form-control" id="url-product-import" placeholder="Url de votre produit" />
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
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default ImportProducts;