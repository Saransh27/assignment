import {actionTypes} from '../actions/users';
import { updateObject } from '../../shared/utility';

const initialState = {
    userList: [],
};

export const addUsers = ( state, action ) => {
    return updateObject( state, {
        userList: action.payload,
    } );
};

const usersReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_USERS: return addUsers( state, action );
        default: return state;
    }
};

export default usersReducer;