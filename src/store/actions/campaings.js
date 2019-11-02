import axios from 'axios';
import { fetchUsersSuccess } from './users'
import { between, currencyFormat } from '../../shared/utility'

// Constants
export const actionTypes = {
    FETCH_CAMPAIGNS_START: 'FETCH_CAMPAIGNS_START',
    FETCH_CAMPAIGNS_SUCCESS: 'FETCH_CAMPAIGNS_SUCCESS',
    FETCH_CAMPAIGNS_FAIL: 'FETCH_CAMPAIGNS_FAIL'
};

// Action Creators
const fetchCampaignsSuccess = (campaignsData) => {
    return {
        type: actionTypes.FETCH_CAMPAIGNS_SUCCESS,
        payload: campaignsData
    };
};

const fetchCampaignsFail = (error) => {
    return {
        type: actionTypes.FETCH_CAMPAIGNS_FAIL,
        error: error
    };
};

const fetchCampaignsStart = () => {
    return {
        type: actionTypes.FETCH_CAMPAIGNS_START
    };
};

const processData = function (consumerData, usersData) {
    let users = {}
    usersData.forEach((data) => { 
        users[data.id] = data;
    })
    const processedData = consumerData.map((data) => {
        let row = { ...data };
        row.username = users[row.userId] ? users[row.userId].name : 'Unknown User';
        row.status = between(row.startDate,row.endDate) ? 'Active':'Inactive';
        row.formattedBudget = currencyFormat(row.Budget);
        return row;
    })
    return processedData;
}
export const fetchCampaigns = () => {
    return dispatch => {
        dispatch(fetchCampaignsStart());
        const campaigns = axios.get('/campaigns.json')
        const users = axios.get('https://jsonplaceholder.typicode.com/users')
        Promise.all([campaigns, users]).then((data) => {
            const campaignlist = data[0].data;
            const userList = data[1].data;
            dispatch(fetchUsersSuccess(userList));
            const result = processData(campaignlist, userList);
            dispatch(fetchCampaignsSuccess(result));

        }).catch(err => {
            dispatch(fetchCampaignsFail(err));
        })
    };
};
