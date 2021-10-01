import React, { useEffect } from "react";
import "./App.css";
import { Master } from "./components/Master/master";
import Alert from "./components/Alert/alert";
import { Layer } from "./layouts/layer";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import ReactGA from "react-ga";
import { BrowserRouter, useLocation } from "react-router-dom";
import customUserConfirmation from "./helpers/customUserConfirmation";

ReactGA.initialize("UA-168913818-01");

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const AnalitycsComponent = () => {
  const location = useLocation();

  const pageController = (url) => {
    ReactGA.ga("set", "page", url);
    ReactGA.ga("send", "pageview", url);
  };

  useEffect(
    (_any) => {
      pageController(location.pathname);
    },
    [location.pathname]
  );

  return <Master />;
};

function App() {
  return (
    <BrowserRouter getUserConfirmation={customUserConfirmation}>
      <div className="App">
        <Layer />
        <Alert.Component />
        <AnalitycsComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
