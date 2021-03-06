import React, { Component } from "react";
import {
  TextField,
  Button,
  TabsContainer,
  Tabs,
  Tab,
  Card,
  CardTitle,
  CardText,
  Slider,
  Paper,
  Avatar,
  FontIcon
} from "react-md";
import service from "../../services/patentService";
import { ipAddress } from "../../controller";
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";

import "../css/manage/searchPage.scss";

import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";

import { MdArrowDownward } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import controller from "../../controller";
import { patentForAuctionThunk } from "../../store/thunk/managePatentThunk";
import { connect } from "react-redux";

const staticImageUrl = ipAddress + "/static/Image/";
const staticAudioUrl = ipAddress + "/static/Audio/";
const TO_PREFIX = "/dashboard";

class SearchPage extends Component {
  state = {
    query: "",
    imagePatents: [],
    audioPatents: [],
    users: []
  };

  handleFieldChange = (value, event) => {
    this.setState({ [event.target.id]: value });
    service
      .searchService({ query: value })
      .then(res => {
        var imagePatents = res.message.imagePatents;
        var audioPatents = res.message.audioPatents;
        var users = res.message.users;
        this.setState({ imagePatents, audioPatents, users });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.query);
  };

  render() {
    // TODO Make CSS classes for each.
    const paperStyle = { maxWidth: 320, margin: 10, height: 300 };
    const contactCardStyle = {
      maxWidth: 320,
      margin: 10,
      padding: 20,
      textAlign: "center"
    };
    const imgStyle = { width: "100%", height: 220 };
    const audioThumbStyle = { width: "100%", height: 180 };
    const audioStyle = { width: 320 };

    const imagePatentRows = this.state.imagePatents.map(
      (
        { patentId, patentName, patentType, patentSubType, uploadFileName },
        index
      ) => (
        <Paper style={paperStyle} className="md-block-centered" zDepth={0}>
          <Link to={`${TO_PREFIX}/patent/${patentId}`}>
            <img
              src={staticImageUrl + uploadFileName}
              className="img-fluid hoverable"
              style={imgStyle}
              alt=""
            />
          </Link>
          <p>
            <div style={{ color: "#70757a" }}>{patentName}</div>
            <div style={{ color: "rgba(112, 117, 122, 0.65)" }}>
              {patentSubType}
            </div>
          </p>
        </Paper>
      )
    );

    const audioPatentRows = this.state.audioPatents.map(
      ({ patentName, patentType, patentSubType, uploadFileName }, index) => (
        <Paper style={paperStyle} className="md-block-centered" zDepth={0}>
          <Link to={staticImageUrl + uploadFileName}>
            <img
              src={"./assets/music.png"}
              className="img-fluid hoverable"
              style={audioThumbStyle}
              alt=""
            />
          </Link>

          <audio controls style={audioStyle}>
            <source src={staticAudioUrl + uploadFileName} />
          </audio>

          <p>
            <div style={{ color: "#70757a" }}>{patentName}</div>
            <div style={{ color: "rgba(112, 117, 122, 0.65)" }}>
              {patentSubType}
            </div>
          </p>
        </Paper>
      )
    );

    const userRows = this.state.users.map(
      ({ username, name, email, nationality }, index) => (
        <Paper
          style={contactCardStyle}
          className="md-block-centered"
          zDepth={1}
        >
          {/* <Avatar random>{name[0]}</Avatar> */}
          <Link to={`${TO_PREFIX}/profile/${username}`}>
            <h3>{name}</h3>
            <h6>{email}</h6>
            <h6>{nationality}</h6>
          </Link>
        </Paper>
      )
    );

    const noResultsFound = (
      <TableRow>
        <TableColumn>No result found</TableColumn>
      </TableRow>
    );
    const noSearchQuery = (
      <TableRow>
        <TableColumn>Type a search query</TableColumn>
      </TableRow>
    );
    const imagePatentLabel =
      this.state.query.length > 0
        ? "Images (" + this.state.imagePatents.length + ")"
        : "Images";
    const audioPatentLabel =
      this.state.query.length > 0
        ? "Audio (" + this.state.audioPatents.length + ")"
        : "Audio";
    const userLabel =
      this.state.query.length > 0
        ? "Users (" + this.state.users.length + ")"
        : "Users";

    return (
      <div className="md-grid search-container">
        <TabsContainer
          className="md-cell md-cell--12"
          panelClassName="md-grid"
          style={{ width: "100%" }}
        >
          <Tabs
            mobile
            className="tabs-container"
            tabId="phone-stuffs"
            inactiveTabClassName="text-muted"
            activeTabClassName="text-primary"
          >
            <TextField
              id="query"
              value={this.state.query}
              onChange={this.handleFieldChange}
              className="md-cell--3 ml-5"
              placeholder={"Search ..."}
              inputClassName="p-2 pl-3 border border-primary"
              inputStyle={{ borderRadius: "15px" }}
              autoComplete={false}
            />

            {/* // TODO make a function using switch case having type as the label(eg, imagePatentLabel)
            and then call the function here by passing the label value as parameter to it. */}
            <Tab label={imagePatentLabel}>
            {/* // TODO use a variable instead of using this.state.query.length every time, for better readability */}
              {this.state.query.length > 0
                ? this.state.imagePatents.length > 0
                  ? imagePatentRows
                  : noResultsFound
                : noSearchQuery}
            </Tab>
            <Tab label={audioPatentLabel}>
              {this.state.query.length > 0
                ? this.state.audioPatents.length > 0
                  ? audioPatentRows
                  : noResultsFound
                : noSearchQuery}
            </Tab>
            <Tab label={userLabel}>
              {this.state.query.length > 0
                ? this.state.users.length > 0
                  ? userRows
                  : noResultsFound
                : noSearchQuery}
            </Tab>
          </Tabs>
        </TabsContainer>
        {/* </div> */}
      </div>
    );
  }
}

export default SearchPage;
