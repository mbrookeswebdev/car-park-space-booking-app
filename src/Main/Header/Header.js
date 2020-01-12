import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {connect} from 'react-redux';
import {deleteId} from '../../Actions/deleteIdAction';


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

function Header(props) {

    const classes = useStyles();

    function handleClick() {
        props.deleteId();
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

const mapStateToProps = (state) => {
    return {
        id: state.id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteId: () => {
            dispatch(deleteId())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);