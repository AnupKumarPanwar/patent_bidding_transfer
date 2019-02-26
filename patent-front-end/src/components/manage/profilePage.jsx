import React, { Component } from 'react';
import { Card, CardTitle, DataTable, Divider, TableRow, TableColumn } from 'react-md';
import { activeAuctionThunk } from "../../store/thunk/auctionThunk";
import { connect } from "react-redux";
import PatentsTable from '../manage/manageCommon/patentsTable';

import { MdArrowDownward } from 'react-icons/md';
import { Link } from "react-router-dom";

import { getPatentThunk } from "../../store/thunk/managePatentThunk";
import { sortPatentAction } from "../../store/actions/patent/PatentAction";
import service from '../../services/patentService';

class ProfilePage extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        let username = this.props.match.params.username;

        if (username === undefined || username === null) {
            username = this.props.user.username;
        }

        console.log(username);

        service.getUserProfile({ username: username })
            .then((res) => {
                var user = res.data;
                this.setState({ user });
                console.log(this.state.user);

                this.props.getPatentThunk({
                    username: this.state.user.username,
                    publicAddress: this.state.user.publicAddress
                });

            })
            .catch((err) => {
                console.log(err);
            })

        console.log(this.props.patents)


    }

    render() {
        return (
            <div style={{ display: "fixed", height: "90vh", top: "0" }}>
                <div className="md-grid">
                    <div className="md-cell md-cell--3">
                        <Card style={{ display: "fixed", height: "85vh" }}>
                            <CardTitle>
                                <h3>
                                    {this.state.user.name}
                                </h3>
                            </CardTitle>
                            <Divider />
                            <div style={{ padding: 15 }}>
                                <b>Email</b> : {this.state.user.email} <br />
                                <b>Mobile</b> : {this.state.user.mobile} <br />
                                <b>Address</b> : {this.state.user.address} <br />
                                <b>Nationality</b> : {this.state.user.nationality} <br />
                                <b>Public Key</b> : {this.state.user.publicAddress}
                            </div>
                        </Card>
                    </div>
                    <div className="md-cell md-cell--9">
                        <div style={{ display: "fixed", height: "85vh" }}>
                            <CardTitle>
                                <h3>
                                    <b>Patents</b>
                                </h3>
                            </CardTitle>
                            <Divider />
                            <PatentsTable />
                            <div className="md-grid">
                                <div className="md-cell--12">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        patents: state.patent.patents,
        ascending: state.patent.ascending,
        user: state.login.userInfo
    }
}

const mapDispatchToProps = {
    getPatentThunk,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);