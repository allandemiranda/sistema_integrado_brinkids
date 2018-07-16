import React, { Component } from 'react';
import logo from '../../assets/logo1.png';
import video from './loginvideo.mp4';
import './login.css';
import $ from "jquery";

import {Route} from 'react-router-dom';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Inicio from '../Inicio/inicio';

class App extends Component {
constructor () {
    super();
    this.state = {
      user:'',
      password:'',
      erro:'',
      loading: false,
    };

    this.textoUsuario = this.textoUsuario.bind(this)
    this.textoPassword = this.textoPassword.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  textoUsuario(event){
    this.setState({user: event.target.value})
  }

  textoPassword(event){
    this.setState({password: event.target.value})
  }

  loginSubmit(event){
    if (this.state.user.length > 0 && this.state.password.length > 0){
      $.ajax({
        url: "http://localhost:3001/usuarios/autenticacao",
        type: 'get',
        data: {user: this.state.user, password: this.state.password},
        statusCode: { //A partir do status da resposta, ele executa uma função
          200: function(data) {
            alert('Estou logado')
            this.setState({ loading: true });
            //this.props.submit(this.state.data);
            <BrowserRouter>
                <Switch>
                    <Route path="/inicio" component={Inicio} />
                </Switch>
            </BrowserRouter>
          }.bind(this),
          404: function() {
            this.setState({erro: "* Usuário ou senha incorretos"})
          }.bind(this),
          500: function() {
            this.setState({erro: "* Erro no Servidor.Tente novamente em alguns minutos."})
          }.bind(this)
        }
      });
    }
    else{
      this.setState({erro: "* Por favor, preencha os campos acima"})
    }
  }


  render() {
    return (
      <div className="vid-container">
         <video id="Video1" className="bgvid back" autoPlay="true" muted="muted" preload="auto" loop>
            <source src={video} type="video/mp4" alt="video" />
        </video>

        <form className="inner-container">
            <div className="box">
              <img className="logo_1" src={logo} alt="logo" />
              <input placeholder="Usuário" autoFocus type="text" value={this.state.user} onChange={this.textoUsuario} />
              <input placeholder="Senha" type="password" value={this.state.password} onChange={this.textoPassword}/>
              <button type="button" onClick={this.loginSubmit} >Login</button>
              {/*<!--p>Recuperar <span>Usuário</span> ou <span>Senha</span></p!-->*/}
              <span id="menErro"> {this.state.erro} </span>
            </div>
        </form>
      </div>
    );
  }
}

export default App;
