import React from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap';
import Editor from './Editor/Editor';
import Analysis from './Analysis';

const HomeView = ({ searchForm, serpTable, rankTable, isSearching, toggle, expand }) => {
    return (
        <React.Fragment>
            <div style={{ marginTop: '45px', padding: 20 }}>
                <Row className="justify-content-md-center">
                    <Button onClick={() => toggle('expand')} size="sm">
                        Expandir editor de textos
                    </Button>
                </Row>
                <Row>
                    <Col hidden={expand} lg="4">
                        <Row>
                            <Card>
                                {searchForm}
                            </Card>
                        </Row>
                        {isSearching ?
                            <Row style={{ height: "100vh" }}>
                                <Col className="h-50 d-inline-block" style={{ overflowY: "scroll" }} lg="12">
                                    <Card>
                                        {serpTable}
                                    </Card>
                                </Col>
                                <span>TOP 10 DE LAS PALABRAS CLAVE PRINCIPAL</span>
                                <Col className="h-50 d-inline-block" style={{ overflowY: "scroll" }} lg="12">
                                    <Card>
                                        {rankTable}
                                    </Card>
                                </Col>
                            </Row> : null
                        }
                    </Col>
                    <Col>
                        <Card>
                            <Row>
                                <Col lg="9">
                                    <input placeholder="Escribe el Titulo SEO"/><br/>
                                    <textarea rows='2' style={{width:"100%"}} placeholder="Escribe la meta descripcion SEO" /><br/>
                                    url:
                                    <Editor />
                                    <Card>Numero de Palabras</Card>
                                    <Card>Palabras Claves Anadidas</Card>
                                </Col>
                                <Col lg="2">
                                    <Row className="justify-content-md-center">
                                        <Button size="sm">
                                            Guardar Articulo
                                        </Button>
                                        <Button size="sm">
                                            Descargar Articulo
                                        </Button>
                                        <Button style={{ borderRadius: "50%", padding: "20px", display: "inline-block" }}>
                                            Puntuacion <br />SEO
                                        </Button>
                                        <Button style={{ borderRadius: "50%", padding: "20px", display: "inline-block" }}>
                                            Indice de <br />Legibilidad
                                        </Button>
                                        <Button size="sm">
                                            Comprobar Plagio
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                        <Card>
                            <Row>
                                <Analysis />
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
            <hr />
        </React.Fragment>
    )
}

export default HomeView