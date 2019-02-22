import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, CardTitle } from "react-md";
import {
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import { MdArrowDownward } from 'react-icons/md';
import { Link } from "react-router-dom";

import { getPatentThunk } from "../../store/thunk/managePatentThunk";
import { sortPatentAction } from "../../store/actions/patent/PatentAction";


const TO_PREFIX = "/dashboard";

class ManagePatents extends Component {

    componentDidMount() {
        console.log(this.props.patents)
        this.props.getPatentThunk({
            username: this.props.user.username,
            publicAddress: this.props.user.publicAddress
        });
    }

    render() {

        const rows = this.props.patents.map(({ patentId, patentName, patentType }, index) => (
            <TableRow key={patentId} >
                <TableColumn><Link to={`${TO_PREFIX}/patent/${index}`}>{patentId}</Link></TableColumn>
                <TableColumn>{patentName}</TableColumn>
                <TableColumn>{patentType}</TableColumn>
            </TableRow>
        ));

        return (
            <div className="md-cell md-cell--12 md-text-container" style = {{height:"85vh"}}>
                <CardTitle><h3>Manage patents</h3></CardTitle>
                <DataTable plain={true} responsive >
                    <TableHeader>
                        <TableRow>
                            <TableColumn grow={false} sorted={this.props.ascending} onClick={() => { this.props.sortPatentAction(this.props.ascending, this.props.patents) }} sortIcon={<MdArrowDownward />}>
                                Patent Id
                            </TableColumn>
                            <TableColumn>
                                Patent Name
                            </TableColumn>
                            <TableColumn>
                                Patent Type
                            </TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows}
                    </TableBody>
                </DataTable>
            </div>);
    };
};

const mapStateToProps = (state) => {
    return {
        patents: state.patent.patents,
        ascending: state.patent.ascending,
        user: state.login.userInfo
    }
}

const mapDispatchToProps = {
    getPatentThunk,
    sortPatentAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatents);