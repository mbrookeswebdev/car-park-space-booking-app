import React, {Component} from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {Redirect, withRouter} from "react-router-dom";
import uuid from "uuid";
import {connect} from 'react-redux';
import {setId} from '../Actions/setIdAction';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            authorised: null,
            loginCheckDone: false
        };
        this.checkLogin = this.checkLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

    }

    handleClick() {
        this.checkLogin();
    }

    async checkLogin() {
        try {
            const response = await axios.post('http://localhost:8000/api/login',
                {
                    email: this.state.email,
                    password: this.state.password
                });
            this.setState({authorised: true, loginCheckDone: true});
            this.props.setId(response.data.id);
            this.props.history.push('/reservations');
        } catch (error) {
            this.setState({authorised: false, message: "Login information is incorrect."});
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        let displayMessage = '';
        if (this.state.authorised === false) {
            displayMessage = this.state.message;
        }
        return (
            <div className="accountLogin" style={{marginTop: "10%", marginLeft: "30%", marginRight: "30%"}}>
                <h2 style={{color: "darkblue"}}>Welcome to Park & Go</h2>
                <div>
                    <TextField
                        required
                        name="email"
                        id={uuid()}
                        label="Email"
                        value={this.state.value}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name="password"
                        id={uuid()}
                        label="Password"
                        value={this.state.value}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                </div>
                <p><Button variant="outlined" color="primary" onClick={this.handleClick}>Login</Button></p>
                <div>
                    {displayMessage}
                </div>
            </div>
        );
    }
}

    const mapStateToProps = (state) => {
        return {
            id: state.id
        }
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            setId: (id) => {dispatch(setId(id))
            }
        }
    };


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));