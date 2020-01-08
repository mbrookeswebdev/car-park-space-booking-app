import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Redirect} from 'react-router-dom';

class MakeReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regNo: "FG45DSA",
            user_id: null,
            parking_space_id: 22,
            car_park_id: 1,
            status: null,
            redirect: false,
            message: ""
        };

        this.handleReservation = this.handleReservation.bind(this);
        this.reserveParkingSpace = this.reserveParkingSpace.bind(this);
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        this.setState({user_id: id});
    }

    handleReservation() {
        this.reserveParkingSpace();
    }

    getDate() {
        let today = new Date();
        //let date = today.getDate()+':'+(today.getMonth()+1)+':'+today.getFullYear();
        return today;
    }

    getTime() {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return time;
    }

    async reserveParkingSpace() {
        console.log(this.props);
        let response = await axios.post('http://localhost:8000/api/reservations',
            {
                startDate: this.getDate(),
                endDate: null,
                startTime: this.getTime(),
                endTime: null,
                parking_space_id: 22,  //this.props.parkingSpaceId,
                car_park_id: 1,
                user_id: this.state.user_id,
                regNo: this.state.regNo,
                priceCharged: null
            });
        if (response.request.status === 201) {
            this.props.displayMessage(true);
            setTimeout(() => this.setState({redirect: true}), 3000);
        } else {
            console.log('error');
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/reservations'}/>
        }
        return (
            <div>
                <div style={{textAlign: "center", marginTop: "3%", padding: "3%"}}>
                    <Button size="small" variant="contained" color="primary"
                            onClick={this.handleReservation}>Reserve</Button>
                </div>
            </div>
        );
    }
}

export default MakeReservation;

