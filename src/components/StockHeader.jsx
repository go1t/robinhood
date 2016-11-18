import React, { Component } from 'react';
import classNames from 'classnames';
import { Button } from './Button';
import '../css/header.css';

export const StockHeader = ({ticker, description}) => {
    return (
        <div className="StockHeader">
            <div className="StockHeader-details">
                <div className="StockHeader-ticker">
                    {ticker}
                </div>
                <div className="StockHeader-description">
                    {description}
                </div>
            </div>
            <div className="right">
                <Button text="BUY"/>
                <Button text="SELL"/>
            </div>
        </div>
    )
};
