import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const db = firebase.firestore();

export const myProperties = async (userId, lastDoc, filterObj, limit) => {
  const { isEnabled, action, propertyType, priceMxnMax, priceMxnMin } =
    filterObj;
  console.log(filterObj);
  try {
    let query = db.collection(
      `production/Users/${userId}/properties/ownedProperties`
    );
    if (filterObj.isEnabled !== null)
      query = query.where('isEnabled', '==', filterObj.isEnabled);

    if (!!filterObj.action)
      query = query.where('action', '==', filterObj.action);
    if (!!filterObj.propertyType)
      query = query.where('propertyType', '==', filterObj.propertyType);

    if (
      isEnabled === null &&
      !action &&
      !propertyType &&
      !priceMxnMax &&
      !priceMxnMin
    ) {
      query = query.orderBy('uploadDate', 'desc');
    }

    if (!!filterObj.priceMxnMax) {
      query = query.where('priceMxn', '<=', filterObj.priceMxnMax);
    }
    if (!!filterObj.priceMxnMin) {
      query = query.where('priceMxn', '>=', filterObj.priceMxnMin);
    }
    if (!!priceMxnMin || !!priceMxnMax) {
      query = query.orderBy('priceMxn', 'desc').orderBy('uploadDate', 'desc');
    }

    if (!!lastDoc) query = query.startAfter(lastDoc);
    if (!!limit) query = query.limit(limit);

    let properties = await query.get();
    let newLastDoc = properties.docs[properties.docs.length - 1];
    return { properties: properties, lastDoc: newLastDoc };
  } catch (error) {
    console.log('error', error);
    return { properties: null, lastDoc: null };
  }
};

// delete contacted
export const deleteLikedProperties = async (userId, documentId) => {
  try {
    await db
      .doc(
        `/production/Users/${userId}/properties/likedProperties/${documentId}`
      )
      .delete();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const update = async (userId, propertyId, data) => {
  try {
    const { _id, _ref, loading, ...property_data_to_save } = data;
    await db
      .doc(
        `production/Users/${userId}/properties/ownedProperties/${propertyId}`
      )
      .update(property_data_to_save);
    return propertyId;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const create = async (userId, data) => {
  try {
    const { _id, _ref, loading, ...property_data_to_save } = data;
    const snapshot = await db
      .collection(`production/Users/${userId}/properties/ownedProperties`)
      .add(property_data_to_save);
    return snapshot.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isMyFirstProperty = async (userId) => {
  try {
    let snapshot = await db.doc(`production/Users/${userId}/properties`).get();
    if (snapshot.exists && snapshot.data().firstProperty) return false;
    const result = await db
      .collection(`/production/Users/${userId}/properties/ownedProperties`)
      .limit(1)
      .get();
    console.log('result.size', result.size);
    if (result.size > 0) return false;
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const destProperties = async (userId, lastDoc, filterObj, limit) => {
  const { isEnabled, action, propertyType, priceMxnMax, priceMxnMin } =
    filterObj;
  console.log(filterObj);
  try {
    let query = db.collection(
      `production/Users/${userId}/properties/ownedProperties`
    );
    if (filterObj.isEnabled !== null)
      query = query.where('isEnabled', '==', filterObj.isEnabled);

    if (!!filterObj.action)
      query = query.where('action', '==', filterObj.action);
    if (!!filterObj.propertyType)
      query = query.where('propertyType', '==', filterObj.propertyType);

    if (
      isEnabled === null &&
      !action &&
      !propertyType &&
      !priceMxnMax &&
      !priceMxnMin
    ) {
      query = query.orderBy('uploadDate', 'desc');
    }

    if (!!filterObj.priceMxnMax) {
      query = query.where('priceMxn', '<=', filterObj.priceMxnMax);
    }
    if (!!filterObj.priceMxnMin) {
      query = query.where('priceMxn', '>=', filterObj.priceMxnMin);
    }
    if (!!priceMxnMin || !!priceMxnMax) {
      query = query.orderBy('priceMxn', 'desc').orderBy('uploadDate', 'desc');
    }

    if (!!lastDoc) query = query.startAfter(lastDoc);
    if (!!limit) query = query.limit(limit);

    let properties = await query.get();
    let newLastDoc = properties.docs[properties.docs.length - 1];
    return { properties: properties, lastDoc: newLastDoc };
  } catch (error) {
    console.log('error', error);
    return { properties: null, lastDoc: null };
  }
};

window.isMyFirstProperty = isMyFirstProperty;
