import React, { Component } from 'react';
import { TextField } from 'react-md';

class AuctionForm extends Component {

    componentDidMount() {
        console.log("Auction Form Mounted");
    }

    render() {

        if (this.props.visible) {
            return (
                <div className="md-grid">
                    <TextField
                        id="mini_bid"
                        className="md-cell md-cell--12"
                        placeholder="Minimum bid in eth"
                    />

                    {/* <Button 
                        raised 
                        primary
                        children = "Submit"
                        className = "md-cell md-cell--6"
                    > */}
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