import React, { Component } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Card, CardTitle, SelectField, Divider } from "react-md";

import AudioFiling from "../ip_filing/audiofiling";
import PictureFiling from "../ip_filing/picturefiling";
import { changePatentType } from "../../store/actions/patent/PatentAction";
import { connect } from "react-redux";

const OBJECT_ITEMS = [
  {
    label: "Audio Files",
    value: "Audio"
  },
  {
    label: "Pictures",
    value: "Image"
  }
];

class FilePatent extends Component {
  onTypeChange = (value, event) => {
    console.log(value);
    this.props.changePatentType(value);
  };

  render() {
    return (
      <div className="d-flex p-0 bg-light">
        <Card className="md-cell md-cell--12">
          <div className="d-flex md-grid">
            <h3 className="ml-3 pt-3 md-cell--4">
              Registration : {this.props.patentType}
            </h3>
            <div class="ml-3 md-cell--6">
              <SelectField
                id="type"
                placeholder={<p>Select the type of Intellectual Property</p>}
                className="pl-4 pr-4 pt-2 pb-1 border"
                style={{borderRadius:"15px"}}
                menuItems={OBJECT_ITEMS}
                value={<p></p>}
                simplifiedMenu={true}
                dropdownIcon={<MdArrowDropDown />}
                onChange={this.onTypeChange}
              />
            </div>
          </div>

          <Divider className="bg-dark ml-3 mr-3" />

          <div className="d-flex">
            <AudioFiling type_visible={this.props.patentType} />
          </div>
          <div>
            <PictureFiling type_visible={this.props.patentType} />
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    patentType: state.patent.patentType
  };
};

const mapDispatchToProps = {
  changePatentType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilePatent);
