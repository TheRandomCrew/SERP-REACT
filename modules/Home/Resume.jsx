import React, { Component } from 'react'
import axios from 'axios'
import ResumeView from './Resume/ResumeView';
import HistoryChart from './Resume/HistoryChart'

export default class Resume extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: [
        { dates: '2017-Dec', clics: 1 },
        { dates: '2018-Jan', clics: 2 }
      ],
      isLoading: true,
      showError: false,
      total_count: 0,
      results_time: 0.0,
      result: {
        key: '-',
        sv: '-',
        cpc: '-',
        cmp: '-'
      },
      keywords: ''
    }
  }
  render() {
    const {
      chartData, isLoading, error, result
    } = this.state;
    return (
          <ResumeView
            error={error}
            isLoading={isLoading}
            result={result}
          >
            <HistoryChart chartData={chartData} />
          </ResumeView>
    )
  }
  handleClose = () => {
    this.setState({ ...this.state, showError: false });
  }

  componentDidMount() {
    if (this.props.query.keywords) {
      const { query } = this.props;
      this.historyAPI(query);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.historyAPI(this.props.query);
      this.setState({ ...this.state, isLoading: true })
    }
  }

  historyAPI = async (data) => {
    const { keywords } = data
    axios({
      method: 'post',
      url: `http://server.borjamediavilla.com/api/history`, //http://localhost:8000 || http://server.borjamediavilla.com
      data,
      crossdomain: true
    })
      .then(resp => {
        const { data } = resp.data //, success
        const { results, status, results_time, error } = data;
        if (error) {
          // this.props.setData({ error: 'bad history response:' })
          this.setState({
            isLoading: false,
            error: 'bad api history response:' + JSON.stringify(error[0]),
            showError: true
          })
        }
        if (status === 'ok') {
          const result = results[0];
          const chartData = this.historyKeyword(result.ms)
          this.setState({
            ...this.state,
            chartData,
            isLoading: false,
            keywords,
            results_time,
            result
          })
        }
        else {
          console.error('bad history response:')
          this.props.setData({ error: 'bad history response:' })
          this.setState({
            isLoading: false,
            error: 'bad history response:',
            showError: true
          })
        }
      })
      .catch(error => {
        console.error('history api error' + JSON.stringify(error))
        this.props.setData({ error })
        this.setState({
          isLoading: false, error,
          showError: true
        })
      });
  }

  historyKeyword = (history) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels = history.reverse().map((entrada) => {
      const { year, month } = entrada
      const row = year + "-" + monthNames[month - 1]
      return row
    })

    const data = history.reverse().map((entrada) => entrada.count)

    const chartData = {
      labels,
      datasets: [
        {
          label: "Volumen de Busqueda",
          backgroundColor: 'rgba(99,132,255,0.5)',
          borderColor: 'rgba(99,132,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(99,255,132,0.4)',
          hoverBorderColor: 'rgba(99,255,132,1)',
          data
        }
      ]
    }
    return chartData
  }
}
