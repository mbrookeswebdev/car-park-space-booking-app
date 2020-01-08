import React, {Component} from 'react';
import Button from "@material-ui/core/Button";

class MakePayment extends Component {
    constructor(props) {
        super(props);
        this.handlePay = this.handlePay.bind(this);
    }

    handlePay() {
        this.props.onHandlePay(this.props.id);
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handlePay}>Pay Now</Button>
            </div>
        );
    }
}

export default MakePayment;