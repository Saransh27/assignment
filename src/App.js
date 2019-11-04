import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import * as actions from './store/actions/index';
import Search from './component/Search/Search';
import Campaigns from './container/Campaign/Campaign';
import { between } from './shared/utility';
import 'react-table/react-table.css';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            startDate: '',
            endDate: '',
            data: props.campaignsData,
        };
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        const { onGetCampaigns, onaddCampaigns } = this.props;
        onGetCampaigns();
        window.AddCampaigns = campdata => {
            onaddCampaigns(campdata);
        };
    }

    componentWillReceiveProps(nextprops) {
        const { campaignsData } = this.props;
        if (campaignsData !== nextprops.campaignsData) {
            this.setState({ data: nextprops.campaignsData });
        }
    }

    filterData(startDate, endDate, campaignsData) {
        const sdformatted = moment(startDate).format('MM/DD/YYYY');
        const edformatted = moment(endDate).format('MM/DD/YYYY');
        const filteredData = campaignsData.filter(data => {
            return (
                between(
                    sdformatted,
                    edformatted,
                    moment(data.startDate, 'MM/DD/YYYY')
                ) ||
                between(
                    sdformatted,
                    edformatted,
                    moment(data.endDate, 'MM/DD/YYYY')
                )
            );
        });
        return filteredData;
    }

    setStartDate(startDate) {
        const { endDate } = this.state;
        const { campaignsData } = this.props;
        if (endDate) {
            this.setState({
                data: this.filterData(startDate, endDate, campaignsData),
                startDate,
            });
        } else {
            this.setState({ startDate, searchText: '', data: campaignsData });
        }
    }

    setEndDate(endDate) {
        const { campaignsData } = this.props;
        const { startDate } = this.state;
        if (startDate) {
            this.setState({
                data: this.filterData(startDate, endDate, campaignsData),
                endDate,
            });
        } else {
            this.setState({ endDate, searchText: '', data: campaignsData });
        }
    }

    search(keyword) {
        const { campaignsData } = this.props;
        if (!keyword) {
            this.setState({ data: campaignsData, searchText: '' });
        } else {
            const filteredData = campaignsData.filter(
                data =>
                    data.name.toUpperCase().indexOf(keyword.toUpperCase()) === 0
            );
            this.setState({
                data: filteredData,
                startDate: '',
                endDate: '',
                searchText: keyword,
            });
        }
    }

    render() {
        const { startDate, endDate, data, searchText } = this.state;
        return (
            <div className="container">
                <div style={{ margin: '10px 0px 10px 0px' }} className="row">
                    <DatePicker
                        selected={startDate}
                        dateFormat="MM/dd/yyyy"
                        onChange={date => this.setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={endDate}
                        placeholderText="Start Date"
                    />
                    <span style={{ marginLeft: '5px' }} />
                    <DatePicker
                        selected={endDate}
                        dateFormat="MM/dd/yyyy"
                        onChange={date => this.setEndDate(date)}
                        selectsEnd
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End Date"
                    />
                </div>
                <Search onSearch={this.search} text={searchText} />
                <Campaigns campaignsData={data} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        campaignsData: state.campaigns.campaignsTableViewModel,
        usersList: state.users.usersList,
        loading: state.campaigns.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCampaigns: () => dispatch(actions.getCampaigns()),
        onaddCampaigns: data => dispatch(actions.addCampaigns(data)),
    };
};

App.propTypes = {
    campaignsData: PropTypes.array.isRequired,
    onGetCampaigns: PropTypes.func.isRequired,
    onaddCampaigns: PropTypes.func.isRequired,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
