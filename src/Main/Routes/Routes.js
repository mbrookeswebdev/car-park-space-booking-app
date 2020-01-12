import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from '../../Login/Login';
import Account from '../../Account/Account';
import AllReservations from "../../AllReservations/AllReservations";
import FindParking from '../../FindParking/FindParking';
import {connect} from 'react-redux';

class Routes extends Component {

    render() {
        return (
            <div className="routes">
                <Route exact path="/" component={Login}/>
                <Route exact path="/account" component={Account}/>
                <Route exact path="/reservations" component={AllReservations}/>
                <Route exact path="/find" component={FindParking}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("in mapStateToProps");
    console.log(state);
    return {
        id: state.id
    }
};

export default connect(mapStateToProps)(Routes);