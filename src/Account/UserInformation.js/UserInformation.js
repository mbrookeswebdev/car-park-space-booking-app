import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import uuid from 'uuid';

/**
 * User Component
 *
 * Displays basic user details text fields with the information provided by the parent component and an Update button.
 *
 */

class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            name: '',
            phone: '',
            email: '',
            regNo: '',
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({
            user_id: this.props.details.id,
            name: this.props.details.name,
            phone: this.props.details.phone,
            email: this.props.details.email,
            regNo: this.props.details.vehicle_reg_no
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUpdate() {
        if (this.state.name.length === 0 || this.state.email.length === 0 || this.state.phone.length === 0 || this.state.regNo < 7) {
            this.setState({message: "All fields must be filled in."});
        } else {
            this.setState({message: ''});
            //passes updated details to the parent component for it to deal with the update
            this.props.updateDetails(this.state.user_id, this.state.name, this.state.email, this.state.phone, this.state.regNo);
        }
    }

    render() {
        const inputPropsPhone = {
            maxLength: 11
        };

        const inputPropsVehicle = {
            maxLength: 7,
        };

        return (
            <div>
                <h3>Your details:</h3>
                <div>
                    <TextField
                        id={uuid()}
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        error={this.state.name === ''}
                        helperText={this.state.name === "" ? 'This field must be filled' : ''}
                        label="Name"
                        margin="normal"
                        required={true}
                    />
                </div>
                <div>
                    <TextField
                        id={uuid()}
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        error={this.state.email === ''}
                        helperText={this.state.email === "" ? 'This field must be filled' : ''}
                        label="Email"
                        margin="normal"
                        required={true}
                    />
                </div>
                <div>
                    <TextField
                        id={uuid()}
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        error={this.state.phone === ''}
                        helperText={this.state.phone === "" ? 'This field must be filled' : ''}
                        label="Phone"
                        margin="normal"
                        inputProps={inputPropsPhone}
                        required={true}
                    />
                </div>
                <div>
                    <TextField
                        id={uuid()}
                        name="regNo"
                        value={this.state.regNo}
                        onChange={this.handleChange}
                        error={this.state.regNo === ''}
                        helperText={this.state.regNo === "" ? 'This field must be filled' : ''}
                        label="Registration number"
                        margin="normal"
                        inputProps={inputPropsVehicle}
                        required={true}
                    />
                </div>

                <div style={{marginTop: "6%"}}>
                    <Button variant="contained" color="primary" onClick={this.handleUpdate}>
                        Update
                    </Button>
                    {this.state.message && (<div><h5 style={{color: "red"}}>{this.state.message}</h5></div>)}
                </div>
            </div>
        );
    }
}

export default UserInformation;