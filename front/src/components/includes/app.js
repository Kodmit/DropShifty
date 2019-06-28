console.log("test app.js")

function import_product(sku) {

    let api_url = "https://ds-api2.herokuapp.com";

    document.getElementById("overlay").style.display = "block";

    let category = document.getElementById("ds_cats").value;

    let data = "{\"query\":\"{\\n\\tImportToWc(sku: " + sku +  ", cat_id: " + category + ", type: \\\"simple\\\")\\n}\"}";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let object = JSON.parse(this.response);
        let res = object;

        console.log(res.data)

        document.getElementById("overlay").style.display = "none";

        if (res.data['ImportToWc'] == "ok_simple") {
            console.log("ok simple")
        }
        
        if (res.errors != null) {
          console.log("error")
        }

        
      }
    });

    xhr.open("POST", api_url);
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);
}