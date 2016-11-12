import React, { Component } from 'react';
import {Price} from './Price';
import '../css/stocklist.css';

export class StockDropdown extends Component {
  render() {
    return (
      <div className="StockDropdown">
          <div className="userinfo">
              <div className="info">
                  <div className="Label">PORTFOLIO VALUE</div>
                  <div><Price value="3827.91" smallDollar/></div>
              </div>
              <div className="info">
                  <div className="Label">BUYING POWER</div>
                  <div><Price value="9236.77" smallDollar/></div>
              </div>
              <br/><br/><br/>
              &nbsp;<a href="#">See more</a> &nbsp;<span className="color">></span>
          </div>
          <MiniStockSection/>
      </div>
    );
  }
}

export const MiniStockSection = () => {
    return (
        <div className="Ministock-container">
            <MiniStock ticker="AAPL" price={108.43}/>
            <MiniStock ticker="TWTR" price={18.55}/>
            <MiniStock ticker="TSLA" price={188.56}/>
            <MiniStock ticker="NFLX" price={114.78} down/>
            <MiniStock ticker="MSFT" price={59.02}/>
            <MiniStock ticker="BABA" price={92.99} down/>
        </div>
    );
};

export const MiniStock = ({ticker, price, down=false}) => {
    return (
        <div className="ministock">
            <a href="#" className="mini-ticker">{ticker}</a>
            <div className={"mini-price " + (down ? 'down': '')}>${price}</div>
        </div>
    );
}
