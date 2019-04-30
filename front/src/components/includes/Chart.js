import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import '../../styles/app.scss';


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state ={
            chartData:{
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
            }
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend:true,
        legendPosition: 'right'
    }

    render() {
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
