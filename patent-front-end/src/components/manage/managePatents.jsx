import React, { Component } from 'react';
import {connect} from "react-redux";
import { Card, CardTitle } from "react-md";
import {
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
  } from 'react-md';

import { MdArrowDownward } from 'react-icons/md';
import { sortBy } from 'lodash/collection';

import { movies } from '../constants/sampleData';
import { Link } from "react-router-dom";

import {getPatentThunk} from "../../store/thunk/managePatentThunk";
import {sortPatentAction} from "../../store/actions/patent/PatentAction";


const TO_PREFIX = "/dashboard";

class ManagePatents extends Component {

    state = {
        ascending: false,
        sortedPatents: this.props.patents
    };

    componentDidMount(){
        console.log(this.props.patents)
        this.props.getPatentThunk({
            username : this.props.user.username, 
            publicAddress : this.props.user.publicAddress
        });
    }
    
    // sort = () => {
    //     const ascending = !this.state.ascending;
    //     const sortedPatents = this.state.sortedPatents.slice();
    //     sortedPatents.reverse();
    //     this.setState({ ascending, sortedPatents });
    // };


    render() {

        // const { ascending, sortedPatents } = this.state;

        const rows = this.props.patents.map(({ title, date }) => (
            <TableRow key={title} >
                <TableColumn><Link to={`${TO_PREFIX}/patent/${title}`}>{title}</Link></TableColumn>
                <TableColumn numeric>{date}</TableColumn>
            </TableRow>
        ));

        return (
            <Card className="md-cell md-cell--12 md-text-container">
                <CardTitle><h3>Manage patents</h3></CardTitle>
                <DataTable baseId="patent" plain={true} >
                    <TableHeader>
                    <TableRow>
                        <TableColumn grow sorted={this.props.ascending} role="button" onClick={()=>{this.props.sortPatentAction(this.props.ascending)}} sortIcon={<MdArrowDownward/>}>
                        Title
                        </TableColumn>
                        <TableColumn numeric>
                        Date
                        </TableColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {rows}
                    </TableBody>
                </DataTable>
            </Card>);
    };
};

const mapStateToProps = (state) => {
    return {
        patents : state.patent.patents,
        ascending : state.patent.ascending,
        user : state.login.userInfo

    }
}

const mapDispatchToProps = {
    getPatentThunk,
    sortPatentAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatents);