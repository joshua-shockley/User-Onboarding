import React from 'react';

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
    <div className="login-container">
    <LoginForm/>
    </div>
    </div>
  );
}

export default App;
