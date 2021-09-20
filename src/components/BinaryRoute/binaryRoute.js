import React from 'react';
import {Route,Redirect} from 'react-router-dom';

//Protected route must recive 2 components and a validation function that returns
//some boolean Component will render if allowed, Rcomponent will render if not
export function BinaryRoute({rComponent:Rcomponent, component:Component,...routeProps}){
    let allowed = routeProps.allow();
  
    return (
          <Route
            {...routeProps}
            render={componentProps => {
              if (allowed) {
                return <Component {...componentProps} />;
              } else {
                return (
                  <Rcomponent
                  {...componentProps}
                  />
                );
              }
            }}
          />
        );
  }