import { connect } from 'react-redux';
import Drawer, { DrawerProps } from '../components/Drawer';
import { State } from '../reducers/index';
import { push } from 'react-router-redux';
import { loadCourses } from '../actions/course';
import { toggleDrawer } from '../actions/drawer';

function mapStateToProps(state: State): Partial<DrawerProps> {
    return {
        open: state.drawer.open,
        courses: Object.keys(state.course).map((id: any) => state.course[id]),
    };
}

function mapDispatchToProps(dispatch: any): Partial<DrawerProps> {
    return {
        onRequestChange: (open: boolean) => dispatch(toggleDrawer(open)),
        onClickCourse: (id: number) => {
            dispatch(push(`/course/${id}`));
            dispatch(toggleDrawer(false));
        },
        onLoad() {
            dispatch(loadCourses());
        },
    };
}

const DrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer);

export default DrawerContainer;
