import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function Header() {
    const classes = useStyles();
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>Park & Go</Typography>
                    <Button color="inherit" onClick={handleClick}>Logout</Button>
                    <ExitToAppIcon onClick={handleClick} fontSize="large"/>
                </Toolbar>
            </AppBar>
        </div>
    );
}