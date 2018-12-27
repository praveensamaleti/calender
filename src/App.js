import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calender from './components/Calender';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Calender</h1>
        </header>
        <main>
          <Calender/>
        </main>
      </div>
    );
  }
}

export default App;
