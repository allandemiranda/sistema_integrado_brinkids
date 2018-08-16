import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import LayoutRoute from './components/Layout/LayoutRoute.js';
import MainLayout from './components/Layout/MainLayout.js';
import CadastroCrianca from './components/Crianca/CadastroCrianca.js';
import GAListener from './components/GAListener.js';
import Login from './components/Login/login.js';
import Calendar from './components/Calendario/calednario.js';
import DashBoard from './components/Dashboard/Dashboard.js';
import Adult from './components/Adultos/CadastroAdulto.js';
import CadastroFuncionario from './components/Funcionario/CadastroFuncionario.js';
import Comprovante from './components/Comprovante/comprovante.js';
import Passport from './components/Passaporte/Passaporte.js';

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
                  path="/Adult"
                  layout={MainLayout}
                  component={Adult}
                />
                <LayoutRoute
                  exact
                  path="/Funcionario"
                  layout={MainLayout}
                  component={CadastroFuncionario}
                />   
               <LayoutRoute
                  exact
                  path="/Passport"
                  layout={MainLayout}
                  component={Passport}
                />                               
              <Redirect to="/" /> 
            </Switch>
          </GAListener>
        </BrowserRouter>
      );
    }
  }

  export default App;
