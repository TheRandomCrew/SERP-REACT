import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap';

export default function Analysis() {
    return (
        <Container>
            <h1>Analisis SEO</h1>

            <AnalysisLine level="danger">
                No hay ningun enlace externo en esta pagina, planteate anadir alguno dentro del contexto
            </AnalysisLine>
            <AnalysisLine level="danger">
                No hay ningun enlace interno en esta pagina, planteate anadir algo relevante
            </AnalysisLine>
            <AnalysisLine level="danger">
                A las imagenes de esta pagina les faltan los atributos alt.
            </AnalysisLine>
            <AnalysisLine level="success">
                La palabra clave objetivo aparece en el primer  parrafo del escrito.
            </AnalysisLine>
            <AnalysisLine level="success">
                La densidad de la palabra clave es de 0.9%, lo que esta  genial, la palabra clave objetivo se encontro 5 veces.
            </AnalysisLine>
            <AnalysisLine level="success">
                El texto contiene 579 palabras. Es mas o igual que el minimo recomendado de 400 palabras.
            </AnalysisLine>
            <AnalysisLine level="success">
                La palabra clave objetivo aparece en la URL de esta pagina.
            </AnalysisLine>
            <AnalysisLine level="success">
                La palabra clave objetivo aparece solo en 2(de 3) subtitulos de  tu escrito.  Trata de usarla en al menos un subtitulo mas.
            </AnalysisLine>
        </Container>
    )
}


function AnalysisLine ({ level, children = undefined }) {
    return (
        <Row>
            <Col lg='1'>
                <Badge pill variant={level}>
                    {level}
                </Badge>
            </Col>
            <Col>
                {children}
            </Col>
        </Row>
    )
}
