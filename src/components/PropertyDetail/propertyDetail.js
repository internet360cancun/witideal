/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from 'react';
import useFirebaseTools from '../../Hooks/useFirebaseTools';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Avatar,
  Hidden,
  useMediaQuery,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import NumberFormat from 'react-number-format';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StaticGoogleMap, Path, Marker } from 'react-static-google-map';
import { SpecificDataIcons } from '../SpecificDataIcons/specificDataIcons';
import { propertyType_es, action_es } from '../../assets/Strings';
import SesState from '../../contexts/sessionContext';
import Photos from '../../layouts/galleryModal';
import Pictures from './pictures';
import { PropertyDetailSpecificData } from '../PropertyDetailSpecificData/propertyDetailSpecificData';
import logIn from '../../assets/specificDataIcons/logIn.svg';
import useStyles, { MoreVert } from './styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Report from './report';
import { styled } from '@material-ui/core/styles';
import EmptyProperties from '../../assets/specificDataIcons/emptyPropety.svg';
import formatNumber from '../../helpers/formatNumber';
import Swipe from './swype';
import Register from './register';
import ModalRegister from './registerModal';
import analytics from 'react-ga';
import { isProduction } from '../../constants/globalConstraints';
import urlTranslator from '../../helpers/urlTranslator';
import Head from '../head';

const Br = styled('div')({
  color: '#fff',
});

const BankSaleContent = styled('div')({
  background: '#f7f6ff',
  color: '#1e0e6f',
  fontWeight: 'bold',
});

