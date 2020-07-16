import React from 'react';
import {Button, MenuItem, Menu} from '@material-ui/core';

function Dropdown({
                      id = 'simple-menu',
                  }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <Button
                aria-label="cuenta de usuario actual"
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                Toggle Dropdown
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default Dropdown;
