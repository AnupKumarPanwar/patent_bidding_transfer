import React, { Component } from "react";
import {
  Card,
  CardTitle,
  DataTable,
  Divider,
  TableRow,
  TableColumn
} from "react-md";
import { activeAuctionThunk } from "../../store/thunk/auctionThunk";
import { connect } from "react-redux";
import PatentsTable from "../manage/manageCommon/patentsTable";

import { MdArrowDownward } from "react-icons/md";
import { Link } from "react-router-dom";

import { getPatentThunk } from "../../store/thunk/managePatentThunk";
import { sortPatentAction } from "../../store/actions/patent/PatentAction";
import service from "../../services/patentService";

class ProfilePage extends Component {
  state = {
    user: {},
    patents: []
  };

  componentWillMount() {
    let username = this.props.match.params.username;
    // console.log(username);

    if (username === undefined || username === null) {
      username = this.props.user.username;
    }

    service
      .getUserProfile({ username: username })
      .then(async res => {
        // console.log(res);
        var user = res.data;
        this.setState({ user });
        // console.log(this.state.user);

        this.props.getPatentThunk({
          username: this.state.user.username,
          publicAddress: this.state.user.publicAddress
        });

        service
          .getMyPatents({
            username: this.state.user.username,
            publicAddress: this.state.user.publicAddress
          })
          .then(res => {
            this.setState({ patents: res });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(this.state.patents)
  }

  render() {
    return (
      <div style={{ display: "fixed", height: "90vh", top: "0" }}>
        <div className="md-grid">
          <div className="md-cell md-cell--4">
            <Card style={{ display: "fixed", height: "85vh" }}>
              <CardTitle>
                <h3>{this.state.user.name}</h3>
              </CardTitle>
              <Divider  className="bg-dark m-2"/>
              <div className="md-grid">
                <p className="md-cell md-cell--3 font-weight-bold">Email :</p>
                <p className="md-cell md-cell--8 text-truncate">
                  {this.state.user.email}
                </p>
                <br />
                <p className="md-cell md-cell--3 font-weight-bold">Mobile :</p>
                <p className="md-cell md-cell--8 text-truncate">
                  {this.state.user.mobile}
                </p>
                <br />
                <p className="md-cell md-cell--3 font-weight-bold">Address :</p>
                <p className="md-cell md-cell--8 text-truncate">
                  {" "}
                  {this.state.user.address}
                </p>
                <br />
                <p className="md-cell md-cell--3 font-weight-bold">
                  Nationality :
                </p>
                <p className="md-cell md-cell--8 text-truncate">
                  {this.state.user.nationality}
                </p>{" "}
                <br />
                <p className="md-cell md-cell--3 font-weight-bold">
                  Public Key:
                </p>
                <p className="md-cell md-cell--8 text-truncate font-wrap">
                  {this.state.user.publicAddress}
                </p>
                <br />
              </div>
            </Card>
          </div>

          <div className="md-cell md-cell--8">
            <div style={{ display: "fixed", height: "85vh" }}>
              <CardTitle>
                <h3>
                  <b>Your Patents</b>
                </h3>
              </CardTitle>
              <Divider  className="bg-dark m-2" />
              <PatentsTable patents={this.state.patents} />
              <div className="md-grid">
                <div className="md-cell--12" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
  getPatentThunk
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
