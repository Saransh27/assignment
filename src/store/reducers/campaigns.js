import {actionTypes} from '../actions/campaings';
import { updateObject } from '../../shared/utility';

const initialState = {
    campaignsTableViewModel: [],
    loading: false,
    error: {}
};

const fetchCampaignsStart = ( state ) => {
    return updateObject( state, { loading: true } );
};

const fetchCampaignsSuccess = ( state, action ) => {
    return updateObject( state, {
        campaignsTableViewModel: action.payload,
        loading: false
    } );
};

const fetchCampaignsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const campaignsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CAMPAIGNS_START: return fetchCampaignsStart( state, action );
        case actionTypes.FETCH_CAMPAIGNS_SUCCESS: return fetchCampaignsSuccess( state, action );
        case actionTypes.FETCH_CAMPAIGNS_FAIL: return fetchCampaignsFail( state, action );
        default: return state;
    }
};

export default campaignsReducer;