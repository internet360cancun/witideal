import React, { useContext } from "react";
import { LandingPromoter } from "../LandingPromoter/landingPromoter";
// import { LogIn } from "../LogIn/logIn";
// import { Register } from "../Register/register";
import { Switch, Route } from "react-router-dom";
import { RestorePassword } from "../RestorePassword/restorePassword";
import { MailValidation } from "../MailValidation/mailValidation";
import { NotFound } from "../404/404";
import { ProtectedRoute } from "../ProtectedRoute/protectedRoute";
import { PropertiesList } from "../PropertiesList/propertiesList";
import { PropertyDetail } from "../PropertyDetail/propertyDetail";
import SesContext from "../../contexts/sessionContext";
import { BinaryRoute } from "../BinaryRoute/binaryRoute";
import { BuyWiticoins } from "../BuyWiticoins/buyWiticoins";
import { Witicoins } from "../Witicoins/witicoins";
import { MyProfile } from "../MyProfile/myProfile";
import { MyProperties } from "../MyProperties/myProperties";
import * as ROUTES from "../../constants/routes";
import MyFavoritePage from "../MyFavoritePage/myFavoritePage";
import Contacts from "../ContactsList/contactsList";
import MyPayments from "../../pages/payments";
import promoterAcces from "../../functions/promoterAccess";
import MyMovements from "../MyMovementsPage/myMovementsPage";
import TermsAndConditions from "../../pages/terms_and_conditions";
import NoticeOfPrivacy from "../../pages/notice_of_privacy";
import HowItWorks from "../../pages/how_it_works";

import SelccionarPaquete from "../PackageSelecter/SelccionarPaquete";
import HomePage from "../../pages/home/HomePage";

export const Body = () => {
  const context = useContext(SesContext);

  const promoFormAcces = () =>
    promoterAcces(context.isPromoter, context.SesState, true);
  const isAuthenticated = () => {
    return context.SesState !== undefined ? context.SesState : false;
  };

  return (
    <Switch>
      <BinaryRoute
        path={ROUTES.LANDING}
        exact
        component={MyProfile}
        allow={promoFormAcces}
        rComponent={HomePage}
      />

      <Route path={ROUTES.FORGOT} component={RestorePassword} />
      <Route path={ROUTES.VALIDATE} component={MailValidation} />
      <Route
        path="/propiedades/:propertyType?/:action?/:country?/:administrative_area_level_1?/:administrative_area_level_2_3?/:sublocality_level_1?/:route?/:street_number?"
        component={PropertiesList}
      />
      <Route path={ROUTES.HOWITWORKS} component={HowItWorks} />
      <Route path={ROUTES.SEARCH} component={HomePage} />

      <Route
        exact
        path="/propiedad/:propertyType/:action/:pId"
        component={PropertyDetail}
      />
      <Route
        exact
        path="/propiedad/:propertyType/:action/:someurl/:pId"
        component={PropertyDetail}
      />

      <Route
        path="/terminos-y-condiciones"
        exact
        component={TermsAndConditions}
      />
      <Route path="/aviso-de-privacidad" component={NoticeOfPrivacy} exact />

      <ProtectedRoute
        path={ROUTES.UPLOAD}
        allow={promoFormAcces}
        component={LandingPromoter}
      />
      <ProtectedRoute
        exact
        path="/contactos/:propertyid/:notificationid"
        allow={promoFormAcces}
        component={Contacts}
      />
      <ProtectedRoute
        axact
        path="/contactos/:propertyid"
        allow={promoFormAcces}
        component={Contacts}
      />

      <ProtectedRoute
        path={ROUTES.WITICOINS}
        allow={promoFormAcces}
        component={Witicoins}
      />
      <ProtectedRoute
        path={ROUTES.COMPRARPAQUETES}
        allow={promoFormAcces}
        component={SelccionarPaquete}
      />
      {/* <ProtectedRoute
        path={ROUTES.BUYWITICOINS}
        allow={promoFormAcces}
        component={BuyWiticoins}
      /> */}
      <ProtectedRoute
        path={ROUTES.MYPROPERTIES}
        allow={promoFormAcces}
        component={MyProperties}
      />

      <ProtectedRoute
        path={ROUTES.MYPROFILE}
        allow={isAuthenticated}
        component={MyProfile}
      />
      <ProtectedRoute
        path={ROUTES.MYFAVORITES}
        allow={isAuthenticated}
        component={MyFavoritePage}
      />
      <ProtectedRoute
        path={ROUTES.MYMOVEMENTS}
        allow={isAuthenticated}
        component={MyMovements}
      />
      <ProtectedRoute
        path="/mis-pagos"
        allow={isAuthenticated}
        component={MyPayments}
      />

      <Route path="*" component={NotFound} />
    </Switch>
  );
};
