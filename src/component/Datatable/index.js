import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './datatable.css';

export default class DataTable extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			headers: props.headers,
			data: props.data,
			descending: null,
		};

		this.keyField = props.keyField || 'id';
		this.noData = props.noData || 'No records found!';
		this.width = props.width || '100%';
	}
	renderTableHeader = () => {
		const { headers } = this.state;
		headers.sort((a, b) => {
			if (a.index > b.index) return 1;
			return -1;
		});

		const headerView = headers.map((header, index) => {
			const { title, headerTemplate, thClass } = header;
			const cleanTitle = header.accessor;
			const { width } = header;

			return (
				<th
					key={cleanTitle || index}
					ref={th => (this[cleanTitle] = th)}
					style={{ width }}
					data-col={cleanTitle}
				>
					<span draggable data-col={cleanTitle} className={`header-cell ${thClass}`}>
						{headerTemplate ? headerTemplate() : title}
					</span>
				</th>
			);
		});

		return headerView;
	};

	renderNoData = () => {
		return (
			<tr>
				<td colSpan={this.props.headers.length}>{this.noData}</td>
			</tr>
		);
	};

	renderContent = () => {
		const { headers, data } = this.state;
		let row = {};
		const contentView = data.map((obj, rowIdx) => {
			row = { ...obj };
			const rowID = row[this.keyField] || rowIdx;
			const { edit } = this.state;

			const tds = headers.map((header, index) => {
				let content = row[header.accessor];
				const { cell } = header;
				if (cell) {
					if (typeof cell === 'object') {
						if (cell.type === 'image' && content) {
							content = <img style={cell.style} src={content} />;
						}
					} else if (typeof cell === 'function') {
						content = cell(row);
					}
				}

				return (
					<td key={rowID + index} data-id={rowID} data-row={rowIdx}>
						{content}
					</td>
				);
			});
			return (
				<tr key={rowID} id={rowIdx}>
					{tds}
				</tr>
			);
		});
		return contentView;
	};

	onSort = e => {
		const data = this.state.data.slice(); // Give new array
		const colIndex = ReactDOM.findDOMNode(e.target).cellIndex;
		const colTitle = e.target.dataset.col;
		const descending = !this.state.descending;
		const currentHeader = this.state.headers.find(obj => {
			return obj.accessor === colTitle || obj.title === colTitle;
		});
		const sortMethod = currentHeader ? currentHeader.sortMethod : '';
		if (sortMethod) {
			data.sort((a, b) => {
				return sortMethod(a, b, descending);
			});
		} else {
			data.sort((a, b) => {
				let sortVal = 0;
				if (a[colTitle] < b[colTitle]) {
					sortVal = -1;
				} else if (a[colTitle] > b[colTitle]) {
					sortVal = 1;
				}
				if (descending) {
					sortVal *= -1;
				}
				return sortVal;
			});
		}
		this.setState({
			data,
			descending,
		});
	};

	renderCustomFilters = () => {
		const { headers } = this.state;

		const filterView = headers.map((header, idx) => {
			// Get the header ref.
			const { filterTemplate } = header;
			const thClass = header.thClass || '';

			return (
				<th key={idx}>
					<span className={`header-cell ${thClass}`}>{filterTemplate ? filterTemplate() : null}</span>
				</th>
			);
		});
		return filterView;
	};

	renderSearch = () => {
		const { search, headers } = this.state;
		if (!search) {
			return null;
		}

		const searchInputs = headers.map((header, idx) => {
			const hdr = this[header.accessor];
			const inputId = `inp${header.accessor}`;

			return (
				<td key={idx}>
					<input
						type="text"
						ref={input => (this[inputId] = input)}
						style={{
							width: `${hdr.clientWidth - 17}px`,
						}}
						data-idx={idx}
					/>
				</td>
			);
		});

		return <tr onChange={this.onSearch}>{searchInputs}</tr>;
	};

	renderTable = () => {
		const { title, enableCustomFilter } = this.props;
		const tableClass = this.props.tableClass || '';
		const headerView = this.renderTableHeader();
		const customFilterView = this.renderCustomFilters();
		const contentView = this.state.data.length > 0 ? this.renderContent() : this.renderNoData();

		return (
			<div className="rdt">
				<table id="rdt" className={`${tableClass} inner-table`}>
					{title && <caption className="caption">{title}</caption>}
					<thead id="rdt-head" onClick={this.onSort}>
						<tr id="header-row">{headerView}</tr>
						{enableCustomFilter ? <tr id="customFilter-row">{customFilterView}</tr> : null}
					</thead>
					<tbody id="rdt-body">
						{this.renderSearch()}
						{contentView}
					</tbody>
				</table>
			</div>
		);
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			headers: nextProps.headers,
			data: nextProps.data,
			descending: this.props.descending,
		});
	}

	render() {
		return <div> {this.renderTable()}</div>;
	}
}

DataTable.defaultProps = {
	tableClass: '',
	enableCustomFilter: false,
	title: '',
	width: '100',
};
DataTable.propTypes = {
	data: PropTypes.array.isRequired,
	headers: PropTypes.array.isRequired,
	title: PropTypes.string,
	enableCustomFilter: PropTypes.bool,
	tableClass: PropTypes.string,
	keyField: PropTypes.string.isRequired,
	width: PropTypes.string,
};
