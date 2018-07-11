import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CadastroCrianca from './components/Crianca/CadastroCriancaPart1';
import Layout from './components/Layout/MainLayout';

ReactDOM.render(<CadastroCrianca />, document.getElementById('root'));
registerServiceWorker();
