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

                chartData.datasets[0].data = arrSells.reverse();
                self.setState({chartData});

                chartData.labels = arrDates.reverse();
                self.setState({chartData});
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
        let products = [];
        let productsName = [];

        $.each(ordersList, function(index, value) {
          if (value.total != 'undefined') {
            totalSum += parseFloat(value.total);
            currency = value.currency;
            products.push(value.line_items);
          }
        });

        console.log(this.state.ordersList);

        $.each(products, function(i, v) {
          console.log(v[0]);
          productsName.push(v[0]);
        });


        const items = productsName.map((item, key) =>
          <div>
            <div className="row mt-3 p-3">
                <div className="col-sm-8">
                    <p>{item.name.substring(0, 60)}...</p>
                </div>
                <div className="col-sm-2">
                    <p>Quantité : {item.quantity}</p>
                </div>
                <div className="col-sm-2">
                    <p>{item.subtotal} {currency}</p>
                </div>
            </div>
            <div className="separator"></div>
         </div>
        );

        if (ordersList != null) {
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
                                          <div className="col-sm-5"></div>
                                          <div className="col-sm-5">
                                              <p className="res_val">{totalSum || '-'} {currency}</p>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-sm-2">
                                              <p className="bold">Commandes</p>
                                          </div>
                                          <div className="col-sm-5"></div>
                                          <div className="col-sm-5">
                                              <p className="res_val">{ordersList.length || '-'}</p>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="separator"></div>

                                  <div className="container mt-2">
                                      <div className="row">
                                          <div className="col-sm-2">
                                              <p className="bold">Coûts</p>
                                          </div>
                                          <div className="col-sm-5"></div>
                                          <div className="col-sm-5">
                                              <p className="res_val">-</p>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="separator"></div>

                                  <div className="container mt-4">
                                      <div className="row">
                                          <div className="col-sm-7">
                                              <p className="bold">Chiffre d'affaires</p>
                                          </div>
                                          <div className="col-sm-5">
                                              <p className="res_val">{totalSum || '-'} {currency}</p>
                                          </div>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>

                      <div className="mt-5"></div>

                      <h3>Derniers produits vendus</h3>

                      <div className="container selling-products mt-4 _shadow">
                          {items}
                      </div>


                      <div className="container">
                          <div className="row">
                              <div></div>
                          </div>
                      </div>

                  </div>
              </div>
          );
        } else {
          return(
            <div className="main">

                <div className="container mt-4">
                    <h3>Tableau de bord</h3>

                    <div className="mt-4"></div>

                    <div className="row">
                        <div className="col-sm-8">
                            <div className="graph-sales">
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
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <p className="bold">Commandes</p>
                                        </div>
                                        <div className="col-sm-8"></div>
                                        <div className="col-sm-2">
                                            <p></p>
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
                                            <p></p>
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
                                            <p></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mt-5"></div>

                    <h3>Derniers produits vendus</h3>

                    <div className="container selling-products mt-4 _shadow">
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
    }

};

export default Dashboard;
