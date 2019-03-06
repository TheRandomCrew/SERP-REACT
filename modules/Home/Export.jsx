import React, { Component } from 'react'
import { CSVLink } from "react-csv";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';

export default class Export extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         copied:false
      }
    }

    onCopy=()=>{
        setInterval(()=>this.setState({ copied: false }), 2000)
        this.setState({ copied: true })
    }
    
    render() {
        const { serpData, stats} = this.props
        return (
            <Col xs='12' sm='12' lg='10'>
                <Row noGutters className="justify-content-xs-center">
                    <Col xs='12' sm='3' lg="5">
                        <b>Cantidad de Sugerencias: {stats.total_count}</b>
                    </Col>
                    <Col xs='12' sm='3' lg="4">Tiempo: {stats.results_time}</Col>
                    <Col xs='12' sm='3' lg="3">
                    <ButtonGroup>
                        <CopyToClipboard text={JSON.stringify({ serpData })}
                            onCopy={() => this.onCopy()}>
                            <Button
                                disabled={serpData !== defaultStatus.serpData ? false : true}
                                variant="dark"
                            >
                                Copiar
                      </Button>
                        </CopyToClipboard>
                        {this.state.copied ? <span style={{ color: 'red' }}>Copiado.</span> : null}
                        <CSVLink
                            data={serpData}
                            filename={"tablaSERP@" + new Date().toLocaleString() + ".csv"}
                            className="btn btn-dark"
                            target="_blank"
                            disabled={serpData !== defaultStatus.serpData ? false : true}
                        >
                            Exportar a Excel
                      </CSVLink>
                    </ButtonGroup>
                    </Col>
                </Row>
            </Col>
        )
    }
}

const defaultStatus = {
    copied:false,
    serpData:[
        { key: '-', volume: 0, cpc: 0, competencia: 0 }
      ]
}
