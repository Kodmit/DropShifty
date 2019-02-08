/*
function ds_call(arg, handledata){

    let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
    let xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let object = JSON.parse(this.response);
        handledata(object.data[arg]);
      }
    });
    xhr.withCredentials = true;
    xhr.open("POST", "http://localhost:8000/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);
  
  }

  ds_call('CheckIfConnected', function(out) {
      console.log(out);
  })
  */