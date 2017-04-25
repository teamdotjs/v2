export const SET_OPEN = 'SET_OPEN';

export interface DrawerState {
    open: boolean;
}

export const drawerReducer = (state: DrawerState, action: any): DrawerState => {
    if (state === undefined) return { open: false };
    switch (action.type) {
        case SET_OPEN:
          return {
            ...state,
            open: action.open
          };
        default:
            return state;
    }
};
