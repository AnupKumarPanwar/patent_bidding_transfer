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
import { sortPatentAction } from "../../../store/actions/patent/PatentAction";


const TO_PREFIX = "/dashboard";

const PatentsTable = (props) => {

    let rows = <TableRow></TableRow>
    if (props.patents.length > 0) {
        rows = props.patents.map(({ patentId, patentName, patentType }, index) => (
            <TableRow key={patentId} >
                <TableColumn><Link to={`${TO_PREFIX}/patent/${index}`}>{patentId}</Link></TableColumn>
                <TableColumn>{patentName}</TableColumn>
                <TableColumn>{patentType}</TableColumn>
            </TableRow>
        ));
    }

    return (
        <React.Fragment>
            {
                props.patents.length > 0
                    ?
                    <DataTable plain={true} responsive >
                        <TableHeader>
                            <TableRow>
                                <TableColumn grow={false} sorted={props.ascending} onClick={() => { props.sortPatentAction(props.ascending, props.patents) }} sortIcon={<MdArrowDownward />}>
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

                    :

                    <div className="d-flex justify-content-center">
                        <h1 className="m-3"><b>No Patents Registered Yet</b></h1>
                    </div>
            }
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        patents: state.patent.patents,
        ascending: state.patent.ascending,
        user: state.login.userInfo
    }
}

const mapDispatchToProps = {
    sortPatentAction
}

export default connect(mapStateToProps, mapDispatchToProps)(PatentsTable);