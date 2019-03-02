import React, { Component } from "react";

import { TextField, SelectField, Divider } from "react-md";
import { MdArrowDropDown } from "react-icons/md";

import ManageFile from "./fileUpload";
import ManageCollaborators from "./manageCollaborators";
import { connect } from "react-redux";
import {
  changePatentName,
  changePatentSubType
} from "../../store/actions/patent/PatentAction";

const PICTURE_ITEM = [
  { label: "Painting", value: "Painting" },
  { label: "Poster", value: "Poster" },
  { label: "Design", value: "Design" },
  { label: "Logo", value: "Logo" }
];

class PictureFiling extends Component {
  handleInputChange = (value, event) => {
    this.props.changePatentName(value);
  };

  onTypeChange = (value, event) => {
    this.props.changePatentSubType(value);
  };

  render() {
    if (this.props.type_visible === "Image") {
      return (
        <div className="d-flex flex-column align-items-center md-cell md-cell--12  md-grid">
          <TextField
            id="name"
            type="text"
            label="Enter the name of the image"
            className="md-cell md-cell--6"
            placeholder="Enter name"
            value={this.props.patentName}
            onChange={this.handleInputChange}
            required={true}
          />

          <SelectField
            id="type"
            label="Type of Image"
            placeholder="Select the type of Image"
            className="md-cell md-cell--6"
            menuItems={PICTURE_ITEM}
            simplifiedMenu={false}
            dropdownIcon={<MdArrowDropDown />}
            onChange={this.onTypeChange}
          />

          <ManageCollaborators />
          <Divider className="md-cell md-cell--12 mt-4 bg-dark" />
          <ManageFile type={this.props.type_visible} />
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

const mapStatetoProps = state => {
  return {
    patentName: state.patent.patentName
  };
};

const mapDispatchToProps = {
  changePatentName,
  changePatentSubType
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(PictureFiling);
