import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  // SelectionState,
  // IntegratedSelection,
  SortingState,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  // VirtualTable,
  TableHeaderRow,
  // TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { columnWidths, urlColumn, faceColumn, pdaColumn } = this.state;
    const { tableData, results_time } = this.props
    const { rows, columns } = tableData
    return (
      <div>
        <span>
          <b>Tiempo:</b>
          {' '}
          {results_time}
        </span>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{ columnName: 'pos', direction: 'asc' }]}
          />
          <IntegratedSorting />
          <URLTypeProvider
            for={urlColumn}
          />
          <FaceTypeProvider
            for={faceColumn}
          />
          <PDATypeProvider
            for={pdaColumn}
          />
          <Table columnExtensions={columnWidths} />
          {/* <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
          <IntegratedSelection /> */}
          {/* <VirtualTable /> */}
          <TableHeaderRow showSortingControls contentComponent={TableHeaderContent} />
          {/* <TableSelection showSelectAll /> */}
        </Grid>
      </div>
    );
  }

}
export default TableView;

const TableHeaderContent = ({ column, children, ...restProps }) => (
  <TableHeaderRow.Content
    column={column}
    {...restProps}
  >
    {children}
    {/* <FontAwesomeIcon icon="arrows-alt-v" /> */}
  </TableHeaderRow.Content>
);

const URLFormatter = ({ value }) => (
  <p>
    <a href={value} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  </p>
)

const URLTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={URLFormatter}
    {...props}
  />
);

const FaceFormatter = ({ value }) => (
  <Facebook url={value} />
)

const FaceTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={FaceFormatter}
    {...props}
  />
);

const PDAFormatter = ({ value }) => (
  <PDA url={value} />
)
const PDATypeProvider = props => (
  <DataTypeProvider
    formatterComponent={PDAFormatter}
    {...props}
  />
);

const defaultState = {
  pdaColumn: ['pda'],
  urlColumn: ['url'],
  faceColumn: ['shares'],
  columnWidths: [
    { columnName: 'pos', width: 20, wordWrapEnabled: true },
    { columnName: 'title', wordWrapEnabled: true },
    { columnName: 'shares', width: 20, wordWrapEnabled: true },
    { columnName: 'url', width: 30, wordWrapEnabled: true },
    { columnName: 'pda', width: 20, wordWrapEnabled: true }
  ],
  selection: []
}


class Facebook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      engagement: '-',
      showError: false
    }
  }

  componentWillMount() {
    this.getFacebook(this.props.url)
  }

  render() {
    const { share_count } = this.state.engagement
    return (
      <p>
        <FontAwesomeIcon icon="share-alt" />{share_count} 
      </p>
    )
  }

  getFacebook = url => {
    this.apiFacebook(url)
  }

  apiFacebook = async (url) => {
    const apiURL = `https://graph.facebook.com/v3.2/?id=${url}&fields=engagement&access_token=172128476844398|F_U3IWRlVkTq_4Mh75VWreBoAHc`
    await axios.get(apiURL)
      .then(async resp => {
        if (resp.data) {
          const { engagement } = resp.data
          this.setState({ engagement })
        }
        else {
          console.error('bad facebook response:', resp)
          this.setState({
            isLoading: false, error: 'bad facebook response', showError: true, engagement: '-'
          })
        }
      })
      .catch(error => {
        console.error('facebook api error' + JSON.stringify(error))
        this.setState({ isLoading: false, error })
      });
  }
}

class PDA extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pda: '-', showError: false }
  }
  render() {
    const { pda } = this.state;
    return (<p> {pda} </p>)
  }
  componentWillMount() {
    this.apiPDA(this.props.url)
  }
  apiPDA = async (url) => {
    await axios({
      url: 'http://server.borjamediavilla.com/api/moz',
      method: 'post',
      data: { url },
      crossdomain: true
    })
      .then((res) => {
        const { data } = res.data
        console.log(res.data)
        const { pda } = data
        if (pda) {
          this.setState({ pda })
        }
        else { console.error(res) }
      })
      .catch((e) => { console.log(e) })
  }
}