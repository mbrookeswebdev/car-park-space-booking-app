import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import SimpleBottomNavigation from "../Main/SimpleBottomNavigation/SimpleBottomNavigation";
import Header from "../Main/Header/Header";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            user_id: null,
            vehicleId: null,
            regNo: '',
            message1: '',
            message2: '',
            message3: '',
            added: false,
            deleted: false,
            details: []
        };
        this.getDetails = this.getDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.handleUpdateUserDetails = this.handleUpdateUserDetails.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);

        this.handleAddVehicle = this.handleAddVehicle.bind(this);
        this.addVehicle = this.addVehicle.bind(this);

        this.handleDeleteVehicleDetails = this.handleDeleteVehicleDetails.bind(this);
        this.deleteVehicleDetails = this.deleteVehicleDetails.bind(this);
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        this.getDetails(id);
        this.setState({user_id: id});
    }

    async getDetails(user_id) {
        try {
            const response = await axios.get('http://localhost:8000/api/users/' + user_id);
            this.setState(
                {
                    name: response.data[0].name,
                    phone: response.data[0].phone,
                    email: response.data[0].email,
                    vehicleId: response.data[0].vehicles[0].id,
                    regNo: response.data[0].vehicles[0].regNo,
                    details: response.data
                });
        } catch (error) {
            console.error(error);
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUpdateUserDetails() {
        this.updateUserDetails(this.state.user_id);
    }

    handleDeleteVehicleDetails() {
        this.deleteVehicleDetails(this.state.regNo);
    }

    handleAddVehicle() {
        this.addVehicle(this.state.regNo);
    }

    async addVehicle(regNo) {
        let response = await axios.post('http://localhost:8000/api/vehicles',
            {
                regNo: regNo,
                user_id: this.state.user_id,
                parked: false
            });
        if (response.status === 201) {
            this.setState({message1: "Vehicle was added."});
            setTimeout(() => this.setState({message1: ''}), 3000);
            this.setState(
                {
                    regNo: regNo,
                    deleted: false,
                    added: true,
                    vehicleId: response.data.id
                });
        } else {
            this.setState({message1: "Vehicle could not be added."});
            setTimeout(() => this.setState({message1: ''}), 3000);
        }
    }

    async updateUserDetails(user_id) {
        let response = await axios.patch('http://localhost:8000/api/users/' + user_id,
            {
                id: user_id,
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email
            });
        if (response.status === 200) {
            this.setState({message2: "User details were updated."});
            setTimeout(() => this.setState({message2: ''}), 3000);
        } else {
            this.setState({message2: "User details could not be updated."});
            setTimeout(() => this.setState({message2: ''}), 3000);
        }
    }

    async deleteVehicleDetails(regNo) {
        let response = await axios.delete('http://localhost:8000/api/vehicles/' + regNo);
        if (response.status === 204) {
            this.setState(
                {
                    regNo: '',
                    vehicleId: null,
                    deleted: true,
                    added: false,
                    message3: "Vehicle details were deleted."
                });
            setTimeout(() => this.setState({message3: ''}), 3000);
        } else {
            this.setState({message3: "Vehicle details could not be deleted."});
            setTimeout(() => this.setState({message3: ''}), 3000);
        }
    }

    render() {
        const inputProps = {
            maxLength: 7,
        };
        return (
            <div>
                <Header/>
                <div style={{marginTop: "2%", marginLeft: "20%", marginRight: "20%"}}>
                    <Grid container spacing={4}>
                        <Grid item lg={3} style={{textAlign: "left"}}></Grid>
                        <Grid item lg={3} sm={12} xs={12} style={{textAlign: "left"}}>
                            <h3>Your details:</h3>
                            <div>
                                <TextField
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    id="standard"
                                    label="Name"
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    id="standard"
                                    label="Email"
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    id="standard"
                                    label="Phone"
                                    margin="normal"
                                />
                                <div style={{marginTop: "6%"}}>
                                    <Button variant="contained" color="primary" onClick={this.handleUpdateUserDetails}>
                                        Update
                                    </Button>
                                </div>
                                {this.state.message2 && (<div><h5>{this.state.message2}</h5></div>)}
                            </div>
                        </Grid>
                        <Grid item lg={3} sm={12} xs={12} style={{textAlign: "left"}}>
                            <h3>Your vehicle:</h3>
                            <TextField
                                name="regNo"
                                value={this.state.regNo}
                                onChange={this.handleChange}
                                id="standard"
                                label="Registration number"
                                margin="normal"
                                inputProps={inputProps}
                            />
                            {!this.state.deleted && this.state.vehicleId !== null &&
                            (<div style={{marginTop: "6%", marginBottom: "40%"}}>
                                <Button variant="contained" color="secondary"
                                        onClick={this.handleDeleteVehicleDetails}>
                                    Delete
                                </Button>
                            </div>)}
                            {!this.state.added && this.state.vehicleId === null && this.state.regNo.length === 7 &&
                            (<div style={{marginTop: "6%", marginBottom: "40%"}}>
                                <Button variant="contained" color="primary" onClick={this.handleAddVehicle}>
                                    Add
                                </Button>
                            </div>)}
                            {this.state.message1 && (<div><h5>{this.state.message1}</h5></div>)}
                            {this.state.message3 && (<div><h5>{this.state.message3}</h5></div>)}
                            <Grid item lg={3} sm={12} xs={12} style={{textAlign: "left"}}></Grid>
                        </Grid>
                    </Grid>
                </div>
                <SimpleBottomNavigation/>
            </div>
        );
    }
}

export default Account;