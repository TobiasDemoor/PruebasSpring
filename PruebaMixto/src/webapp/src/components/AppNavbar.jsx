import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core'
import Dropdown from './Dropdown';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    }
})

function AppNavbar(props) {
    const {classes} = props;
    return (
        <nav className={classes.root}>
            <AppBar position="static" color="primary" expand="md">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        JUG
                    </Typography>
                    <Button tag={Link} to="/">Home</Button>
                    <Dropdown/>
                </Toolbar>
            </AppBar>
        </nav>
    );

}

export default withStyles(styles)(AppNavbar);