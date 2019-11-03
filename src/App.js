import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import * as actions from './store/actions/index';
import Search from './component/Search/Search';
import Campaigns from './container/Campaign/Campaign';
import { between } from './shared/utility';
import moment from 'moment';
import 'react-table/react-table.css'

class App extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			searchKeyword: '',
			startDate: '',
			endDate: '',
			data: props.campaignsData
		}
		this.setStartDate = this.setStartDate.bind(this);
		this.setEndDate = this.setEndDate.bind(this);
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		this.props.onGetCampaigns();
		window.AddCampaigns = (campdata) => {
			this.props.onaddCampaigns(campdata);
		}
	}

	componentWillReceiveProps(nextprops) {
		if (this.props.campaignsData !== nextprops.campaignsData) {
			this.setState({ data: nextprops.campaignsData })
		}
	}

	filterData(startDate, endDate, campaignsData) {
		const sdformatted = moment(startDate).format('MM/DD/YYYY');
		const edformatted = moment(endDate).format('MM/DD/YYYY');
		let filteredData = campaignsData.filter(
			(data) => {
				return between(sdformatted, edformatted, moment(data.startDate, 'MM/DD/YYYY')) || between(sdformatted, edformatted, moment(data.endDate, 'MM/DD/YYYY'))
			});
		return filteredData;
	}

	setStartDate(startDate) {
		const { endDate } = this.state;
		if (endDate) {
			this.setState({ data: this.filterData(startDate, endDate, this.props.campaignsData), startDate });
		}
		else {
			this.setState({ startDate });
		}
	}

	setEndDate(endDate) {
		const { startDate } = this.state;
		if (startDate) {
			this.setState({ data: this.filterData(startDate, endDate, this.props.campaignsData), endDate });
		} else {
			this.setState({ endDate });
		}
	}

	search(val) {
		if (!val) {
			this.setState({ data: this.props.campaignsData });
		}
		else {
			let filteredData = this.props.campaignsData.filter((data) => data.name.indexOf(val) === 0);
			this.setState({ data: filteredData });
		}
	}
	render() {
		const { startDate, endDate, data } = this.state
		return (
			<div className="container">
				<div style={{ margin: '10px 0px 10px 0px' }} className='row'>
					<DatePicker
						selected={startDate}
						dateFormat="MM/dd/yyyy"
						onChange={date => this.setStartDate(date)}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						maxDate={endDate}
						placeholderText='Start Date'
					/><span style={{ marginLeft: '5px' }}></span>
					<DatePicker
						selected={endDate}
						dateFormat="MM/dd/yyyy"
						onChange={date => this.setEndDate(date)}
						selectsEnd
						endDate={endDate}
						minDate={startDate}
						placeholderText='End Date'
					/>
				</div>
				<Search onSearch={this.search} />
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
		onaddCampaigns: (data) => dispatch(actions.addCampaigns(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


