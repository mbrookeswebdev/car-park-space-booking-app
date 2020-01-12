import React, {Component} from 'react';
import Routes from "./Routes/Routes";
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from "react-redux";
import Login from "../Login/Login";

class Main extends Component {

    render() {
        return (
            <div>
                <Router>
                    {this.props.id ? <Routes/> : <Login/>}
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.id
    }
};

export default connect(mapStateToProps)(Main);