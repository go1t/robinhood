import React, { Component } from 'react';
import logo from '../Robinhood-icon.jpeg';
import { StockStats } from './StockStats';
import { StockHeader } from './StockHeader';
import ClickOutside from 'react-click-outside';

var FaSearch = require('react-icons/lib/fa/search');

export const Nav = () => {
    return (
        <div className="nav">
            <div className="nav-content">
                <div className="left">
                    <div className="search-container">
                        <FaSearch height={40} color="#999"/>
                        <input className="search" type="text" placeholder="Search stock"/>
                    </div>
                </div>
                <div className="right">
                    Saranyu Phusit
                </div>
            </div>
        </div>
    );
};

export class Stats extends Component {
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
                    <StockStats/>
                </ClickOutside>
            );
        }
        return (
            <div className="stocklist-container">
                <button className="stocklist-btn color" onClick={this.handleClick}>Stats</button>
                {dropdown}
            </div>
        );
    }
}
