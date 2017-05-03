import * as React from 'react';
import Subheader from 'material-ui/Subheader';
import MUIDrawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

let dummy = new MUIDrawer();
type MUIDrawerProps = typeof dummy.props;

export interface DrawerProps extends MUIDrawerProps {
  docked: boolean;
  courses: {id: number, title: string}[];
  onClickCourse?: (id: number) => void;
  onLoad: () => void;
}

class DrawerContainer extends React.Component<DrawerProps, {}> {
    componentWillMount() {
        if (this.props.onLoad) this.props.onLoad();
    }

    render() {
      const courses = this.props.courses.map(({ id, title }) => {
        return <MenuItem key={id} primaryText={ title } onClick={ () => {
          if (this.props.onClickCourse !== undefined) {
            this.props.onClickCourse(id);
          }
        }}/>;
      });
      return (<MUIDrawer docked={false} {...this.props}>
        <AppBar onLeftIconButtonTouchTap={() => {
          if(this.props.onRequestChange !== undefined) {
            this.props.onRequestChange(false, '');
          }
        }} />
        <Menu>
          <Subheader>Your Courses</Subheader>
          {courses}
        </Menu>
    </MUIDrawer>);
  }
}
export default DrawerContainer;