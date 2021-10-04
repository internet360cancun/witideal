/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import firebase from "../../firebase";
import sessionContext from "../../contexts/sessionContext";
import { useParams } from "react-router-dom";
import ContactCard from "../ContactCard/contactCard";
import ContactsPropertyCard from "../ContactsPropertyCard/contactsPropertyCard";
import { Skeleton } from "@material-ui/lab";
import Head from "../head";

const Container = styled(Grid)({
  backgroundColor: "#f9f7fc",
  minHeight: "90vh",
  marginTop: "72px",
  boxSizing: "border-box",
  padding: "20px",
});

const Title = styled(Typography)({
  color: "#1E0E6F",
  textAlign: "center",
  fontWeight: "700",
  padding: "20px 0px",
});

const ContainerSkeleton = styled(Grid)({
  padding: "20px",
});

const ContactSkeleton = () => (
  <ContainerSkeleton container spacing={1} alignItems="center">
    <Grid item xs={3}>
      <Skeleton variant="circle" width={60} height={60} />
    </Grid>
    <Grid item xs={9}>
      <Skeleton variant="text" height={30} />
      <Skeleton variant="text" height={30} />
    </Grid>
  </ContainerSkeleton>
);

const ContactCardSkeleton = () => (
  <Grid container>
    <Grid md={12} xs={false} item>
      <Skeleton variant="rect" height={150} />
    </Grid>
    <Grid md={12} xs={12} item>
      <Skeleton variant="text" height={30} />
      <Skeleton variant="text" height={30} />
      <Skeleton variant="text" height={30} />
    </Grid>
  </Grid>
);

const ContainerMessage = styled(Grid)({
  minHeight: "400px",
  color: "#cdcdcd",
});

const ContactsList = () => {
  const [items, setItems] = useState("loading"); //loading || [] || null
  const [property, setProperty] = useState(null);
  const session = useContext(sessionContext);
  const { propertyid, notificationid } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [propertyid, notificationid]);

  useEffect(() => {
    const unsubscribe = firebase.property.onContactsChange(
      session.uId,
      propertyid
    )((data) => {
      setItems(data);
    });
    return () => unsubscribe();
  }, [propertyid, notificationid]);
  useEffect(() => {
    const getData = async () => {
      const data = await firebase.property.getData(session.uId, propertyid);
      setProperty({ ...data.data(), _id: data.id });
    };
    getData();
  }, [propertyid, notificationid]);

  const reOrderElements = (arrayOfElements) => {
    const extracted = arrayOfElements.filter(
      (contact) => contact.uId === notificationid
    )[0];
    const other_elements = arrayOfElements.filter(
      (contact) => contact.uId !== notificationid
    );
    if (extracted) extracted.current = true;
    return extracted ? [extracted, ...other_elements] : other_elements;
  };

  if (notificationid && Array.isArray(items) && items.length > 0) {
    var reOrderedElements = reOrderElements(items);
  } else {
    var reOrderedElements = items;
  }

  return (
    <Container container justify="center" alignItems="stretch">
      <Head title="Mis contactos" />
      <Grid item xs={12} lg={10}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12}>
            <Title variant="h4">Mis contactos</Title>
          </Grid>
          <Grid item sm={8} md={3} xs={12}>
            {property && <ContactsPropertyCard properData={property} />}
            {!property && <ContactCardSkeleton />}
          </Grid>
          <Grid item xs={12} md={9}>
            {Array.isArray(reOrderedElements) && (
              <Grid container alignContent="stretch">
                {reOrderedElements.map((item) => (
                  <Grid item sm={6} xs={12} key={item._id}>
                    <ContactCard {...item} />
                  </Grid>
                ))}
              </Grid>
            )}
            {reOrderedElements === null && (
              <ContainerMessage
                container
                alignContent="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <Typography variant="h4">Aún no tienes contactos</Typography>
                </Grid>
              </ContainerMessage>
            )}
            {reOrderedElements === "loading" && (
              <Grid container alignContent="stretch">
                <Grid item sm={6} xs={12}>
                  <ContactSkeleton />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <ContactSkeleton />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <ContactSkeleton />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <ContactSkeleton />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <ContactSkeleton />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <ContactSkeleton />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactsList;
