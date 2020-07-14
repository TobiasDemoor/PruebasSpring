import * as groupsServices from '../../services/groups.service';

export const actionTypes = {
    loadGroupsRequest: 'LOAD_GROUPS_REQUEST',
    loadGroupsSuccess: 'LOAD_GROUPS_SUCCESS',
    loadGroupsError: 'LOAD_GROUPS_ERROR',

    loadGroupRequest: 'LOAD_GROUP_REQUEST',
    loadGroupSuccess: 'LOAD_GROUP_SUCCESS',
    loadGroupError: 'LOAD_GROUP_ERROR',

    editGroupRequest: 'EDIT_GROUP_REQUEST',
    editGroupSuccess: 'EDIT_GROUP_SUCCESS',
    editGroupError: 'EDIT_GROUP_ERROR',
}

export function loadGroups() {
    return function (dispatch) {
        dispatch({type: actionTypes.loadGroupsRequest});
        groupsServices.loadGroups()
            .then(
                response => dispatch({
                    type: actionTypes.loadGroupsSuccess,
                    payload: { groups: response }
                })
            )
            .catch(
                error => dispatch({
                    type: actionTypes.loadGroupsError,
                    error
                })
            );
    }
}

export function loadGroup(id) {
    return function (dispatch) {
        dispatch({type: actionTypes.loadGroupsRequest});
        groupsServices.loadGroup(id)
            .then(
                response => dispatch({
                    type: actionTypes.loadGroupsSuccess,
                    payload: {
                        [id]: response
                    }
                })
            )
            .catch(
                error => dispatch({
                    type: actionTypes.loadGroupsError,
                    error
                })
            );
    }
}

export function removeGroup(id) {
    return function(dispatch, getState) {
        // TODO
        groupsServices.removeGroup(getState().csrfToken, id).then();
    }
}

export function editGroup(item) {

}

