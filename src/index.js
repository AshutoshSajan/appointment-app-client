import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import "react-big-calendar/lib/css/react-big-calendar.css";



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
);
