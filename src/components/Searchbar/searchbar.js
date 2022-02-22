import "./searchbar.css";
import React, { useState } from "react";
import Geosuggest from "react-geosuggest";
const axios = require("axios");
const forbidenPoints = [
  "19.4326077,-99.133208", //cdmx
  "19.4968732,-99.72326729999999", //edomex
  "21.8853247,-102.2915131", //aguascalientes
  "21.8852562,-102.2915677", //aguascalientes aguascalientes
  "30.8406338,-115.2837585", // baja california n
  "26.0444446,-111.6660725", //baja califas s
  "19.8301251,-90.5349087", // campeche campeche
  "27.05867599999999,-101.7068294", //coahuila de zaragoza
  "28.6096792,-101.2092688", //coahuila coahuila
  "19.1222634,-104.0072348", // colima
  "19.2452342,-103.7240868", // colima col
  "16.7569318,-93.12923529999999", // chiapas
  "16.3224417,-91.7910619", //chiapas chiapas
  "28.6329957,-106.0691004", // chihuahua chihuahua
  "24.5592665,-104.6587821", // durango
  "24.0277202,-104.6531759", //durango durango
  "20.9170187,-101.1617356", // guanajuato
  "21.0190145,-101.2573586", //guanajuato gto
  "17.4391926,-99.54509739999999", //guerrero
  "20.0910963,-98.7623874", //hidalgo
  "21.9911111,-103.2344444", //jalisco jalisco
  "20.6595382,-103.3494376", //jalisco
  "19.5665192,-101.7068294", // michoacan
  "18.6813049,-99.1013498", //morelos
  "18.6366815,-98.9590375", //morelos mor
  "21.7513844,-104.8454619", //nayarit
  "25.592172,-99.99619469999999", //nuevolion
  "23.4517121,-100.0352669", //nuevolion nl
  "17.0542297,-96.7132304", //oaxaca
  "17.0731842,-96.7265889", //oaxaca oax
  "19.0412894,-98.20620129999999", //puebla
  "19.0414398,-98.2062727", //puebla pue
  "20.5888184,-100.3898876", //queretaro
  "20.58879319999999,-100.3898881", // queretaro qro
  "19.1817393,-88.4791376", // quintana roo
  "22.1564699,-100.9855409", //sanluis potosi slp
  "22.1565651,-100.9854628", // San luis potosi
  "25.1721091,-107.4795173", //sinaloa
  "25.825701,-108.214302", //sinaloa sin
  "29.2972247,-110.3308814", //sonora
  "32.078611,-114.9649999", //sonora son
  "17.84091729999999,-92.6189273", //tabasco
  "24.26694,-98.8362755", // tamaulipas
  "19.3139243,-98.2404397", //tlaxcala tlax
  "19.318154,-98.2374954", // tlaxcala
  "19.173773,-96.1342241", //veracruz ver
  "19.2601605,-96.57833869999999", //veracruz
  "20.7098786,-89.0943377", //yucatan
  "22.7709249,-102.5832539", //zacatecas zac
  "22.7708555,-102.5832426", //zacatecas
];

