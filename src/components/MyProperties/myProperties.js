/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Grid, Typography, Box, Paper, Button } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import useFirebaseTools from '../../Hooks/useFirebaseTools';
import SesContext from '../../contexts/sessionContext';
import { CircularProgress } from '@material-ui/core';
import { MyPropertyCard } from '../MyPropertiesCard/myPropertiesCard';
import { setAlert } from '../Alert/alert';
import snapshotParser from '../../helpers/snapshotParser';
import MyPropertiesFilter from '../MyPropertyFilter/myPropertyFilter';
import emptyProperty from '../../assets/specificDataIcons/emptyPropety.svg';
import Drawer from '@material-ui/core/Drawer';
import { myProperties as myPropertiesModel } from '../../firebase/property';
import Head from '../head';
import { risingStar, rockStar, superStar } from '../../constants/subscriptions';
import { useRole } from '../../Hooks/useRole';

const ProgresContainer = styled(Box)({
  marginTop: '70px',
  marginBottom: '30px',
});

const ButtonFilter = styled(Button)(({ theme }) => ({
  margin: '20px 0px',
  borderColor: theme.wdLightBlue,
  textTransform: 'none',
  color: '#3F19F9',
  fontSize: 17,
}));
const wdRegularBlue = '#1E0E6F';

const useStyle = makeStyles((theme) => ({
  spacing: {
    marginTop: 100,
  },
  maincontainer: {
    backgroundColor: '#F9F7FC',
  },
  generalText: {
    color: wdRegularBlue,
    fontWeight: 700,
  },
}));

const Icon = styled('img')({
  width: '100px',
  marginBottom: '30px',
});

const Message = styled('p')({
  maxWidth: '600px',
  color: '#e7e2fe',
  fontSize: '1.2rem',
  lineHeight: '1.5em',
});

