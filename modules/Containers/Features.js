import React, { Component } from 'react'
import '../Utils/features.css'
export default class Features extends Component {
    render() {
        return (
            <div>
                <div className="title-arch">Herramientas de despegue SEO
                <p>Alcanza la cima en los resultados de búsqueda eliminando todos los errores SEO</p>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 project wow animated animated4 fadeInLeft">
                        <h2>Selección</h2>
                    <div className="project-hover">
                        <h2>Selección de palabras</h2>
                        <hr />
                        <p>Nos permite ver dentro de nuestro nicho de mercado cuales son las palabras clave que debemos trabajar para llevar a cabo un buen posicionamiento o al menos, te permite hacer una lista inicial que luego podrás perfeccionar.</p>
                        {/* <a href="#">Averigua mas</a> */}
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 project project-2 wow animated animated3 fadeInLeft">
                <h2>Medición</h2>
                    <div className="project-hover">
                        <h2>Medición en el ranking</h2>
                        <hr />
                        <p>Permite hacer un seguimiento de la posición en el ranking de las palabras clave. Además, genera informes de rango muy fácilmente.</p>
                        {/* <a href="#">Averigua mas</a> */}
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 project project-3 wow animated animated2 fadeInLeft">
                        <h2>Sugerencia</h2>
                    <div className="project-hover">
                        <h2>Herramienta de sugerencia de palabras clave</h2>
                        <hr />
                        <p>Expande tu núcleo semántico. Prepara la distribución correcta. Establece el curso de acción correcto.</p>
                        {/* <a href="#">See Project</a> */}
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 project project-4 wow animated fadeInLeft">
                        <h2>Rastreo</h2>
                    <div className="project-hover">
                        <h2>Rastreo de posicionamiento de palabras clave</h2>
                        <hr />
                        <p>Revisión SEO completa por robots de SE Ranking. Toma el control de factores externos de optimización y de backlinks.</p>
                        {/* <a href="#">See Project</a> */}
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}
