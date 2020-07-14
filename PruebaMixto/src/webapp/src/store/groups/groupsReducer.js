import {actionTypes} from "./groupsActions";

const stateInit = {
    isLoading: true,
    groups: [],
    error: undefined
};

export default (state = stateInit, {type, payload, error}) => {
    switch (type) {
        case actionTypes.loadGroupsRequest:
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        case actionTypes.loadGroupsSuccess:
            return {
                ...state,
                isLoading: false,
                groups: payload.groups,
                error: undefined
            }
        case actionTypes.loadGroupsError:
            return {
                ...state,
                isLoading: false,
                error
            }
        case actionTypes.loadGroupRequest:
            return {
                ...state,
                isLoading: true,
                error: undefined
            }
        case actionTypes.loadGroupSuccess:
            return {
                ...state,
                isLoading: false,
                ...payload,
                error: undefined
            }
        case actionTypes.loadGroupError:
            return {
                ...state,
                isLoading: false,
                error
            }
        default:
            return state;
    }
}
