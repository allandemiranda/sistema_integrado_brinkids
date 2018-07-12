import React, { Component } from 'react';
import logo from '../../assets/logo1.png';
import video from './loginvideo.mp4';
import './login.css';
import $ from "jquery";

class App extends Component {
constructor () {
    super();
    this.state = {
      user:'',
      password:'',
      erro:''
    };

    this.textoUsuario = this.textoUsuario.bind(this)
    this.textoPassword = this.textoPassword.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  textoUsuario (event) {
    this.setState({user: event.target.value})
  }

  textoPassword (event) {
    this.setState({password: event.target.value})
  }

  loginSubmit(event){
    if (this.state.user.length > 0 && this.state.password.length > 0){
      $.ajax({
        url: "http://localhost:3001/usuarios/autentica",
        dataType:'json',
        type: 'GET',
        data: {user: this.state.user, password: this.state.password},
        success: function(response){
          if(response == 200 ){alert("Dados Enviados");}
        },
        error: function(response){
          if( response == 500 ){this.setState({erro: "* Erro no Servidor.Tente novamente em alguns minutos."})}
          else if( response == 404 ){this.setState({erro: "* Usuário ou Senha incoreto"})}
          //alert("dados nao enviados");
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
              <input placeholder="Usuário" type="text" value={this.state.user} onChange={this.textoUsuario} />
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