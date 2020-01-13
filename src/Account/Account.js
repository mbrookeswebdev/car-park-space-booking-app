import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import SimpleBottomNavigation from "../Main/SimpleBottomNavigation/SimpleBottomNavigation";
import Header from "../Main/Header/Header";
import UserInformation from "./UserInformation.js/UserInformation";
import {connect} from 'react-redux';

/**
 * Account Component
 *
 * Requests user and vehicle details and updates them.
 */

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message1: null,
            message2: null,
            details: []
        };
        this.getDetails = this.getDetails.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
    }

    componentDidMount() {
        this.getDetails(this.props.id);
    }

    async getDetails(user_id) {
        try {
            const response = await axios.get('http://localhost:8000/api/users/' + user_id);
            this.setState(
                {
                    details: response.data
                });
        } catch (error) {
            console.error("No user details found.");
        }
    }

    async updateUserDetails(id, name, email, phone, regNo) {
        let response = await axios.put('http://localhost:8000/api/users/' + id,
            {
                id: id,
                name: name,
                email: email,
                phone: phone,
                vehicle_reg_no: regNo
            });
        if (response.status === 200) {
            this.setState({message1: "User details were updated."});
            setTimeout(() => this.setState({message1: ''}), 3000);
        } else {
            this.setState({message2: "User details could not be updated."});
            setTimeout(() => this.setState({message1: ''}), 3000);
        }
    }

    render() {
        if (this.state.details.length === 0) {
            return null;
        }
        return (
            <div>
                <Header/>
                <div style={{marginTop: "2%", marginLeft: "20%", marginRight: "20%"}}>
                    <Grid container spacing={4}>
                        <Grid item lg={2} style={{textAlign: "left"}}></Grid>
                        <Grid item lg={4} sm={12} xs={12} style={{textAlign: "left"}}>
                            <UserInformation details={this.state.details} updateDetails={this.updateUserDetails}/>
                            {this.state.message1 && (<div><h5>{this.state.message1}</h5></div>)}
                        </Grid>
                    </Grid>
                </div>
                <SimpleBottomNavigation/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.id
    }
};

export default connect(mapStateToProps)(Account);