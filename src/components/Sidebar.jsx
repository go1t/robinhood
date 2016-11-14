import React, { Component } from 'react';
import {Price} from './Price';
import '../css/sidebar.css';
import '../css/stocklist.css';
import logo from '../Robinhood-icon.jpeg';

export class Leftbar extends Component {
    render() {
        var portfolioInfo = (
            <div className="portfolioInfo">
                <div className="info">
                    <div className="Label">PORTFOLIO VALUE</div>
                    <div><Price value="3827.91" smallDollar/></div>
                </div>
                <div className="info">
                    <div className="Label">BUYING POWER</div>
                    <div><Price value="9236.77" smallDollar/></div>
                </div>
            </div>
        );
        return (
            <div className="Leftbar">
                <div className="sidebar-info">
                    <div className="Name">Saranyu Phusit</div>
                    <div className="Username color">+gott</div>
                    {portfolioInfo}
                    <hr/>
                </div>
                <MiniStockSection/>
          </div>
        );
    }
}

const STOCKS = [
    {ticker: "AAPL", price: 108.43},
    {ticker: "TWTR", price: 18.55},
    {ticker: "TSLA", price: 188.56},
    {ticker: "NFLX", price: 114.78, down: true},
    {ticker: "FB", price: 119.02, down: true},
    {ticker: "MSFT", price: 59.02}
];

export class MiniStockSection extends Component {
    constructor() {
        super();
        this.state = {
            searchterm: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(event) {
        this.setState({searchterm: event.target.value.toUpperCase()})
    }

    render() {
        var FaSearch = require('react-icons/lib/fa/search');
        return (
            <div className="Ministock-container sidebar-ministock">
                <div className="search-container">
                    <FaSearch height={40} color="#999"/>
                    <input value={this.state.searchterm} onChange={this.updateSearch} className="search" type="text" placeholder="Search stock"/>
                </div>
                {
                    STOCKS
                        .filter((s) => (this.state.searchterm.length == 0 || s.ticker.indexOf(this.state.searchterm) >= 0))
                        .map((s) => {
                            return (
                                <MiniStock
                                    ticker={s.ticker}
                                    price={s.price}
                                    down={s.down}
                                />
                            );
                        })
                }
            </div>
        );
    }
};

export const MiniStock = ({ticker, price, down=false}) => {
    return (
        <div className="ministock">
            <a href="#" className="mini-ticker">{ticker}</a>
            <div className={"mini-price " + (down ? 'down': '')}>${price}</div>
        </div>
    );
}
