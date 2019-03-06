import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  SelectionState,
  IntegratedSelection,
  SortingState,
  IntegratedSorting
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';

class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.changeSelection = selection => {
      this.selectRows(selection)      
      this.setState({ selection })
  };
  }

  selectRows(selectionArray){
    const {rows} = this.props.tableData
    const newrows = selectionArray.map(select=>rows[select])
    this.props.set('serpData', newrows)
  }
  render() {
    const { columnWidths, volumeColumn, selection } = this.state;
    const { tableData } = this.props
    const { rows, columns } = tableData
    return (
      <React.Fragment>
        <span>
        Filas seleccionadas
          {' '}
          {selection.length}
        </span>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{ columnName: 'id', direction: 'desc' }]}
          />
          <IntegratedSorting />
          <VolumeTypeProvider
            for={volumeColumn}
          />
          <Table columnExtensions={columnWidths} />
          <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
          <IntegratedSelection />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
        </Grid>
      </React.Fragment>
    );
  }

}
export default TableView;

const volumeFormatter = ({ value }) => (
  <p>
    {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
  </p>
)

const VolumeTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={volumeFormatter}
    {...props}
  />
);

const defaultState = {
  volumeColumn: ['volume'],
  columnWidths: [
    { columnName: 'keywords', wordWrapEnabled: true },
    { columnName: 'volume', width: 25, wordWrapEnabled: true },
    { columnName: 'cpc', width: 25, wordWrapEnabled: true },
    { columnName: 'adwords', width: 20, wordWrapEnabled: true },
    { columnName: 'competencia', width: 30, wordWrapEnabled: true }
  ],
  selection: []
}