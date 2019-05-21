import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/importProducts.scss';
import '../styles/app.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import $ from 'jquery';

class ImportProducts extends Component {

    constructor(props) {
      super(props);
      this.state = {
        showResults: ''
      };

      // Must be bind else it's not Working
      this.ds_product_submit = this.ds_product_submit.bind(this);
    }


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
        document.getElementById("overlay").style.display = "block";

        //let category = 2089;

        // Working
        let data = '{\"query\":\"{\\n\\tImportToWc(sku:' + '\\\"' + sku + '\\\"' + ', cat_id: 2089, type: \\\"simple\\\")\\n\\t}\"}';


        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        console.log(data);

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);

                let object = JSON.parse(this.response);
                let res = object.data['ImportToWc'];

                if (res == 'ok_simple') {
                    Swal.fire({
                        title: '<strong>Produits importés</strong>',
                        type: 'success',
                        html: 'Le produit a été importé avec succès ! Vous pouvez le consulter dans la liste des produits.',
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    });
                } else {
                    Swal.fire({
                        title: '<strong>Oups</strong>',
                        type: 'error',
                        html: "Aucun produit ne correspond au code SKU renseigné",
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: 'Fermer',
                        confirmButtonAriaLabel: 'Fermer'
                    });
                }
                document.getElementById("overlay").style.display = "none";
            }
        });

        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send(data);
    }

    // Import all variables products
    import_all_products(sku) {
        document.getElementById("overlay").style.display = "block";

        let category = document.getElementById("ds_cats").value;
        let data = "{\"query\":\"{\\n\\tImportToWc(sku: " + sku + ", cat_id: " + category + ", type: \\\"variable\\\")\\n}\"}";
        let xhr = new XMLHttpRequest();

        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                document.getElementById("overlay").style.display = "none";

                Swal.fire({
                    title: '<strong>Produits importés</strong>',
                    type: 'success',
                    html: 'Les produits ont été importés avec succès ! Vous pouvez les consulter dans la liste de vos produits.',
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

    get_categories() {
    	let list = document.getElementById("ds_cats");

    	this.ds_call("WC_GetProductsCategories", function(output){
    		Object.keys(output).map(function(objectKey, index) {
    			let value = output[objectKey];
    			list.innerHTML += '<option value="' + value.id + '">' + value.name + '</option>';
    		});
    	});
    }

    fetch_product(supplier, sku, handledata) {
      	let url;
      	this.ds_call("GetCbToken", function(output){
      		$.post( url, { token: output, goods_sn: sku } ).done(function(msg){
      			handledata(msg);
      		});
      	});

      	if (supplier === "chinabrands") {
      		url = "https://gloapi.chinabrands.com/v2/product/index";
      	}
    }

    ds_product_submit(event) {
    	event.preventDefault();
      let self = this;
    	let product_sku = document.getElementById("sku").value;

    	this.fetch_product("chinabrands", product_sku, function(output) {
    		console.log(output);

        if (output.status === 0) {
          Swal.fire({
              title: '<strong>Produit non existant</strong>',
              type: 'error',
              html: "Le sku du produit que vous avez importé n'a pas été trouvé",
              showCloseButton: true,
              showCancelButton: false,
              focusConfirm: false,
              confirmButtonText: 'Fermer',
              confirmButtonAriaLabel: 'Fermer'
          });
          return;
        }

    		document.getElementById("modal_products").removeAttribute("style");
    		let list = document.getElementsByClassName("list")[0];

    		if (output.status === 1) {
          document.getElementById("modal_products").style.display = "block";

    			self.get_categories();

    			Object.keys(output.msg).map(function(objectKey, index) {
    				let value = output.msg[objectKey];

    				if (value.errcode) {

    					if (value.errcode === 13006 || value.errcode === 15015) {
    						//list.innerHTML += '<div class="product"><img style="padding: 20px" width="80px" src="' + scriptParams.ds_plugin_path + 'out_of_stock.png"><span class="oos">Out of stock</span></div>';
                list.innerHTML += '<div class="product"><span class="oos">Out of stock</span></div>';
    					} else {
    						list.innerHTML += '<div class="product">Erreur inconnue</div>';
    					}
    				} else {
    					document.getElementById("ds_nb_founds").innerHTML = output.msg.length;

    					let warehouse = value.warehouse_list[Object.keys(value.warehouse_list)[0]];
              let variations = '';

    					if (value.color || value.size) {
    						let variations = "<br><b>Couleur : " + value.color + " | Taille : " + value.size + "</b>";
    					}

    					list.innerHTML += '<div class="product"><img height="120px" src="'+value.original_img[0]+'"><span class="title">' + value.title + '</span>' + variations + '<br><div class="price">Prix $'+ warehouse.price +'</div><div class="fees">Frais $'+ warehouse.handling_fee +'</div><button href="#" class="btn-import" onclick="import_product(' + value.sku + ')">Importer</button></div>';
    				}
    			});
    		} else {
    			list.innerHTML = "Produit non trouvé";
    		}
    	});

    }

    /*
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
                        html: 'Nous ne disposons pas de vos informations de connexion à l\'API WooCommerce, veuillez les fournir sur votre compte Dropshifty pour utiliser le plugin.<br><br><a href="'+ link +'" target="_blank">Renseigner les informations automatiquement.</a>',
                    });
                });
            }
        });
        this.import_product(sku);
    };
    */

    render () {
        return (
            <div className="main">

                <div className="container mt-4">
                    <h3>Importer un produit</h3>

                    <div style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                        <form className="form-import-product" onSubmit={this.submitImport}>
                            <div className="form-group">
                                <label htmlFor="sku">Entrer le code SKU du produit à importer</label>
                                <input required type="text" className="_form-control" id="sku" name={'sku'} placeholder="Code SKU du produit" />
                                <input onClick={this.ds_product_submit} className="btn-import mt-3" type="submit" value="Importer" />
                            </div>
                        </form>
                    </div>

                    <div id="overlay" style={{ display: 'none' }}>
                        <img id="loader" src="images/loader.svg" />
                    </div>

                </div>

                {/* Will display categories */}
                <div style={{ display: 'none' }} id="modal_products">
                  	<h1><span id="ds_nb_founds">0</span> variation(s) trouvée(s)</h1>

                  	<div class="ds_cats_container">
                    		<h3>Choisissez une catégorie</h3>
                    		<select id="ds_cats"></select>
                  	</div>

                  	<div class="list"></div>

                    <button className="btn-import mx-auto d-block mt-3" onClick={this.import_all_products} id="ds_import_all">Importer toutes les variations en un produit variable</button>

                </div>

            </div>
        );
    }

}

export default ImportProducts;
