import React from 'react';
import {Route,Redirect} from 'react-router-dom';


export function ProtectedRoute({component: Component,...routeProps}){
  let allowed = routeProps.allow();
  return (
        <Route
          {...routeProps}
          render={componentProps => {
            if (allowed) {
              return <Component {...componentProps} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/"
                  }}
                />
              );
            }
          }}
        />
      );
}