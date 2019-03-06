import React, { Component } from 'react'

export default class Pricing extends Component {
    render() {
        return (
            <div>
                <div className="container mb-5 mt-5">
                NUESTROS PLANES 
                    <div className="pricing card-deck flex-column flex-md-row mb-3">
                        <div className="card card-pricing pricingTable text-center px-3 mb-4">
                            <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Starter</span>
                            <div className="bg-transparent card-header pt-4 border-0">
                                <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="15">$<span className="price">3</span><span className="h6 text-muted ml-2">/ al Mes</span></h1>
                            </div>
                            <div className="card-body pt-0">
                                <ul className="list-unstyled mb-4">
                                    <li>Un usuario</li>
                                    <li>Soporte en Linea horas habiles</li>
                                    <li>Plan personalizado</li>
                                    <li>10 busquedas de palabras claves por semana</li>
                                </ul>
                                <button type="button" className="btn btn-outline-secondary mb-3">Suscribirse</button>
                            </div>
                        </div>
                        <div className="card card-pricing popular shadow text-center px-3 mb-4">
                            <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Professional</span>
                            <div className="bg-transparent card-header pt-4 border-0">
                                <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="30">$<span className="price">6</span><span className="h6 text-muted ml-2">/ al Mes</span></h1>
                            </div>
                            <div className="card-body pt-0">
                                <ul className="list-unstyled mb-4">
                                    <li>Hasta 3 usuarios</li>
                                    <li>Soporte en Linea horas habiles</li>
                                    <li>Plan personalizado</li>
                                    <li>100 busquedas de palabras claves por semana</li>
                                </ul>
                                <a href="https://www.totoprayogo.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-3">Suscribirse</a>
                            </div>
                        </div>
                        <div className="card card-pricing text-center px-3 mb-4">
                            <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Business</span>
                            <div className="bg-transparent card-header pt-4 border-0">
                                <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="45">$<span className="price">9</span><span className="h6 text-muted ml-2">/ al Mes</span></h1>
                            </div>
                            <div className="card-body pt-0">
                                <ul className="list-unstyled mb-4">
                                    <li>Hasta 5 usuarios</li>
                                    <li>Soporte en Linea 24 horas</li>
                                    <li>Plan personalizado</li>
                                    <li>1000 busquedas de palabras claves por semana</li>
                                </ul>
                                <button type="button" className="btn btn-outline-secondary mb-3">Suscribirse</button>
                            </div>
                        </div>
                        <div className="card card-pricing text-center px-3 mb-4">
                            <span className="h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm">Enterprise</span>
                            <div className="bg-transparent card-header pt-4 border-0">
                                <h1 className="h1 font-weight-normal text-primary text-center mb-0" data-pricing-value="60">$<span className="price">12</span><span className="h6 text-muted ml-2">/ al Mes</span></h1>
                            </div>
                            <div className="card-body pt-0">
                                <ul className="list-unstyled mb-4">
                                    <li>Usuarios ilimitados</li>
                                    <li>Soporte en Linea 24 horas prioritrio</li>
                                    <li>Plan personalizado</li>
                                    <li>busquedas de palabras claves por semana ilimitadas</li>
                                </ul>
                                <button type="button" className="btn btn-outline-secondary mb-3">Suscribirse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
