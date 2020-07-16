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
        dispatch({type: actionTypes.loadGroupRequest});
        groupsServices.loadGroup(id)
            .then(
                response => {
                    console.log(response);
                    dispatch({
                        type: actionTypes.loadGroupSuccess,
                        payload: {
                            item: response
                        }
                    })
                }
            )
            .catch(
                error => dispatch({
                    type: actionTypes.loadGroupError,
                    error
                })
            );
    }
}

export function loadEmptyGroup() {
    return {
        type: actionTypes.loadGroupsSuccess,
        payload: {
            item: {
                name: '',
                address: '',
                city: '',
                stateOrProvince: '',
                country: '',
                postalCode: ''
            }
        }
    };
}

export function removeGroup(id) {
    return function(dispatch, getState) {
        // TODO
        groupsServices.removeGroup(getState().user.csrfToken, id).then();
    }
}

export function submitGroup(item) {

}

