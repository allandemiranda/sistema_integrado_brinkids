import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import login from './login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<login />, document.getElementById('root'));
registerServiceWorker();
