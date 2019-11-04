import axios from 'axios';
import { AddUsers } from './users';
import { between, currencyFormat } from '../../shared/utility';

// Constants
export const actionTypes = {
    ADD_CAMPAIGNS: 'ADD_CAMPAIGNS',
    FETCH_CAMPAIGNS: 'FETCH_CAMPAIGNS',
};

// Action Creators
const fetchCampaigns = campaignsData => {
    return {
        type: actionTypes.FETCH_CAMPAIGNS,
        payload: campaignsData,
    };
};

const addNewCampaigns = campaignsData => {
    return {
        type: actionTypes.ADD_CAMPAIGNS,
        payload: campaignsData,
    };
};

function processData(campaignData, usersData) {
    const users = {};
    usersData.forEach(data => {
        users[data.id] = data;
    });
    const processedData = campaignData.map(data => {
        const row = { ...data };
        row.username = users[row.userId]
            ? users[row.userId].name
            : 'Unknown User';
        row.status = between(row.startDate, row.endDate)
            ? 'Active'
            : 'Inactive';
        row.formattedBudget = currencyFormat(row.Budget);
        return row;
    });
    return processedData;
};

export const addCampaigns = campaignsData => {
    return (dispatch, getState) => {
        const newCampaigns = processData(
            campaignsData,
            getState().users.userList
        );
        const result = [
            ...getState().campaigns.campaignsTableViewModel,
            ...newCampaigns,
        ];
        dispatch(addNewCampaigns(result));
    };
};

export const getCampaigns = () => {
    return dispatch => {
        const campaigns = axios.get('/campaigns.json');
        const users = axios.get('https://jsonplaceholder.typicode.com/users');
        Promise.all([campaigns, users])
            .then(data => {
                const campaignlist = data[0].data;
                const userList = data[1].data;
                const result = processData(campaignlist, userList);
                dispatch(AddUsers(userList));
                dispatch(fetchCampaigns(result));
            })
            .catch(err => {
                console.error('error:', err);
                // show some toastr as per business requirement
            });
    };
};
