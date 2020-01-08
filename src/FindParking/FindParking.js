import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CarParkList from "./CarParkList/CarParkList";
import SimpleBottomNavigation from "../Main/SimpleBottomNavigation/SimpleBottomNavigation";
import Header from "../Main/Header/Header";

class FindParking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            postcode: '',
            locations: [],
            carParkSearchRun: false,
            carParkId: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.getCarParks = this.getCarParks.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        this.setState({user_id: id});
    }

    handleChange(event) {
        this.setState({
            postcode: event.target.value
        });
    }

    handleButtonClick() {
        this.getCarParks(this.state.postcode);
        this.setState({carParkSearchRun: true});
    }

    async getCarParks(postcode) {
        try {
            let value = postcode.replace(/\s/g, '');
            const response = await axios.get('http://localhost:8000/api/carparks/' + value);
            this.setState({locations: response.data});
            this.setState({carParkId: response.data[0].id})
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div style={{textAlign: "center", marginTop: "5%"}}>
                    <TextField
                        id="outlined-basic"
                        label="Enter post code"
                        margin="normal"
                        variant="outlined"
                        name="postcode"
                        value={this.state.postcode}
                        onChange={this.handleChange}
                    />
                    <div style={{marginTop: "1%", marginBottom: "5%"}}>
                        <Button variant="contained" color="primary" onClick={this.handleButtonClick}>Find
                            parking</Button>
                    </div>

                    <div style={{textAlign: "center", marginBottom: "5%"}}>
                        {this.state.locations.length > 0 &&
                        <CarParkList results={this.state.locations}/>}
                    </div>

                    <div style={{textAlign: "center", marginBottom: "3%"}}>
                        {this.state.carParkSearchRun && this.state.locations.length === 0 &&
                        <h3>Sorry, no car parks were found.</h3>}
                    </div>
                </div>
                <SimpleBottomNavigation/>
            </div>
        );
    }
}

export default FindParking;