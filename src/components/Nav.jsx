import React, { Component } from 'react';
import logo from '../Robinhood-icon.jpeg';
import {StockDropdown} from './StockDropdown';
import { StockHeader } from './StockHeader';
import ClickOutside from 'react-click-outside';


export const Nav = () => {
    return (
        <div className="nav">
            <div className="content">
                <div className="left">
                    <StockList/>
                </div>
                <StockHeader ticker="FB" description="Facebook, Inc. - Class A Common"/>
                <div className="right">
                    Saranyu Phusit
                </div>
            </div>
        </div>
    );
};

export class StockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opening: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({opening: !this.state.opening});
    }

    render() {
        var dropdown;
        if (this.state.opening) {
            dropdown = (
                <ClickOutside onClickOutside={this.handleClick}>
                    <StockDropdown/>;
                </ClickOutside>
            );
        }
        return (
            <div className="stocklist-container">
                <button className="stocklist-btn color" onClick={this.handleClick}>Overview</button>
                {dropdown}
            </div>
        );
    }
}
