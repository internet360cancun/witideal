/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  Fragment,
  useMemo,
  useContext,
} from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import Skeleton from "./skeleton";
import { styled } from "@material-ui/core/styles";
import { addWeight } from "../../functions/addWeights";
import { applyLotteryToAll, splitArray } from "../../functions/lottery";
import { PropertyCard } from "../PropertyCard/propertyCard";
import AdvanceFilters from "./advanceFilters";
import QuickSearch from "./quickSearch";
import useFirebaseTools from "../../Hooks/useFirebaseTools";
import EmptyProperties from "../../assets/specificDataIcons/emptyPropety.svg";
import Header from "./header";
import paginate from "../../helpers/paginate";
import { useParams, Redirect } from "react-router-dom";
import makeUrl from "../../helpers/makeurl";
import urlTranslator from "../../helpers/urlTranslator";
import Head from "../head";
import stateNameTranlator from "../../helpers/stateNameTranslator";
import Destacados from "./Destacados";
import sessionContext from "../../contexts/sessionContext";

const Container = styled(Box)({
  backgroundColor: "#F9F7FC",
  minHeight: "60vh",
  paddingTop: (props) => props.h + 70,
  paddingBottom: "30px",
  "@media (max-width:960px)": {
    paddingTop: (props) => props.h + 55,
  },
});

const EmptyMessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "60vh",
  color: "#e2ddfe",
  fontWeight: "bold",
  fontSize: "1.1em",
});

const Picture = styled("img")({
  width: "110px",
  marginBottom: "50px",
});

const Place = styled("div")(({ theme }) => ({
  color: theme.colors.blue_black,
  fontWeight: "bold",
  textAlign: "left",
  fontSize: "1.2em",
}));

const defaultValues = {
  currency: "MXN",
};

