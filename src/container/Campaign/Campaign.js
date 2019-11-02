import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import * as actions from '../../store/actions/index';
import DataTable from '../../component/Datatable/index';
import StatusCell from '../../component/Campaigns/Status/StatusCell';
import Search from '../../component/Search/Search';
import {between} from '../../shared/utility';
import ReactTable from 'react-table'
import moment from 'moment';
import 'react-table/react-table.css'


class Campaign extends React.PureComponent {
  constructor(props) {
    super(props)
    const model = {
      headers: [
        {
          thClass: 'sorting',
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'User Name',
          accessor: 'username',
        },
        {
          Header: 'Start Date',
          accessor: 'startDate',
        },
        {
          Header: 'End Date',
          accessor: 'endDate',
        },
        {
          Header: 'Status',
          accessor: 'status'
        },
        {
          Header: 'Budget',
          accessor: 'formattedBudget',
        }
      ],
      data: props.campaignsData,
    };

    this.state = {
      searchKeyword: '',
      startDate: '',
      endDate: '',
      headers: model.headers,
      data:props.campaignsData
    }
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.props.onFetchCampaigns();
  }
  componentWillReceiveProps(nextprops){
    if(this.props.campaignsData !== nextprops.campaignsData){
      this.setState({data:nextprops.campaignsData})
    }
  }

  filterData(startDate,endDate,campaignsData){
    const sdformatted = moment(startDate).format('MM/DD/YYYY');
    const edformatted = moment(endDate).format('MM/DD/YYYY');
    let filteredData = campaignsData.filter(
      (data) => {
        return between(sdformatted, edformatted, moment(data.startDate,'MM/DD/YYYY')) || between(sdformatted, edformatted, moment(data.endDate,'MM/DD/YYYY'))
      });
      return filteredData;
  }

  setStartDate(startDate) {
    const { endDate } = this.state;
    if (endDate) {
      this.setState({ data: this.filterData(startDate,endDate,this.props.campaignsData), startDate });
    }
    else {
      this.setState({ startDate });
    }
  }

  setEndDate(endDate) {
    const { startDate } = this.state;
    if (startDate) {
      this.setState({ data: this.filterData(startDate,endDate,this.props.campaignsData), endDate });
    } else {
      this.setState({ endDate });
    }
  }

  search(val){
    if(!val)
    {
      this.setState({data:this.props.campaignsData});
    }
    else{
    let filteredData = this.props.campaignsData.filter((data)=>data.name.indexOf(val)===0);
    this.setState({data:filteredData});
    }
  }
  render() {
    const { headers, startDate, endDate,data } = this.state
    const { campaignsData } = this.props;
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
          <Search onSearch={this.search}/>
        <ReactTable
          data={data}
          columns={headers}
          defaultPageSize={10}
          minRows={5}
          getTheadThProps={() => {
            return {
              style: {
                backgroundColor: 'lightblue',
                fontWeight: 'bold'
              }
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campaignsData: state.campaigns.campaignsTableViewModel,
    loading: state.campaigns.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCampaigns: () => dispatch(actions.fetchCampaigns())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);

