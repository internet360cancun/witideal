import React, { useEffect, useState } from "react";
import { Landing } from "../../components/Landing/landing";
import SectionEight from "../how_it_works/SectionEight";
import App from "./App";
import Categorias from "./Categorias";
import Destacados from "./Destacados";
import Direcciones from "./Direcciones";
import InfoWitideal from "./InfoWitideal";
import Publica from "./Publica";
import Separator from "./Separator";
import useFirebaseTools from "../../Hooks/useFirebaseTools";

const HomePage = () => {
  const { firebase } = useFirebaseTools();
  const db = firebase.firestore();
  const [allDestacados, setAllDestacados] = useState([]);
  const getRandomDest = () => {
    db.collection("destProperties")
      // .where("current_period_end", ">=", Date.now() / 1000)
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          doc.data().destProperties.forEach((element) => {
            element.get().then((snap) => {
              setAllDestacados((oldArray) => [
                ...oldArray,
                { id: snap.id, ...snap.data() },
              ]);
            });
          });
        });
      });
  };

  useEffect(() => {
    getRandomDest();
  }, []);

  return (
    <>
      <Landing />
      <Separator />
      <Publica />
      <Categorias />
      {allDestacados.length > 0 ? (
        <Destacados allDestacados={allDestacados} />
      ) : null}
      <InfoWitideal />
      <App />
      <Direcciones />
      <SectionEight />
    </>
  );
};

export default HomePage;
