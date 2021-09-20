import React,{useEffect,useState} from 'react';
import './master.css';
import { Header } from '../Header/header';
import { Footer } from '../Footer/footer';
import { Body } from '../Body/body';
import useFirebaseTools from  '../../Hooks/useFirebaseTools';
import SesContext from "../../contexts/sessionContext";
import ThemeProvider from '../../helpers/thememanager'
import analitycs from 'react-ga'

// secondary components
import ModalSuccessRegister from '../modalSuccessRegister'
import ModalSuccessUpload from '../successUpload'
import ModalVideoPlayer from '../modalVideoPlayer'
import UploadGuide from '../uploadGuide';


analitycs.initialize('UA-168913818-01')


export function Master() {
  const [session, setsession] = useState(JSON.parse(localStorage.getItem('sessionData')) || { isLogged: false, SesState: false })
  const [sessionUpdater, refreshSession] = useState(0)
  
  // update this state for reload session
  const handleRefreshSession = () => {
    refreshSession(sessionUpdater + 1)
  }

  const {firebase} = useFirebaseTools();
  
  useEffect(() => {
    
    const unsuscribe = firebase.auth().onIdTokenChanged (async user => {
      console.log('useruseruser', user)
        try {
          if (user) {

            const snapshot = await firebase.firestore().collection("production").doc("Users").collection(user.uid).doc("generalInfo").get()
            const userData = snapshot.data()

            if(snapshot.exists) {
              const sessionData = {
                VerifiedMail: user.emailVerified,
                emailVerified: user.emailVerified,
                SesState: true,
                isLogged: true,
                isPromoter: userData.isPromoter,
                RegComplete: userData.isRegisterComplete,
                isRegisterComplete: userData.isRegisterComplete,
                mail: userData.mail,
                email: userData.mail,
                Email: userData.mail,
                PhotoURL: userData.photo,
                photoURL: userData.photo,
                photo: userData.photo,
                Name: userData.name,
                name: userData.name,
                lastname: userData.lastname || '',
                uId: firebase.auth().currentUser.uid,
                phone: userData.phone,
                authPhone: user.phoneNumber,
                authMail: user.email,
                authMailVerif: user.emailVerified,
                authName: user.displayName,
                authUiD: user.uid,
                authAnon: user.isAnonymous,
                companyName: userData.companyName || null,
                extraPhones: userData.extraPhones || [],
                showMainPhone: userData.showMainPhone,
                promoterType: userData.promoterType || null,
                refresh: handleRefreshSession, // for reload session
              }
              setsession(sessionData)
              localStorage.setItem('sessionData',JSON.stringify(sessionData))
              
            } else {
              setsession({ SesState: false, refresh: handleRefreshSession, isLogged: false })
              localStorage.setItem('sessionData',JSON.stringify({ SesState: false, refresh: handleRefreshSession, isLogged: false }))
            }
          } else {
            setsession({ SesState: false, refresh: handleRefreshSession, isLogged: false })
            localStorage.setItem('sessionData',JSON.stringify({ SesState: false, refresh: handleRefreshSession, isLogged: false })) 
          }
        } catch (error) {
          console.log('error', error)
        }     
      })
    return () => { unsuscribe() };
  }, [session.SesState, sessionUpdater])

  return (
    <ThemeProvider>
      <SesContext.Provider value={session}>
        <ModalSuccessRegister />
        <ModalSuccessUpload />
        <ModalVideoPlayer />
        <UploadGuide />
        <Header />
          <Body />
        <Footer />
      </SesContext.Provider>
    </ThemeProvider>
  );
}



