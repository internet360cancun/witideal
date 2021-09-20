import React from "react";
import { Link } from "react-router-dom";
import cardback from "../../assets/howitworks/card-back.png";

const SectionSeven = () => {
  return (
    <div classname="container2">
      <section classname="mt-5">
        <div classname="row">
          <div classname="col">
            <div classname="row d-flex justify-content-center">
              <div classname="col-xm-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                <div classname="BannerTitle7">
                  Selecciona tu paquete
                </div>
              </div>
            </div>
            <div classname="row d-flex justify-content-center">
              <div classname="col-xm-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 text-center">
                <div classname="row">
                  <div classname="col">
                    <div classname="megatitle">
                      Plan <br />
                      Risingstar
                    </div>
                  </div>
                </div>
                <div classname="card cardplanes">
                  <div classname="backcard1">
                    <div classname="contenidocard">
                      <img classname="imgcrd1" src={{cardback}} />
                      <div classname="titulo">Paquete Básico</div>
                      <div classname="subtitulo">(Anunciar Gratis)</div>
                      <div classname="precio">$1,500 MXN</div>
                      <div classname="subtitulo">(3 Propiedades destacadas)</div>
                      <div classname="lista">
                        <br />
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Campaña de Facebook
                          / Instagram Ads en la fanpage de Witideal
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Formato anuncio
                          carrusel o post / potencial o mensajes (3 propiedades)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div classname="row">
                  <div classname="col">
                    <button classname="btnplanes">CONTRATAR</button>
                  </div>
                </div>
              </div>
              <div classname="col-xm-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 text-center">
                <div classname="megatitle">
                  Plan <br />
                  Rockstar
                </div>
                <div classname="card cardplanes">
                  <div classname="backcard2">
                    <div classname="contenidocard">
                      <img classname="imgcrd1" src={{cardback}}  />
                      <div classname="titulo">Paquete Plata</div>
                      <div classname="subtitulo">(Anunciar Gratis)</div>
                      <div classname="precio">$1,990 MXN</div>
                      <div classname="subtitulo">(5 Propiedades destacadas)</div>
                      <div classname="lista">
                        <br />
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Campaña de Facebook
                          / Instagram Ads en la fanpage de Witideal
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Formato anuncio
                          carrusel o post / potencial o mensajes (5 propiedades)
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Post en redes LUIS
                          RAM / Remates y oportunidades en directorio de redes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div classname="row">
                  <div classname="col">
                    <button classname="btnplanes">CONTRATAR</button>
                  </div>
                </div>
              </div>
              <div classname="col-xm-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 text-center">
                <div classname="megatitle">
                  Plan <br />
                  Superstar
                </div>
                <div classname="card cardplanes">
                  <div classname="backcard3">
                    <div classname="contenidocard">
                      <img classname="imgcrd1" src={{cardback}} />
                      <div classname="titulo">Paquete Oro</div>
                      <div classname="subtitulo">(Anunciar Gratis)</div>
                      <div classname="precio">$2,500 MXN</div>
                      <div classname="subtitulo">(Hasta 10 propiedades destacadas)</div>
                      <div classname="lista">
                        <br />
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Campaña de Facebook
                          / Instagram Ads en la fanpage de Witideal
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Formato anuncio
                          carrusel o post / potencial o mensajes (10 propiedades)
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Post en redes LUIS
                          RAM / Remates y oportunidades en directorio de redes
                        </p>
                        <p>
                          <strong style={{color: 'aqua'}}>+</strong> Mención en el
                          programa de radio / Luis Ramírez Mundo Inmobiliario
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div classname="row">
                  <div classname="col">
                    <button classname="btnplanes">CONTRATAR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /><br /><br /><br /><br /><br />
    </div>

  );
};

export default SectionSeven;
