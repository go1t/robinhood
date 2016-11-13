import React, { Component } from 'react';
import moment from 'moment';
import ReactHighStock from 'react-highcharts/ReactHighstock';
import classNames from 'classnames';
import '../css/stock-view.css';
import { Button} from './Button';
import { Price, PriceChange } from './Price';
import { StockRangeSelector } from './StockRangeSelector';
import 'whatwg-fetch';

const FETCH_URL = process.env.PUBLIC_URL + '/fb.json';

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

const rangeToDays = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '1Y': 365,
    '5Y': 365,
    'ALL': 365
};

export class StockView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            current: '1M'
        };
        this.fetchData();
        this.handleRangeSelect = this.handleRangeSelect.bind(this);
    }

    fetchData() {
        fetch(FETCH_URL)
            .then((res) => (res.json()))
            .then((json) => {
                this.processData(json);
            })
    }

    processData(data) {
        var t = 1447286400,
            ret = [],
            dt = 1447372800 - t;

        var dates = data.Dates.map((date) => (
            moment(date).valueOf()
        ));

        data.Elements[0].DataSeries.close.values.forEach((price, ind) => {
            ret.push([dates[ind], price]);
        });
        this.setState({data: ret});
    }

    handleRangeSelect(selected) {
        this.setState({current: selected});
    }

    render() {
        if (this.state.data)
            config.series[0].data = this.state.data.slice(0-rangeToDays[this.state.current]);
        return (
            <div className="StockView">
                <Price value={119.43} smallDecimals smallDollar/>
                <PriceChange change={1.85} percent={1.53}/>
                <ReactHighStock className="StockView-graph" config={config}/>
                <div className="menu">
                    <StockRangeSelector
                        current={this.state.current}
                        handleClick={this.handleRangeSelect}
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