export const PropertiesList = (props) => {
  const { firebase } = useFirebaseTools();
  const db = firebase.firestore();
  const params = useParams();
  var paramsFiltered = {};
  Object.keys(params).forEach((keyname) => {
    if (!!params[keyname])
      paramsFiltered[keyname] = urlTranslator(
        params[keyname].toString().replace(/-/g, " ")
      );
  });

  // translate state name
  if (paramsFiltered.administrative_area_level_1) {
    paramsFiltered.administrative_area_level_1 = stateNameTranlator(
      paramsFiltered.administrative_area_level_1
    );
  }

  const initialState = props.location.state || {};
  const [form, setFormState] = useState({
    ...defaultValues,
    ...paramsFiltered,
    ...initialState,
  });
  const [propertiesSplitedArrays, setPropertiesSplitedArrays] = useState([]);
  const [propertiesArray, setPropertiesArray] = useState([]);
  const [propertiesSortedByLottery, setPropertiesSortedByLottery] = useState(
    []
  );
  const [isQuickSearchOpen, setIsQuickSerachOpen] = useState(false);
  const [isAdvanceFiltersOpen, setIsAdvanceFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getProperties } = useFirebaseTools();
  const [height, setHeight] = useState(100);
  const [itemsRendered, setItemsRendered] = useState([]);
  const [allDestacados, setAllDestacados] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getRandomDest = () => {
    db.collection("destProperties")
      .where("current_period_end", ">=", Date.now() / 1000)
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          console.log(Date.now() / 1000);
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

  // update state and state from location
  const setForm = (newState) => {
    if (props.location.state || JSON.stringify(paramsFiltered) !== "{}") {
      setFormState(newState);
      const url = makeUrl(newState);
      props.history.replace(`/propiedades/${url}`, { ...newState });
    }
  };

  // transform maxArea and minArea to m2build or m2terraim
  useEffect(() => {
    if (form.minArea && form.maxArea) {
      const new_form = { ...form };
      if (form.propertyType !== "terrain")
        new_form.m2Build = [form.minArea, form.maxArea];
      else new_form.m2Terrain = [form.minArea, form.maxArea];
      setForm(new_form);
    } else {
      const { m2Terrain, m2Build, ...persist } = form;
      setForm(persist);
    }
  }, [JSON.stringify(form)]);

  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] < b[property]) {
        return 1;
      } else if (a[property] > b[property]) {
        return -1;
      }
      return 0;
    };
  }

  function getObjectWithKeys(array) {
    let auxObj = {};
    array.forEach((obj) => {
      auxObj = {
        ...auxObj,
        [obj.pId]: obj,
      };
    });
    return auxObj;
  }

  const handleFetch = async (optional_filters) => {
    setLoading(true);
    setPropertiesArray([]);
    var snapshot;
    if (optional_filters) {
      snapshot = await getProperties(
        optional_filters.currency,
        optional_filters.action,
        optional_filters.propertyType,
        optional_filters.minPrice,
        optional_filters.maxPrice,
        optional_filters.administrative_area_level_1,
        optional_filters.administrative_area_level_2_3,
        optional_filters.sublocality_level_1,
        optional_filters.bankSale
      );
    } else {
      snapshot = await getProperties(
        form.currency,
        form.action,
        form.propertyType,
        form.minPrice,
        form.maxPrice,
        form.administrative_area_level_1,
        form.administrative_area_level_2_3,
        form.sublocality_level_1,
        form.bankSale
      );
    }

    // set empty array if exist error on function
    var propeties;
    try {
      propeties = snapshot.docs.map((doc) => ({
        ...doc.data(),
        pId: doc.id,
        _ref: doc.ref,
      }));
    } catch (error) {
      propeties = [];
    }

    // add tickets if not exist
    propeties = propeties.map((item) => {
      if (!item.tickets) item.tickets = 1;
      return item;
    });
    setPropertiesArray(propeties);
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (propertiesArray.length > 0) {
      addWeight(propertiesArray, form);
      propertiesArray.sort(sortByProperty("coincidence"));
      setPropertiesSplitedArrays(splitArray(propertiesArray, "coincidence"));
    }
  }, [propertiesArray]);

  useEffect(() => {
    let sortedKeys = applyLotteryToAll(propertiesSplitedArrays);
    let objectWithKeys = getObjectWithKeys(propertiesArray);
    let auxVec = [];
    if (sortedKeys !== undefined && sortedKeys.length > 0) {
      sortedKeys.forEach((key) => {
        auxVec.push(objectWithKeys[key]);
      });
    }
    setPropertiesSortedByLottery(auxVec);
  }, [propertiesSplitedArrays]);

  // updatePropertiesWeight
  useEffect(() => {
    window.scrollTo(0, 0);
    if (propertiesArray.length > 0) {
      addWeight(propertiesArray, form);
      propertiesArray.sort(sortByProperty("coincidence"));
      setPropertiesSplitedArrays(splitArray(propertiesArray, "coincidence"));
    }
  }, [form]);

  // paginate results
  const next = useMemo(() => {
    return paginate(propertiesSortedByLottery, 1000);
  }, [propertiesSortedByLottery]);
  useEffect(() => {
    if (!propertiesSortedByLottery) return setItemsRendered([]);
    setItemsRendered([...next()]);
  }, [propertiesSortedByLottery]);

  useEffect(() => {
    var updating = false;
    function handleScroll() {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.getElementById("root").clientHeight;
      if (scrolled + viewportHeight + 500 < fullHeight) return false;
      if (itemsRendered.length >= propertiesSortedByLottery.length)
        return false;
      if (updating) return false;
      updating = true;
      setItemsRendered([...itemsRendered, ...next()]);
      setTimeout(() => {
        updating = false;
      }, 1000);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemsRendered, propertiesSortedByLottery]);

  if (JSON.stringify(paramsFiltered) === "{}" && !props.location.state) {
    return <Redirect to="/error-404" />;
  }

  //create title
  const createTitle = () => {
    try {
      let title = `Resultados de búsqueda para: ${params.action} ${params.propertyType} en`;
      if (params.sublocality_level_1) {
        title = `${title} ${params.sublocality_level_1
          .toString()
          .replace(/-/g, " ")}, `;
      }
      if (params.administrative_area_level_2_3) {
        title = `${title} ${params.administrative_area_level_2_3
          .toString()
          .replace(/-/g, " ")}, `;
      }
      if (params.administrative_area_level_1) {
        title = `${title} ${params.administrative_area_level_1
          .toString()
          .replace(/-/g, " ")}`;
      }
      return title;
    } catch (error) {
      return "Resultados de busqueda";
    }
  };

  const action = props.match.params.action;
  const propertyType = props.match.params.propertyType;
  const area1 = props.match.params.administrative_area_level_1;
  const area2 = props.match.params.administrative_area_level_2_3
    ? props.match.params.administrative_area_level_2_3
    : "no hay parámetro";
  const limiteA2 = area2.length;
  const nuevaArea2 = area2.split("-", limiteA2);

  return (
    <Fragment>
      <Head title={createTitle()} description={createTitle()} />
      <QuickSearch
        open={isQuickSearchOpen}
        handleClose={() => {
          setIsQuickSerachOpen(false);
        }}
        handleFetch={handleFetch}
        filters={form}
        setFilters={setForm}
      />
      <AdvanceFilters
        open={isAdvanceFiltersOpen}
        handleClose={() => {
          setIsAdvanceFiltersOpen(false);
        }}
        filters={form}
        setFilters={setForm}
      />
      <Container h={height}>
        {allDestacados
          .filter((keyword) => {
            return keyword.propertyType === urlTranslator(propertyType);
          })
          .filter((keyword) => {
            return keyword.action === urlTranslator(action);
          })
          .filter((keyword) => {
            return keyword.administrative_area_level_1 === urlTranslator(area1);
          }).length > 0 && <Destacados allDestacados={allDestacados} />}

        <Grid
          style={{ width: "100%", margin: "auto" }}
          container
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} lg={11}>
            <Header
              setHeight={setHeight}
              filters={form}
              setFilters={setForm}
              activeQuickSearch={() => setIsQuickSerachOpen(true)}
              activeAdvanceFilter={() => setIsAdvanceFiltersOpen(true)}
            />
          </Grid>
          <Grid item xs={12} lg={11}>
            <Paper elevation={3}>
              <Box p={3}>
                {propertiesArray.length > 0 &&
                  propertiesSortedByLottery.length > 0 &&
                  !loading && (
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="stretch"
                      spacing={2}
                    >
                      <Grid item xs={12}>
                        <Place>
                          {form.sublocality_level_1 &&
                            `${form.sublocality_level_1}, `}
                          {form.administrative_area_level_2_3 &&
                            `${form.administrative_area_level_2_3} ,`}
                          {form.administrative_area_level_1 &&
                            `${form.administrative_area_level_1} ,`}
                          {form.country || ""}
                        </Place>
                      </Grid>
                      {itemsRendered.map((properData) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          xl={3}
                          key={properData.pId}
                        >
                          <PropertyCard
                            properData={properData}
                            propertyType={form.propertyType}
                            action={form.action}
                            currency={form.currency}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                {(propertiesArray.length < 1 ||
                  propertiesSortedByLottery.length < 1) &&
                  loading && <Skeleton />}
                {(propertiesArray.length < 1 ||
                  propertiesSortedByLottery.length < 1) &&
                  !loading && (
                    <EmptyMessageContainer>
                      <Picture src={EmptyProperties} />
                      No encontramos resultados de búsqueda.
                    </EmptyMessageContainer>
                  )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
