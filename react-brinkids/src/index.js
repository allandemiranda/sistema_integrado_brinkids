import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CadastroCriança from './CadastroCriancaPart1';
import Layout from './Layout/MainLayout';

ReactDOM.render(<CadastroCriança />, document.getElementById('root'));
registerServiceWorker();
