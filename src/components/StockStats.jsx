import React, { Component } from 'react';
import '../css/stats.css';

const data = [
    {label: 'OPEN', value: 119.71},
    {label: 'HIGH', value: 120.69},
    {label: 'LOW', value: 118.15},
    {label: '52 WK HIGH', value: 133.50},
    {label: '52 WK LOW', value: 89.37},
    {label: 'VOLUME', value: '17.73M'},
    {label: 'AVG VOL', value: '25.43M'},
    {label: 'MKT CAP', value: '343.02M'},
    {label: 'P/E RATIO', value: 45.95},
    {label: 'DIV/YIELD', value: 0.00},
];

export const StockStats = () => {
    return (
        <div className="Section">
            <div className="Section-label">Stats</div>
            <div className="Stats">
                <div className="Stats-left">
                    {
                        data.slice(0, 5).map(({label, value}) => (
                            <div className='Stats-info'>
                                <span className="Stats-label">{label}</span>
                                <span className="Stats-value">{value}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="Stats-right">
                {
                    data.slice(-5).map(({label, value}) => (
                        <div className='Stats-info'>
                            <span className="Stats-label">{label}</span>
                            <span className="Stats-value">{value}</span>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
};
