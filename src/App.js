import React, { Component } from 'react';
import { Nav } from './components/Nav';
import { StockView } from './components/StockView';
import { Sidebar, Leftbar } from './components/Sidebar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <div className="content">
            <Leftbar/>
            <StockView/>
        </div>
      </div>
    );
  }
}

export default App;
