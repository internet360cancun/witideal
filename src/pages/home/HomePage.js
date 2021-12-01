import React from "react";
import { Landing } from "../../components/Landing/landing";
import SectionEight from "../how_it_works/SectionEight";
import App from "./App";
import Categorias from "./Categorias";
import Destacados from "./Destacados";
import Direcciones from "./Direcciones";
import InfoWitideal from "./InfoWitideal";
import Publica from "./Publica";
import Separator from "./Separator";

const HomePage = () => {
  return (
    <>
      <Landing />
      <Separator />
      <Publica />
      <Categorias />
      <Destacados />
      <InfoWitideal />
      <App />
      <Direcciones />
      <SectionEight />
    </>
  );
};

export default HomePage;
