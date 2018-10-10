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
import Passport from './components/Passaporte/Passaporte.js';
import Aniversario from './components/Aniversario/CadastroAniversario.js';
import CriaEvento from './components/Eventos/CadastroEvento.js';
import Desconto from './components/Desconto/VisualizaDesconto.js';
import Perfil from './components/VizualizarPerfil/Perfil.js';
import PerfilAdulto from './components/VizualizarPerfil/PerfilAdulto.js';
import PerfilCrianca from './components/VizualizarPerfil/PerfilCrianca';
import Servicos from './components/Serviços_Extras/Serviços';
import MeuPerfil from './components/VizualizarPerfil/MyPerfil.js';
import SaidaCrianca from './components/Saidas/SaidaCrianca.js';
import EntradaAniversario from './components/Aniversario/EntradaAniversario.js';
import Gerador from './components/geradorf/Gerador_fun\u00E7oes.js';

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
                <LayoutRoute
                  exact
                  path="/SaidaCrianca"
                  layout={MainLayout}
                  component={SaidaCrianca}
                />                
                <LayoutRoute
                  exact
                  path="/Desconto"
                  layout={MainLayout}
                  component={Desconto}
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
                <LayoutRoute
                  exact
                  path="/Event"
                  layout={MainLayout}
                  component={CriaEvento}
                />
              <LayoutRoute
                  exact
                  path="/Aniversario"
                  layout={MainLayout}
                  component={Aniversario}
                />
                <LayoutRoute
                  exact
                  path="/Perfil"
                  layout={MainLayout}
                  component={Perfil}
                />
                <LayoutRoute
                  exact
                  path="/PerfilAdulto"
                  layout={MainLayout}
                  component={PerfilAdulto}
                />
                <LayoutRoute
                  exact
                  path="/PerfilCrianca"
                  layout={MainLayout}
                  component={PerfilCrianca}
                />
                <LayoutRoute
                  exact
                  path="/Serviços"
                  layout={MainLayout}
                  component={Servicos}
                />
                <LayoutRoute
                  exact
                  path="/MyProfile"
                  layout={MainLayout}
                  component={MeuPerfil}
                />
                /> 
                <LayoutRoute
                  exact
                  path="/EntradaAniversario"
                  layout={MainLayout}
                  component={EntradaAniversario}
                />
                <LayoutRoute
                  exact
                  path="/Gerador_funçoes"
                  layout={MainLayout}
                  component={Gerador}
                />    
                                                                 
              <Redirect to="/" /> 
            </Switch>
          </GAListener>
        </BrowserRouter>
      );
    }
  }

  export default App;
