import React, { useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import { ButtonBase } from "@material-ui/core";
import { paypal } from "../../firebase/pays";
import analytics from "react-ga";
import { isProduction } from "../../constants/globalConstraints";
import conversion from "../../helpers/convresion";

// paypal config

const paypalConfig = (props) => {
  return {
    style: {
      color: "blue",
    },
    createOrder: function (data, actions) {
      return actions.order.create({
        payer: {
          custom: "hello",
        },
        purchase_units: [
          {
            amount: { value: props.amount },
            description: "buying witicoins",
            custom_id: props.metadata.oId,
          },
        ],
      });
    },
    onApprove: async (data, actions) => {
      if (isProduction) {
        analytics.event({
          category: props.metadata.uId,
          action: "witicoins method pay",
          label: "paypal",
        });
        conversion(props.amount);
      }
      props.sendStatisticsOfPackagesToAnalytics();
      props.startProcess();
      await paypal.create(props.metadata);
      const status = await actions.order.capture();
      props.endProcess();
      props.onSuccess();
      return status;
    },
  };
};

const PaypalForm = (props) => {
  // render button paypal
  useEffect((any) => {
    window.paypal.Buttons(paypalConfig({ ...props })).render("#render_button");
  }, []);

  return (
    <ContentPaypal>
      <Text> Presiona el botón para iniciar el pago con Paypal</Text>
      <PaypalButton>
        <NodePaypalRender id="render_button" />
        Pagar con Paypal
        {(parseInt(props.amount) === 0 || isNaN(parseInt(props.amount))) && (
          <PaypalShadow onClick={props.onError} />
        )}
      </PaypalButton>
    </ContentPaypal>
  );
};

const ContentPaypal = styled("div")({
  margin: "auto",
});

const NodePaypalRender = styled("div")({
  position: "absolute",
  width: "120%",
  height: "120%",
  opacity: 0.01,
});

const PaypalButton = styled(ButtonBase)({
  overflow: "hidden",
  maxWidth: "400px",
  margin: "auto",
  position: "relative",
  backgroundColor: "#3F19F9",
  width: "250px",
  padding: "8px",
  fontWeight: "bold",
  borderRadius: "5px",
  color: "white",
  textTransform: "none",
  fontSize: 17,
  "&:hover": {
    backgroundColor: "#1E0E6F",
  },
});

const PaypalShadow = styled("div")({
  width: "100%",
  height: "100%",
  opacity: "0",
  position: "absolute",
  zIndex: 9999,
  cursor: "pointer",
});

const Text = styled("h3")({
  color: "#1E0E6F",
  fontWeight: 700,
  marginBottom: "20px",
});

export default PaypalForm;
