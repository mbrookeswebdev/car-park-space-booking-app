import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 15
    }
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels className={classes.root}>

            <BottomNavigationAction component={Link}
                                    to="/account"
                                    value="account"
                                    label="Account" icon={<PersonIcon fontSize="large"/>}/>

            <BottomNavigationAction component={Link}
                                    to="/reservations"
                                    value="reservations"
                                    label="Reservations" icon={<EventNoteIcon fontSize="large"/>}/>

            <BottomNavigationAction component={Link}
                                    to="/find"
                                    value="find"
                                    label="Find Parking" icon={<SearchIcon fontSize="large"/>}/>
        </BottomNavigation>
    );
}
