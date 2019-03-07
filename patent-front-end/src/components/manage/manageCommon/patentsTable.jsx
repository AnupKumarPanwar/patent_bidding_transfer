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
import { sortPatentAction } from "../../../store/actions/patent/PatentAction";
import "../../css/manage/manageCommon/patentsTable.scss";

// TODO define it in constants file.
const TO_PREFIX = "/dashboard";

const PatentsTable = props => {
  let rows = <TableRow />;
  if (props.patents.length > 0) {
    rows = props.patents.map(({ patentId, patentName, patentType }, index) => (
      <TableRow key={patentId}>
        <TableColumn>
          <Link to={`${TO_PREFIX}/patent/${patentId}`}>{patentId}</Link>
        </TableColumn>
        <TableColumn>{patentName}</TableColumn>
        <TableColumn>{patentType}</TableColumn>
      </TableRow>
    ));
  }

  return (
    <Paper className="m-2">
      {props.patents.length > 0 ? (
        <DataTable className="border" plain={true} responsive>
          <TableHeader
            className="border border-0"
            style={{ background: "rgb(40,40,40)" }}
          >
            <TableRow>
              <TableColumn
                grow={false}
                sorted={props.ascending}
                onClick={() => {
                  props.sortPatentAction(props.ascending, props.patents);
                }}
                sortIcon={<MdArrowDownward style={{ color: "white" }} />}
              >
                <span className="colLable">Patent Id</span>{" "}
              </TableColumn>
              <TableColumn>
                <span className="colLable">Patent Name</span>
              </TableColumn>
              <TableColumn>
                <span className="colLable"> Patent Type</span>
              </TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </DataTable>
      ) : (
        <div className="d-flex justify-content-center">
          <h1 className="m-3">
            <b>No Patents Registered Yet</b>
          </h1>
        </div>
      )}
    </Paper>
  );
};

let mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  let patents = state.patent.patents;
  if (ownProps.patents !== undefined) {
    patents = ownProps.patents;
  }
  return {
    patents: patents,
    ascending: state.patent.ascending
  };
};

const mapDispatchToProps = {
  sortPatentAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatentsTable);
