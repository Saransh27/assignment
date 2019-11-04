import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const Search = props => {
    const searchHandler = e => {
        const { onSearch } = props;
        onSearch(e.target.value);
    };

    const { text } = props;
    return (
        <div className="main row">
            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback" />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search By Campaign Name"
                    value={text}
                    onChange={e => searchHandler(e)}
                />
            </div>
        </div>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};
export default Search;
