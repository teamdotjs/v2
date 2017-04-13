
export interface LoadingState {
    [namespace: string]: {
        [type: string]: boolean;
    };
};

export const loadingReducer = (state: LoadingState, action: any): LoadingState => {
    if (state === undefined) return {};
    if (action.type === 'LOADING' && action.namespace !== undefined) {
        return {
            ...state,
            [action.namespace]: {
                ...state[action.namespace],
                [action.action]: action.isLoading,
            },
        };
    }
    return state;
};
