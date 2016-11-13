import React, { Component } from 'react';
import moment from 'moment';
import { Nav } from './components/Nav';
import { Leftbar } from './components/Sidebar';
import { StockView } from './components/StockView';
import './App.css';

const FETCH_URL = process.env.PUBLIC_URL + '/fb.json';

const rangeToDays = {
    '1D': 1,
    '1W': 7,
    '1M': 22,
    '3M': 65,
    '1Y': 256,
    '5Y': 365,
    'ALL': 365
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            current: '1Y'
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
        let dataInRange;
        let negative = true, diff = 0;
        if (this.state.data) {
            dataInRange = this.state.data.slice(0-rangeToDays[this.state.current]);
            diff = dataInRange[dataInRange.length-1][1] - dataInRange[0][1];
        }
        var appClass = "App" + (diff < 0 ? " negative": '');
        return (
          <div className={appClass}>
            <Leftbar/>
            <div className="content">
                <Nav/>
                <StockView
                    data={dataInRange}
                    current={this.state.current}
                    handleRangeSelect={this.handleRangeSelect}
                    diff={diff}
                />
            </div>
            <div className="Rightbar"/>
          </div>
        );
    }
}

export default App;
