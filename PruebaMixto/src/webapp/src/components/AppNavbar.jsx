import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Button, Grow, Popper, ClickAwayListener, MenuList, MenuItem} from '@material-ui/core'

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.handleListKeyDown = this.handleListKeyDown.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    close() {
        this.setState({
            isOpen: false
        })
    }

    handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.close();
        }
    }

    render() {
        const anchorRef = React.useRef(null);
        const isOpen = this.state.isOpen;
        const {toggle, close, handleListKeyDown} = this.state;
        return (
            <AppBar color="dark" dark expand="md">
                <Button tag={Link} to="/">Home</Button>
                <Button
                    ref={anchorRef}
                    aria-controls={isOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={toggle}
                >
                    Toggle Menu Grow
                </Button>
                <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <ClickAwayListener onClickAway={close}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={close}>Profile</MenuItem>
                                    <MenuItem onClick={close}>My account</MenuItem>
                                    <MenuItem onClick={close}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Grow>
                    )}
                </Popper>
            </AppBar>
        );
    }
}

export default AppNavbar;