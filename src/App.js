import React, { Component } from 'react';
import { Nav } from './components/Nav';
import { StockView } from './components/StockView';
import {StockDropdown} from './components/StockDropdown';
import './App.css';

class App extends Component {
    render() {
    return (
      <div className="App">
        <Nav/>
        <div className="content">
            <StockView/>
        </div>
      </div>
    );
    }
}

export default App;
