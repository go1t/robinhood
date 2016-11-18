import React, { Component } from 'react';
import ReactHighStock from 'react-highcharts/ReactHighstock';
import classNames from 'classnames';
import '../css/stock-view.css';
import { Button} from './Button';
import { Price, PriceChange } from './Price';
import { StockHeader } from './StockHeader';
import { StockStats } from './StockStats';
import { StockRangeSelector } from './StockRangeSelector';
import 'whatwg-fetch';

var FaCheckCircle = require('react-icons/lib/fa/check-circle');

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
                <StockHeader ticker="FB" description="Facebook Inc - Class A Common Stock"/>
                <StockMenu/>
                <div className="StockView-content">
                    <div className="StockView-left">
                        <div className="StockView-graph">
                            {data ? <Price value={this.state.hovering || data[data.length-1][1]} smallDecimals smallDollar/> : null}
                            {data ? <PriceChange change={diff} percent={percent}/> : null}
                            <ReactHighStock
                                isPureConfig
                                config={config}
                                callback={()=>{
                                    if (data) this.state.rendered = true;
                                }}
                            />
                            <div className="menu">
                                <StockRangeSelector
                                    current={current}
                                    handleClick={handleRangeSelect}
                                />
                            </div>
                        </div>
                        <div className="bottom-section">
                            <StockNewsList/>
                        </div>
                    </div>
                    <div className="StockView-right">
                        <div className="StockView-info">
                            <StockStats/>
                            <div className="Section About">
                                <div className="Section-label">About</div>
                                <p>Facebook, Inc. is a social networking company, which allows people to communicate with their family, friends, and coworkers. Its services include timeline, news feed, messages, lists, ticker and mobile apps. The company products include Facebook, Instagram, Messenger, Whatsapp and Oculus. Facebook was founded by Mark Elliot Zuckerberg, Dustin Moskovitz, Chris R. Hughes, Andrew McCollum and Eduardo P. Saverin on February 4, 2004 and is headquartered in Menlo Park, CA.</p>
                            </div>
                            <CuratedList/>                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

var StockMenu = () => {
    return (
        <div className="StockMenu">
            <div className="left">
            <button className="active">Overview</button>
            <button>News</button>
            <button>Order History</button>
            </div>
            <div>
            <input id="following" type="checkbox"/>
            <label htmlFor="following" className="following" style={{float: 'right'}}/>
            </div>
        </div>
    );
}

var CuratedList = () => {
    return (
        <div className="Section">
            <div className="Section-label">Featured In</div>
            <CuratedListItem/>
        </div>
    );
}

var CuratedListItem = () => {
    return (
        <div className="CuratedListItem">TECH STOCKS PLUMMETED AFTER ELECTION</div>
    );
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
            <div className="Section-label">News</div>
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
