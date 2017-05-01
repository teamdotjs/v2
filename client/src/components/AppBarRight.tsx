import * as React from 'react';

import {
    FlatButton,
    MenuItem,
    Menu,
    Popover,
    CircularProgress
} from 'material-ui';

export interface AppBarRightProps {
    userName?: string;
    onLogoutClick?: () => void;
    onClickGrades?: () => void;
    loading: boolean;
}

export interface PopoverState {
    open: boolean;
    anchorEl?: any;
}

export class AppBarRight extends React.Component<AppBarRightProps, PopoverState> {
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
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }

    handleLogoutClose = () => {
        this.setState({
            open: false,
        });
        this.props.onLogoutClick ? this.props.onLogoutClick() : '';
    }

    handleGradesClose = () => {
        this.setState({
            open: false,
        });
        this.props.onClickGrades ? this.props.onClickGrades() : '';
    }

    render() {
        return (<div style={{display: 'inline-flex'}}>
            { this.props.loading ?
                <CircularProgress color='white' size={20} style={{margin: 'auto'}} />
                : undefined
            }
              <div style={{ marginTop: '6px' }}>
                <FlatButton
                    style={{ color: 'white' }}
                    label={this.props.userName || ''}
                    children={[]}
                    onTouchTap={this.handleTouchTap}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                >
                  <Menu>
                      <MenuItem primaryText='Grades'
                          onClick={this.handleGradesClose} />
                      <MenuItem primaryText='Sign out'
                          onTouchTap={this.handleLogoutClose} />
                  </Menu>
                </Popover>
            </div>
        </div>);
    };
};
export default AppBarRight;