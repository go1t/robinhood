import React, { Component } from 'react';
import ReactHighStock from 'react-highcharts/ReactHighstock';
import classNames from 'classnames';
import '../css/stock-view.css';
import { Button} from './Button';
import { Price, PriceChange } from './Price';
import { StockRangeSelector } from './StockRangeSelector';
import 'whatwg-fetch';

var config = {
    colors: ['#29CA96'],
    navigator: {
        enabled: false
    },
    rangeSelector: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    series: [{
        name: 'FB',
        tooltip: {
          valueDecimals: 2
        }
    }],
    xAxis: {
        visible: false
    },
    yAxis: {
        visible: false
    }
};

export const StockView = ({
    data,
    current,
    handleRangeSelect,
    diff,
}) => {
    config.series[0].data = data;
    if (diff < 0) {
        config.colors[0] = "#f45531";
    } else {
        config.colors[0] = '#29CA96';
    }
    var percent;
    if (data) {
        percent = diff*100/data[0][1];
    }
    return (
        <div className="StockView">
            {data ? <Price value={data[data.length-1][1]} smallDecimals smallDollar/> : null}
            {data ? <PriceChange change={diff} percent={percent}/> : null}
            <ReactHighStock className="StockView-graph" config={config}/>
            <div className="menu">
                <StockRangeSelector
                    current={current}
                    handleClick={handleRangeSelect}
                />
                <Button text="Buy"/>
                <Button text="Sell"/>
            </div>
            <div>
                <StockNewsList/>
            </div>
        </div>
    )
}

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
