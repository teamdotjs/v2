export const sessionReducer = (state = {uname: undefined}, _action: any) => {
    if (state === undefined) {
        return {uname: undefined};
    }
    switch (_action.type) {
        case 'login':
            return {
                uname: _action.uname
            };
        default:
            return state;
    }
};