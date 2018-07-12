import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import LayoutRoute from './components/Layout/LayoutRoute.js';
import MainLayout from './components/Layout/MainLayout.js';
import CadastroCrianca from './components/Crianca/CadastroCriancaPart1.js';
import GAListener from './components/GAListener.js';
import Login from './components/Login/login.js';


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
class App extends React.Component {
    render(){
      return(
        <BrowserRouter basename={getBasename()}>
          <GAListener>
            <Switch>
                <LayoutRoute
                  exact
                  path="/Login"
                  layout={Login}
                />
                <LayoutRoute
                  exact
                  path="/Crianca"
                  layout={MainLayout}
                  component={CadastroCrianca}
                />
              <Redirect to="/" /> 
            </Switch>
          </GAListener>
        </BrowserRouter>
      );
    }
  }

  export default App;
