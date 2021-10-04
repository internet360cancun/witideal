import React from "react";
import Container from "../../layouts/container";
import Content from "../../layouts/content";
import Title from "../../layouts/title";
import { Grid } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Card from "./components/card";
import { Payment } from "@material-ui/icons";
import Head from "../../components/head";
import { useRole } from "../../Hooks/useRole";

const MinHeight = styled("div")({
  minHeight: "70vh",
});

const EmptyPayments = styled("div")({
  minHeight: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5em",
  color: "#e7e2fe",
  flexDirection: "column",
});

const PaymentStyled = styled(Payment)({
  fontSize: "90px",
  marginBottom: "50px",
});

const View = () => {
  const { subscription } = useRole();

  return (
    <Container>
      <Head title="Mis pagos" />
      <Content>
        <Title>Mis Pagos</Title>

        {subscription && (
          <>
            {subscription.price && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={10}>
                  <MinHeight>
                    <Grid container justifyContent="center" spacing={3}>
                      <Card subscription={subscription} />
                    </Grid>
                  </MinHeight>
                </Grid>
              </Grid>
            )}
          </>
        )}

        {subscription && (
          <>
            {!subscription.price && (
              <EmptyPayments>
                <PaymentStyled />
                Aun no tienes registros de pago
              </EmptyPayments>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default View;