const EmptyMessage = styled(Grid)({
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const skeleton = (
  <Grid item xs={12} sm={12} md={6} lg={6}>
    <Skeleton variant="rect" height={300} />
    <Skeleton variant="text" width={250} />
    <Skeleton variant="text" />
    <Skeleton variant="text" width={250} />
  </Grid>
);

const renderSkeleton = (numSkaleton) => {
  let skaletonArray = [];
  for (let i = 0; i < numSkaleton; i++) {
    skaletonArray.push(skeleton);
  }
  return skaletonArray.map((element, index) => {
    return <React.Fragment key={index}>{element}</React.Fragment>;
  });
};

const RenderMyProperties = (props) => {
  return (
    <Grid container justify="center" alignItems="stretch" spacing={3}>
      {props.myProperties.map((properData) => (
        <Grid key={properData._id} item x={12} md={6}>
          <MyPropertyCard
            properData={properData}
            handleDelete={props.handleDelete}
            subscriptionNumber={props.subscriptionNumber}
            setDestNumber={props.setDestNumber}
            destNumber={props.destNumber}
            isDestAvailable={props.isDestAvailable}
            setIsDestAvailable={props.setIsDestAvailable}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const initilFilters = {
  action: null,
  propertyType: null,
  priceMxnMax: null,
  priceMxnMin: null,
  isEnabled: null,
};

export const MyProperties = () => {
  const classes = useStyle();
  const session = useContext(SesContext);
  const { delProp } = useFirebaseTools();
  const [isFilterActive, setFilterActive] = useState(false);
  const [onChangeFilters, setOnChangeFilters] = useState(1);
  const [destNumber, setDestNumber] = useState(0);
  const [myProperties, setMyProperties] = useState({
    items: [],
    loading: true,
    latestItem: null,
    noMore: true,
    itemsForPage: 1000,
    filter: initilFilters,
  });

  const { subscription } = useRole();
  const [subscriptionPlanNumber, setSubscriptionPlanNumber] = useState(0);
  const [isDestAvailable, setIsDestAvailable] = useState(false);

  const getAvailableNumber = () => {
    console.log("my", subscription);
    if (subscription && subscription.role === risingStar) {
      return 3;
    } else if (subscription && subscription.role === rockStar) {
      return 5;
    } else if (subscription && subscription.role === superStar) {
      return 10;
    }
  };



  const updateFilter = (newFilter) => {
    setMyProperties({ ...myProperties, filter: newFilter });
  };

  // fetch again when change filters
  useEffect(() => {
    handleFetch();
  }, [onChangeFilters]);

  const ApplyFilters = () => {
    setMyProperties({
      ...myProperties,
      items: [],
      loading: true,
      latestItem: null,
      noMore: false,
    });

    setOnChangeFilters(onChangeFilters + 1);
    setFilterActive(false);
  };

  const removeFilters = () => {
    setMyProperties({
      ...myProperties,
      items: [],
      filter: initilFilters,
      loading: true,
      latestItem: null,
      noMore: false,
    });
    setOnChangeFilters(onChangeFilters + 1);
    setFilterActive(false);
  };

  const { items, loading, latestItem, noMore, itemsForPage } = myProperties;

  const deleteProperty = async (idToDelete) => {
    const ItemsWhitLoading = myProperties.items.map((item) => {
      if (item._id !== idToDelete) return item;
      const newItem = { ...item, loading: true };
      return newItem;
    });
    setMyProperties({ ...myProperties, items: ItemsWhitLoading });
    const result = await delProp(session.uId, idToDelete);
    if (result) {
      const newItems = items.filter((item) => idToDelete !== item._id);
      setMyProperties({ ...myProperties, items: newItems });
      setAlert(
        null,
        'Éxito',
        'El inmueble se ha eliminado correctamente',
        'information'
      );
    } else {
      setAlert(
        null,
        'Error',
        'Ha ocurrido un error, intentalo de nuevo mas tarde',
        'error'
      );
      setMyProperties({
        ...myProperties,
        items: myProperties.items.map((item) => {
          return {
            ...item,
            loading: false,
          };
        }),
      });
    }
  };

  const handleDelete = (idToDelete) => {
    setAlert(
      () => {
        deleteProperty(idToDelete);
      },
      'Eliminar Anuncio',
      'No podrás recuperar la información una vez realizada esta acción'
    );
  };

  useEffect(() => {
    handleFetch();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, latestItem, myProperties.filter]);

  const handleFetch = async () => {
    setMyProperties({ ...myProperties, loading: true });
    var { properties, lastDoc } = await myPropertiesModel(
      session.uId,
      latestItem,
      myProperties.filter,
      itemsForPage
    );
    properties = snapshotParser(properties);
    setMyProperties({
      ...myProperties,
      latestItem: lastDoc,
      items: items.concat(properties),
      loading: false,
      noMore: properties.length < itemsForPage ? true : false,
    });
  };

  function handleScroll() {
    if (loading) return false;
    if (noMore) return false;
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.getElementById('root').clientHeight;
    if (scrolled + viewportHeight + 500 < fullHeight) return false;
    handleFetch();
  }

  const onCloseDrawer = () => {
    setFilterActive(false);
  };

  return (
    <Fragment>
      <Head title="Mis inmuebles" />
      <Drawer
        open={isFilterActive}
        onClose={onCloseDrawer}
        style={{ zIndex: 1300 }}
      >
        <div style={{ zIndex: '1300' }}>
          <MyPropertiesFilter
            updateFilter={updateFilter}
            filter={myProperties.filter}
            ApplyFilters={ApplyFilters}
            removeFilters={removeFilters}
            setFilterActive={setFilterActive}
          />
        </div>
      </Drawer>

      <Box className={classes.maincontainer} id="listener">
        <Grid container justify="center" alignItems="center">
          <Grid item lg={10}>
            <Paper>
              <Box p={{ xs: 3, md: 5, xl: 4, lg: 4 }}>
                <Grid container justify="center" alignContent="center">
                  <Grid item xs={12} md={12}>
                    <Typography
                      align="center"
                      variant="h4"
                      gutterBottom
                      className={`${classes.spacing} ${classes.generalText}`}
                    >
                      Mis Inmuebles
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonFilter
                      variant="outlined"
                      onClick={() => setFilterActive(true)}
                    >
                      Filtrar Inmueble
                    </ButtonFilter>
                  </Grid>
                  {items.length === 0 && !loading && (
                    <EmptyMessage item xs={12}>
                      <Icon src={emptyProperty} />
                      <Message>
                        {JSON.stringify(myProperties.filter) ===
                        JSON.stringify(initilFilters)
                          ? 'No has cargado aún algún inmueble, carga uno y comienza tu experiencia Witideal.'
                          : 'No tienes inmuebles con estas características.'}
                      </Message>
                    </EmptyMessage>
                  )}
                  <Grid item xs={12} md={12}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="stretch"
                    >
                      {items.length > 0 && (
                        <RenderMyProperties
                          myProperties={items}
                          handleDelete={handleDelete}
                          destNumber={destNumber}
                          setDestNumber={setDestNumber}
                          isDestAvailable={isDestAvailable}
                          setIsDestAvailable={setIsDestAvailable}
                          subscriptionNumber={getAvailableNumber()}
                        />
                      )}
                      {items.length === 0 && loading && renderSkeleton(4)}
                    </Grid>
                  </Grid>
                  {items.length > 0 && !noMore && (
                    <Grid item xs={12}>
                      <ProgresContainer>
                        <CircularProgress />
                      </ProgresContainer>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};
