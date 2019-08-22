import React from 'react';
import { ReactDOM } from 'react-dom';
import * as Yup from 'yup';

import LoginForm from './Components/LoginForm.js';

import './App.css';


function App() {
  return (
    <div className="App">
    <header>
      <div className="header-container">
        <h1>welcome to our Login!</h1>
      </div>
    </header>
    <LoginForm/>
    </div>
  );
}

export default App;
