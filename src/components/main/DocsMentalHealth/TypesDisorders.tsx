import React from "react";
import "../../../assets/style/DocsMentalHealth/InfoMentalHealth.css";
import { Aside } from "../../aside/Aside";

export const TypesDisorders: React.FC = () => {

    return (
        <main className="container-typeDisorders">
            <div className="row w-100">
                <div className="aside-patient col-2 col-md-1 text-center">
                        <Aside/>
                </div>
                <div className="col-10 mt-1">
                    <h1 className="text-center">Problemas relacionados con la aplicación:</h1>
                    <section className="articles row">
                        <article className="col card-typeDisorders">
                            <div className="article-wrapper">
                            <figure className="container-image-typeDisorders">
                                <img src="https://picsum.photos/id/1011/800/450" alt="" />
                            </figure>
                            <div className="article-body">
                                <h2>Estado de ánimo</h2>
                                <p>
                                Los trastornos del estado de ánimo afectan la forma en que las personas sienten y experimentan sus emociones diariamente. Incluyen la depresión mayor,
                                el trastorno bipolar y el trastorno distímico. Estos trastornos pueden llevar a cambios significativos en el comportamiento, la energía y la capacidad para realizar actividades cotidianas.
                                </p>
                                <a href="#" className="read-more">
                                Leer más <span className="sr-only">about Estado de ánimo</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"  />
                                </svg>
                                </a>
                            </div>
                            </div>
                        </article>
                        <article className="col card-typeDisorders">
                            <div className="article-wrapper">
                            <figure className="container-image-typeDisorders">
                                <img src="https://picsum.photos/id/1005/800/450" alt="" />
                            </figure>
                            <div className="article-body">
                                <h2>Ansiedad</h2>
                                <p>
                                Los trastornos de ansiedad son condiciones de salud mental que provocan una preocupación y un miedo excesivos. Entre ellos se incluyen el trastorno de ansiedad generalizada (TAG), el trastorno de pánico, el trastorno de ansiedad social y el trastorno obsesivo-compulsivo (TOC). Estos trastornos pueden interferir significativamente con las actividades diarias y el bienestar general.
                                </p>
                                <a href="#" className="read-more">
                                Leer más <span className="sr-only">about Ansiedad</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" />
                                </svg>
                                </a>
                            </div>
                            </div>
                        </article>
                        <article className="col card-typeDisorders">
                            <div className="article-wrapper">
                            <figure className="container-image-typeDisorders">
                                <img src="https://picsum.photos/id/103/800/450" alt="" />
                            </figure>
                            <div className="article-body">
                                <h2>Trauma y el estrés</h2>
                                <p className="mb-5">
                                Los trastornos relacionados con el trauma y el estrés se desarrollan a partir de eventos traumáticos o estresantes.
                                    Incluyen el trastorno de estrés agudo y el trastorno de estrés postraumático (TEPT). Estos trastornos pueden causar síntomas como flashbacks, pesadillas y una grave angustia emocional que afecta la vida diaria.
                                </p>
                                <a href="#" className="read-more">
                                Leer más <span className="sr-only">about Trauma y el estrés</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" />
                                </svg>
                                </a>
                            </div>
                            </div>
                        </article>
                        <article className="col card-typeDisorders mb-5">
                            <div className="article-wrapper">
                                <figure className="container-image-typeDisorders">
                                    <img src="https://picsum.photos/id/103/800/450" alt="" />
                                </figure>
                                <div className="article-body">
                                    <h2>Alimentación</h2>
                                    <p className="mb-5">
                                        Los trastornos de la alimentación son condiciones graves relacionadas con comportamientos alimentarios persistentes que afectan negativamente la salud, las emociones y la capacidad de funcionar en áreas importantes de la vida. Incluyen la anorexia nerviosa, la bulimia nerviosa y el trastorno por atracón. Estos trastornos pueden llevar a consecuencias físicas severas y requieren un enfoque integral para el tratamiento y la recuperación.
                                    </p>
                                    <a href="#" className="read-more">
                                        Leer más <span className="sr-only">about Alimentación</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </main>
    );
};
