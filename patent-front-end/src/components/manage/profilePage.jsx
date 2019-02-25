import React, { Component } from 'react';
import { Card, CardTitle, DataTable, Divider, TableRow, TableColumn } from 'react-md';
import { activeAuctionThunk } from "../../store/thunk/auctionThunk";
import { connect } from "react-redux";
import PatentsTable from '../manage/manageCommon/patentsTable';

import { MdArrowDownward } from 'react-icons/md';
import { Link } from "react-router-dom";

import { getPatentThunk } from "../../store/thunk/managePatentThunk";
import { sortPatentAction } from "../../store/actions/patent/PatentAction";

class ProfilePage extends Component {

    componentWillMount() {
        console.log(this.props.patents)
        this.props.getPatentThunk({
            username: this.props.user.username,
            publicAddress: this.props.user.publicAddress
        });
    }

    render() {
        return (
            <div style={{ display: "fixed", height: "90vh", top: "0" }}>
                <div className="md-grid">
                    <div className="md-cell md-cell--3">
                        <Card style={{ display: "fixed", height: "85vh" }}>
                            <CardTitle>
                                <h3>
                                    Anup Kumar Panwar
                                </h3>
                            </CardTitle>
                            <Divider />
                            <div style={{padding : 15}}>
                            <b>Email</b> : 1anuppanwar@gmail.com <br/>
                            <b>Mobile</b> : +91-8968894728 <br/>
                            <b>Address</b> : Block8, IT Park, Chandigarh <br/>
                            <b>Nationality</b> : India <br/>
                            <b>Public Key</b> : 0x12345678900987654321
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
                            <PatentsTable/>
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
    sortPatentAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);