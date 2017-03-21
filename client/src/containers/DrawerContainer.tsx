import { connect } from 'react-redux';
import Drawer, { DrawerProps } from '../components/Drawer';
import { State } from '../reducers/index';
import { push } from 'react-router-redux';
import { toggleDrawer } from '../actions/drawer';

function mapStateToProps(state: State): DrawerProps {
    return {
      open: state.drawer.open,
      lessons: Object.keys(state.lesson).map((id: any) => {
        return {
            id,
            title: state.lesson[id].title,
        };
      }),
    };
}

function mapDispatchToProps(dispatch: any): {} {
    return {
        onRequestChange: (open: boolean) => dispatch(toggleDrawer(open)),
        onClickLesson: (id: number) => {
            dispatch(push(`/lesson/${id}`));
            dispatch(toggleDrawer(false));
        },
    };
}

const DrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer);

export default DrawerContainer;
