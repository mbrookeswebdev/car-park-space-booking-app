import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

/**
 * Vehicle Component
 *
 * Displays a text field with a vehicle registration number provided by the parent component and an Update button.
 */

class Vehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            regNo: '',
            message: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.details[0].vehicles[0].id,
            regNo: this.props.details[0].vehicles[0].regNo
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUpdate() {
        //implemented validation is very basic, more work is required to sanitise inputs etc.
        if (this.state.regNo.length !== 7) {
            this.setState({message: "This field must be filled in."});
        } else {
            this.setState({message: ''});
            //passes updated details to the parent component for it to deal with the update
            this.props.updateDetails(this.state.id, this.state.regNo);
        }
    }

    render() {
        const inputProps = {
            maxLength: 7,
        };

        return (
            <div>
                <h3>Your vehicle:</h3>
                <TextField
                    key="standard"
                    name="regNo"
                    value={this.state.regNo}
                    onChange={this.handleChange}
                    label="Registration number"
                    margin="normal"
                    inputProps={inputProps}
                    required
                />
                <div style={{marginTop: "6%", marginBottom: "40%"}}>
                    <Button variant="contained" color="primary" onClick={this.handleUpdate}>
                        Update
                    </Button>
                    {this.state.message && (<div><h5 style={{color: "red"}}>{this.state.message}</h5></div>)}
                </div>
            </div>
        );
    }
}

export default Vehicle;