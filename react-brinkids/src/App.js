import React, { Component } from 'react';
import logo from './logo1.png';
import video from './loginvideo.mp4';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            status: true,
            erroMsg: "Usuário ou senha incorreto !"
        };
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
                            <p> 
                                <span>
                                {
                                    this.state.status ? this.state.erroMsg : null
					/* hoje */
                                }
                                </span> 
                            </p>
                            <form method="get" action="/user/login">
                                <input id="inputUser" placeholder="Usuário" type="text" />
                                <input id="inputPassword" placeholder="Senha" type="password" />                            
                                <button type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                );
    }
}

export default App;
