import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import LayoutRoute from './components/Layout/LayoutRoute.js';
import MainLayout from './components/Layout/MainLayout.js';
import CadastroCrianca from './components/Crianca/CadastroCrianca.js';
import GAListener from './components/GAListener.js';
import Login from './components/Login/login.js';
import Calendar from './components/Calendario/calednario.js';
import DashBoard from './components/Dashboard/Dashboard.js';
import Adulto from './components/Adultos/CadastroAdulto.js';
import BuscaCrianca from './components/Adultos/BuscaCrianca.js';

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
                  path="/"
                  layout={MainLayout}
                  component={DashBoard}
                />
                <LayoutRoute
                  exact
                  path="/Crianca"
                  layout={MainLayout}
                  component={CadastroCrianca}
                />
                <LayoutRoute
                  exact
                  path="/Calendario"
                  layout={MainLayout}
                  component={Calendar}
                />
                />
               <LayoutRoute
                  exact
                  path="/Adulto"
                  layout={MainLayout}
                  component={Adulto}
                />
               <LayoutRoute
                  exact
                  path="/BuscaCrianca"
                  layout={MainLayout}
                  component={BuscaCrianca}
                />                
              <Redirect to="/" /> 
            </Switch>
          </GAListener>
        </BrowserRouter>
      );
    }
  }

  export default App;
