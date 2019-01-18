import React, { Component } from 'react';
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

const TO_PREFIX = "/dashboard";

class ManagePatents extends Component {

    state = {
        ascending: false,
        sortedMovies: sortBy(movies.data, 'title'),
    };
    
    sort = () => {
    const ascending = !this.state.ascending;
    const sortedMovies = this.state.sortedMovies.slice();
    sortedMovies.reverse();

    this.setState({ ascending, sortedMovies });
    };


    render() {

        const { ascending, sortedMovies } = this.state;

        const rows = sortedMovies.map(({ title, date }) => (
            
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
                        <TableColumn grow sorted={ascending} role="button" onClick={this.sort} sortIcon={<MdArrowDownward/>}>
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

export default ManagePatents;