import {actionTypes} from '../actions/campaigns';
import { updateObject } from '../../shared/utility';

const initialState = {
    campaignsTableViewModel: [],
};

const fetchCampaigns = ( state, action ) => {
    return updateObject( state, {
        campaignsTableViewModel: action.payload,
    } );
};

const AddCampaigns = ( state, action ) => {
    return updateObject( state, {
        campaignsTableViewModel: action.payload,
    } );
};

const campaignsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CAMPAIGNS: return fetchCampaigns( state, action );
        case actionTypes.ADD_CAMPAIGNS: return AddCampaigns( state, action );
        default: return state;
    }
};

export default campaignsReducer;