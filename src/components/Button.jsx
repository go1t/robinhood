import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/button.css';

export const Button = ({text}) => {
    return (
        <button className='btn color-bg'>{text}</button>
    );
};
