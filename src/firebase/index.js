import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import snapshotParser from '../helpers/snapshotParser';
// import api from '../api'

export const db = firebase.firestore();

const firebaseObject = {
  property: {
    onContactsChange: (userId, propertyId) => (handler) => {
      const query = db.collection(
        `/production/Users/${userId}/properties/ownedProperties/${propertyId}/InterestedUsers`
      );
      const unsubscribe = query.onSnapshot((snap) => {
        const data = snapshotParser(snap);
        Array.isArray(data) && data.length > 0 ? handler(data) : handler(null);
      });
      return unsubscribe;
    },
    getData: async (uId, pId) => {
      const propertyRef = db.doc(
        `production/Users/${uId}/properties/ownedProperties/${pId}`
      );
      const result = await propertyRef.get();
      return result;
    },
    /*
      @upload a new property
      @params: property's data && user id
      @return: id property created || false 
    */
    upload: async (property_data, user_id, property_id) => {
      console.log('data set into db', property_data);
      const { _id, _ref, loading, ...property_data_to_save } = property_data;
      try {
        // update property
        if (property_id) {
          await db
            .collection(
              `production/Users/${user_id}/properties/ownedProperties`
            )
            .doc(property_id)
            .set(property_data_to_save);
          return property_id;
        }

        // create new property
        const snapshot = await db
          .collection(`production/Users/${user_id}/properties/ownedProperties`)
          .add(property_data_to_save);
        return snapshot.id;
      } catch (error) {
        console.log('error_descript:', error);
        return false;
      }
    },
    uploadPictures:
      (user_id, property_id, array_of_pictures) =>
      async (onCunterUploadChange) => {
        const storageRef = firebase.storage().ref();
        const base_storage_url = `https://firebasestorage.googleapis.com/v0/b/`;
        var uploaded_counter = 0;
        const process = array_of_pictures.map((file) => {
          const file_name = file.name;
          const task = storageRef
            .child(`witideal/${user_id}/${property_id}/extras/${file_name}`)
            .put(file);
          task.on('state_changed', null, null, () => {
            const base_url_with_bucket = `${base_storage_url}${task.snapshot.metadata.bucket}/o/`;
            const photo_path_encoded = encodeURIComponent(
              `witideal/${user_id}/${property_id}/extras/thumb@1100_${file_name}`
            );
            const full_path_new_photo = `${base_url_with_bucket}${photo_path_encoded}?alt=media`;
            uploaded_counter = uploaded_counter + 1;
            db.doc(
              `production/Users/${user_id}/properties/ownedProperties/${property_id}`
            ).update({
              'photos.extras':
                firebase.firestore.FieldValue.arrayUnion(full_path_new_photo),
            });
            onCunterUploadChange(uploaded_counter);
          });
          return task;
        });
        return Promise.all(process);
      },
    updateRrlPictures: async (user_id, property_id, url_ordered_pictures) => {
      db.doc(
        `production/Users/${user_id}/properties/ownedProperties/${property_id}`
      ).update({
        'photos.extras': url_ordered_pictures,
      });
    },
    uploadPrincipalPhotoPath: async (user_id, property_id, file) => {
      try {
        const storageRef = firebase.storage().ref();
        const base_storage_url = `https://firebasestorage.googleapis.com/v0/b/`;
        const file_name = file.name;
        const result = await storageRef
          .child(`witideal/${user_id}/${property_id}/${file_name}`)
          .put(file);
        const base_url_with_bucket = `${base_storage_url}${result.metadata.bucket}/o/`;
        const photo_path_encoded = encodeURIComponent(
          `witideal/${user_id}/${property_id}/thumb@1100_${file_name}`
        );
        const full_path_new_photo = `${base_url_with_bucket}${photo_path_encoded}?alt=media`;
        await db
          .doc(
            `production/Users/${user_id}/properties/ownedProperties/${property_id}`
          )
          .update({
            principalPhotoPath: full_path_new_photo,
          });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    deletePhoto: async (user_id, property_id, url_file) => {
      try {
        var storageRef = firebase.storage().ref();
        console.log('deleting old photos ...');
        let name_old_photo = decodeURIComponent(url_file);
        name_old_photo = name_old_photo.split('/');
        name_old_photo = name_old_photo[name_old_photo.length - 1];
        name_old_photo = name_old_photo.split('?')[0];
        const path_to_delete = `witideal/${user_id}/${property_id}/extras/${name_old_photo}`;
        console.log('path_to_delete:', path_to_delete);
        await storageRef.child(path_to_delete).delete();
      } catch (error) {
        console.error('errorDescription:', error);
        return false;
      }
    },
    deletePrincipalPhotoPath: async (user_id, property_id, url_file) => {
      try {
        var storageRef = firebase.storage().ref();
        console.log('deleting old principal photo path ...');
        let name_old_photo = decodeURIComponent(url_file);
        name_old_photo = name_old_photo.split('/');
        name_old_photo = name_old_photo[name_old_photo.length - 1];
        name_old_photo = name_old_photo.split('?')[0];
        const path_to_delete = `witideal/${user_id}/${property_id}/${name_old_photo}`;
        console.log('path_to_delete:', path_to_delete);
        await storageRef.child(path_to_delete).delete();
      } catch (error) {
        console.error('errorDescription:', error);
        return false;
      }
    },
  },
  users: {
    getPayments: async (userId, startAfter, limit) => {
      try {
        let query = db
          .collection(`production/Users/${userId}/payments/charges`)
          .orderBy('chargeDate', 'desc');
        if (startAfter) query = query.startAfter(startAfter);
        if (limit) query = query.limit(limit);

        const snapshot = await query.get();
        const items = snapshotParser(snapshot);
        const latestItem = snapshot.docs[items.length - 1];
        return { items, latestItem };
      } catch (error) {
        return { items: [], latestItem: null };
      }
    },
    updateInfo: async (userId, data, newPhoto, oldPhoto) => {
      try {
        if (newPhoto) {
          delete data.password;
          delete data.new_password;
          delete data.re_new_password;

          console.log('updating photo ...');
          const photo_name = `picture_${Math.floor(Math.random() * 1000)}.png`;
          var storageRef = firebase.storage().ref();
          const response = await storageRef
            .child(`witideal/${userId}/${photo_name}`)
            .put(newPhoto);
          const base_storage_url = `https://firebasestorage.googleapis.com/v0/b/`;
          const base_url_with_bucket = `${base_storage_url}${response.metadata.bucket}/o/`;
          const photo_path_encoded = encodeURIComponent(
            `witideal/${userId}/thumb@1100_${photo_name}`
          );
          const full_path_new_photo = `${base_url_with_bucket}${photo_path_encoded}?alt=media`;
          data.photo = full_path_new_photo;
        }
        console.log('updating general info');
        await db.doc(`production/Users/${userId}/generalInfo`).update(data);
        // deleting old photo
        if (oldPhoto && newPhoto) {
          console.log('deleting old photo ...');
          let name_old_photo = decodeURIComponent(oldPhoto);
          name_old_photo = name_old_photo.split('/');
          name_old_photo = name_old_photo[name_old_photo.length - 1];
          name_old_photo = name_old_photo.split('?')[0];
          await storageRef
            .child(`witideal/${userId}/${name_old_photo}`)
            .delete();
        }
        return true;
      } catch (error) {
        console.error('____error_____:', error);
        return true;
      }
    },
    changeToPromoter: async (user_id) => {
      try {
        const data = { isPromoter: true };
        await db.doc(`production/Users/${user_id}/generalInfo`).update(data);
        return true;
      } catch (error) {
        console.error('error', error);
        return false;
      }
    },
    onFavoriteChange: (user_id) => (handler) => {
      const unsubscribe = db
        .doc(`production/Users/${user_id}/properties/`)
        .onSnapshot(async (snapshot) => {
          const favoriteReferences = snapshot.get('favProperties') || [];
          const favoriteSnapshots = await Promise.all(
            favoriteReferences.map((reference) => reference.get())
          );
          const favorites_snapshot_filtered = favoriteSnapshots.filter(
            (item) => item.exists
          );
          const favorites_data = favorites_snapshot_filtered.map((item) => {
            const data = item.data();
            data._id = item.id;
            data._ref = item.ref;
            return data;
          });
          const newFavoritesReferences = favorites_data.map(
            (item) => item._ref
          );
          if (newFavoritesReferences.length !== favoriteReferences.length) {
            db.doc(`production/Users/${user_id}/properties/`).update({
              favProperties: newFavoritesReferences,
            });
          }
          handler(favorites_data);
        });
      return unsubscribe;
    },
    updateFavorite: async (user_id, properties_references) => {
      const status = await db
        .doc(`production/Users/${user_id}/properties/`)
        .set({ favProperties: properties_references }, { merge: true });
    },
    onFavoriteChangeReferences: (user_id) => (handler) => {
      try {
        const unsubscribe = db
          .doc(`production/Users/${user_id}/properties/`)
          .onSnapshot((snapshot) => {
            const favorites_reference = snapshot.get('favProperties') || [];
            handler(favorites_reference);
          });
        return unsubscribe;
      } catch (error) {
        handler([]);
        return () => {};
      }
    },
    onDestChangeReferences: (user_id) => (handler) => {
      try {
        const unsubscribe = db
          .doc(`production/Users/${user_id}/properties/`)
          .onSnapshot((snapshot) => {
            const dest_reference = snapshot.get('destProperties') || [];
            handler(dest_reference);
          });
        return unsubscribe;
      } catch (error) {
        handler([]);
        return () => {};
      }
    },
  },
  notification: {
    onChangeNumber: (user_id) => (handler) => {
      const unsubscribe = db
        .doc(`/production/Users/${user_id}/properties`)
        .onSnapshot((snapshot) => {
          const counter = snapshot.get('intUsrCount');
          handler(counter);
        });
      return unsubscribe;
    },
    getList: async (user_id, startAfter, limit) => {
      console.log('fetching notification...');

      try {
        let query = db
          .collection(`/production/Users/${user_id}/properties/InterestedUsers`)
          .orderBy('date', 'desc');
        if (startAfter) query = query.startAfter(startAfter);
        if (limit) query = query.limit(limit);
        const snapshot = await query.get();
        const items = snapshotParser(snapshot);
        const latest_item = snapshot.docs[snapshot.docs.length - 1];
        return { items, latest_item };
      } catch (error) {
        console.error('Error_description:   ', error);
        return {};
      }
    },
    resetCounter: async (user_id) => {
      const state = await db
        .doc(`/production/Users/${user_id}/properties`)
        .update({
          intUsrCount: 0,
        });
      return state;
    },
    setViewed: async (user_id, notification_id) => {
      try {
        const status = await db
          .doc(
            `/production/Users/${user_id}/properties/InterestedUsers/${notification_id}`
          )
          .update({
            isViewed: true,
          });
        return true;
      } catch (error) {
        console.error('error', error);
      }
    },
  },
};

export default firebaseObject;
