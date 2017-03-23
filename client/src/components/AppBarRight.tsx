import * as React from 'react';

import {
    FlatButton,
    MenuItem,
    Menu,
    Popover,
} from 'material-ui';

export interface AppBarRightProps {
    userName?: string;
    onLogoutClick?: () => void;
}

export interface PopoverState {
    open: boolean;
    anchorEl?: any;
}

export class AppBarRight extends React.Component<AppBarRightProps, PopoverState > {
    constructor(props: AppBarRightProps) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleTouchTap = (event: any) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
      let loggedIn = (
        <div style={{marginTop: '6px'}}>
            <FlatButton
            style={{color: 'white'}}
            label={this.props.userName || ''}
            onTouchTap={this.handleTouchTap}
            />
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            >
            <Menu>
                <MenuItem primaryText='User Profile' />
                <MenuItem primaryText='Sign out'
                onTouchTap={this.props.onLogoutClick} />
            </Menu>
            </Popover>
        </div>
        );

        return this.props.userName ? loggedIn : <div/>;
    };
};
export default AppBarRight;