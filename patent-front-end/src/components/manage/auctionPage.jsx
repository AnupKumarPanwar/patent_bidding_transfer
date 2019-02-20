import React, { Component } from 'react';
import { TextField, Button } from 'react-md';
import axios from "axios";
import controller from '../../controller';
import {patentForAuctionThunk} from "../../store/thunk/managePatentThunk";
import {connect} from "react-redux"

class AuctionForm extends Component {
    state = {
        minimumBid: '',
        numberOfDays : ''
    }

    handleFieldChange = (value, event) => {
        this.setState({ [event.target.id]: value })
    }

    componentDidMount() {
        console.log("Auction Form Mounted !");
    }

    componentWillUnmount(){
        console.log("Auction Form Unmounted !")
    }

    render() {

        const patentData = this.props.patents[this.props.patentIndex];
        return (
            <div className="md-grid">
                <TextField
                    id="minimumBid"
                    value={this.state.minimumBid}
                    onChange={this.handleFieldChange}
                    type="number"
                    className="md-cell md-cell--12"
                    placeholder="Minimum bid (in eth) : "
                />
                <TextField
                    id="numberOfDays"
                    value={this.state.numberOfDays}
                    onChange={this.handleFieldChange}
                    type="number"
                    className="md-cell md-cell--12"
                    placeholder="Number of Days of Auction : "
                />
                <Button
                    raised
                    primary
                    children="Submit"
                    className="md-cell m-2"
                    onClick={()=>{
                        const obj = {
                            username : this.props.user.username,
                            publicAddress : this.props.user.publicAddress, 
                            patentId : patentData.patentId,
                            minimumBid : this.state.minimumBid,
                            numberOfDays : this.state.numberOfDays
                        }
                        // console.log(obj)
                        this.props.patentForAuctionThunk(obj)
                    }}
                />
            </div>
        );
    }
}

const mapsStateToProps = state => {
    return({
        patents : state.patent.patents,
        user : state.login.userInfo
    })    
}

const mapDispatchToState = {
    patentForAuctionThunk
}

export default connect(mapsStateToProps,mapDispatchToState)(AuctionForm);