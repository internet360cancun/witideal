import React from "react";
import face from "../../assets/howitworks/card-icons/face.png";
import insta from "../../assets/howitworks/card-icons/insta.png";
import linkedin from "../../assets/howitworks/card-icons/linkedin.png";
import ads from "../../assets/howitworks/card-icons/ads.png";
import whats from "../../assets/howitworks/card-icons/whats.png";
import mailchimp from "../../assets/howitworks/card-icons/mailchinp.png";
import manychat from "../../assets/howitworks/card-icons/manychat.png";
import camp from "../../assets/howitworks/card-icons/camp.png";

const FifthSection = () => {
  return (
    <div className="view viewstyle5" id="section5" style={{backgroundColor: '#ffffff', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="container2 mb-5" style={{marginTop: 18}}>
        <section className="mt-5">
          <div className="row align-items-center text-center">
            <div className="col text-center col-md-12">
              <div className="BannerTitlecards"> Anúnciate y <br /> <strong style={{color: '#41b8f9'}}>ten más <br /> exposición</strong></div>
              <br />
            </div>
          </div>
          {/*  C A R D S*/}
          <div className="row">
            <div className="col text-center mt-4 crd1">
              <div className="card carddisplay" style={{width: '100%'}}>
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={face} alt="" />
                    </div>
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={insta} alt="" />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <div className="textcards d-flex justify-content-center">
                        Campañas en Facebook Ads / <br />
                        Instagram
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col text-center mt-4 crd2">
              <div className="card carddisplay" style={{width: '100%'}}>
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={linkedin} alt="" />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <div className="textcards txtmod d-flex justify-content-center">
                        Campañas en LinkedIn Ads
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col text-center mt-4 crd3">
              <div className="card carddisplay" style={{width: '100%'}}>
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={ads} alt="" />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <div className="textcards txtmod3 d-flex justify-content-center">
                        Campañas en Google Ads
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-center mt-4 crd4">
              <div className="card carddisplay" style={{width: '100%'}}>
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={mailchimp} alt=""  />
                    </div>
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={whats} alt=""  />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="textcards txtmod4 d-flex justify-content-center">
                        Envíos de Mailings / Camp 
                        WhatsApps (Mailchimp y WhatsApp)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col text-center mt-4 crd5">
              <div className="card carddisplay" style={{width: '100%'}}>
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={manychat}  alt="" />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <div className="textcards txtmod d-flex justify-content-center">
                        Instalación de ChatBots (ManyChat)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col text-center mt-4 crd6">
              <div className="card carddisplay" style={{width: '100%'}}>
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <div className="img-card mt-2 d-flex justify-content-center">
                      <img src={camp} alt="" />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <div className="textcards txtmod d-flex justify-content-center">
                        Campañas en Google Ads
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
};

export default FifthSection;
