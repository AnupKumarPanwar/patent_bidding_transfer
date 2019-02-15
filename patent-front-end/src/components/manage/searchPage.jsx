import React, { Component } from 'react';
import { TextField, Button, TabsContainer, Tabs, Tab } from 'react-md';
import axios from "axios";
import controller from '../../controller';
import { patentForAuctionThunk } from "../../store/thunk/managePatentThunk";
import { connect } from "react-redux"

class AuctionForm extends Component {
    state = {
        query: '',
        patents: [],
        users: []
    }

    handleFieldChange = (value, event) => {
        this.setState({ [event.target.id]: value })
    }

    componentDidMount() {
        console.log("Auction Form Mounted !");
    }

    componentWillUnmount() {
        console.log("Auction Form Unmounted !")
    }

    render() {

        return (
            <div className="md-grid">
                <TextField
                    id="query"
                    value={this.state.query}
                    onChange={this.handleFieldChange}
                    className="md-cell md-cell--12"
                    placeholder="Search"
                />

                <TabsContainer panelClassName="md-grid" className="md-cell md-cell--12" colored>
                    <Tabs tabId="simple-tab">
                        <Tab label="Patents">
                            <h3>Hello, World!</h3>
                        </Tab>
                        <Tab label="Users">
                            <h3>Now look at me!</h3>
                        </Tab>
                    </Tabs>
                </TabsContainer>

            </div>
        );
    }
}

export default AuctionForm;