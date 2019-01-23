import React, { Component } from 'react';
import { TextField, Button } from 'react-md';
import axios from "axios";
import controller from '../../controller';

class AuctionForm extends Component {
    state = {
        mini_bid: ""
    }

    handleFieldChange = (value, event) => {
        this.setState({ [event.target.id]: value })
    }

    sendAuction = () => {
        // console.log(controller);
        const data = this.state;
        axios.post(controller.login, { data }).then((message) => {
            console.log(message)
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        console.log("Auction Form Mounted");
    }

    render() {

        if (this.props.visible) {
            return (
                <div className="md-grid">
                    <TextField
                        id="mini_bid"
                        value={this.state.mini_bid}
                        onChange={this.handleFieldChange}
                        type="number"
                        className="md-cell md-cell--12"
                        placeholder="Minimum bid in eth"
                    />

                    <Button
                        raised
                        primary
                        children="Submit"
                        className="md-cell md-cell--6"
                        onClick={this.sendAuction}
                    ></Button>
                </div>
            );
        } else {
            return (
                <React.Fragment />
            );
        }
    }
}

export default AuctionForm;