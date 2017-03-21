import * as React from 'react';
import MUIDrawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

let dummy = new MUIDrawer();
type MUIDrawerProps = typeof dummy.props;
export interface DrawerProps extends MUIDrawerProps {
  lessons: {id: number, title: string}[];
  onClickLesson?: (id: number) => void;
}

const DrawerContainer = (props: DrawerProps) => {
    const lessons = props.lessons.map(({ id, title }) => {
      return <MenuItem primaryText={ title } onClick={ () => {
        if (props.onClickLesson !== undefined) {
          props.onClickLesson(id);
        }
      }}/>;
    });
    return (<MUIDrawer docked={false} {...props}>
      <AppBar onLeftIconButtonTouchTap={() => {
        if(props.onRequestChange !== undefined) {
          props.onRequestChange(false, '');
        }
      }} />
      <Menu>
        <MenuItem primaryText='Your Lessons' />
        <Divider />
        {lessons}
      </Menu>
  </MUIDrawer>);
};

export default DrawerContainer;