import React, { Component } from 'react';
import logo from './logo1.png';
import video from './loginvideo.mp4';
import './App.css';
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
          url: "http://localhost:3000/api/getWeather",
          dataType:'json',
          type: 'POST',
          data: {user: this.state.user, password: this.state.password},
          success: function(response){
            console.log(response);
          }       
        });
      }
      else{
        this.setState({erro: "Dados informados não reconhecido"})
      }
    }
    
  
    render() {
      return (
        <div className="vid-container">                  
           <video id="Video1" className="bgvid back" autoPlay="true" muted="muted" preload="auto" loop>
              <source src={video} type="video/mp4" alt="video" />
          </video>
                      
          <div className="inner-container">
              <div className="box">
                <img className="logo" src={logo} alt="logo" />
                {/*<!--p style="color: red;">Usuário ou Senha incoreto!</p!-->*/}
                <input placeholder="Usuário" type="text" value={this.state.user} onChange={this.textoUsuario} />
                <input placeholder="Senha" type="password" value={this.state.password} onChange={this.textoPassword}/>                
                <button type="button" onClick={this.loginSubmit} >Login</button>
                {/*<!--p>Recuperar <span>Usuário</span> ou <span>Senha</span></p!-->*/}
                <span id="menErro"> {this.state.erro} </span>
              </div>
          </div>
        </div>
      );
    }
  }
  
  export default App;
