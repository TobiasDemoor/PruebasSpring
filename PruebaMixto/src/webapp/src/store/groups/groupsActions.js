import * as groupsServices from '../../services/groups.service';

export const actionTypes = {
    groupsRequest: 'GROUPS_REQUEST',
    groupsError: 'GROUPS_ERROR',

    loadGroupsSuccess: 'LOAD_GROUPS_SUCCESS',
    loadGroupSuccess: 'LOAD_GROUP_SUCCESS',
    removeGroupSuccess: 'REMOVE_GROUP_SUCCESS',
    editGroupSuccess: 'EDIT_GROUP_SUCCESS',
}

const errorAction = (error) => ({
    type: actionTypes.groupsError,
    error: error.message || error
})

export function loadGroups() {
    return function (dispatch) {
        dispatch({type: actionTypes.groupsRequest});
        groupsServices.loadGroups()
            .then(
                response => dispatch({
                    type: actionTypes.loadGroupsSuccess,
                    payload: { groups: response }
                })
            )
            .catch(error => dispatch(errorAction(error)));
    }
}

export function loadGroup(id) {
    return function (dispatch) {
        dispatch({type: actionTypes.groupsRequest});
        groupsServices.loadGroup(id)
            .then(
                response => dispatch({
                    type: actionTypes.loadGroupSuccess,
                    payload: {
                        item: response
                    }
                })
            )
            .catch(error => dispatch(errorAction(error)));
    }
}

export function removeGroup(id) {
    return function(dispatch, getState) {
        dispatch({type: actionTypes.groupsRequest})
        groupsServices.removeGroup(getState().user.csrfToken, id)
            .then(
                () => dispatch({
                    type: actionTypes.removeGroupSuccess,
                    payload: {removedId: id}
                })
            )
            .catch(error => dispatch(errorAction(error)));
    }
}

export function editGroup(item) {
    return function(dispatch, getState) {
        dispatch({type: actionTypes.groupsRequest})
        groupsServices.editGroup(getState().user.csrfToken, item)
            .then(
                response => dispatch({
                    type: actionTypes.editGroupSuccess,
                    payload: {newGroup: response}
                })
            )
            .catch(error => dispatch(errorAction(error)));
    }
}