export const Searchbar = (props) => {
  const [addressData, setAddressData] = useState({});

  const onSuggestSelect = async (suggest) => {
    // if (props.setIsLoading !== undefined) {
    //   props.setIsLoading(true);
    // }
    try {
      let zoom = 14;
      if (suggest !== undefined) {
        props.setIsLoading(false);
        suggest.gmaps.address_components.forEach((element) => {
          if (element.types.includes("street_number")) {
            addressData.street_number = element.short_name;
            if (17 > zoom) {
              zoom = 17;
            }
          } else if (element.types.includes("route")) {
            addressData.route = element.short_name;
            if (17 > zoom) {
              zoom = 17;
            }
          } else if (element.types.includes("sublocality_level_1")) {
            addressData.sublocality_level_1 = element.short_name;
          } else if (element.types.includes("locality")) {
            addressData.locality = element.short_name;
          } else if (element.types.includes("administrative_area_level_2")) {
            addressData.administrative_area_level_2_3 = element.short_name;
          } else if (element.types.includes("administrative_area_level_1")) {
            addressData.administrative_area_level_1 = element.short_name;
          } else if (element.types.includes("country")) {
            addressData.country = element.short_name;
          } else if (element.types.includes("postal_code")) {
            addressData.postal_code = element.short_name;
          } else if (element.types.includes("administrative_area_level_3")) {
            addressData.administrative_area_level_2_3 = element.short_name;
          }
        });
        if (addressData.sublocality_level_1 === undefined) {
          if (addressData.administrative_area_level_2_3 === undefined) {
            if (
              forbidenPoints.includes(
                `${suggest.location.lat},${suggest.location.lng}`
              )
            ) {
              //console.log('forbiden loc')
              setAddressData(addressData);
            } else {
              //console.log('no admin no subloca')
              let resp = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${suggest.location.lat},${suggest.location.lng}&result_type=sublocality_level_1&language=ES&key=AIzaSyAd22YBCutdzEZePBY2wbS2OawTZ1_H7-s`
              );
              if (resp.data) {
                if (resp.data.results.length > 0) {
                  resp.data.results[0].address_components.forEach((element) => {
                    if (element.types.includes("sublocality_level_1")) {
                      addressData.sublocality_level_1 = element.short_name;
                    } else if (
                      element.types.includes("administrative_area_level_3")
                    ) {
                      addressData.administrative_area_level_2_3 =
                        element.short_name;
                    } else if (
                      element.types.includes("administrative_area_level_2")
                    ) {
                      addressData.administrative_area_level_2_3 =
                        element.short_name;
                    }
                  });
                }
              }
              if (addressData.administrative_area_level_2_3 === undefined) {
                //console.log('still no admin')
                let resp = await axios.get(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${suggest.location.lat},${suggest.location.lng}&result_type=administrative_area_level_2|administrative_area_level_3&language=ES&key=AIzaSyAd22YBCutdzEZePBY2wbS2OawTZ1_H7-s`
                );
                if (resp.data) {
                  if (resp.data.results.length > 0) {
                    resp.data.results[0].address_components.forEach(
                      (element) => {
                        if (element.types.includes("sublocality_level_1")) {
                          addressData.sublocality_level_1 = element.short_name;
                        } else if (
                          element.types.includes("administrative_area_level_3")
                        ) {
                          addressData.administrative_area_level_2_3 =
                            element.short_name;
                        } else if (
                          element.types.includes("administrative_area_level_2")
                        ) {
                          addressData.administrative_area_level_2_3 =
                            element.short_name;
                        }
                      }
                    );
                  }
                }
              }
              // addressData.latLng={lat:suggest.location.lat,lng:suggest.location.lng}
              addressData.lat = suggest.location.lat;
              addressData.lng = suggest.location.lng;
              setAddressData(addressData);
            }
          } else {
            console.log("no subloca has admin 1-3");
            setAddressData(addressData);
          }
        } else {
          //console.log('has subloca')
          let resp = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${suggest.location.lat},${suggest.location.lng}&result_type=administrative_area_level_2|administrative_area_level_3&language=ES&key=AIzaSyAd22YBCutdzEZePBY2wbS2OawTZ1_H7-s`
          );
          //console.log('resp', resp)
          resp.data.results[0].address_components.forEach((element) => {
            if (element.types.includes("administrative_area_level_2")) {
              addressData.administrative_area_level_2_3 = element.short_name;
            } else if (element.types.includes("administrative_area_level_3")) {
              addressData.administrative_area_level_2_3 = element.short_name;
            }
            // addressData.latLng={lat:suggest.location.lat,lng:suggest.location.lng}
            addressData.lat = suggest.location.lat;
            addressData.lng = suggest.location.lng;
          });
          setAddressData(addressData);
        }
        if (props.getNewPos !== undefined) {
          props.getNewPos({ location: suggest.location, zoom: zoom }); //uses Prop location setter to extract location lat lng and zoom
        }
        if (props.getAddress !== undefined) {
          props.getAddress(addressData); //uses Prop Address setter to extract address data
        }
      } else {
        props.setIsLoading(false);
        setAddressData({});
      }
      console.dir(addressData);
    } catch (error) {
      props.setIsLoading(false);
      console.error("error in location", error);
      return error;
    }
  };

  return (
    <React.Fragment>
      <div className="form-group">
        <Geosuggest
          country="mx"
          types={["geocode"]}
          placeDetailFields={["address_components"]}
          queryDelay={730}
          minLength={4}
          inputClassName="form-control"
          onSuggestSelect={onSuggestSelect}
          placeholder="Ubicación"
          autoComplete="off"
        />
      </div>
    </React.Fragment>
  );
};
