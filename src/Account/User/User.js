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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            phone: '',
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.details[0].id,
            name: this.props.details[0].name,
            phone: this.props.details[0].phone,
            email: this.props.details[0].email
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUpdate() {
        if (this.state.name.length === 0 || this.state.email.length === 0 || this.state.phone.length === 0) {
            this.setState({message: "All fields must be filled in."});
        } else {
            this.setState({message: ''});
            //passes updated details to the parent component for it to deal with the update
            this.props.updateDetails(this.state.id, this.state.name, this.state.email, this.state.phone);
        }
    }

    render() {

        const inputPropsPhone = {
            maxLength: 11
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
                        label="Name"
                        margin="normal"
                        required
                    />
                </div>
                <div>
                    <TextField
                        id={uuid()}
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        label="Email"
                        margin="normal"
                        required
                    />
                </div>
                <div>
                    <TextField
                        id={uuid()}
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        label="Phone"
                        margin="normal"
                        inputProps={inputPropsPhone}
                        required
                    />
                    <div style={{marginTop: "6%"}}>
                        <Button variant="contained" color="primary" onClick={this.handleUpdate}>
                            Update
                        </Button>
                        {this.state.message && (<div><h5 style={{color: "red"}}>{this.state.message}</h5></div>)}
                    </div>

                </div>
            </div>
        );
    }
}

export default User;