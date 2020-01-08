import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from '../../Login/Login';
import Account from '../../Account/Account';
import AllReservations from "../../AllReservations/AllReservations";
import FindParking from '../../FindParking/FindParking';

class Routes extends Component {

    logIn() {
        this.setState({isLoggedIn: true});
    }

    render() {
        const isLoggedIn = this.props.localStorageExists;
        return (
            <div className="routes">
                <Route
                    exact={isLoggedIn} path={'/'}
                    render={(props) => <Login {...props} logIn={this.props.onLogin}/>}/>
                {isLoggedIn && <Route exact path="/account" component={Account}/>}
                {isLoggedIn && <Route exact path="/reservations" component={AllReservations}/>}
                {isLoggedIn && <Route exact path="/find" component={FindParking}/>}

            </div>
        );
    }
}

export default Routes;