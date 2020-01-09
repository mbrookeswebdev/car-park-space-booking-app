import React, {Component} from 'react';
import Routes from "./Routes/Routes";
import {BrowserRouter as Router} from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localStorageExists: false
        };
        this.checkLocalStorage = this.checkLocalStorage.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.checkLocalStorage();
    }

    handleLogin() {
        this.setState({localStorageExists: true});
    }

    checkLocalStorage() {
        let token = localStorage.getItem("api_token");
        if (token) {
            this.setState({localStorageExists: true});
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Routes localStorageExists={this.state.localStorageExists} onLogin={this.handleLogin}/>
                </Router>
            </div>
        );
    }
}

export default Main;