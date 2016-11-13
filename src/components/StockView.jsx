import React, { Component } from 'react';
import ReactHighStock from 'react-highcharts/ReactHighstock';
import classNames from 'classnames';
import '../css/stock-view.css';
import { Price, PriceChange } from './Price';
import { StockRangeSelector } from './StockRangeSelector';
import 'whatwg-fetch';


var config = {
    colors: ['#29CA96'],
    navigator: {
        enabled: false
    },
    plotOptions: {
        series: {
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            }
        }
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
    tooltip: {
        animation: false,
        hideDelay: 0,
        enabled: true
    },
    xAxis: {
        visible: false
    },
    yAxis: {
        visible: false
    }
};


export class StockView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rendered: false,
            hovering: null
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data != this.props.data || nextProps.current != this.props.current) {
            config = {...config}
            return true;
        }
        return nextState.hovering != this.state.hovering;
    }

    componentWillMount() {
        config.series = [{
            name: 'FB',
            point: {
                events: {
                    mouseOver: (event) => {
                        this.setState({hovering: event.target.y})
                    },
                    mouseOut: (event) => {
                        this.setState({hovering: null})
                    }
                }
            },
            tooltip: {
                valueDecimals: 2
            }
        }];
    }

    render() {
        var { data, current, handleRangeSelect, diff } = this.props;
        config.series[0].data = data;
        if (diff < 0) {
            config.colors[0] = "#f45531";
        } else {
            config.colors[0] = '#29CA96';
        }

        if (data && this.state.hovering) {
            diff = this.state.hovering - data[0][1];
        }
        var percent = data ? diff*100/data[0][1] : 0;

        if (!this.state.rendered) {
            config = {...config};
        }
        return (
            <div className="StockView">
                {data ? <Price value={this.state.hovering || data[data.length-1][1]} smallDecimals smallDollar/> : null}
                {data ? <PriceChange change={diff} percent={percent}/> : null}
                <ReactHighStock
                    className="StockView-graph"
                    isPureConfig
                    config={config}
                    callback={()=>{
                        if (data) this.state.rendered = true;
                    }}/>
                <div className="menu">
                    <StockRangeSelector
                        current={current}
                        handleClick={handleRangeSelect}
                    />
                </div>
                <div>
                    <StockNewsList/>
                </div>
            </div>
        );
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
