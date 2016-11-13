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

export const MiniStockSection = () => {
    return (
        <div className="Ministock-container sidebar-ministock">
            <MiniStock ticker="AAPL" price={108.43}/>
            <MiniStock ticker="TWTR" price={18.55}/>
            <MiniStock ticker="TSLA" price={188.56}/>
            <MiniStock ticker="NFLX" price={114.78} down/>
            <MiniStock ticker="FB" price={119.02}/>
            <MiniStock ticker="MSFT" price={59.02} down/>
            <MiniStock ticker="BABA" price={92.99} down/>
        </div>
    );
};

export const MiniStock = ({ticker, price, down=false}) => {
    return (
        <div className="ministock">
            <div className="mini-ticker">{ticker}</div>
            <div className={"mini-price " + (down ? 'down': '')}>${price}</div>
        </div>
    );
}
