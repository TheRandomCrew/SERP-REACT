import React from 'react'
import { Card, Alert, Row, Col, Container } from 'react-bootstrap';
import ResumeCards from './ResumeCards';
import '../../Utils/spiner.css'

const ResumeView = ({ isLoading, error, result, children = undefined }) => {
    return (
        <React.Fragment>
            {error ?
                <Alert dismissible variant="danger">
                    <Alert.Heading>Algo salio mal con la busqueda!</Alert.Heading>
                    <p>
                        ERROR: {JSON.stringify(error)}. <br /> Repita la busqueda con otras palabras
                  </p>
                </Alert> : null}
            {isLoading ?
                <Card className="text-center" as={Col} lg='10' >
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
                <Container fluid>
                    <Row>
                        <Col xs='12' sm='12' lg='12'>
                            <ResumeCards result={result} />
                        </Col>
                    </Row>
                    <Row>
                        <Container>
                            <Card xs='12' sm='12'>
                                {children}
                            </Card>
                        </Container>
                    </Row>
                </Container>
            }
        </React.Fragment>
    )
}

export default ResumeView

