import React, { Component } from "react";
import { MdCheck } from "react-icons/md";
import { Button } from "react-md";
import service from "../../services/patentService";
import { changeFileName } from "../../store/actions/patent/PatentAction";
import CustomModal from "../common/CustomModal";
import { changeModal } from "../../store/actions/modal/ModalActions";
import { connect } from "react-redux";
import "../css/manage/fileUpload.scss";

class ManageFile extends Component {
  state = {
    file: null,
    similarPatentFound: false,
    checking: false,
    checked: false,
    showLoader: false
  };

  // componentDidMount() {
  //   this.setState({ showModal: this.props.showModal });
  // }

  progressTimeout = null;
  uploadProgressTimeout = null;

  handleSelectedFile = event => {
    // TODO remove console.log where ever not required.
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  handleUpload = async () => {
    if (this.state.selectedFile !== undefined) {
      this.setState({ checking: true });
      const data = new FormData();
      data.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      var self = this;
      this.setState({ showLoader: true });
      var response = await service.fileUpload(data);
      console.log(response);
      if (response.data.success) {
        this.props.changeModal(true, 'Success', response.data.message);
        var similarPatentFound = response.data.similarPatentFound;
        var uploadFileName = response.data.fileName;
        // TODO Why self(line 40) and then use this(line 41)
        self.setState({ similarPatentFound, checked: true, checking: false });
        this.props.changeFileName(uploadFileName);
        this.setState({ showLoader: false });
      } else {
        this.props.changeModal(true, 'Success', response.data.message);
        self.setState({
          similarPatentFound: true,
          checked: true,
          checking: false
        });
        this.setState({ showLoader: false });
      }
    } else {
      this.props.changeModal(true, 'Error', 'Please Choose a file !');
    }
    console.log(this.state);
  };

  handleSubmit = async () => {
    this.setState({ showLoader: true });
    let data = {
      uploadFileName: this.props.uploadFileName,
      owners: [...this.props.owners],
      patentName: this.props.patentName,
      patentType: this.props.patentType,
      patentSubType: this.props.patentSubType
    };
    console.log(this.props.user);

    data.owners.push(this.props.user.publicAddress);
    var response = await service.registerPatent(data);
    console.log(response);
    this.setState({ showLoader: false });
    this.props.changeModal(true, 'Success', response.message);
  };

  render() {
    const type = this.props.type.toLowerCase() + "/*";
    console.log(type);

    return (
      <div className="d-flex flex-column align-items-center md-grid md-cell md-cell--12">
        <CustomModal visible={this.props.showModal} />
        <input
          className="md-cell border p-3 m-0 rounded border-dark"
          type="file"
          name="audio"
          id="audio"
          allow="audio/*"
          onChange={this.handleSelectedFile}
        />
        <p className="disclaimer text-danger md-cell m-0">
          * Make sure the size of the file is less than 1 MB
        </p>

        <div className="m-2 d-flex align-items-center">
          <Button
            raised
            secondary
            className="m-2 md-cell md-cell--3"
            disabled={this.state.checking}
            id="check-audio-file"
            onClick={this.handleUpload}
          >
            <div className="d-flex">
              Check <MdCheck />
            </div>
          </Button>

          {this.state.similarPatentFound ? (
            <Button
              raised
              primary
              className="m-2  md-cell md-cell--3"
              id="check-audio-file"
              disabled={this.state.checked}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          ) : (
              <Button
                raised
                primary
                className="m-2  md-cell md-cell--3"
                id="check-audio-file"
                disabled={!this.state.checked}
                onClick={this.handleSubmit}
              >
                Submit
            </Button>
            )}

          {this.state.showLoader ? (
            <div class="lds-ring m-2">
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : (
              <React.Fragment />
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.userInfo,
    uploadFileName: state.patent.uploadFileName,
    owners: state.patent.owners,
    patentName: state.patent.patentName,
    patentType: state.patent.patentType,
    patentSubType: state.patent.patentSubType,
    showModal: state.modal.visible
  };
};

const mapDispatchToProps = {
  changeFileName,
  changeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageFile);
