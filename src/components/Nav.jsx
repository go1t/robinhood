import React, { Component } from 'react';
import logo from '../Robinhood-icon.jpeg';

export const Nav = () => {
    return (
        <div className="nav">
            <div className="content">
                <img className="logo" src={logo} alt="Robinhood logo"/>
                <div className="right">
                    Saranyu Phusit
                </div>
            </div>
        </div>
    );
};
