import React, { Component } from 'react';
import { TextField, Button, TabsContainer, Tabs, Tab } from 'react-md';
import service from '../../services/patentService';
import {
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import { MdArrowDownward } from 'react-icons/md';
import { Link } from "react-router-dom";
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
        service.searchService({ query: value })
            .then((res) => {
                var patents = res.message.patents;
                var users = res.message.users;
                this.setState({ patents, users });
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(this.state.query);
    }

    componentDidMount() {
        console.log("Auction Form Mounted !");
    }

    componentWillUnmount() {
        console.log("Auction Form Unmounted !")
    }

    render() {

        const patentLabel = this.state.query.length>0?"Patents ("+this.state.patents.length+")" : "Patents";
        const userLabel = this.state.query.length>0?"Users ("+this.state.users.length+")" : "Users";

        const patentRows = this.state.patents.map(({ patentName, patentType }, index) => (
            <TableRow key={index} >
                <TableColumn>{patentName}</TableColumn>
                <TableColumn>{patentType}</TableColumn>
            </TableRow>
        ));

        const userRows = this.state.users.map(({ name, email }, index) => (
            <TableRow key={index} >
                <TableColumn>{name}</TableColumn>
                <TableColumn>{email}</TableColumn>
            </TableRow>
        ));

        const noResultsFound =
            <TableRow>
                <TableColumn>No result found</TableColumn>
            </TableRow>
            ;

        const noSearchQuery =
            <TableRow>
                <TableColumn>Type a search query</TableColumn>
            </TableRow>
            ;

        return (
            <div className="md-grid">
                <TextField
                    id="query"
                    value={this.state.query}
                    onChange={this.handleFieldChange}
                    className="md-cell md-cell--12"
                    placeholder="Search"
                    autoComplete={false}
                />

                <TabsContainer panelClassName="md-grid" className="md-cell md-cell--12" colored>
                    <Tabs tabId="simple-tab">
                        <Tab label={patentLabel}>
                            <DataTable baseId="patent" plain={true} responsive >
                                <TableBody>
                                    {this.state.query.length > 0 ? this.state.patents.length > 0 ? patentRows : noResultsFound : noSearchQuery}
                                </TableBody>
                            </DataTable>
                        </Tab>
                        <Tab label={userLabel}>
                            <DataTable baseId="patent" plain={true} responsive >
                                <TableBody>
                                    {this.state.query.length > 0 ? this.state.users.length > 0 ? userRows : noResultsFound : noSearchQuery}
                                </TableBody>
                            </DataTable>
                        </Tab>
                    </Tabs>
                </TabsContainer>

            </div>
        );
    }
}

export default AuctionForm;