import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'

export default class ChartsView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Volumen de Busqueda",
            backgroundColor: 'rgba(99,132,255,0.5)',
            borderColor: 'rgba(99,132,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(99,255,132,0.4)',
            hoverBorderColor: 'rgba(99,255,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      },
      isLoading: true,
      showError: false,
    }
  }
  render() {
    const { chartData } = this.props;
    const options = {
      annotation: {
        annotations: [{
          drawTime: 'afterDatasetsDraw',
          borderColor: 'red',
          borderDash: [2, 2],
          borderWidth: 2,
          mode: 'vertical',
          type: 'line',
          value: 10,
          scaleID: 'x-axis-0',
        }]
      },
      maintainAspectRation: true,
      responsive: true
    };
    return (
      <Bar
        data={chartData}
        options={options}
      />
    )
  }
}