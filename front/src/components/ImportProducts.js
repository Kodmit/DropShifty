import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importProducts.scss';
import '../styles/app.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

class ImportProducts extends Component {

    // GraphQL calls function
    ds_call(arg, handledata) {

        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.response);
                let object = JSON.parse(this.response);
                handledata(object.data[arg]);
            }
        });
        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    // Import single product
    import_product(sku) {

        let category = 2089;

        // Working from insomnia
        //let data = "{\"query\":\"{\\n\\tImportToWc(sku: \\\"423617502\\\", cat_id: 2089, type: \\\"simple\\\")\\n\\t# Type can be 'variable\\\" or 'simple' (by default).\\n}\"}";

        // Working
        let data = '{\"query\":\"{\\n\\tImportToWc(sku:' + '\\\"' + sku + '\\\"' + ', cat_id: 2089, type: \\\"simple\\\")\\n\\t}\"}';


        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        console.log(data)

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                //loader("hide");

                Swal.fire({
                    title: '<strong>Produits importés</strong>',
                    type: 'success',
                    html: 'Le produit a été importé avec succès ! Vous pouvez le consulter dans la liste des produits.',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Fermer',
                    confirmButtonAriaLabel: 'Fermer'
                })
            }
        });

        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send(data);
    }

    submitImport = (e) => {
        e.preventDefault();
        let self = this;
        const sku = e.target.elements.sku.value;
        console.log(sku);
        this.ds_call("CheckIfWCApiFilled", function(output){
            if(!output) {
                self.ds_call("GenWcLink", function(link){
                    console.log(link)
                    Swal.fire({
                        type: 'error',
                        title: 'Oups...',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        html: 'Nous ne disposons pas de vos informations de connexion à l\'API WooCommerce, veuillez les fournir sur votre compte Dropshifty pour utiliser le plugin.<br><br><a href="'+ link +'">Renseigner les informations automatiquement.</a>',
                        footer: '<a href="https://dropshifty.com/my-account">Renseigner mes informations sur Dropshifty.com</a>'
                    });
                });
            }
        });
        this.import_product(sku)
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