import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import '../../styles/app.scss';
import $ from 'jquery';
import 'moment';

let moment = require('moment');

const config = require('../components/includes/config.json');


class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels:['Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                datasets:[
                    {
                        label: "Chiffre d'affaires",
                        data: [
                            1000,
                            900,
                            1200,
                            500,
                            300
                        ],
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

    componentDidUpdate() {
        console.log("update")
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

                //console.log(self.state.ordersList);

                //document.getElementById("loader-import").style.display = "none";
                
            }
        });

        xhr.withCredentials = true;
        xhr.open("POST", config.config.api_url);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(data);
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend:true,
        legendPosition: 'right'
    }

    render() {

        /*
        let orderList = this.state.ordersList;
        let arr = [];

        $.each(orderList, function( index, value ) {
            console.log("test")
            console.log( value.total );
            arr.push(value.total);
            self.setState({amount: arr});
        });
        */

        return (
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
        )
    }
}

export default Chart;
