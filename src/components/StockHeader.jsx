import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/header.css';

export const StockHeader = ({ticker, description}) => {
    return (
        <div className="StockHeader-details">
            <div className="StockHeader-ticker">
                {ticker}
            </div>
            <div className="StockHeader-description">
                {description}
            </div>
        </div>
    )
};
