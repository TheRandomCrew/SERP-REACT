import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Card, Button, Row, Col, OverlayTrigger, Tooltip
} from 'react-bootstrap'

const ResumeCards = ({ result }) => {
    let cpc = '-'
    let competition = '-'
    let search_volume = '-'
    let variantCompetition = "secondary"
    if (result) {
        if (result.cmp < 0.33) {
            competition = 'Baja (' + Math.floor((result.cmp) * 10000) / 100 + '%)'
            variantCompetition = "success"
        }
        else if (result.cmp < 0.67) {
            competition = 'Media (' + Math.floor((result.cmp) * 10000) / 100 + '%)'
            variantCompetition = "warning"
        }
        else if (result.cmp >= 0.67) {
            competition = 'Alta (' + Math.floor((result.cmp) * 10000) / 100 + '%)'
            variantCompetition = "danger"
        }
        cpc = Math.floor((result.cpc) * 100) / 100 + '€'
        search_volume = result.sv
    }
    return (
        <Row noGutters>
            <Col xs='6' sm='6' lg='3'><OverlayTrigger
                placement="top" delay={{ show: 50, hide: 400 }}
                overlay={
                    <Tooltip id={`tooltip-Competencia`}>
                        <strong>Competencia</strong> (en %) de cualquier Keyword en buscadores.
                        </Tooltip>
                }
            >
                <Button variant={variantCompetition} block>
                    <ReviewCardView
                        color={variantCompetition}
                        title="Competencia"
                        data={competition}
                        icon="balance-scale" />
                </Button>
            </OverlayTrigger>
            </Col>
            <Col xs='6' sm='6' lg='3'><OverlayTrigger
                placement="top" delay={{ show: 50, hide: 400 }}
                overlay={
                    <Tooltip id={`tooltip-Competencia`}>
                        La <strong>keyword</strong> de esta busqueda.
                                </Tooltip>
                }
            >
                <Button variant="primary" block>
                    <ReviewCardView
                        color="primary" title="Busqueda Actual:"
                        data={result.key} icon="search"
                    />
                </Button>
            </OverlayTrigger>
            </Col>
            <Col xs='6' sm='6' lg='3'> <OverlayTrigger
                placement="top" delay={{ show: 50, hide: 400 }}
                overlay={
                    <Tooltip id={`tooltip-Competencia`}>
                        <strong>CPC promedio</strong> expresado en euros.
                        </Tooltip>
                }
            >
                <Button variant="info" block>
                    <ReviewCardView color="info" title="Costo por Clic" data={cpc} icon="money-bill" />
                </Button>
            </OverlayTrigger>
            </Col>
            <Col xs='6' sm='6' lg='3'> <OverlayTrigger
                placement="top" delay={{ show: 50, hide: 400 }}
                overlay={
                    <Tooltip id={`tooltip-Competencia`}>
                        Promedio anual de <strong>Volumen de Busqueda</strong>
                    </Tooltip>
                }
            >
                <Button variant="dark" block>
                    <ReviewCardView color="dark" title="Volumen de Busqueda" data={search_volume} icon="mouse-pointer" />
                </Button>
            </OverlayTrigger>
            </Col>
        </Row>
    )
}

const ReviewCardView = ({ color, title, data, icon }) =>
    <Card className="text-center" bg={color} text="white">
        <Card.Title> {title} </Card.Title>
        <Card.Body >
            <FontAwesomeIcon icon={icon} size="3x" />
            <Card.Text> {data} </Card.Text>
        </Card.Body>
    </Card>

export default ResumeCards