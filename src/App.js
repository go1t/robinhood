import React, { Component } from 'react';
import { Nav } from './components/Nav';
import { StockView } from './components/StockView';
import {StockDropdown} from './components/StockDropdown';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            negative: false
        };
        this.updateAppState = this.updateAppState.bind(this);
    }

    updateAppState(negative) {
        this.setState({negative: negative});
    }

    render() {
        var appClass = "App " + (this.state.negative ? "negative": null);
        return (
          <div className={appClass}>
            <Nav/>
            <div className="content">
                <StockView updateAppState={this.updateAppState}/>
            </div>
          </div>
        );
    }
}

export default App;
