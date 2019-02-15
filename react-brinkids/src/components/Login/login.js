
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
      erroCadastro:false,
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
      admin:true
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
     
      axios.get(`/authentication?user=${this.state.user}&password=${this.state.password}`)
      .then((response) => {

        console.log(response.data['token'])
        this.setState({ loading: true });
        const cookies = new Cookies();
        cookies.set('TOKEN_KEY', (response.data['token']), { path: '/' });
        login(response.data['token'])
        
        const dados = jwt.verify(response.data['token'],config.secret_auth);
        console.log(dados)
        this.sair()
       


      }).catch((error) => {
        console.log(error)
        //LOG DE ERRO
        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
        this.setState({ erro: "* Senho ou login Inválido!" })
        this.state.erroCadastro = true;
      })
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
        <div className="container-fluid" >
                        {this.state.erroCadastro &&
                            (<div className="alert lert-danger" role="alert">
                                <strong>Ocorreu um erro no Cadastro</strong>
                            </div>)
                        }
                    </div>
          <div className="box">
            <img className="logo_1" src={logo} alt="logo" />
            <input placeholder="Usuário" autoFocus type="text" value={this.state.user} onChange={this.textoUsuario} />
            <input placeholder="Senha" type="password" value={this.state.password} onChange={this.textoPassword} />
            <button type="button" onClick={this.loginSubmit} >Login</button>
            
            
            <span id="menErro"> {this.state.erro} </span>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
