import React, { useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import Container from "../../layouts/container";
import Content from "../../layouts/content";
import Title from "../../layouts/title";
import { Grid } from "@material-ui/core";
import Head from "../../components/head";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Head title="Aviso de privacidad" />
      <Content>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <Title>AVISO DE PRIVACIDAD</Title>
          </Grid>
          <Grid item xs={12} md={10}>
            <Body>
              <p>
                De conformidad con lo dispuesto en (i) la Ley Federal de
                Protección de Datos Personales en Posesión de los Particulares
                (la “LFPD”); (ii) el Reglamento de la LFPD; y (iii) los
                Lineamientos del Aviso de Privacidad publicados en el Diario
                Oficial de la Federación, Desarrolladora de Tecnologías ARD,
                S.A. de C.V. (“Witideal”), como Responsable del tratamiento de
                los Datos Personales que recaba, pone a disposición del público
                en general, así como de sus clientes y usuarios (cada uno
                referido como “Titular”) el presente Aviso de Privacidad (el
                “Aviso”).
              </p>
              <p>
                Witideal requiere someter a tratamiento determinados datos
                personales con el objeto de estar en condiciones de prestar sus
                servicios. Witideal puede obtener estos datos por cualquiera de
                las siguientes formas: (i) personalmente del Titular, a través
                de formatos, llamadas, mensajes y otras comunicaciones
                presenciales o electrónicas; (ii) a través de su sitio web
                (https://witideal.com/) y/o a través de cualquier vínculo,
                micrositio o acceso directamente relacionado con el mismo o a
                través de las redes sociales administradas por Witideal (el
                “Sitio”); y/o (iii) a través de los aplicativos móviles que
                utiliza para prestar sus servicios (la “Aplicación[ILT1] ”).
              </p>
              <p>
                Witideal se reserva el derecho de modificar en cualquier momento
                el contenido del presente Aviso. Cualquier cambio en el Aviso le
                será informado al Titular a través de una notificación general
                en el Sitio o en la Aplicación. La modificación correspondiente
                entrará en vigor a partir del día siguiente de su publicación.
              </p>
              <SubTitle>Identidad y Domicilio de Witideal</SubTitle>
              <p>
                Witideal es una sociedad mercantil debidamente constituida de
                conformidad con la legislación mexicana, tal y como consta en la
                escritura pública No. 91,244 de fecha 12 de junio de 2019,
                pasada ente la fe del Notario No. 242 de la Ciudad de México,
                Lic. Roberto Garzón Jiménez.
              </p>
              <SubTitle>Datos Personales sujetos a tratamiento</SubTitle>
              <p>
                Los datos del Titular que Witideal someterá a tratamiento son
                los siguientes:
              </p>
              <Pre>
                De los Promotores: nombre, correo electrónico, registro federal
                de contribuyentes (y datos de facturación en general), datos
                para la realización de cobros inherentes al servicio y la
                información general de aquellos inmuebles que desea promocionar.
              </Pre>
              <Pre>
                De los Buscadores: nombre, teléfono, correo electrónico y
                ciertos datos relacionados con sus intereses inmobiliarios.
              </Pre>
              <p>
                El Titular reconoce que los datos personales antes mencionados
                podrán almacenarse utilizando almacenamiento en la nube. En su
                caso, Witideal se asegurará de que el proveedor correspondiente
                cumpla con las disposiciones del Reglamento de la LFPD.
              </p>
              <p>
                Witideal en ningún momento recabará del Titular datos que puedan
                ser considerados como sensibles de acuerdo con la LFPD.
              </p>
              <SubTitle>Finalidades del tratamiento</SubTitle>
              <p>
                Los datos personales tratados por Witideal serán utilizados para
                llevar a cabo las siguientes finalidades:
              </p>
              <ol type="I">
                <li>Finalidades primarias:</li>
                <OlSecondary type="a">
                  <li>
                    <p>
                      Identificar al Titular, corroborar su identidad (a través
                      de mensajes SMS o por cualquier otro medio que facilite su
                      identificación) y crear un perfil o credencial de usuario
                      a través del cual pueda utilizar los servicios ofrecidos
                      por Witideal;
                    </p>
                  </li>
                  <li>
                    <p>
                      Promover los inmuebles de los Promotores con los
                      Buscadores y, en general, prestar los servicios de
                      promoción e intermediación ofrecidos por Witideal;
                    </p>
                  </li>
                  <li>
                    <p>
                      Intercambiar la información de contacto de los Promotores
                      y Buscadores (nombre, teléfono y/o correo electrónico,
                      exclusivamente), con el fin exclusivo de crear un posible
                      canal de comunicación entre ellos y de facilitar una
                      posible contratación inmobiliaria.
                    </p>
                  </li>
                </OlSecondary>
                <li>Finalidades secundarias:</li>
                <OlSecondary type="a">
                  <li>
                    Ofrecer actualizaciones, noticias y/o publicidad que pudiera
                    ser de interés para el Titular.
                  </li>
                </OlSecondary>
              </ol>
              <p>
                El Titular podrá manifestar su negativa al tratamiento de sus
                datos con las finalidades secundarias, a través del envío de un
                correo electrónico en dicho sentido a legal@witideal.com. El
                correo electrónico referido deberá incluir, en todo caso, la
                información que permita identificar al Titular, la información
                sobre la cual niega su tratamiento y cualquier otra información
                que resulte necesaria para tramitar la negativa correspondiente.
              </p>
              <SubTitle>Consentimiento del Titular</SubTitle>
              <p>El Titular manifiesta que:</p>
              <ol type="a">
                <li>
                  <p>
                    Ha leído, entendido y aceptado los términos y condiciones
                    establecidos en el presente Aviso, por lo que otorga su
                    consentimiento respecto del tratamiento de sus datos
                    personales en los términos que en él se establecen;
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    Consiente el tratamiento de sus datos personales para las
                    finalidades primarias y secundarias antes establecidas,
                    específicamente en relación con la transferencia de sus
                    datos en los términos del inciso I, fracción c) de la
                    sección anterior;
                  </p>
                </li>
                <li>
                  <p>
                    El uso de o la permanencia en el Sitio, así como la descarga
                    o utilización de la Aplicación constituyen confirmaciones de
                    su consentimiento a lo dispuestos en el presente Aviso. El
                    Titular deberá abstenerse de utilizar el Sitio o la
                    Aplicación en caso de que no consienta con las disposiciones
                    establecidas en el presente Aviso.
                  </p>
                </li>
              </ol>
              <p>
                Witideal asume que la información proporcionada por el Titular
                le pertenece a este último. En caso de que no sea así, el
                Titular deberá informar dicha circunstancia inmediatamente a
                Witideal, a través del envío de un correo electrónico a
                legal@witideal.com, el cual deberá contener su información de
                contacto y cualquier otra información que permita dar respuesta
                a dicho informe, absteniéndose de proporcionar información
                adicional de la que no sea titular o de la que no tenga
                autorización para transferir.
              </p>
              <p>
                El Titular podrá revocar el consentimiento antes referido en
                todo momento. Para revocar el consentimiento proporcionado, el
                Titular deberá comunicar dicha circunstancia a Witideal por
                medio de un correo electrónico enviado a legal@witideal.com,
                indicando las causas que lo motivan a comunicar la revocación,
                así como la información que permita a Witideal responder y dar
                seguimiento a dicha revocación.
              </p>
              <p>
                En caso de que el Titular desee limitar el uso o la divulgación
                de alguno de sus datos personales, podrá en cualquier momento
                enviar la manifestación de dicha limitación a través de un
                correo electrónico dirigido a legal@witideal.com, en el cual
                incluirá los datos personales cuyo tratamiento desea limitar,
                los motivos por los cuales desea limitarlos, así como la
                información que permita a Witideal dar seguimiento a dicha
                solicitud. En caso de ser procedente la solicitud del Titular,
                Witideal registrará al Titular en la lista de exclusión que
                tendrá elaborada para tal efecto.
              </p>
              <SubTitle>
                Derechos de Acceso, Rectificación, Cancelación y Oposición
                (“ARCO”)
              </SubTitle>
              <p>
                Los Titulares tienen derecho a: (i) conocer qué datos personales
                son tratados por Witideal y las finalidades de su tratamiento
                (derecho a acceso); (ii) solicitar la corrección de sus datos
                personales en caso de que estén desactualizados, sean inexactos
                o estén incompletos (derecho de rectificación); (iii) que sus
                datos personales sean eliminados de los registros o bases de
                datos de Witideal cuando consideren que no están siendo
                utilizados adecuadamente (derecho de cancelación); y (iv)
                oponerse al uso de sus datos personales para fines específicos
                (derecho a oposición) (en su conjunto, los derechos “ARCO”)
              </p>
              <p>
                Los derechos ARCO pueden ser ejercidos en cualquier momento a
                través del envío de un correo electrónico dirigido a
                legal@witideal.com. La solicitud de cualquiera de los derechos
                ARCO deberá ir acompañada de lo siguiente:
              </p>
              <ol type="I">
                <li>
                  <p>
                    El nombre del titular y/o su domicilio o correo electrónico,
                    a efecto de que Witideal pueda comunicarle la respuesta a su
                    solicitud;
                  </p>
                </li>
                <li>
                  <p>
                    Los documentos que acrediten la identidad o, en su caso, la
                    representación legal del titular;
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    La descripción clara y precisa de los datos personales
                    respecto de los que se busca ejercer alguno de los derechos
                    ARCO;
                  </p>
                </li>
                <li>
                  <p>
                    Los motivos que fundamentan o justifican el ejercicio del
                    derecho ARCO correspondiente;
                  </p>
                </li>
                <li>
                  <p>
                    El formato o el medio en el que desea que Witideal dé
                    respuesta a su solicitud, cuando resulte aplicable;
                  </p>
                </li>
                <li>
                  <p>
                    Cualquier otro elemento o documento que facilite el
                    seguimiento a la solicitud del Titular.
                  </p>
                </li>
              </ol>
              <SubTitle>
                Uso de cookies, web beacons o tecnologías similares o análogas
              </SubTitle>
              <p>
                Witideal podrá utilizar cookies, web beacons y u otras
                tecnologías para monitorear su comportamiento como usuario de
                internet, con la finalidad de brindarle un mejor servicio y
                experiencia de usuario al navegar en el Sitio, así como
                ofrecerle nuevos productos basados en su preferencia. Los datos
                personales que Witideal obtiene de estas tecnologías de rastreo
                son particularmente los siguientes: horario de navegación,
                tiempo de navegación, secciones consultadas y páginas de
                internet accedidas previamente, dirección IP de origen,
                navegador utilizado, sistema operativo, siendo posible
                monitorear su comportamiento como usuario de los servicios de
                internet.
              </p>
            </Body>
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
};

const Body = styled("div")({
  textAlign: "left",
  lineHeight: "1.5em",
  "& p": {
    marginBottom: "30px",
  },
  "& ol": {
    marginLeft: "20px",
  },
});

const SubTitle = styled("h3")({});

const Pre = styled("p")({
  marginLeft: "30px",
});

const OlSecondary = styled("ol")({
  marginLeft: "30px!important",
});

export default TermsAndConditions;
