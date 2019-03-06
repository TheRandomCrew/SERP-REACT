import React, { Component } from 'react'
import axios from 'axios'
import { Card, Alert } from 'react-bootstrap'
import TableView from './SERPTableView';
import '../../Utils/spiner.css'

export default class SERPTable extends Component {
  constructor(props) {
    super(props)
    this.state = defaultStatus
  }

  render() {
    const { isLoading, tableData, error } = this.state;
    const { filter, set } = this.props
    const data = this.serpFilter(tableData.rows, filter)
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
          <TableView tableData={data} set={set}/>
        }

      </React.Fragment>
    )
  }

  componentWillMount() {
    this.serpAPI(this.props.query)
  }

  componentDidUpdate(prevProps) {
    if (this.props.query.keywords !== prevProps.query.keywords) {
      this.serpAPI(this.props.query)
      this.setState({ ...this.state, isLoading: true })
    }
  }

  serpAPI = async (data) => {
    const { keywords } = data
    await axios({
      method: 'post',
      url: `http://server.borjamediavilla.com/api/serp`,
      data,
      crossdomain: true
    })
      .then(resp => {
        const { data, info } = resp.data
        console.log(info)
        const { results, status, results_time } = data;
        const { serpKeywords } = results;
        const { meta, related } = serpKeywords;
        const { total_count } = meta
        if (status === 'ok' && related !== 'No data') {
          const tableData = this.serpApiData(related, meta.keyword.trim().toLowerCase())
          this.props.set('stats', { total_count, results_time })
          this.setState({
            ...this.state,
            tableData,
            isLoading: false,
            keywords
          })
        }
        else {
          console.error('bad serp response:', related)
          this.props.set({ error: 'bad serp response:' + related })
          this.setState({
            isLoading: false, error: 'bad serp response', showError: true
          })
        }
      })
      .catch(error => {
        console.error('serp api error' + JSON.stringify(error))
        this.props.set({ error })
        this.setState({ isLoading: false, error })
      });
  }

  serpApiData = (APIDATA, kywd) => {
    let newKeywd = [], completeKywd = [], startKywd = [], containKywd = [], restKywd = [];
    // eslint-disable-next-line
    APIDATA.map((keywords) => {
      let sanitizedKywd = keywords.key.trim().toLowerCase();
      let flag = true;
      if (sanitizedKywd === kywd) {
        completeKywd.push(keywords);
        flag = false;
      }
      if (sanitizedKywd.substr(0, sanitizedKywd.length).indexOf(kywd) === 0) {
        startKywd.push(keywords);
        flag = false;
      }
      if (sanitizedKywd.substr(0, sanitizedKywd.length).indexOf(kywd) !== 0 && sanitizedKywd.substr(0, sanitizedKywd.length).indexOf(kywd) !== -1) {
        containKywd.push(keywords);
        flag = false;
      }
      if (flag) {
        restKywd.push(keywords);
      }
    })

    newKeywd = completeKywd.concat(startKywd, containKywd, restKywd);
    let serpStats = newKeywd.map((keywords) => {
      const row = {
        key: keywords.key,
        volume: keywords.search_volume,
        cpc: keywords.cpc,
        competencia: keywords.competition
      };
      return row;
    })

    this.props.set('serpData', serpStats)
    let serpAPI = {
      rows: serpStats,
      columns: [
        { name: 'keywords', title: 'Palabras Claves' },
        { name: 'volume', title: 'Vo lu men' },
        { name: 'cpc', title: 'CPC' },
        { name: 'competencia', title: 'Com pe ten cia' }
      ]
    }
    return serpAPI;
  }


  serpFilter = (APIDATA, filter) => {
    const {
      minVolume, maxVolume, minAdwords, maxAdwords, minCPC, maxCPC, filterKeys, eraseKeys
    } = filter
    let newKeywd = []
    // eslint-disable-next-line
    APIDATA.map(keywords => {
      if ((keywords.volume >= minVolume && keywords.volume <= maxVolume) &&
        (Math.floor((keywords.cpc + 0.01) * 100) / 100 >= minCPC &&
          Math.floor((keywords.cpc + 0.01) * 100) / 100 <= maxCPC) &&
        (Math.round(keywords.competencia * 100) >= minAdwords &&
          Math.round(keywords.competencia * 100) <= maxAdwords)) {

        if (eraseKeys === '') {
          filterKeys.split('\n').forEach(element => {
            if (keywords.key.includes(element)) {
              newKeywd.push(keywords)
            }
          });
        }
        else {
          filterKeys.split('\n').forEach(element => {
            if (keywords.key.includes(element)) {
              eraseKeys.split('\n').forEach(element => {
                if (!keywords.key.includes(element)) {
                  newKeywd.push(keywords)
                }
              }
              )
            }
          });
        }
      }
    })

    let serpStats = newKeywd.map((keywords) => {
      let comp = Math.round(keywords.competencia * 100);
      if (comp === 0) { comp = 1; }
      const row = {
        keywords: keywords.key,
        volume: keywords.volume,
        cpc: Math.floor((keywords.cpc + 0.01) * 100) / 100 + '€',
        competencia: comp
      };
      return row;
    })

    let serpAPI = {
      rows: serpStats,
      columns: [
        { name: 'keywords', title: 'Palabras Claves' },
        { name: 'volume', title: 'Vo lu men' },
        { name: 'cpc', title: 'CPC' },
        { name: 'competencia', title: 'Com pe ten cia' }
      ]
    }
    return serpAPI;
  }
}
const defaultStatus = {
  error: null,
  isLoading: true,
  tableData: {
    rows: [
      { keywords: 'null', volume: '0', cpc: '0.0', competencia: '0.0' }
    ],
    columns: [
      { name: 'keywords', title: 'Palabras Claves' },
      { name: 'volume', title: 'Bus que da' },
      { name: 'cpc', title: 'CPC' },
      { name: 'competencia', title: 'Com pe ten cia SEO' }
    ]
  }
}