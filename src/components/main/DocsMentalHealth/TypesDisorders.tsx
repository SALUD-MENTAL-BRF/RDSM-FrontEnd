import React from 'react';
import '../../../assets/style/DocsMentalHealth/InfoMentalHealth.css';
import { useNavigate } from 'react-router-dom';

export const TypesDisorders: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Retrocede a la última página visitada
  };

  return (
    <main className='container-fluid'>
      <div className='row w-100 container-typeDisorders'>
        <div className='col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-1 container-typeDisorders_Cards'>
      <button onClick={handleBackClick} className='btn btn-secondary'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M19 12H5M12 19l-7-7 7-7' />
        </svg>
        Atrás
      </button>
          <h1 className='text-center'>
            Problemas relacionados con la aplicación:
          </h1>
          <section className='articles row'>
            <article className='col card-typeDisorders'>
              <div className='article-wrapper'>
                <figure className='container-image-typeDisorders text-center'>
                  {/* <img src="docsMentalHealth/depresion.jpg" className="rounded-2" alt="" /> */}
                </figure>
                <div className='article-body'>
                  <h2>Depresión</h2>
                  <p>
                    La depresión es un trastorno del estado de ánimo
                    caracterizado por una tristeza persistente, pérdida de
                    interés en actividades que antes se disfrutaban y una serie
                    de síntomas físicos y emocionales. Puede afectar el
                    pensamiento, el comportamiento, y el bienestar físico y
                    emocional. La depresión puede ser debilitante y afectar la
                    capacidad de una persona para llevar una vida normal.
                  </p>
                  <a href='#' className='read-more'>
                    Leer más <span className='sr-only'>about Depresión</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z' />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            <article className='col card-typeDisorders'>
              <div className='article-wrapper'>
                <figure className='container-image-typeDisorders'>
                  {/* <img src="" alt="" className="rounded-2"/> */}
                </figure>
                <div className='article-body'>
                  <h2>Ansiedad</h2>
                  <p>
                    Los trastornos de ansiedad son condiciones de salud mental
                    que provocan una preocupación y un miedo excesivos. Entre
                    ellos se incluyen el trastorno de ansiedad generalizada
                    (TAG), el trastorno de pánico, el trastorno de ansiedad
                    social y el trastorno obsesivo-compulsivo (TOC). Estos
                    trastornos pueden interferir significativamente con las
                    actividades diarias y el bienestar general.
                  </p>
                  <a href='#' className='read-more'>
                    Leer más <span className='sr-only'>about Ansiedad</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z' />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            <article className='col card-typeDisorders'>
              <div className='article-wrapper'>
                <figure className='container-image-typeDisorders text-center'>
                  {/* <img src="https://img.freepik.com/fotos-premium/cerebro-humano-neuronas-disparando-neuronas-senales-electricas-ia-generativa_634358-285.jpg?size=626&ext=jpg" alt="" className="imgneurodesarrollo rounded-2" /> */}
                </figure>
                <div className='article-body'>
                  <h2>Neurodesarrollo</h2>
                  <p className='mb-5'>
                    Los trastornos del neurodesarrollo afectan el crecimiento y
                    desarrollo del cerebro y del sistema nervioso. Incluyen el
                    trastorno por déficit de atención e hiperactividad (TDAH),
                    el trastorno del espectro autista (TEA) y la dislexia. Estos
                    trastornos pueden impactar habilidades como el aprendizaje,
                    el control del comportamiento y la comunicación, influyendo
                    en el rendimiento escolar y social de los afectados.
                  </p>
                  <a href='#' className='read-more'>
                    Leer más{' '}
                    <span className='sr-only'>about Trauma y el estrés</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z' />
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
