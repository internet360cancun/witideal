import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const storageRef = firebase.storage().ref()
const base_storage_url = `https://firebasestorage.googleapis.com/v0/b`

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const uploadPicture = async (path, file) => {
  try {
    const name = file.customName
    await storageRef.child(`${path}/${name}`).put(file)
    return transformFileToUrl(path, file)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const multipleUploadPictures = async (path, arrayOfFiles, handler) => {

  var nexToUpload = 0
  const uploaded = []
  const numToUpload = arrayOfFiles.length

  const concurrency = async () => {
    if (nexToUpload < numToUpload) { 
      const currentPromise = uploadPicture(path, arrayOfFiles[nexToUpload])
      nexToUpload = nexToUpload + 1
      const url = await currentPromise
      uploaded.push(url)
      await handler(uploaded)
      await concurrency(path, arrayOfFiles[nexToUpload])
    }
  }
  
  await Promise.all([concurrency(), concurrency()])
  return uploaded
}

export const transformFileToUrl = (path, file) => {
  const bucket = storageRef.bucket
  const fileName = `thumb@1100_${file.customName}`
  const fullPathEncoded = encodeURIComponent(`${path}/${fileName}`)
  return `${base_storage_url}/${bucket}/o/${fullPathEncoded}?alt=media`
}