import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/price.css';

export const Price = ({value, smallDollar, smallDecimals}) => {
    var num = Math.floor(value),
        decimals = Math.round((value % 1).toFixed(2)*100);

    if (decimals < 10) decimals = '0' + decimals;
    var dollarClass = classNames({'Price-small': smallDollar}),
        decimalClass = classNames({'Price-small': smallDecimals});
    return (
        <div className='Price'>
            <span className={dollarClass}>$</span>
            <span>{num}</span>
            <span className={decimalClass}>.{decimals}</span>
        </div>
    );
};

export const PriceChange = ({change, percent}) => {
    return (
        <div className='color'>
            {change >= 0 ? '+': null}{change.toFixed(2)}&nbsp;
            ({percent.toFixed(2)}%)
        </div>
    );
};
