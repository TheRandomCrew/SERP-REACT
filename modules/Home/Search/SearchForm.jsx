import React, { Component } from 'react'
import { Button, InputGroup, Form, Container, Col, Row, Collapse, } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import languages from '../../Utils/languages'

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = { validated: false };
    }
    render() {
        const { validated } = this.state
        const {
            open, selected, keywords, minVolume, maxVolume, minAdwords, maxAdwords, minCPC, maxCPC, filterKeys, eraseKeys
        } = this.props
        return (
            <Form
                noValidate
                validated={validated}
                onSubmit={this.props.handleSubmit}
            >
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationKeyword">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">
                                    <FontAwesomeIcon icon="search" />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Palabra Clave"
                                defaultValue=""
                                onChange={(e) => this.props.handleChange(e, "keywords")}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese una o varias palabras parra buscar.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="3" >
                        <Typeahead
                            labelKey="languages"
                            options={languages.map(lang => lang.flag + lang.text)}
                            placeholder={selected || '🇪🇸Spain / Spanish - Español'}
                            onChange={(selection) => this.props.addKeywords(selection)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="3" >
                        <Button type="submit" variant="success" disabled={keywords ? false : true}>
                            Buscar
                        </Button>
                    </Form.Group>
                    <Button
                        variant="success"
                        onClick={() => this.props.set('open', !open)}
                    >
                        Filtrar
                        </Button>
                </Form.Row>
                <Collapse in={open}>
                    <Container>
                        <hr />
                        <Form.Row>
                            <Form.Group as={Col} md="12" className="align-middle">
                                <Form.Label>Volumen de Busqueda</Form.Label>
                                <InputGroup >
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        placeholder="MIN"
                                        id="minVolume"
                                        value={minVolume === 0 ? '' : minVolume}
                                        onChange={(e) => this.props.handleChange(e, "minVolume")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un numero por favor
                                    </Form.Control.Feedback>
                                    <InputGroup.Text> - </InputGroup.Text>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        placeholder="MAX"
                                        id="maxVolume"
                                        value={maxVolume === 1000000 ? '' : maxVolume}
                                        onChange={(e) => this.props.handleChange(e, "maxVolume")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un numero por favor
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" className="align-middle">
                                <Form.Label>Adwords Competencia (en %)</Form.Label>
                                <InputGroup >
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        placeholder="MIN"
                                        id="minAdwords"
                                        value={minAdwords === 0 ? '' : minAdwords}
                                        onChange={(e) => this.props.handleChange(e, "minAdwords")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un numero por favor
                                            </Form.Control.Feedback>
                                    <InputGroup.Text> - </InputGroup.Text>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        placeholder="MAX"
                                        id="maxAdwords"
                                        value={maxAdwords === 100 ? '' : maxAdwords}
                                        onChange={(e) => this.props.handleChange(e, "maxAdwords")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un numero por favor
                                            </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row >
                            <Form.Group as={Col} md="12" className="align-middle">
                                <Form.Label>CPC Adwords (en € enteros)</Form.Label>
                                <InputGroup >
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        placeholder="MIN"
                                        id="minCPC"
                                        value={minCPC === 0 ? '' : minCPC}
                                        onChange={(e) => this.props.handleChange(e, "minCPC")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un numero por favor
                                            </Form.Control.Feedback>
                                    <InputGroup.Text>    -    </InputGroup.Text>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        placeholder="MAX"
                                        id="maxCPC"
                                        value={maxCPC === 10000 ? '' : maxCPC}
                                        onChange={(e) => this.props.handleChange(e, "maxCPC")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un numero por favor
                                            </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="align-items-center">
                            <Form.Group as={Col} md='12'>
                                <Form.Label>Palabras claves que contiene</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder="Ingrese Palabras Claves, una por linea"
                                    id="filterKeys"
                                    value={filterKeys}
                                    onChange={(e) => this.props.handleChange(e, 'filterKeys')} />
                            </Form.Group>
                            <Form.Group as={Col} md='12'>
                                <Form.Label>Excluir palabras claves</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder="Ingrese Palabras Claves a excluir, una por linea"
                                    id="eraseKeys"
                                    value={eraseKeys}
                                    onChange={(e) => this.props.handleChange(e, 'eraseKeys')} />
                            </Form.Group>
                        </Form.Row>
                        <Row>
                            <Button
                                variant="outline-danger"
                                onClick={() => this.props.eraseFilter()}
                            >
                                Borrar
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => this.props.applyFilter()}
                            >
                                Aplicar
                            </Button>
                        </Row>
                        <hr />
                    </Container>
                </Collapse>
            </Form>
        );
    }

    componentDidMount() {
        if (localStorage.hasOwnProperty('selected')) {
            let selected = localStorage.getItem('selected');
            try {
                this.props.set('selected', selected);
            } catch (e) {
                this.props.set('selected', selected);
            }
        }
    }
}
