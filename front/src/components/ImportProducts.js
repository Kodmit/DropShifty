import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importProducts.scss';
import '../styles/app.scss';

const ImportProducts = () => {
    return (
        <div className="main">
            <div className="container mt-4">
                <h3>Importer un produit</h3>

                <form className="form-import-product" action="#">
                    <div className="form-group">
                        <label htmlFor="url-product-import">Entrer l'url de votre produit à importer</label>
                        <input type="text" className="_form-control" id="url-product-import" placeholder="Url de votre produit" />
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div> 
        </div>
    );
};

export default ImportProducts;