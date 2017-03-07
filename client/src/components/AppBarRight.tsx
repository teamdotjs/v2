import * as React from 'react';

import {
    RaisedButton,
    MenuItem,
    Menu,
    Popover,
} from 'material-ui';

export interface AppBarRightProps {
    isLoggedIn: boolean;
    userName?: string;
    onLogoutClick?: () => void;
    error?: string;
}

export interface PopoverState {
    open: boolean;
    anchorEl: any;
}

export class AppBarRight extends React.Component<AppBarRightProps, PopoverState > {
    constructor(props: AppBarRightProps) {
        super(props);
        this.context.state = {
            open: false,
        };
    }

    handleTouchTap = (event: Event) => {
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
            <RaisedButton
            label={this.props.userName}
            />
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            >
            <Menu>
                <MenuItem primaryText='UserProfile' />
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