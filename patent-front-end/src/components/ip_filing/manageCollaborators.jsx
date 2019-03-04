import React, { Component } from "react";
import { Button, TextField } from "react-md";
import { MdAdd, MdRemove } from "react-icons/md";
import { connect } from "react-redux";
import { changeCollaborators } from "../../store/actions/patent/PatentAction";

// TODO instead of Component use React.Component(line 8) and import only React(line 1).
class ManageCollaborators extends Component {
  handleInputChange = (index, event) => {
    const cc = [...this.props.owners];
    cc[index] = event;
    this.props.changeCollaborators(cc);
  };

  add_collaborator = () => {
    const cc = [...this.props.owners];
    cc.push("");
    this.props.changeCollaborators(cc);
    console.log(this.props.owners);
  };

  remove_collaborator = () => {
    const cc = [...this.props.owners];
    if (cc.length > 0) {
      cc.pop();
      this.props.changeCollaborators(cc);
    }
    console.log(this.props.owners);
  };

  render() {
    return (
      <div className="border border-2 rounded mt-2 p-2 d-flex flex-column md-cell md-cell--6">

        <p className="font-weight-bold md-cell md-cell--12">Add Collaborators</p>

        <div className="d-flex">
          <Button
            icon
            className="md-cell md-cell--4"
            onClick={this.add_collaborator}
          >
            <MdAdd />
          </Button>
          <Button
            icon
            className="md-cell md-cell--4"
            onClick={this.remove_collaborator}
          >
            <MdRemove />
          </Button>
        </div>

        {this.props.owners.map((owner, index) => (
          <TextField
            key={index}
            id="name"
            type="text"
            label="Enter the name of the collaborator"
            className="md-cell md-cell--12"
            placeholder="Enter name"
            value={owner}
            onChange={this.handleInputChange.bind(this, index)}
            required={true}
          />
        ))}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    owners: state.patent.owners
  };
};

const mapDispatchToProps = {
  changeCollaborators
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ManageCollaborators);
