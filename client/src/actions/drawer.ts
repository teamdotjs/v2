import { State } from '../reducers';
import { SET_OPEN } from '../reducers/drawerReducer';

export function toggleDrawer(open?: boolean) {
  return (dispatch: any, getState: () => State) => {
    const newOpen = open || !getState().drawer.open;
    dispatch({
      type: SET_OPEN,
      open: newOpen
    });
  };
}