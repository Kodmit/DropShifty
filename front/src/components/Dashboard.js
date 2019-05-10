import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bar, Line} from 'react-chartjs-2';
import '../styles/dashboad.scss';
import '../styles/app.scss';
import Chart from './includes/Chart';
import $ from 'jquery';
import 'moment';

let moment = require('moment');


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            chartData: {
                labels:[],
                datasets:[
                    {
                        label: "Chiffre d'affaires",
                        data: [],
                        backgroundColor:[
                            '#4e73df',
                        ]
                    }
                ]
            },
            ordersList: [],
            amount: [],
         }
      }

    componentDidMount() {
        this.getOrdersList();
    }

    getOrdersList() {
        this.ds_call("WC_GetOrdersList");
    }

    ds_call(arg, handledata) {
        //document.getElementById("loader-import").style.display = "block";

        let self = this;
        let data = "{\"query\":\"{\\n\\t " + arg + " \\n}\"}";
        let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                let object = JSON.parse(this.response);
                let objectParsed = object.data.WC_GetOrdersList;

                self.setState({
                    ordersList: objectParsed
                })

                let arrSells = [];
                let arrDates = [];

                $.each(objectParsed, function( index, value ) {
                    arrSells.push(value.total);
                    arrDates.push(moment(value.date_created).format('DD/MM/YYYY'));
                });

                let chartData = {...self.state.chartData};

                chartData.datasets[0].data = arrSells
                self.setState({chartData});

                chartData.labels = arrDates
                self.setState({chartData});

                console.log(self.state.chartData);

                //document.getElementById("loader-import").style.display = "none";

            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", "https://ds-api2.herokuapp.com/");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }


    render() {

        let ordersList = this.state.ordersList;
        let totalSum = 0;
        let currency = "";

        $.each(ordersList, function(i, v) {
          if (v.total != 'undefined') {
            totalSum += parseFloat(v.total);
            currency = v.currency;
          }
        });

        console.log(this.state.ordersList);

        return (
            <div className="main">

                <div className="container mt-4">
                    <h3>Tableau de bord</h3>

                    <div className="mt-4"></div>

                    <div className="row">
                        <div className="col-sm-8">
                            <div className="graph-sales">
                                {/*<Chart />*/}
                                <div className="chart _shadow">
                                    <Line
                                        className="_shadow font"
                                        data={this.state.chartData}
                                        width={500}
                                        height={300}
                                        options={{
                                            maintainAspectRatio: false,
                                            title:{
                                                display: this.props.displayTitle,
                                                fontSize: 25
                                            },
                                            legend:{
                                                display: this.props.displayLegend,
                                                position: this.props.legendPosition
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="overview _shadow">
                                <p className="p-2 bold">Vue d'ensemble</p>

                                <div className="separator"></div>

                                <div className="container mt-2">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <p className="bold">Ventes</p>
                                        </div>
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-4">
                                            <p>19.90 EUR</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <p className="bold">Commandes</p>
                                        </div>
                                        <div className="col-sm-8"></div>
                                        <div className="col-sm-2">
                                            <p>{ordersList.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="separator"></div>

                                <div className="container mt-2">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <p className="bold">Coûts</p>
                                        </div>
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-4">
                                            <p>4,20 EUR</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="separator"></div>

                                <div className="container mt-4">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <p className="bold">Chiffre d'affaires</p>
                                        </div>
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-4">
                                            <p>{totalSum} {currency}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mt-5"></div>

                    <h3>Produits les mieux vendus</h3>

                    <div className="container selling-products mt-4 _shadow">
                        <div className="row mt-3 p-3">
                            <div className="col-sm-8">
                                <p>Bracelet argent</p>
                            </div>
                            <div className="col-sm-2">
                                <p>2 achats</p>
                            </div>
                            <div className="col-sm-2">
                                <p>34,90 EUR</p>
                            </div>
                        </div>

                        <div className="separator"></div>

                        <div className="row p-3">
                            <div className="col-sm-8">
                                <p>Bracelet acier</p>
                            </div>
                            <div className="col-sm-2">
                                <p>3 achats</p>
                            </div>
                            <div className="col-sm-2">
                                <p>32,90 EUR</p>
                            </div>
                        </div>
                    </div>


                    <div className="container">
                        <div className="row">
                            <div></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

};

export default Dashboard;
