import React from "react";
import { styled } from "@material-ui/core/styles";
import { Paper, Box, useMediaQuery } from "@material-ui/core";

const calculateBoder = () => {
  return "5px solid rgb(50, 255, 210)";
};

const Content = styled(Paper)({
  borderLeft: calculateBoder,
  minHeight: "100px",
});

const Row = styled("div")({
  textAlign: "left",
  display: "flex",
});

const Description = styled("div")({
  marginRight: "10px",
  fontWeight: "bold",
});

const Value = styled("span")(({ theme }) => ({
  color: theme.wdPurpleSubtitle,
}));

const Card = ({ subscription }) => {
  const formatDate = (fecha) => {
    let d = new Date(fecha),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  const isMobile = useMediaQuery("(max-width:486px)");

  return (
    <Content elevation={3}>
      <Box p={2}>
        {isMobile ? (
          <>
            <Description>Inicio:</Description>
            <Value>
              {formatDate(subscription.current_period_start * 1000)}
            </Value>

            <Description>Fin:</Description>
            <Value>{formatDate(subscription.current_period_end * 1000)}</Value>

            <Description>Orden de pago:</Description>
            <Value>{subscription.id}</Value>

            <Description>Cantidad:</Description>
            <Value>${subscription.price.unit_amount / 100} MXN</Value>
          </>
        ) : (
          <>
            <Row>
              <Description>Inicio:</Description>
              <Value>
                {formatDate(subscription.current_period_start * 1000)}
              </Value>
            </Row>
            <Row>
              <Description>Fin:</Description>
              <Value>
                {formatDate(subscription.current_period_end * 1000)}
              </Value>
            </Row>
            <Row>
              <Description>Orden de pago:</Description>
              <Value>{subscription.id}</Value>
            </Row>

            <Row>
              <Description>Cantidad:</Description>
              <Value>${subscription.price.unit_amount / 100} MXN</Value>
            </Row>
          </>
        )}
      </Box>
    </Content>
  );
};

export default Card;
