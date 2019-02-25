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
import PatentsTable from './manageCommon/patentsTable';


const TO_PREFIX = "/dashboard";

class ManagePatents extends Component {

    componentDidMount() {
        this.props.getPatentThunk({
            username: this.props.user.username,
            publicAddress: this.props.user.publicAddress
        });
    }

    render() {

        return (
            <div className="md-cell md-cell--12 md-text-container" style={{ height: "85vh" }}>
                {
                    this.props.patents.length > 0
                        ?
                        <React.Fragment>
                            <CardTitle><h3>Manage patents</h3></CardTitle>
                            <PatentsTable />
                        </React.Fragment>
                        :

                        <div className="d-flex justify-content-center">
                            <h1 className="m-3"><b>No Patents Registered Yet</b></h1>
                        </div>
                }
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