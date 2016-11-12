import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/stock-view.css';
import { Button} from './Button';
import { Price, PriceChange } from './Price';
import { StockRangeSelector } from './StockRangeSelector';

export const StockView = ({ticker, description}) => {
    return (
        <div className="StockView">
            <Price value={119.43} smallDecimals smallDollar/>
            <PriceChange change={1.85} percent={1.53}/>
            <div className="StockView-graph"/>
            <div className="menu">
                <StockRangeSelector/>
                <Button text="Buy"/>
                <Button text="Sell"/>
            </div>
            <div>
                <StockNewsList/>
            </div>
        </div>
    )
};

const FAKE_NEWS = [
    {
        title: "Improving Enforcement and Promoting Diversity: Updates to Ethnic Affinity Marketing",
        date: "November 11, 2016"
    },
    {
        title: "Facebook Should Boost Video: John Malone (FB)",
        date: "November 11, 2016"
    },
    {
        title: "10 Countries with the Most Facebook Inc (FB), Twitter Inc (TWTR) and Instagram Users",
        date: "November 11, 2016"
    }
];

const StockNewsList = () => {
    return (
        <div className="NewsList">
            <div className="NewsList-label">News</div>
            <div>{
                FAKE_NEWS.map((news) => (
                    <StockNews title={news.title} date={news.date}/>
                ))
            }</div>
        </div>
    );
}

const StockNews = ({title, date}) => {
    return (
        <div className="News">
            <a href="#" className="News-title">{title}</a>
            <div className="News-date">{date}</div>
        </div>
    )
};
