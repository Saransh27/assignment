import axios from 'axios';
// Constants
export const actionTypes = {
    FETCH_USERS_START : 'FETCH_USERS_START',
    FETCH_USERS_SUCCESS : 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAIL : 'FETCH_USERS_FAIL'
};

// Action Creators
export const fetchUsersSuccess = ( usersData ) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        payload: usersData
    };
};

const fetchUsersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    };
};

const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersStart());
        axios.get( 'https://jsonplaceholder.typicode.com/users') //
            .then( res => {
                console.log('--users--'+res.data+'-------');
                dispatch(fetchUsersSuccess(res.data));
                return res;
            } )
            .catch( err => {
                dispatch(fetchUsersFail(err));
            } );
    };
};

