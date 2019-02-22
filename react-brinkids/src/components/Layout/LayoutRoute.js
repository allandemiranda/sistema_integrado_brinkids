import React from 'react';


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      <Layout>
      <Component {...props} />
    </Layout>
   
      
    }
  />
);

export default LayoutRoute;
