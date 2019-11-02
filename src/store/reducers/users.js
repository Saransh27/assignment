import {actionTypes} from '../actions/campaings';
import { updateObject } from '../../shared/utility';

const initialState = {
    userList: [],
    error:{}
};

const fetchUsersStart = ( state ) => {
    return updateObject( state, { error: {} } );
};

const fetchUsersFail = ( state, action ) => {
    return updateObject( state, { error: action.error } );
};
export const fetchUsersSuccess = ( state, action ) => {
    return updateObject( state, {
        userList: action.payload,
    } );
};

const usersReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USERS_START: return fetchUsersStart( state, action );
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess( state, action );
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail( state, action );
        default: return state;
    }
};

export default usersReducer;