import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import Chat from './components/chat/Chat'
import Login from './components/login/Login'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  

  
  return (
    <div className="app">
      <Router>
      <Route path='/' exact component={Login} />
        <Route path='/chat' exact component={Chat} />
      </Router>
    </div>
  );
}

export default App;
