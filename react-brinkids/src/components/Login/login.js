
import logo from '../../assets/logo1.png';
import video from './loginvideo.mp4';
import './login.css';
import $ from "jquery";
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from'jsonwebtoken';
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import config from './service/config';

import { login } from "./service/auth";
import { getToken } from "./service/auth";
import { Route } from 'react-router-dom';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Inicio from '../Dashboard/inicio';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      erro: '',
      loading: false,
    };

    this.textoUsuario = this.textoUsuario.bind(this)
    this.textoPassword = this.textoPassword.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
    this.Criar = this.Criar.bind(this)
  }
 
  Criar(event) {
    const data = {
      user: this.state.user,
      password: this.state.password,
    }
    console.log(data)
    axios.post('/authentication', data)
      .then((response) => {
        console.log(response.data);



      }).catch((error) => {
        console.log(error)//LOG DE ERRO
        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT

      })
  }
  textoUsuario(event) {
    this.setState({ user: event.target.value })
  }

  textoPassword(event) {
    this.setState({ password: event.target.value })
  }
  sair=()=>{
    this.props.history.push("/"); //lembrar q é assim q se redireciona com react
}
  loginSubmit(event) {
    
    if (this.state.user.length > 0 && this.state.password.length > 0) {
      $.ajax({
        url: `http://127.0.0.1:3001/authentication?user=${this.state.user}&password=${this.state.password}`,
        type: 'get',
        statusCode: { //A partir do status da resposta, ele executa uma função
          200: function (data) {
            
            console.log(data['token'])
            this.setState({ loading: true });
            const cookies = new Cookies();
            cookies.set('TOKEN_KEY', (data['token']), { path: '/' });
            login(data['token'])
            
            const dados = jwt.verify(data['token'],config.secret_auth);
            console.log(dados)
            this.sair()

          }.bind(this),
          401: function () {
            this.setState({ erro: "* Senha incorreta" })
          }.bind(this),
          404: function () {
            this.setState({ erro: "* Usuário não existe" })
          }.bind(this),
          500: function () {
            this.setState({ erro: "* Erro no Servidor.Tente novamente em alguns minutos." })
          }.bind(this)
        }
      });
    }
    else {
      this.setState({ erro: "* Por favor, preencha os campos acima" })
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
            <input placeholder="Senha" type="password" value={this.state.password} onChange={this.textoPassword} />
            <button type="button" onClick={this.loginSubmit} >Login</button>
            
            <Link to="/Calendario">ooo</Link>
            {/*<!--p>Recuperar <span>Usuário</span> ou <span>Senha</span></p!-->*/}
            <span id="menErro"> {this.state.erro} </span>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
