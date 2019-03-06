import React, { Component } from 'react'
import axios from 'axios'
import { Card, Alert } from 'react-bootstrap'
import TableView from './RankTableView';
import '../../Utils/spiner.css'

export default class SERPTable extends Component {
  constructor(props) {
    super(props)
    this.state = defaultStatus
  }

  render() {
    const { isLoading, tableData, error, results_time } = this.state;
    return (
      <React.Fragment>
        {error ?
          <Alert dismissible variant="danger">
            <Alert.Heading>Haz tenido un error!</Alert.Heading>
            <p>
              ERROR:<br />{JSON.stringify(error)}<br />Repita la busqueda con otras palabras
           </p>
          </Alert> : null}
        {isLoading ?
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Cargando...</Card.Title>
              <div className="lds-ripple">
                <div></div><div></div>
              </div>
              <Card.Subtitle className="mb-2 text-muted">
                Espere por favor
              </Card.Subtitle>
            </Card.Body>
          </Card> :
          <TableView tableData={tableData} results_time={results_time} />}
      </React.Fragment>
    )
  }

  componentWillMount() {
    this.rankedAPI(this.props.query)
  }

  componentDidUpdate(prevProps) {
    if (this.props.query.keywords !== prevProps.query.keywords) {
      this.rankedAPI(this.props.query)
      this.setState({ ...this.state, isLoading: true })
    }
  }

  rankedAPI = async (data) => {
    const { keywords } = data
    await axios({
      method: 'post',
      url: `http://server.borjamediavilla.com/api/ranked`,
      data,
      crossdomain: true
    })
      .then((resp) => {
        const { data } = resp.data
        if (data.results) {
          const { results, results_time } = data;
          const { organic } = results
          try {
            const tableData = this.rankedSites(organic)
            // this.props.toggle('status')
            this.setState({
              ...this.state,
              tableData,
              isLoading: false,
              keywords: keywords,
              firstDone: true,
              results_time
            })
          }
          catch (error) {
            console.log(error)
            this.setState({
              isLoading: false,
              error: 'bad api ranked response:' + JSON.stringify(error),
              showError: true
            })
          }
        }
        else {
          const { status } = data
          if (status === 'queued') {
            console.error('bad ranked response:', status)
            this.setState({
              ...this.state,
              error: 'bad ranked response:' + status,
              isLoading: false,
              keywords: data.keywords
            })
          }
          else {
            console.error('bad ranked response:', data.msg)
          }
        }
      })
      .catch(error => {
        console.error('ranked api error' + JSON.stringify(error))
        this.setState({ isLoading: false, error })
      });
  }

  rankedSites = (ranked) => {
    let rankRows = ranked.filter(sitio => sitio.result_position < 11)
    let rankRow = rankRows.map((sitio) => {
      const { result_url, result_position, result_title } = sitio
      const row = {
        url: result_url,
        pos: result_position,
        title: result_title,
        shares: result_url,
        pda: result_url
      }
      return row
    })
    let rank = {
      rows: rankRow,
      columns: [
        { name: 'pos', title: 'Rank ing' },
        { name: 'title', title: 'Titulo' },
        { name: 'shares', title: 'FB' },
        { name: 'pda', title: 'PDA' },
        { name: 'url', title: 'URL' }
      ]
    }
    return rank
  }
}
const defaultStatus = {
  firstDone: false,
  error: null,
  isLoading: true,
  keywords: '',
  tableData: {
    rows: [{
      pos: 1,
      title: 'google.com',
      shares: 'https://www.google.com',
      url: 'https://www.google.com',
    },
    { name: 'url', title: 'URL' },
    { name: 'pda', title: 'PDA' }
    ]
  },
  filter: {},
  results_time: 0
}