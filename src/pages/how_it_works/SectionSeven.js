import React from 'react';
import { Link } from 'react-router-dom';
import cardback from '../../assets/howitworks/card-back.png';

const SectionSeven = () => {
  return (
    <div className="container2">
      <section className="mt-2">
        <div className="row">
          <section className="mt-5">
            <div className="row align-items-center text-center">
              <div className="col text-center col-md-12">
                <div className="BannerTitle7">Selecciona tu paquete</div>
                <br />
              </div>
            </div>
            {/*  C A R D S*/}
            <div className="row">
              <div className="col text-center mt-4">
                <div className="megatitle">
                  Plan <br />
                  Risingstar
                </div>
                <div className="card d-fex cardsd1" style={{ width: 'auto' }}>
                  <div className="card-body cardcustom1">
                    <div className="textcards">
                      <div className="cardtitle">
                        Paquete Básico
                        <div className="subtitulo">(Anunciar Gratis)</div>
                      </div>
                      <div className="precio">
                        $1,500 MXN
                        <div className="subtitulo">
                          (3 Propiedades destacadas)
                        </div>
                      </div>
                      <br />
                      <div className="lista">
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Campaña
                          de Facebook / Instagram Ads en la
                          <a style={{ fontStyle: 'italic' }}>fanpage</a> de
                          Witideal
                        </p>
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Formato
                          anuncio carrusel o post / potencial o mensajes (3
                          propiedades)
                        </p>
                      </div>
                    </div>
                    <div className="imgcardback1">
                      <img src={cardback} alt />
                    </div>
                    <Link to="/" class="btncontrata1">
                      CONTRATAR
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col text-center mt-4">
                <div className="megatitle">
                  Plan <br />
                  Rockstar
                </div>
                <div className="card d-flex cardsd2" style={{ width: 'auto' }}>
                  <div className="card-body cardcustom2">
                    <div className="textcards">
                      <div className="cardtitle">
                        Paquete Plata
                        <div className="subtitulo">(Anunciar Gratis)</div>
                      </div>
                      <div className="precio">
                        $1,990 MXN
                        <div className="subtitulo">
                          (5 Propiedades destacadas)
                        </div>
                      </div>
                      <br />
                      <div className="lista">
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Campaña
                          de Facebook / Instagram Ads en la
                          <a style={{ fontStyle: 'italic' }}>fanpage</a> de
                          Witideal
                        </p>
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Formato
                          anuncio carrusel o post / potencial o mensajes (5
                          propiedades)
                        </p>
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Post en
                          redes LUIS RAM / Remates y oportunidades en directorio
                          de redes
                        </p>
                      </div>
                    </div>
                    <div className="imgcardback2">
                      <img src={cardback} alt />
                    </div>
                    <Link to="/" class="btncontrata2">
                      CONTRATAR
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col text-center mt-4">
                <div className="megatitle">
                  Plan <br />
                  Superstar
                </div>
                <div className="card d-flex cardsd3" style={{ width: 'auto' }}>
                  <div className="card-body cardcustom3">
                    <div className="textcards">
                      <div className="cardtitle">
                        Paquete Oro
                        <div className="subtitulo">(Anunciar Gratis)</div>
                      </div>
                      <div className="precio">
                        $2,500 MXN
                        <div className="subtitulo">
                          (Hasta 10 Propiedades destacadas)
                        </div>
                      </div>
                      <br />
                      <div className="lista">
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Campaña
                          de Facebook / Instagram Ads en la
                          <a style={{ fontStyle: 'italic' }}>fanpage</a> de
                          Witideal
                        </p>
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Formato
                          anuncio carrusel o post / potencial o mensajes (10
                          propiedades)
                        </p>
                        <p>
                          <strong style={{ color: 'aqua' }}>+</strong> Post en
                          redes LUIS RAM / Remates y oportunidades en directorio
                          de redes
                        </p>
                        <p>
                          + Mención en el programa de radio / Luis Ramírez Mundo
                          Inmobiliario
                        </p>
                      </div>
                    </div>
                    <div className="imgcardback3">
                      <img src={cardback} alt />
                    </div>
                    <Link to="/" class="btncontrata3">
                      CONTRATAR
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default SectionSeven;
