import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class Parameters extends Component {

    submitParameters = (e) => {
        e.preventDefault();
        const apiKey = e.target.elements.apikey.value;
        console.log(apiKey);
    };

    parameterBtn = (e) => {
        e.preventDefault();
        console.log("click on param btn");
    };

    render() {

        return (
            <div className="main">
                <div className="container mt-3">
                    <h3>Paramètres</h3>

                    <div className="mt-3">
                        <form onSubmit={this.submitParameters}>
                            <div className="form-group">
                                <label htmlFor="apikey">Clé api</label>
                                <input required="required" type="text" name="apikey" className="_form-control" id="apikey" placeholder="Email"/>
                            </div>
                            <button onClick={this.parameterBtn} type="submit" className="btn-import mt-3">Enregistrer</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default Parameters;