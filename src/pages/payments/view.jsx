import React from "react";
import Container from "../../layouts/container";
import Content from "../../layouts/content";
import Title from "../../layouts/title";
import { Grid, CircularProgress } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Skeleton from "./components/skeleton";
import Card from "./components/card";
import { Payment } from "@material-ui/icons";
import Head from "../../components/head";
import { useRole } from "../../Hooks/useRole";

const ProgressContainer = styled("div")({
  margin: "30px 0px",
});

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

const View = (props) => {
  const { subscription } = useRole();
  console.log(subscription, "asdf");

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
                    <Grid container alignItems="flex-start" spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Card subscription={subscription} />
                      </Grid>
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
