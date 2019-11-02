// actionTypes
export const actionTypes = {
    ADD_USERS:'ADD_USERS'
};

export const AddUsers = (usersData)=>{
    return {
        type: actionTypes.ADD_USERS,
        payload: usersData
    };
}
