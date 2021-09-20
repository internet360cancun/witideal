import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { enviroment } from '../constants/globalConstraints';
import { errorParser } from '../functions/errorParser';
import { useState } from 'react';
import { dollarValue } from '../assets/Strings';
import constExchangeCredentials from '../helpers/const_exchange_credentials';
import analytics from 'react-ga';
import { isProduction } from '../constants/globalConstraints';

const axios = require('axios');

const firebaseConfig =
  enviroment === 'production'
    ? {
        apiKey: 'AIzaSyCVzD2DnsLYxkD5sNF_IOSF24h5r6JiR9o',
        authDomain: 'witideal-b1f99.firebaseapp.com',
        databaseURL: 'https://witideal-b1f99.firebaseio.com',
        projectId: 'witideal-b1f99',
        storageBucket: 'witideal-b1f99.appspot.com',
      }
    : {
        apiKey: 'AIzaSyB_HmbrEBAP9ZZp880VkGZyyNvaLAW_nPY',
        authDomain: 'witideal-develop.firebaseapp.com',
        databaseURL: 'https://witideal-develop.firebaseio.com',
        projectId: 'witideal-develop',
        storageBucket: 'witideal-develop.appspot.com',
      };
firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = 'es_419';
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

function useFirebaseTools() {
  const [ObjUpd, setObjUpd] = useState(false);
  const [loadedImages, setloadedImages] = useState([]);
  const [recaptchaVerifier, setrecaptchaVerifier] = useState(undefined);

  const nLog = async (email, pass) => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      let result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, pass);
      let Snapshot = await firebase
        .firestore()
        .collection('production')
        .doc('Users')
        .collection(firebase.auth().currentUser.uid)
        .doc('generalInfo')
        .get();
      if (Snapshot.exists) {
        if (Snapshot.data().isRegisterComplete) {
          return { isRegisterComplete: true };
        } else {
          return { isRegisterComplete: false };
        }
      } else {
        return { isRegisterComplete: false };
      }
    } catch (error) {
      return errorParser(error);
    }
  };

  const gLog = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithPopup(provider);

      let Snapshot = await firebase
        .firestore()
        .collection('production')
        .doc('Users')
        .collection(firebase.auth().currentUser.uid)
        .doc('generalInfo')
        .get();

      if (Snapshot.exists) {
        if (Snapshot.data().isRegisterComplete) {
          return { isRegisterComplete: true };
        } else {
          return { isRegisterComplete: false };
        }
      } else {
        return { isRegisterComplete: false };
      }
      // ...
    } catch (error) {
      // Handle Errors here.
      return errorParser(error);
    }
  };

  const fLog = async () => {
    try {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('email');
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithPopup(provider);

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //setToken(result.credential.accessToken);
      // The signed-in user info.
      //setUser(result.user);
      // ...
      //setUId(firebase.auth().currentUser.uid)
      let Snapshot = await firebase
        .firestore()
        .collection('production')
        .doc('Users')
        .collection(firebase.auth().currentUser.uid)
        .doc('generalInfo')
        .get();
      console.log('Snapshot.data()', Snapshot.data());
      if (Snapshot.exists) {
        if (Snapshot.data().isRegisterComplete) {
          return { isRegisterComplete: true };
        } else {
          return { isRegisterComplete: false };
        }
      } else {
        return { isRegisterComplete: false };
      }
      // ...
    } catch (error) {
      // Handle Errors here.
      return errorParser(error);
    }
  };

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log('loggedOut');
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  const fbRegister = async function (email, password, displayName) {
    try {
      let user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      //post to firestore
      await user.user.updateProfile({
        displayName: displayName,
      });
      return user;
    } catch (error) {
      return errorParser(error);
    }
  };

  const linkPhone = (phonenoprefix) => {
    let phone = `+52${phonenoprefix}`;
    console.log('recaptchaVerifier', recaptchaVerifier);
    if (recaptchaVerifier === undefined) {
      let captchaVerifier = new firebase.auth.RecaptchaVerifier('capcha', {
        size: 'invisible',
        callback: function (response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('response', response);
          setrecaptchaVerifier(captchaVerifier);
        },
      });
      return firebase
        .auth()
        .currentUser.linkWithPhoneNumber(phone, captchaVerifier)
        .then((result) => {
          //var vCode = window.prompt('Provide your SMS code');
          //return result.confirm(vCode);
          return result;
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log('error in linking', error);
          return errorParser(error);
        });
    } else {
      return firebase
        .auth()
        .currentUser.linkWithPhoneNumber(phone, recaptchaVerifier)
        .then((result) => {
          //var vCode = window.prompt('Provide your SMS code');
          //return result.confirm(vCode);
          return result;
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log('error in linking', error);
          return errorParser(error);
        });
    }
  };

  const registerFirestoreUsr = async (uid, obj) => {
    try {
      await db.doc(`production/Users/${uid}/generalInfo`).set(obj);
      return { status: 'Exito' };
    } catch (error) {
      return errorParser(error);
    }
  };

  // deprecated, this function has been rewrited by @armandojes
  const updateProperty = async (
    oldPropertyData,
    remainingImages,
    urlsToRemove,
    photoSections,
    obj,
    setOpen
  ) => {
    try {
      let urlep = `https://us-central1-witideal-${
        enviroment === 'production' ? 'b1f99' : 'develop'
      }.cloudfunctions.net/chargeUpdate`;
      console.log('oldPropertyData', oldPropertyData);
      //transform oldPropertyData into the new one by merging the new photo fields
      delete oldPropertyData.photos;
      oldPropertyData.photos = {}; //hard reset
      let avoidPFP = false;
      console.log('cleanformatedProperData', oldPropertyData);
      //get the section arrays into the old data
      Object.keys(remainingImages).forEach((key) => {
        if (key === 'principalPhotoPath') {
          avoidPFP = true; //pfp not edited no need to upload paps
        } else {
          oldPropertyData.photos[key] = remainingImages[key];
        }
      });
      let propId = obj.pId,
        uId = obj.uId;
      //update firestore document (property)
      await db
        .doc(`production/Users/${uId}/properties/ownedProperties/${propId}`)
        .update(oldPropertyData);
      setObjUpd(() => true);
      //charge for the update?
      if (!oldPropertyData.isPaid) {
        console.log('charge the update');
        axios
          .post(urlep, obj)
          .then((res) => {
            //do we upload principal foto?
            if (avoidPFP) {
              console.log('Avoided PFP');
              if (Object.keys(photoSections).length > 0) {
                uploadSecondaryImages(photoSections, propId, uId);
              } else {
                setOpen(false);
              }
            } else {
              let photoArray = Object.entries(
                photoSections['principalPhotoPath']
              );
              console.log('photoArray', photoArray);
              let photoname = photoArray[0][0];
              console.log('photoname', photoname);
              let photo = photoSections['principalPhotoPath'][photoname];
              console.log('photo', photo);
              let path = `witideal/${uId}/${propId}/${photoname}`,
                uploadTask = storageRef.child(path).put(photo);
              //observer
              let unsub = uploadTask.on(
                'state_changed',
                (snapshotImg) => {
                  let progress =
                    (snapshotImg.bytesTransferred / snapshotImg.totalBytes) *
                    100;
                  return console.log('progress', progress);
                },
                (error) => {
                  console.log('error', error);
                  setloadedImages([
                    ...loadedImages,
                    { name: photoname, completed: false },
                  ]);
                },
                //success
                () => {
                  setloadedImages([
                    ...loadedImages,
                    { name: photo.name, completed: true },
                  ]);
                  let route = `https://firebasestorage.googleapis.com/v0/b/witideal-${
                    enviroment === 'production' ? 'b1f99' : 'develop'
                  }.appspot.com/o/witideal%2F${uId}%2F${propId}%2Fthumb%401100_${
                    uploadTask.snapshot.metadata.name
                  }?alt=media`;
                  db.doc(
                    `production/Users/${uId}/properties/ownedProperties/${propId}`
                  )
                    .update({
                      principalPhotoPath: route,
                    })
                    .then(() => {
                      delete photoSections['principalPhotoPath'];
                      uploadSecondaryImages(photoSections, propId, uId);
                      return unsub();
                    })
                    .catch((err) => {
                      return errorParser(err);
                    });
                }
              );
            }
          })
          .catch((err) => {
            console.log('err', err);
            return errorParser(err);
          });
      } else {
        //do we upload principal foto?
        if (avoidPFP) {
          console.log('Avoided PFP');
          if (Object.keys(photoSections).length > 0) {
            uploadSecondaryImages(photoSections, propId, uId);
          } else {
            setOpen(false);
          }
        } else {
          let photoArray = Object.entries(photoSections['principalPhotoPath']);
          console.log('photoArray', photoArray);
          let photoname = photoArray[0][0];
          console.log('photoname', photoname);
          let photo = photoSections['principalPhotoPath'][photoname];
          console.log('photo', photo);
          let path = `witideal/${uId}/${propId}/${photoname}`,
            uploadTask = storageRef.child(path).put(photo);
          //observer
          let unsub = uploadTask.on(
            'state_changed',
            (snapshotImg) => {
              let progress =
                (snapshotImg.bytesTransferred / snapshotImg.totalBytes) * 100;
              return console.log('progress', progress);
            },
            (error) => {
              console.log('error', error);
              setloadedImages([
                ...loadedImages,
                { name: photoname, completed: false },
              ]);
            },
            //success
            () => {
              setloadedImages([
                ...loadedImages,
                { name: photo.name, completed: true },
              ]);
              let route = `https://firebasestorage.googleapis.com/v0/b/witideal-${
                enviroment === 'production' ? 'b1f99' : 'develop'
              }.appspot.com/o/witideal%2F${uId}%2F${propId}%2Fthumb%401100_${
                uploadTask.snapshot.metadata.name
              }?alt=media`;
              db.doc(
                `production/Users/${uId}/properties/ownedProperties/${propId}`
              )
                .update({
                  principalPhotoPath: route,
                })
                .then(() => {
                  delete photoSections['principalPhotoPath'];
                  uploadSecondaryImages(photoSections, propId, uId);
                  return unsub();
                })
                .catch((err) => {
                  return errorParser(err);
                });
            }
          );
        }
      }
      //delete photos
      urlsToRemove.forEach((url) => {
        let fileRef = storage.refFromURL(url);
        return fileRef.delete().catch((err) => {
          return console.log('err', err);
        });
      });
    } catch (error) {
      console.log('error updateprop', error);
      return errorParser(error);
    }
  };

  const uploadProperty = async (property, photoSections) => {
    try {
      // snapshot = created firestore document (property)
      let uId = property.uId,
        snapshot = await db
          .collection(`production/Users/${uId}/properties/ownedProperties`)
          .add(property),
        propId = snapshot.id;

      //uploading principal photo
      let photoArray = Object.entries(photoSections['principalPhotoPath']);
      console.log('photoArray', photoArray);
      let photoname = photoArray[0][0];
      console.log('photoname', photoname);
      let photo = photoSections['principalPhotoPath'][photoname];
      console.log('photo', photo);
      let path = `witideal/${uId}/${propId}/${photoname}`,
        uploadTask = storageRef.child(path).put(photo);
      //observer
      let unsub = uploadTask.on(
        'state_changed',
        (snapshotImg) => {
          let progress =
            (snapshotImg.bytesTransferred / snapshotImg.totalBytes) * 100;
          return console.log('progress', progress);
        },
        (error) => {
          console.log('error', error);
          setloadedImages([
            ...loadedImages,
            { name: photoname, completed: false },
          ]);
        },
        //success
        () => {
          setloadedImages([
            ...loadedImages,
            { name: photo.name, completed: true },
          ]);
          let route = `https://firebasestorage.googleapis.com/v0/b/witideal-${
            enviroment === 'production' ? 'b1f99' : 'develop'
          }.appspot.com/o/witideal%2F${uId}%2F${propId}%2Fthumb%401100_${
            uploadTask.snapshot.metadata.name
          }?alt=media`;
          db.doc(`production/Users/${uId}/properties/ownedProperties/${propId}`)
            .update({
              principalPhotoPath: route,
            })
            .then(() => {
              delete photoSections['principalPhotoPath'];
              uploadSecondaryImages(photoSections, propId, uId);
              return unsub();
            })
            .catch((err) => {
              return errorParser(err);
            });
        }
      );
    } catch (error) {
      console.log('error uploadprop', error);
      return errorParser(error);
    }
  };

  //set profile picture
  const setProfPic = async (file, uId) => {
    try {
      let path = `witideal/${uId}/${file.name}`,
        snapshotImg = storageRef.child(path).put(file),
        unsub = snapshotImg.on(
          'state_changed',
          (snapshotImg) => {
            let progress =
              (snapshotImg.bytesTransferred / snapshotImg.totalBytes) * 100;
            return console.log('progress', progress);
          },
          (error) => {
            console.log('error', error);
            return errorParser(error);
          },
          () => {
            let route = `https://firebasestorage.googleapis.com/v0/b/witideal-${
              enviroment === 'production' ? 'b1f99' : 'develop'
            }.appspot.com/o/witideal%2F${uId}%2Fthumb%401100_${
              snapshotImg.snapshot.metadata.name
            }?alt=media`;
            db.doc(`production/Users/${uId}/generalInfo`)
              .set({ photo: route }, { merge: true })
              .then(() => {
                unsub();
                return { status: 'Éxito' };
              })
              .catch((err) => {
                return errorParser(err);
              });
          }
        );
    } catch (error) {
      return errorParser(error);
    }
  };

  const uploadSecondaryImages = (photoSections, propId, uId) => {
    // iterate each section of the property that contains image data files (file objects)
    for (var section in photoSections) {
      let acceptedFiles = photoSections[section]; //obtaining the array of images
      //console.log(acceptedFiles)
      for (var file in acceptedFiles) {
        let imageFile = acceptedFiles[file];
        let path = `witideal/${uId}/${propId}/${section}/${imageFile.name}`;
        let snapshotImg = storageRef.child(path).put(imageFile);
        let unsub = snapshotImg.on(
          'state_changed',
          (snapshotImg) => {
            let progress =
              (snapshotImg.bytesTransferred / snapshotImg.totalBytes) * 100;
            return console.log('progress', progress);
          },
          (error) => {
            console.log('error', error);
            setloadedImages([
              ...loadedImages,
              { name: imageFile.name, completed: false },
            ]);
          },
          //success
          () => {
            let returnedSectionParts =
              snapshotImg.snapshot.ref.location.path.split('/');
            let newSection =
              returnedSectionParts[returnedSectionParts.length - 2];
            let route = `https://firebasestorage.googleapis.com/v0/b/witideal-${
              enviroment === 'production' ? 'b1f99' : 'develop'
            }.appspot.com/o/witideal%2F${uId}%2F${propId}%2F${newSection}%2Fthumb%401100_${
              snapshotImg.snapshot.metadata.name
            }?alt=media`;
            db.doc(
              `production/Users/${uId}/properties/ownedProperties/${propId}`
            )
              .update({
                [`photos.${newSection}`]:
                  firebase.firestore.FieldValue.arrayUnion(route),
              })
              .then(() => {
                setloadedImages([
                  ...loadedImages,
                  { name: imageFile.name, completed: true },
                ]);
                return unsub();
              })
              .catch((err) => {
                return errorParser(err);
              });
          }
        );
      }
    }
  };

  //Enable / disable property
  const toggleEnable = async (enabled, propId, uId) => {
    try {
      await db
        .doc(`production/Users/${uId}/properties/ownedProperties/${propId}`)
        .update({ isEnabled: enabled });
      console.log('ocurrio');
      return { status: 'Éxito' };
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  // const uploadImage = async (file, name, uId, propId, section) => {
  //     console.log('section upload:', section)
  //     console.log('name upload:', name)
  //     const path = section === 'principalPhotoPath' ? `witideal/${uId}/${propId}/${name}` : `witideal/${uId}/${propId}/${section}/${name}`
  //     return await storageRef.child(path)
  //         .put(file)
  // }

  //Credential exchange
  const credentialEx = async (
    uId,
    promoter,
    propId,
    promId,
    userObj,
    gender,
    action,
    priceMxn
  ) => {
    console.log(
      'params exchange credemtial *******',
      uId,
      promoter,
      propId,
      promId,
      userObj,
      gender,
      action,
      priceMxn
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      if (uId === promId) {
        //if he clicks his own prop send him to ownedprop modal
        return { sendTo: 'ownedProperty' };
      }
      const propertyDoc = await db
        .doc(`production/witideal/genders/${gender}/${action}/${propId}`)
        .get(); //get property docsnapshot
      const shares = await propertyDoc.get('sharesCom');
      if (promoter && !shares) {
        return { sendTo: 'notShared' };
      }
      await db
        .doc(
          `production/Users/${promId}/properties/ownedProperties/${propId}/InterestedUsers/${uId}`
        )
        .set({ uId: uId, ...userObj }); //set Interest
      const promoDoc = await db
        .doc(`production/Users/${promId}/generalInfo`)
        .get();
      if (isProduction) {
        analytics.event({
          category: promId,
          action: 'consumption of witicoins',
          label: 'exchange credentials',
          value: constExchangeCredentials(priceMxn, action),
        });
        analytics.event({
          category: uId,
          action: 'user interested property',
          label: 'get credentials',
          value: constExchangeCredentials(priceMxn, action),
        });
        console.log(constExchangeCredentials(priceMxn, action));
      }
      return promoDoc.data();
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  //Get user's properties
  const getUserProperties = async (uId) => {
    try {
      let properties = await db
        .collection(`production/Users/${uId}/properties/ownedProperties`)
        .get();
      console.log('properties', properties);
      return properties;
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  //Get user's properties paginated
  //deprecated has been rewited by @armandojes
  const getPaginatedUserProperties = async (uId, lastDoc, filterObj, limit) => {
    if (filterObj.priceMxnMin === null) filterObj.priceMxnMin = 0;

    try {
      //Adding Filters
      let money = false;
      let query = db.collection(
        `production/Users/${uId}/properties/ownedProperties`
      );
      if (!filterObj.action) {
        query = query.where('action', '==', filterObj.action);
      }
      if (!filterObj.propertyType) {
        query = query.where('propertyType', '==', filterObj.propertyType);
      }
      if (filterObj.isEnabled !== null && filterObj.isEnabled !== undefined) {
        query = query.where('isEnabled', '==', filterObj.isEnabled);
      }
      if (filterObj.isPaid !== null && filterObj.isPaid !== undefined) {
        query = query.where('isPaid', '==', filterObj.isPaid);
      }

      query = query.where('priceMxn', '>=', filterObj.priceMxnMin);

      if (
        filterObj.priceMxnMax !== null &&
        filterObj.priceMxnMax !== undefined &&
        filterObj.priceMxnMax > filterObj.priceMxnMin
      ) {
        query = query.where('priceMxn', '<=', filterObj.priceMxnMax);
        money = true;
      }

      query = query.orderBy('priceMxn', 'desc');
      query = query.orderBy('uploadDate', 'desc');
      console.log('query:', query);

      if (lastDoc !== null || lastDoc !== undefined) {
        query = query.startAfter(lastDoc);
      }

      query = query.limit(limit);
      let properties = await query.get();
      console.log('properties', properties);
      let newLastDoc = properties.docs[properties.docs.length - 1];
      return { properties: properties.docs, lastDoc: newLastDoc };
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  //Get user's properties paginated
  const getPaginatedUserPropertiesTesting = async (
    uId,
    lastDoc,
    filterObj,
    limit
  ) => {
    console.log(limit);
    // if (filterObj.priceMxnMin === null) filterObj = {...filterObj, priceMxnMin: 0}
    console.log('uId,lastDoc,filterObj,limit', uId, lastDoc, filterObj, limit);
    try {
      //Adding Filters
      let query = db.collection(
        `production/Users/${uId}/properties/ownedProperties`
      );
      if (filterObj.action) {
        console.log('action');
        query = query.where('action', '==', filterObj.action);
      }
      if (filterObj.propertyType) {
        query = query.where('propertyType', '==', filterObj.propertyType);
        console.log('propertuType');
      }
      if (filterObj.isEnabled !== null && filterObj.isEnabled !== undefined) {
        query = query.where('isEnabled', '==', filterObj.isEnabled);
        console.log('isenable');
      }
      if (filterObj.isPaid !== null && filterObj.isPaid !== undefined) {
        query = query.where('isPaid', '==', filterObj.isPaid);
        console.log('isPaid');
      }
      // if (filterObj.priceMxnMax) {
      //     query = query.where('priceMxn', '<=', filterObj.priceMxnMax)
      // }
      // if (filterObj.priceMxnMin){
      //     query = query.where('priceMxn', '>=', filterObj.priceMxnMin)
      //     query = query.orderBy('priceMxn', 'desc')
      // }else {
      //     query = query.orderBy("uploadDate", 'desc')
      // }

      if (filterObj.priceMxnMin) {
        query = query.where('priceMxn', '>=', filterObj.priceMxnMin);
        console.log('Entre en if price');
      }
      if (filterObj.priceMxnMax) {
        console.log('Entre en if maxprice');
        if (filterObj.priceMxnMin) {
          console.log('entre en el if max min');
          if (filterObj.priceMxnMax > filterObj.priceMxnMin) {
            console.log('entre en el if max mayor que min');
            query = query.where('priceMxn', '<=', filterObj.priceMxnMax);
          }
        } else {
          console.log('entre en el if max sin min');
          query = query.where('priceMxn', '<=', filterObj.priceMxnMax);
        }
      }

      if (lastDoc !== null && lastDoc !== undefined) {
        console.log('entre en el if last doc');
        query = query
          .orderBy('priceMxn', 'desc')
          .orderBy('uploadDate', 'desc')
          .limit(limit)
          .startAfter(lastDoc);
      } else {
        console.log('entre en el else last doc');
        query = query
          .orderBy('priceMxn', 'desc')
          .orderBy('uploadDate', 'desc')
          .limit(limit);
      }

      console.log('----------', query);
      let properties = await query.get();
      let newLastDoc = properties.docs[properties.docs.length - 1];
      return { properties: properties, lastDoc: newLastDoc };
    } catch (error) {
      console.log('error', error);
      errorParser(error);
      return { properties: null, lastDoc: null };
    }
  };

  //Get user's contacts paginated
  const getPaginatedUserContacts = async (uId, lastDoc, limit) => {
    try {
      let query = db.collection(
        `production/Users/${uId}/properties/InterestedUsers`
      );
      if (lastDoc !== null || lastDoc !== undefined) {
        query = query.startAfter(lastDoc);
      }
      query = query.limit(limit);
      let contacts = await query.get();
      console.log('contacts', contacts);
      let newLastDoc = contacts.docs[contacts.docs.length - 1];
      return { contacts: contacts.docs, lastDoc: newLastDoc };
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  //Get user's contacts
  const getUserContacts = async (uId) => {
    try {
      let contacts = await db
        .collection(`production/Users/${uId}/properties/InterestedUsers`)
        .get();
      console.log('contacts', contacts);
      return contacts;
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  const setDest = async (pId, gender, action, uId) => {
    try {
      const docRef = db.doc(`production/Users/${uId}/properties/`);
      const propDocRef = db.doc(
        `production/witideal/genders/${gender}/${action}/${pId}`
      );
      return await docRef.set(
        {
          destProperties: firebase.firestore.FieldValue.arrayUnion(propDocRef),
        },
        { merge: true }
      );
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  //get Fav properties uses uId to retrieve an array of propertyDocumentReferences
  const getDest = async (uId) => {
    try {
      const docSnap = await db
        .doc(`production/Users/${uId}/properties/`)
        .get()
        .then((snapshot) => {
          let temp2 = snapshot.data();
          temp2.destProperties.forEach((element) => {
            element.get().then((snap) => {
              console.log(snap.data().action, 'snap.data');
            });
          });
        });
    } catch (error) {
      console.log('error', error);
      errorParser(error);
      return undefined;
    }
  };

  //Set property as fav
  const setFav = async (pId, gender, action, uId) => {
    try {
      const docRef = db.doc(`production/Users/${uId}/properties/`);
      const propDocRef = db.doc(
        `production/witideal/genders/${gender}/${action}/${pId}`
      );
      return await docRef.set(
        { favProperties: firebase.firestore.FieldValue.arrayUnion(propDocRef) },
        { merge: true }
      );
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  //Remove property from fav
  // deprecated do not use
  const delFav = async (gender, action, pId, uId) => {
    try {
      const docRef = db.doc(`production/Users/${uId}/properties/`);
      const propDocRef = db.doc(
        `production/witideal/genders/${gender}/${action}/${pId}`
      );
      return await docRef.set(
        {
          favProperties: firebase.firestore.FieldValue.arrayRemove(propDocRef),
        },
        { merge: true }
      );
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  //get Fav properties uses uId to retrieve an array of propertyDocumentReferences
  const getFavs = async (uId) => {
    try {
      const docSnap = await db.doc(`production/Users/${uId}/properties/`).get();
      return docSnap.get('favProperties');
    } catch (error) {
      console.log('error', error);
      errorParser(error);
      return undefined;
    }
  };

  const getSpecificProperty = (uId, pId) => {
    const propertyRef = db.doc(
      `production/Users/${uId}/properties/ownedProperties/${pId}`
    );
    return propertyRef.get();
  };

  const getSpecificDestProperty = (uId, pId) => {
    const propertyRef = db.doc(
      `production/Users/${uId}/properties/destProperties/${pId}`
    );
    return propertyRef.get();
  };

  const getSpecificSearchProperty = (action, gender, pId) => {
    const propertyRef = db.doc(
      `production/witideal/genders/${gender}/${action}/${pId}`
    );
    return propertyRef.get();
  };

  const getDestProperties = async (
    currency,
    action,
    gender,
    minPrice,
    maxPrice,
    adminarea1,
    adminarea23,
    sublocality,
    notBankSale
  ) => {
    try {
      let query = setQuery(
        currency,
        action,
        gender,
        minPrice,
        maxPrice,
        sublocality,
        adminarea23,
        adminarea1,
        notBankSale
      );
      console.log('query de búsqueda', query);
      let result = await query.get();
      if (result.size === 0) {
        query = setQuery(
          currency,
          action,
          gender,
          minPrice,
          maxPrice,
          null,
          adminarea23,
          adminarea1,
          notBankSale
        );
        return await query.get();
      } else {
        return result;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getProperties = async (
    currency,
    action,
    gender,
    minPrice,
    maxPrice,
    adminarea1,
    adminarea23,
    sublocality,
    notBankSale
  ) => {
    try {
      let query = setQuery(
        currency,
        action,
        gender,
        minPrice,
        maxPrice,
        sublocality,
        adminarea23,
        adminarea1,
        notBankSale
      );
      console.log('query de búsqueda', query);
      let result = await query.get();
      if (result.size === 0) {
        query = setQuery(
          currency,
          action,
          gender,
          minPrice,
          maxPrice,
          null,
          adminarea23,
          adminarea1,
          notBankSale
        );
        return await query.get();
      } else {
        return result;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const isNullOrEmpty = (string) => {
    return !string;
  };

  //Delete property
  const delProp = async (uId, pId) => {
    console.log('props', uId, pId);
    try {
      const propertyRef = db.doc(
        `production/Users/${uId}/properties/ownedProperties/${pId}`
      );
      await propertyRef.delete();
      return true;
    } catch (error) {
      errorParser(error);
      return false;
    }
  };

  //getInterestedUsers from property
  const getInterested = async (uId, pId) => {
    try {
      let userDocs = [];
      const querySnap = await db
        .collection(
          `production/Users/${uId}/properties/ownedProperties/${pId}/InterestedUsers`
        )
        .get();
      if (querySnap.empty) {
        return userDocs;
      } else {
        querySnap.forEach(async (doc) => {
          let userQuerySnap = await db
            .doc(`production/Users/${doc.id}/generalInfo`)
            .get();
          userDocs.push(userQuerySnap.data());
        });
      }
      return userDocs;
    } catch (error) {
      return errorParser(error);
    }
  };

  const hardCodedSetQuery = (
    action,
    gender,
    minPrice,
    maxPrice,
    sublocality_level_1,
    administrative_area_level_2_3,
    administrative_area_level_1,
    notBankSale
  ) => {
    const propertyRef = db.collection(
      `production/witideal/genders/${gender}/${action}`
    );
    return propertyRef;
  };

  const setQuery = (
    currency,
    action,
    gender,
    minPrice,
    maxPrice,
    sublocality_level_1,
    administrative_area_level_2_3,
    administrative_area_level_1,
    notBankSale
  ) => {
    // calculate mxn price if currency is USD
    var minPriceMxn =
      !!minPrice && currency === 'USD' ? minPrice * dollarValue : minPrice;
    var maxPriceMxn =
      !!maxPrice && currency === 'USD' ? maxPrice * dollarValue : maxPrice;

    let query = db
      .collection(`production/witideal/genders/${gender}/${action}`)
      .where('isActive', '==', true)
      .where('isEnabled', '==', true);
    if (!isNullOrEmpty(administrative_area_level_1))
      query = query.where(
        'administrative_area_level_1',
        '==',
        administrative_area_level_1
      );
    if (!isNullOrEmpty(sublocality_level_1)) {
      query = query.where('sublocality_level_1', '==', sublocality_level_1);
    } else {
      if (!isNullOrEmpty(administrative_area_level_2_3))
        query = query.where(
          'administrative_area_level_2_3',
          '==',
          administrative_area_level_2_3
        );
    }
    if (notBankSale) query = query.where('bankSale', '==', !notBankSale);
    if (minPriceMxn > 0) query = query.where('priceMxn', '>=', minPriceMxn);
    if (maxPriceMxn) query = query.where('priceMxn', '<=', maxPriceMxn);
    return query;
  };

  const getMovements = async (uId) => {
    try {
      const moviments = db
        .collection(`production/Users/${uId}/witiwallet/transactions`)
        .get();
      return await moviments;
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  const isMyFavorite = async (propertyId, userId) => {
    try {
      const docSnap = await db
        .doc(`production/Users/${userId}/properties/`)
        .get();
      const favs = docSnap.get('favProperties');
      const idFavs = favs.map((f) => f.id);
      return idFavs.includes(propertyId);
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  const getPaginatedLikedProperties = async (uId, limit, lastDoc) => {
    try {
      let query = db.collection(
        `production/Users/${uId}/properties/likedProperties`
      );
      if (lastDoc) query = query.startAfter(lastDoc);
      if (limit) query = query.limit(limit);
      const properties = await query.get();
      const newLastDoc = properties.docs[properties.docs.length - 1];
      return { items: properties, latestItem: newLastDoc };
    } catch (error) {
      console.log('error', error);
      return errorParser(error);
    }
  };

  return {
    isMyFavorite,
    getFavs,
    setDest,
    nLog,
    setFav,
    getDest,
    delFav,
    setProfPic,
    delProp,
    getInterested,
    getUserContacts,
    credentialEx,
    fLog,
    gLog,
    logOut,
    fbRegister,
    getSpecificDestProperty,
    firebase,
    linkPhone,
    toggleEnable,
    uploadProperty,
    updateProperty,
    loadedImages,
    getDestProperties,
    getProperties,
    getSpecificProperty,
    registerFirestoreUsr,
    getUserProperties,
    getMovements,
    getPaginatedUserProperties,
    getPaginatedUserPropertiesTesting,
    getPaginatedUserContacts,
    getSpecificSearchProperty,
    getPaginatedLikedProperties,
    ObjUpd,
  };
}

export default useFirebaseTools;
