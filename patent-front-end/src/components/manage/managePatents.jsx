import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardTitle, Paper } from "react-md";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";

import { MdArrowDownward } from "react-icons/md";
import { Link } from "react-router-dom";

import { getPatentThunk } from "../../store/thunk/managePatentThunk";
import { sortPatentAction } from "../../store/actions/patent/PatentAction";
import PatentsTable from "./manageCommon/patentsTable";

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
      <Paper
        className="pl-3 pr-3 mt-4 md-cell md-cell--12 md-text-container border border-3"
        style={{ height: "85vh" }}
      >
        {this.props.patents.length > 0 ? (
          <React.Fragment>
            <CardTitle>
              <h2>Manage patents</h2>
            </CardTitle>
            <PatentsTable />
          </React.Fragment>
        ) : (
          <div
            className="d-flex justify-content-center"
            style={{ height: "100%" }}
          >
            <h2 style={{ color: "red", fontWeight: "bold", marginTop: "40%" }}>
              You have not registered any patents yet
            </h2>
          </div>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    patents: state.patent.patents,
    ascending: state.patent.ascending,
    user: state.login.userInfo
  };
};

const mapDispatchToProps = {
  getPatentThunk,
  sortPatentAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePatents);
