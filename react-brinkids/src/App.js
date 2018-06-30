import React, { Component } from 'react';
import logo from './logo1.png';
import video from './loginvideo.mp4';
import './App.css';

class App extends Component {
    state = 
    {
        users: []
    }

    componentDidMount() {
      fetch('/users')
        .then(res => res.json())
        .then(users => this.setState({ users }));
    }
    
    render() {
        return (
                <div className="vid-container">
                    {
                    //<video id="Video1" className="bgvid back" autoPlay="true" muted="muted" preload="auto" loop>
                        //<source src={video} type="video/mp4" alt="video" />
                    //</video>
                    }
                    <h1>Users</h1>
                    {this.state.users.map(user =>
                        <div key={user.id}>
                            username: {user.username}
                            <br/>
                            password: {user.password}
                        </div>
                        
                    )}
                    <div className="inner-container">
                        <div className="box">
                            <img className="logo" src={logo} alt="logo" />
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
