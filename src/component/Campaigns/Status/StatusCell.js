import React from 'react';
import PropTypes from 'prop-types';
import './StatusCell.css'

const StatusCell = props => {
	const {
		status,
	} = props;
	let iconClass = '';
	if (status) {
		iconClass = status.toUpperCase() === 'ACTIVE' ? 'active' : 'inactive'
	}
	return (<div className='campaign-status'>
		<span className={iconClass}></span>
		<span>{status}</span>
	</div>
	);
};

StatusCell.defaultProps = {
	status: ''
}
StatusCell.propTypes = {
	status: PropTypes.string,
};

export default StatusCell;
