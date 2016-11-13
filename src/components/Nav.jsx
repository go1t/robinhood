import React, { Component } from 'react';
import logo from '../Robinhood-icon.jpeg';
import { Button} from './Button';
import { StockStats } from './StockStats';
import { StockHeader } from './StockHeader';
import ClickOutside from 'react-click-outside';


export const Nav = () => {
    return (
        <div className="nav">
            <div className="left">
                <Stats/>
            </div>
            <StockHeader ticker="FB" description="Facebook, Inc. - Class A Common"/>
            <div className="right">
                <Button text="Buy"/>
                <Button text="Sell"/>
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