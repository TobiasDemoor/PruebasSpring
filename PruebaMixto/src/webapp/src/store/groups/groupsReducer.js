import {actionTypes} from "./groupsActions";

const stateInit = {
    isLoading: true,
    groups: [],
    error: undefined
};

export default (state = stateInit, {type, payload, error}) => {
    let newGroups;
    switch (type) {
        case actionTypes.groupsRequest:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case actionTypes.groupsError:
            return {
                ...state,
                isLoading: false,
                error
            };
        case actionTypes.loadGroupsSuccess:
            return {
                ...state,
                isLoading: false,
                groups: payload.groups,
                error: undefined
            };
        case actionTypes.loadGroupSuccess:
            return {
                ...state,
                isLoading: false,
                item: payload.item,
                error: undefined
            };
        case actionTypes.removeGroupSuccess:
            newGroups = state.groups.filter(group => group.id !== payload.removedId);
            return {
                ...state,
                isLoading: false,
                groups: newGroups
            };
        case actionTypes.editGroupSuccess:
            const newGroup = payload.newGroup;
            newGroups = state.groups.filter(group => group.id !== newGroup.id);
            newGroups.push(newGroup);
            return {
                ...state,
                isLoading: false,
                groups: newGroups
            };
        default:
            return state;
    }
}
