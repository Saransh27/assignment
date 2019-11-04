import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(e) {
        const { onSearch } = this.props;
        this.setState({ searchText: e.target.value });
        onSearch(e.target.value);
    }

    render() {
        const { searchText } = this.state;
        return (
            <div className="main row">
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback" />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Campaign Name"
                        value={searchText}
                        onChange={e => this.searchHandler(e)}
                    />
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
export default Search;
