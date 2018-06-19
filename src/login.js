import React, { Component } from 'react';
import video from './loginvideo.mp4';
import logo from './logo1.png';
import './login.css';

class App extends Component {
    render() {
        return (
                <div className="vid-container">
                    <video id="Video1" className="bgvid back" autoplay="autoplay" muted="muted" preload="auto" loop="">
                        <source src={video} type="video/mp4" alt="video" />
                    </video>
                    <div className="inner-container">
                        <div className="box">
                            <img className="logo" src={logo} alt="logo"/>
                            <input placeholder="Usuário" type="text" />
                            <input placeholder="Senha" type="password" />
                            <button type="button">Login</button>
                        </div>
                    </div>
                </div>
                );
    }
}

export default App;