export const PropertyDetail = (props) => {
  const Medium = useMediaQuery('(max-width:1280px)');
  const domRef = useRef({});
  const params = props.match.params;
  const [errorToLoad, setErrorToload] = useState(null);
  const [properData, setProperData] = useState();
  const [isCardFixed, setIsCardFixed] = useState(false);
  const [isModalPhotosActive, setModalPhotosActive] = useState(false);
  const { getSpecificSearchProperty, credentialEx } = useFirebaseTools();
  const classes = useStyles();
  const session = useContext(SesState);
  const [promoterCredentials, setPromoterCredentials] = useState(null);
  const [loadingCredentials, setLoadingCredentials] = useState(false);
  const [menu, setMenu] = useState(null);
  const [isModalReportingActive, setIsModalReportingActive] = useState(false);
  const [currentMargin, setCurrentMargin] = useState(0);
  const [isCredentialsActive, setActiveCredential] = useState(false); // renderCredentials as effect


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  // update margin footer
  useEffect(() => {
    const onSizeChange = () => {
      setTimeout(() => {
        try {
          if (window.matchMedia('(max-width:1279px)').matches)
            setCurrentMargin(domRef.current.clientHeight);
          else setCurrentMargin(0);
        } catch (error) {
          setCurrentMargin(0);
        }
      }, 50);
    };
    onSizeChange();
    window.addEventListener('resize', onSizeChange);
    return (event) => window.removeEventListener('resize', onSizeChange);
  }, []);

  const GMapCircle = (lat, lng, rad, detail = 10) => {
    var circlePoints = [];
    var r = 6371;
    var pi = Math.PI;
    var _lat = (lat * pi) / 180;
    var _lng = (lng * pi) / 180;
    var d = rad / 1000 / r;
    var i = 0;
    for (i = 0; i <= 360; i += detail) {
      var brng = (i * pi) / 180;
      var pLat = Math.asin(
        Math.sin(_lat) * Math.cos(d) +
          Math.cos(_lat) * Math.sin(d) * Math.cos(brng)
      );
      var pLng =
        ((_lng +
          Math.atan2(
            Math.sin(brng) * Math.sin(d) * Math.cos(_lat),
            Math.cos(d) - Math.sin(_lat) * Math.sin(pLat)
          )) *
          180) /
        pi;
      pLat = (pLat * 180) / pi;
      circlePoints.push({ lat: pLat, lng: pLng });
    }
    return circlePoints;
  };

  const handleScroll = () => {
    if (window.pageYOffset > 250) {
      setIsCardFixed(true);
    } else {
      setIsCardFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCardFixed]);

  useEffect(() => {
    getSpecificSearchProperty(
      urlTranslator(params.action),
      urlTranslator(params.propertyType),
      params.pId
    )
      .then((doc) => {
        if (doc.exists) {
          console.log('doc', doc.data());
          setProperData(doc.data());
        } else {
          setErrorToload(true);
          console.log('No existe el documento');
        }
      })
      .catch((error) => {
        console.log('Error en obtener el documento:', error);
      });
  }, []);

  const pictures =
    properData && properData.photos ? properData.photos.extras : [];
  const photos_with_principal_photo = [
    properData ? properData.principalPhotoPath : null,
    ...pictures,
  ];

  const onReportClick = (event) => {
    setIsModalReportingActive(true);
  };

  const handleModalClose = (event) => {
    setIsModalReportingActive(false);
  };

  const handleCredentialsExchange = () => {
    setLoadingCredentials(true);
    credentialEx(
      session.uId,
      session.isPromoter,
      params.pId,
      properData.uId,
      {
        name: session.Name,
        lastname: session.lastname,
        mail: session.Email,
        phone: session.phone,
        photo:
          session.PhotoURL ||
          'https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40logIn.svg?alt=media&token=b5b57bad-a437-4691-bd6c-194c98514983',
        isPromoter: session.isPromoter,
        extraPhones: session.extraPhones || [],
      },
      urlTranslator(params.propertyType),
      urlTranslator(params.action),
      properData.priceMxn
    )
      .then((res) => {
        console.log('**************esponse exchange credential ', res);
        if (res.error_code === undefined) {
          setPromoterCredentials(res);
          setLoadingCredentials(false);
        } else {
          console.log('ERROR************', res);
        }
      })
      .catch((err) => {
        console.log('err*********', err.data());
        setLoadingCredentials(false);
      });
  };

  const SkeletonComponent = () => (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Skeleton variant="rect" height={350} />
      </Grid>
      <Grid item xs={5}>
        <Skeleton variant="rect" height={60} width="99%" />
        <Skeleton variant="text" width="80%" />
      </Grid>
      <Grid item xs={5}>
        <Skeleton variant="rect" height={60} width="97%" />
        <Skeleton variant="text" width="80%" />
      </Grid>
    </Grid>
  );

  // render credentials after user logged
  useEffect(() => {
    console.log(
      'render credentials after user logged session state________',
      session
    );
    if (
      session.Name &&
      isCredentialsActive &&
      session.SesState &&
      !loadingCredentials &&
      !promoterCredentials
    )
      handleCredentialsExchange();
  }, [
    session.SesState,
    session.Name,
    isCredentialsActive,
    promoterCredentials,
    session.RegComplete,
  ]);

  const onExchangeCredentialClick = (_event) => {
    if (session.SesState) return handleCredentialsExchange();
    window.preventOpenSuccessModal = true;
    setActiveCredential(true);
    if (Medium) window.modalRegister.open();
    if (isProduction) {
      analytics.event({
        action: 'exchangeCredentialClick',
        category: 'null',
        label: 'click',
      });
    }
  };

  return (
    <Box className={classes.mainContainer} pb={3} pt={{ lg: 9, xs: 7 }}>
      <Head
        title={`${properData ? urlTranslator(properData.action) : ''} ${
          properData ? urlTranslator(properData.propertyType) : ''
        } en ${urlTranslator(
          properData ? properData.administrative_area_level_1 : ''
        )}`}
        description={
          properData && properData.specificData
            ? properData.specificData.propertyDescription
            : ''
        }
      />
      <ModalRegister onClose={() => setActiveCredential(false)} />
      <Report
        pId={params.pId}
        uId={properData ? properData.uId : null}
        open={isModalReportingActive}
        onClose={handleModalClose}
      />
      {isModalPhotosActive && (
        <Photos
          photos={photos_with_principal_photo}
          handleClose={() => setModalPhotosActive(false)}
        />
      )}
      {!properData && !errorToLoad && <SkeletonComponent />}
      {properData && properData.isEnabled && properData.isActive && (
        <Grid container justifyContent="center" alignItems="center">
          <Hidden smDown>
            <Grid item xs={12} onClick={() => setModalPhotosActive(true)}>
              <Pictures photos={[properData.principalPhotoPath, ...pictures]} />
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Swipe
                onClick={() => setModalPhotosActive(true)}
                pictures={[properData.principalPhotoPath, ...pictures]}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <Box pt={2}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={11} lg={10}>
                  <Paper elevation={3}>
                    <Box p={5}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={3}
                      >
                        {/* left side */}
                        <Grid item xs={12} lg={6} xl={7}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item md={12}>
                              {/* Address */}
                              <Typography
                                variant="h6"
                                gutterBottom
                                align="center"
                                className={classes.subtitleText}
                              >
                                {properData.route && `${properData.route} `}
                                {properData.street_number &&
                                  `${properData.street_number} `}
                                {properData.int_number &&
                                  `${properData.int_number}`}
                                {properData.sublocality_level_1 &&
                                  `, ${properData.sublocality_level_1}`}
                                {properData.administrative_area_level_2_3 &&
                                  `, ${properData.administrative_area_level_2_3}`}
                                {properData.postal_code &&
                                  `, ${properData.postal_code}`}
                                {properData.administrative_area_level_1 &&
                                  `, ${properData.administrative_area_level_1}`}
                              </Typography>
                            </Grid>
                            {/* Property Description Text */}
                            <Grid item xs={12}>
                              <Typography
                                variant="h5"
                                gutterBottom
                                align="center"
                                className={classes.subtitleText}
                              >
                                Descripción General
                              </Typography>

                              <Box p={1}>
                                {!!properData.specificData && (
                                  <Typography
                                    variant="subtitle1"
                                    align="center"
                                  >
                                    {properData.specificData
                                      .propertyDescription !== undefined
                                      ? properData.specificData
                                          .propertyDescription
                                      : ''}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>

                            {properData && properData.bankSale && (
                              <Grid item xs={12}>
                                <BankSaleContent>
                                  <Box p={1}>Remate Bancario</Box>
                                </BankSaleContent>
                              </Grid>
                            )}

                            {/* Icons */}
                            <Grid item xs={12}>
                              <SpecificDataIcons
                                properData={
                                  properData.specificData !== undefined
                                    ? properData.specificData
                                    : {}
                                }
                              />
                            </Grid>
                            {properData.specificData && (
                              <Grid item xs={12}>
                                <PropertyDetailSpecificData
                                  specificData={properData.specificData}
                                />
                              </Grid>
                            )}

                            <Grid className={classes.mapContainer} item xs={12}>
                              <StaticGoogleMap
                                apiKey="AIzaSyCVzD2DnsLYxkD5sNF_IOSF24h5r6JiR9o"
                                center={
                                  properData.lat === undefined ||
                                  properData.lng === undefined
                                    ? '19.432608,-99.133209'
                                    : `${properData.lat},${properData.lng}`
                                }
                                zoom="17"
                                size="350x350"
                              >
                                {properData.isExactLocation ? (
                                  <Marker
                                    iconURL="https://tinyurl.com/y4wlmdeb"
                                    location={
                                      properData.lat === undefined ||
                                      properData.lng === undefined
                                        ? '19.432608,-99.133209'
                                        : `${properData.lat},${properData.lng}`
                                    }
                                  /> //Poner bandera en la vista para saber si es exacto o no
                                ) : (
                                  <Path
                                    fillcolor="0x4eb2e490"
                                    weight="2"
                                    points={GMapCircle(
                                      properData.lat === undefined ||
                                        properData.lng === undefined
                                        ? 19.432608
                                        : properData.lat,
                                      properData.lat === undefined ||
                                        properData.lng === undefined
                                        ? -99.133209
                                        : properData.lng,
                                      200
                                    )}
                                  />
                                )}
                              </StaticGoogleMap>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          lg={6}
                          xl={5}
                          style={{ position: 'sticky', top: '70px' }}
                        >
                          {!promoterCredentials &&
                            isCredentialsActive &&
                            !loadingCredentials && (
                              <Hidden mdDown>
                                <Register />
                              </Hidden>
                            )}
                          {(!isCredentialsActive ||
                            loadingCredentials ||
                            promoterCredentials) && (
                            <Paper
                              elevation={3}
                              className={
                                isCardFixed
                                  ? classes.floatingCard_fixed
                                  : classes.floatingCard
                              }
                              ref={domRef}
                            >
                              <style
                                dangerouslySetInnerHTML={{
                                  __html: `.master_footer {margin-bottom: ${currentMargin}px}`,
                                }}
                              />
                              <Box p={2}>
                                <Grid
                                  container
                                  justifyContent="center"
                                  alignItems="center"
                                  spacing={1}
                                >
                                  {!promoterCredentials && loadingCredentials && (
                                    <Grid item xs={12}>
                                      <Box p={8}>
                                        <CircularProgress />
                                      </Box>
                                    </Grid>
                                  )}
                                  {!!promoterCredentials &&
                                    promoterCredentials.sendTo ===
                                      'ownedProperty' && (
                                      <Grid item xs={12}>
                                        <Typography
                                          align="center"
                                          className={classes.subtitleText}
                                          variant="subtitle1"
                                        >
                                          Al parecer este inmueble pertenece a
                                          tu inmobiliaria
                                        </Typography>
                                      </Grid>
                                    )}
                                  {!!promoterCredentials &&
                                    promoterCredentials.sendTo ===
                                      'notShared' && (
                                      <Grid item xs={12}>
                                        <Typography
                                          align="center"
                                          className={classes.subtitleText}
                                          variant="subtitle1"
                                        >
                                          Lo sentimos, pero este promotor no
                                          comparte comisión.
                                        </Typography>
                                      </Grid>
                                    )}
                                  {!!promoterCredentials &&
                                    !promoterCredentials.sendTo && (
                                      <Grid item xs={12}>
                                        <Box>
                                          <Grid
                                            container
                                            justifyContent="center"
                                            alignItems="center"
                                          >
                                            <Grid item sm={4} xs={12}>
                                              <Hidden xsDown>
                                                <Avatar
                                                  className={
                                                    classes.promoterImgWrapper
                                                  }
                                                  src={
                                                    promoterCredentials.photo ||
                                                    logIn
                                                  }
                                                  alt="promoters, photo"
                                                  width={150}
                                                />
                                              </Hidden>
                                            </Grid>
                                            <Grid item sm={8} xs={12}>
                                              <Grid
                                                container
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                <Hidden xsDown>
                                                  <Grid item xs={12}>
                                                    <Typography
                                                      variant="h6"
                                                      align="left"
                                                      className={
                                                        classes.subtitleText
                                                      }
                                                    >
                                                      {promoterCredentials.name}{' '}
                                                      {
                                                        promoterCredentials.lastname
                                                      }
                                                    </Typography>
                                                  </Grid>
                                                </Hidden>
                                                <Hidden smUp>
                                                  <Grid item xs={4}>
                                                    <Avatar
                                                      className={
                                                        classes.promoterImgWrapper
                                                      }
                                                      src={
                                                        promoterCredentials.photo ||
                                                        logIn
                                                      }
                                                      alt="promoters, photo"
                                                      width={150}
                                                    />
                                                  </Grid>
                                                  <Grid item xs={8}>
                                                    <Typography
                                                      variant="h6"
                                                      align="left"
                                                      className={
                                                        classes.subtitleText
                                                      }
                                                    >
                                                      {promoterCredentials.name}{' '}
                                                      {
                                                        promoterCredentials.lastname
                                                      }
                                                    </Typography>
                                                  </Grid>
                                                  <Br> space </Br>
                                                </Hidden>
                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant="subtitle1"
                                                    align="left"
                                                    className={
                                                      classes.subtitleText2
                                                    }
                                                  >
                                                    {!(
                                                      promoterCredentials.isPromoter &&
                                                      promoterCredentials.showMainPhone ===
                                                        false &&
                                                      promoterCredentials.extraPhones &&
                                                      !!promoterCredentials
                                                        .extraPhones.length
                                                    ) &&
                                                      `tel: ${formatNumber(
                                                        promoterCredentials.phone
                                                      )}`}
                                                  </Typography>
                                                  {!!promoterCredentials.extraPhones &&
                                                    !!promoterCredentials
                                                      .extraPhones.length && (
                                                      <>
                                                        {promoterCredentials.extraPhones.map(
                                                          (phone) => (
                                                            <Typography
                                                              variant="subtitle1"
                                                              align="left"
                                                              className={
                                                                classes.subtitleText2
                                                              }
                                                              key={phone}
                                                            >
                                                              tel:{' '}
                                                              {formatNumber(
                                                                phone
                                                              )}
                                                            </Typography>
                                                          )
                                                        )}
                                                      </>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant="subtitle1"
                                                    align="left"
                                                    className={
                                                      classes.subtitleText2
                                                    }
                                                  >
                                                    {promoterCredentials.mail}
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                              <Grid item xs={12}>
                                                <Typography
                                                  variant="subtitle1"
                                                  align="left"
                                                  className={
                                                    classes.subtitleText
                                                  }
                                                >
                                                  {action_es[properData.action]}{' '}
                                                  {
                                                    propertyType_es[
                                                      properData.propertyType
                                                    ]
                                                  }
                                                </Typography>
                                              </Grid>

                                              <Grid item xs={12}>
                                                <NumberFormat
                                                  value={properData.price}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  prefix={'$'}
                                                  suffix={` ${properData.currency}`}
                                                  renderText={(value) => (
                                                    <Typography
                                                      variant="h6"
                                                      align="left"
                                                      className={
                                                        classes.subtitleText2
                                                      }
                                                    >
                                                      {value}{' '}
                                                    </Typography>
                                                  )}
                                                />
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      </Grid>
                                    )}
                                  {!promoterCredentials && !loadingCredentials && (
                                    <>
                                      <Grid item xs={12}>
                                        <Grid
                                          container
                                          justifyContent="center"
                                          alignItems="center"
                                          style={{ position: 'relative' }}
                                        >
                                          <Menu
                                            anchorEl={menu}
                                            open={!!menu}
                                            onClose={(event) => setMenu(null)}
                                            onClick={(event) => setMenu(null)}
                                          >
                                            <MenuItem onClick={onReportClick}>
                                              Reportar inmueble
                                            </MenuItem>
                                          </Menu>
                                          <MoreVert
                                            onClick={(event) =>
                                              setMenu(event.currentTarget)
                                            }
                                          />
                                          <Hidden smDown>
                                            <Grid item xs={12} lg={12}>
                                              <Grid
                                                container
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant="h4"
                                                    align="center"
                                                    className={
                                                      classes.subtitleText
                                                    }
                                                  >
                                                    {
                                                      propertyType_es[
                                                        properData.propertyType
                                                      ]
                                                    }
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant="h6"
                                                    align="center"
                                                    className={
                                                      classes.subtitleText
                                                    }
                                                  >
                                                    {
                                                      action_es[
                                                        properData.action
                                                      ]
                                                    }
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item xs={12} lg={12}>
                                              <NumberFormat
                                                value={properData.price}
                                                suffix={
                                                  ' ' + properData.currency
                                                }
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                renderText={(value) => (
                                                  <Typography
                                                    variant="h4"
                                                    align="center"
                                                    className={
                                                      classes.subtitleText2
                                                    }
                                                  >
                                                    {value}{' '}
                                                  </Typography>
                                                )}
                                              />
                                            </Grid>
                                          </Hidden>
                                          <Hidden mdUp>
                                            <Grid item xs={12} lg={12}>
                                              <Grid
                                                container
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant="h5"
                                                    align="center"
                                                    className={
                                                      classes.subtitleText
                                                    }
                                                  >
                                                    {
                                                      action_es[
                                                        properData.action
                                                      ]
                                                    }{' '}
                                                    {
                                                      propertyType_es[
                                                        properData.propertyType
                                                      ]
                                                    }
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            <Grid item xs={12} lg={12}>
                                              <NumberFormat
                                                value={properData.price}
                                                suffix={
                                                  ' ' + properData.currency
                                                }
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$'}
                                                renderText={(value) => (
                                                  <Typography
                                                    variant="h6"
                                                    align="center"
                                                    className={
                                                      classes.subtitleText2
                                                    }
                                                  >
                                                    {value}{' '}
                                                  </Typography>
                                                )}
                                              />
                                            </Grid>
                                          </Hidden>
                                        </Grid>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Button
                                          className={classes.button}
                                          variant="contained"
                                          size="large"
                                          onClick={onExchangeCredentialClick}
                                        >
                                          Ver información del Promotor
                                        </Button>
                                      </Grid>
                                    </>
                                  )}
                                </Grid>
                              </Box>
                            </Paper>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
      {(errorToLoad ||
        (properData && (!properData.isEnabled || !properData.isActive))) && (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={11} md={10}>
            <EmptyMessageContainer>
              <Picture src={EmptyProperties} />
              Lo sentimos, el promotor ha dado de baja este inmueble.
            </EmptyMessageContainer>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

const EmptyMessageContainer = styled(Paper)({
  padding: '20px',
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
  color: '#e2ddfe',
  fontWeight: 'bold',
  fontSize: '1.1em',
  background: '#fff',
});

const Picture = styled('img')({
  width: '110px',
  marginBottom: '50px',
});
