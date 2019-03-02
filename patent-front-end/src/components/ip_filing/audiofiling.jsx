import React, { Component } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { TextField, SelectField, Divider } from "react-md";
import ManageFile from "./fileUpload";
import ManageCollaborators from "./manageCollaborators";
import { connect } from "react-redux";
import {
  changePatentName,
  changePatentSubType
} from "../../store/actions/patent/PatentAction";

const GENRE_ITEMS = [
  { label: "Rock", value: "Rock" },
  { label: "Electronic", value: "Electronic" },
  { label: "Pop", value: "Pop" },
  { label: "Blues", value: "Blues" },
  { label: "Hip Hop", value: "Hip Hop" },
  { label: "Folk", value: "Folk" }
];

class AudioFiling extends Component {
  handleInputChange = (value, event) => {
    this.props.changePatentName(value);
  };

  onTypeChange = (value, event) => {
    this.props.changePatentSubType(value);
  };

  componentWillUnmount() {
    if (this.progressTimeout) {
      clearTimeout(this.progressTimeout);
    }

    if (this.uploadProgressTimeout) {
      clearTimeout(this.uploadProgressTimeout);
    }
  }

  render() {
    if (this.props.type_visible === "Audio") {
      // this.set_component(this.);

      return (
        <div className="d-flex flex-column align-items-center md-cell md-cell--12  md-grid">
          <TextField
            id="name"
            type="text"
            label={"Enter the name of the Audio"}
            placeholder="Enter name"
            className="md-cell md-cell--6"
            value={this.props.patentName}
            onChange={this.handleInputChange}
            required={true}
          />

          <SelectField
            id="type"
            label="Select the genre the of the music"
            placeholder="drop down to select genre"
            className="md-cell md-cell--6"
            menuItems={GENRE_ITEMS}
            simplifiedMenu={true}
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
)(AudioFiling);
