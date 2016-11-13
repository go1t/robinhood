import React, { Component } from 'react';
import classNames from 'classnames';

const LABELS = ['1D', '1W', '1M', '3M', '1Y', '5Y', 'ALL'];

const RangeButton = ({label, active, disabled, handleClick}) => {
    var btnClass = classNames('range-btn', {
        'range-btn--active': active,
        'color': !active,
        'range-btn--disabled': disabled
    });
    return (
        <button disabled={disabled} className={btnClass} onClick={handleClick}>
            {label}
        </button>
    );
};

export const StockRangeSelector = ({current, handleClick}) => {
    return (
        <div className="StockRangeSelector">
            {
                LABELS.map((label) => (
                    <RangeButton
                        label={label}
                        handleClick={() => {
                            handleClick(label);
                        }}
                        active={current == label}
                        disabled={label == '1D' || label == '5Y'}
                    />
                ))
            }
        </div>
    );
}
