import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

const Campaign = (props) => {
  const { campaignsData, headers } = props;
  return (
    <ReactTable
      data={campaignsData}
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
  );
}

Campaign.defaultProps = {
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
  campaignsData: []
}

Campaign.propTypes = {
  headers: PropTypes.array,
  campaignsData: PropTypes.array
}

export default Campaign;

