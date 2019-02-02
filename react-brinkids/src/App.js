import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import Gerador from './components/geradorf/Gerador_funcoes.js';
import SaidaServicosExtra from "./components/Serviços_Extras/SaidaServiçosExtra";
import ServicoPassaporte from "./components/Servirços_Passaport/ServicoPassaport";
import gavetas from './components/Gavetas/Gavetas.js';
import TelaMKT from './components/TeladoMKT/TelaMKT.js';
import GFinanceiro from './components/GerenciamenteFinanceiro/GerenciamentoFinanceiro.js';
import VisualizarAniversario from './components/Aniversario/VisualizarAniversario.js';
import { isAuthenticated } from "./components/Login/service/auth";

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Layout>
        <Component {...props} />
      </Layout>
      : <Redirect to='/login' />
  )} />

)
class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <Route
              exact
              path="/Login"
              component={Login}
            />
            <PrivateRoute
              exact
              path="/"
              layout={MainLayout}
              component={DashBoard}
            />
            <PrivateRoute
              exact
              path="/Crianca"
              layout={MainLayout}
              component={CadastroCrianca}
            />
            <PrivateRoute

              path="/Calendario"
              layout={MainLayout}
              component={Calendar}
            />
            <PrivateRoute
              exact
              path="/SaidaCrianca"
              layout={MainLayout}
              component={SaidaCrianca}
            />
            <PrivateRoute
              exact
              path="/Desconto"
              layout={MainLayout}
              component={Desconto}
            />
            <PrivateRoute
              exact
              path="/Adult"
              layout={MainLayout}
              component={Adult}
            />
            <PrivateRoute
              exact
              path="/Funcionario"
              layout={MainLayout}
              component={CadastroFuncionario}
            />
            <PrivateRoute
              exact
              path="/Passport"
              layout={MainLayout}
              component={Passport}
            />
            <PrivateRoute
              exact
              path="/Event"
              layout={MainLayout}
              component={CriaEvento}
            />
            <PrivateRoute
              exact
              path="/Aniversario"
              layout={MainLayout}
              component={Aniversario}
            />
            <PrivateRoute
              exact
              path="/Perfil"
              layout={MainLayout}
              component={Perfil}
            />
            <PrivateRoute
              exact
              path="/GerenciamentoFinanceiro"
              layout={MainLayout}
              component={GFinanceiro}
            />
            <PrivateRoute
              exact
              path="/PerfilAdulto"
              layout={MainLayout}
              component={PerfilAdulto}
            />
            <PrivateRoute
              exact
              path="/PerfilCrianca"
              layout={MainLayout}
              component={PerfilCrianca}
            />
            <PrivateRoute
              exact
              path="/Serviços"
              layout={MainLayout}
              component={Servicos}
            />
            <PrivateRoute
              exact
              path="/MyProfile"
              layout={MainLayout}
              component={MeuPerfil}
            />
            />
                <PrivateRoute
              exact
              path="/EntradaAniversario"
              layout={MainLayout}
              component={EntradaAniversario}
            />
            <PrivateRoute
              exact
              path="/Gerador_funcoes"
              layout={MainLayout}
              component={Gerador}
            />
            <PrivateRoute
              exact
              path="/SaidaServicosExtra"
              layout={MainLayout}
              component={SaidaServicosExtra}
            />
            <PrivateRoute
              exact
              path="/ServicoPassaporte"
              layout={MainLayout}
              component={ServicoPassaporte}
            />
            <PrivateRoute
              exact
              path="/Gavetas"
              layout={MainLayout}
              component={gavetas}
            />
            <PrivateRoute
              exact
              path="/TelaMKT"
              layout={MainLayout}
              component={TelaMKT}
            />
            <PrivateRoute
              exact
              path="/VAniversario"
              layout={MainLayout}
              component={VisualizarAniversario}
            />

            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

export default App;
