/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './WithSpinner.css';

function WithSpinner(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return <div className="Spinner">Loading...</div>;
    };
}

WithSpinner.defaultProps = {
    isLoading: false,
    props: {},
};
WithSpinner.PropTypes = {
    isLoading: PropTypes.bool,
    props: PropTypes.object,
};
export default WithSpinner;
