import React from 'react';
import './Search.css';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.searchHandler = this.searchHandler.bind(this);
    }
    searchHandler(e) {
        this.setState({ searchText: e.target.value });
        this.props.onSearch(e.target.value);
    }
    render() {
        return (
            <div className="main row">
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control" placeholder="Search" 
                    value={this.state.searchText} onChange={(e)=>this.searchHandler(e)} />
                </div>
                </div>
        );
    }
}
export default Search;