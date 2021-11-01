import React, { useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import Container from "../../layouts/container";
import Content from "../../layouts/content";
import Title from "../../layouts/title";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { contact } from "../../assets/Strings";
import Head from "../../components/head";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Head
        title="Términos y condiciones"
        description="Las presentes condiciones (las “Condiciones”), rigen el acceso y el uso que usted haga -desde cualquier punto del mundo- a las aplicaciones, sitios web, contenidos y/o productos (los “Servicios”) desarrollados, manejados y/o administrados por Desarrolladora de Tecnologías ARD, S.A. de C.V. (y/o sus controladoras, filiales o subsidiarias) (“Witideal”)"
      />
      <Content>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <Title>TÉRMINOS Y CONDICIONES</Title>
          </Grid>
          <Grid item xs={12} md={10}>
            <OrderList>
              <li>Relación Contractual</li>
              <p>
                Las presentes condiciones (las “Condiciones”), rigen el acceso y
                el uso que usted haga -desde cualquier punto del mundo- a las
                aplicaciones, sitios web, contenidos y/o productos (los
                “Servicios”) desarrollados, manejados y/o administrados por
                Desarrolladora de Tecnologías ARD, S.A. de C.V. (y/o sus
                controladoras, filiales o subsidiarias) (“Witideal”).
              </p>
              <p>
                Witideal es una sociedad mercantil debidamente constituida de
                conformidad con la legislación mexicana, tal y como consta en la
                escritura pública No. 91,244 de fecha 12 de junio de 2019,
                pasada ente la fe del Notario No. 242 de la Ciudad de México,
                Lic. Roberto Garzón Jiménez, misma que ha quedado debidamente
                inscrita bajo el folio mercantil 2019056698.
              </p>
              <p>
                Las presentes Condiciones generan obligaciones entre usted y
                Witideal. Por ello, usted deberá de leer detenidamente su
                contenido antes de utilizar cualquiera de los Servicios. Si
                usted no está de acuerdo con cualquiera de las condiciones o
                disposiciones establecidas en las presentes Condiciones, deberá
                abstenerse de utilizar cualquiera de los Servicios ofrecidos por
                Witideal y deberá abandonar o dar de baja inmediatamente
                cualquier plataforma que le permita acceder a los mismos.
              </p>
              <p>
                El uso de cualquiera de los Servicios ofrecidos por Witideal
                implica la aceptación de (i) las presentes Condiciones y (ii) el
                aviso de privacidad de Witideal, disponible para su consulta{" "}
                <Link to="/aviso-de-privacidad">aquí</Link> (el “Aviso de
                Privacidad”).
              </p>
              <p>
                Witideal se reserva el derecho de cambiar, modificar y/o
                remplazar las presentes Condiciones en cualquier momento y sin
                necesidad de previo aviso. Las nuevas Condiciones entrarán en
                vigor al día siguiente a aquél en que hayan sido modificadas o
                remplazadas. El acceso o uso continuado de los Servicios después
                de la publicación correspondiente implican su consentimiento a
                vincularse y obligarse conforme a las Condiciones y sus
                respectivas modificaciones.
              </p>
              <li>Condiciones de uso de los Servicios</li>
              <p>
                Para poder utilizar los Servicios, usted debe de contar con edad
                y capacidad suficiente -de conformidad con la legislación que le
                resulte aplicable- a efecto de estar en condiciones de obligarse
                conforme a las presentes Condiciones.
              </p>
              <p>
                Usted es responsable de adquirir y actualizar el hardware
                compatible o los dispositivos necesarios para acceder y utilizar
                los Servicios. Witideal no garantiza que los Servicios o
                cualquier parte de estos funcionen en cualquier hardware o
                dispositivo en particular. Los Servicios pueden ser objeto de
                disfunciones o retrasos inherentes al uso de datos,
                incompatibilidades informáticas y la interacción con otras
                comunicaciones electrónicas.
              </p>
              <p>
                Usted se obliga a utilizar los Servicios de forma personal, con
                los fines comerciales aquí mencionados, en estricto apego a la
                legislación y regulación aplicable, así como a las buenas
                costumbres. Witideal se reserva el derecho de retirar, negar o
                restringir el acceso a los Servicios.
              </p>
              <li>Alcance de los Servicios</li>
              <p>
                Los Servicios constituyen una plataforma tecnológica (la
                “Plataforma”) a través de la cual Witideal permite a sus
                usuarios buscar y/o promover inmuebles en compraventa,
                arrendamiento, tiempo compartido, hospedaje, y/o bajo cualquier
                otro formato legal); así como conectar entre ellos con el objeto
                de establecer una posible relación contractual.
              </p>
              <p>
                A efecto de que Witideal esté en posibilidad de prestarle los
                Servicios, usted debe registrarse y mantener una cuenta personal
                de usuario, siendo responsable de toda la actividad que ocurra
                en la misma. En relación con esta cuenta, Witideal requiere que
                usted proporcione información personal, la cual deberá
                proporcionar de forma exacta, completa y actualizada. Usted
                deberá abstenerse de proporcionar o utilizar información falsa,
                inexacta y/o de terceros con los que usted y/o Witideal no
                tenga(n) una relación jurídica.
              </p>
              <p>
                Los servicios que proporciona Witideal se limitan a la promoción
                de inmuebles para su posible contratación, así como a llevar a
                cabo el intercambio de los datos de contacto entre promotores y
                buscadores. Witideal no asume ningún tipo de responsabilidad
                respecto de:
              </p>
              <OlSecondary type="i">
                <li>
                  <p>
                    la veracidad o exactitud de la información proporcionada por
                    los promotores o por los buscadores;
                  </p>
                </li>
                <li>
                  <p>
                    la idoneidad o capacidad jurídica de los promotores o
                    buscadores para celebrar una relación contractual; o
                  </p>
                </li>
                <li>
                  <p>
                    conductas ilegales o delictivas, así como incumplimientos
                    totales o parciales de cualquier contrato que -en su caso-
                    lleguen a celebrar buscadores y promotores; incluyendo (pero
                    no limitándose a) pago de la contraprestación pactada, venta
                    o disposición de cosa ajena, falta de capacidad, vicios en
                    el consentimiento, lesión, vicios ocultos o evicción,
                    modificaciones al inmueble, defectos en la seguridad o
                    higiene, comisión de actos ilícitos en el inmueble, adeudos
                    en servicios, faltas al reglamento de condominio, despojo,
                    robo, fraude, recursos de procedencia ilícita, expropiación,
                    embargo, clausura y, en general, respecto de todo acto que
                    genere cualquier tipo de daño o perjuicio a cualquiera de
                    las partes.
                  </p>
                </li>
              </OlSecondary>

              <p>
                Witideal se reserva el derecho de negar los Servicios o el
                acceso a la Plataforma a cualquier persona que (i) incumpla los
                términos establecidos en estas Condiciones; (ii) incurra en
                prácticas desleales o en contra de las buenas costumbres; o
                (iii) incumpla de forma reiterada o sistemática los compromisos
                contractuales asumidos a través de la Plataforma.
              </p>

              <li>Política de comisiones, cobros y devoluciones</li>

              <OlThird>
                <p>Witideal ofrece 3 planes</p>
                <li>
                  Paquete Rising Star / 3 propiedades destacadas (vigencia 30
                  dias) / Campaña de Facebook / Instagram Ads en la fanpage de
                  Witideal
                </li>
                <li>
                  Paquete Rockstar / 5 propiedades destacada (vigencia 30 dias)
                  / Campaña de Facebook / Instagram Ads en la fanpage de
                  Witideal + Post en redes sociales Luis Ramirez y rematecasas
                </li>
                <li>
                  Paquete Superstar / 10 propiedades destacada (vigencia 30
                  dias) / Campaña de Facebook / Instagram Ads en la fanpage de
                  Witideal + Post en redes sociales Luis Ramirez y rematecasas +
                  Mención en el programa de mundo inmobiliario de Luis Ramirez
                </li>
                <p>
                  Devoluciones. Como regla general, Witideal no hará devolución
                  de recursos que correspondan a servicios (i) efectivamente
                  prestados al usuario y (i) que no hayan sido debidamente
                  desacreditados por el usuario en los términos del párrafo
                  siguiente.
                </p>
                <p>
                  Witideal informará al usuario de forma mensual y a través de
                  la plataforma, el estado de movimientos y cargos de su cuenta.
                  El usuario podrá presentar sus reclamaciones dentro de los
                  primeros 5 días hábiles del mes siguiente a aquel al que
                  correspondan los movimientos, a través de un correo
                  electrónico dirigido a Witideal para tal efecto. En su caso,
                  el usuario deberá incluir en el correo cualquier argumento,
                  documento o soporte que permitan fundamentar su reclamación.
                  Witideal contará con un plazo de 10 días hábiles para
                  responder lo que a su derecho convenga y para determinar la
                  procedencia o improcedencia de la reclamación. La falta de
                  presentación de una reclamación dentro del plazo antes
                  referido se entenderá como una aceptación irrevocable a los
                  movimientos realizados en su cuenta.
                </p>
              </OlThird>

              <li>Actualización de la Aplicación</li>
              <p>
                Witideal podrá, en cualquier momento, realizar actualizaciones
                informáticas, mejoras y mantenimientos a la Plataforma, así como
                solicitar a los usuarios la actualización de la versión
                correspondiente con el fin de garantizar la eficiencia de la
                misma. Usted reconoce que solo a través de la actualización de
                la Aplicación podrá utilizar adecuadamente los Servicios.
              </p>
              <li>Propiedad Industrial / Intelectual</li>
              <p>
                Witideal es y seguirá siendo titular de los derechos de
                propiedad industrial e intelectual relacionados con (i) la
                denominación “Witideal” y con cualquier signo distintivo, marca
                o denominación directa o indirectamente relacionados con la
                misma; así como con (ii) los elementos que integran la
                Plataforma y/o la Aplicación, tales como software, código
                informático, interfaz visual y demás derechos relacionados.
              </p>
              <p>
                Usted se compromete a no vender, licenciar, distribuir, copiar,
                modificar, editar, adaptar, crear trabajos derivados o de otra
                manera hacer uso no autorizado del contenido de la Plataforma o
                de la Aplicación, sin autorización previa y por escrito de
                Witideal y/o del titular de los derechos respectivos. De igual
                forma, usted deberá abstenerse de desarmar, descompilar, aplicar
                ingeniería inversa o de cualquier otro modo tratar de obtener
                acceso o comercializar el código fuente o los protocolos
                inherentes a la Plataforma o la Aplicación.
              </p>
              <li>Privacidad de la información</li>
              <p>
                <span>Desarrolladora de Tecnologías ARD, S.A. de C.V.</span>{" "}
                hace de su conocimiento que los datos personales que recaba en
                relación con los Servicios serán tratados de conformidad con lo
                dispuesto en el Aviso de Privacidad, disponible para su consulta{" "}
                <Link to="/aviso-de-privacidad">aquí</Link>.
              </p>
              <li>Contacto</li>
              <p>
                Para todo lo relacionado con las presentes Condiciones, Witideal
                pone a su disposición los siguientes medios de contacto:
              </p>
              <p>
                Teléfono:{" "}
                {contact.number.map(
                  (num, index) =>
                    `${num}${!!contact.number[index + 1] ? ", " : " "}`
                )}
              </p>
              <p>Correo Electrónico: {contact.email}</p>
              <p>
                Cerro de las Campanas No.3 Despacho 304, piso 3 Torre A, San
                Andrés Atenco, 54050 Tlalnepantla, México. Cd de México
              </p>
              <li>Leyes Aplicables</li>
              <p>
                Para la interpretación y cumplimiento de las presentes
                Condiciones, así como cualquier contingencia jurídica que se
                suscite en relación con las mismas, usted expresamente se somete
                a la legislación y competencia de los tribunales aplicables de
                la Ciudad de México, México, renunciando expresamente a la
                competencia que por razón de su domicilio presente o futuro, o
                por cualquier otra razón, pudiera corresponderle.
              </p>
            </OrderList>
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
};

const OrderList = styled("ol")({
  "& p": {
    marginBottom: "30px",
    lineHeight: "1.5em",
  },
  textAlign: "left",
  "& li": {
    fontSize: "1.1em",
    fontWeight: "bold",
  },
  "& a": {
    color: "#3f19f9",
    fontWeight: "bold",
  },
});

const OlSecondary = styled("ol")({
  marginLeft: "20px",
  "& li": {
    fontWeight: "normal!important",
    fontSize: "1rem",
  },
});

const OlThird = styled("ol")({
  marginLeft: "20px",
  "& li": {
    fontWeight: "normal!important",
    fontSize: "1rem",
    marginBottom: "10px",
  },
});

export default TermsAndConditions;
