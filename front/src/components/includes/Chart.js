import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state ={
            chartData:{
                labels:['Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
                datasets:[
                    {
                        label: 'Vente',
                        data: [
                            1000,
                            1500,
                            2000,
                            2500,
                            3000
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(191, 191, 63, 0.6)',
                            'rgba(63, 127, 191, 0.6)',
                            'rgba(127, 191, 63, 0.6)',
                            'rgba(191, 127, 63, 0.6)',
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
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    width={500}
                    height={300}
                    options={{
                        maintainAspectRatio: false,
                        title:{
                            display: this.props.displayTitle,
                            text:'Ventes mensuelles',
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
