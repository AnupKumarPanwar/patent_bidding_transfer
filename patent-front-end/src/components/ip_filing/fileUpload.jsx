import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';
import { Button } from 'react-md';
import service from "../../services/patentService";
import { changeFileName } from '../../store/actions/patent/PatentAction';
import { connect } from 'react-redux';

class ManageFile extends Component {
    state = {
        file: null,
        similarPatentFound: false,
        checking: false,
        checked: false
    }

    progressTimeout = null;
    uploadProgressTimeout = null;

    handleSelectedFile = (event) => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    handleUpload = async () => {
        this.setState({ checking: true });
        console.log("Going for it !")
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        var self = this;
        var response = await service.fileUpload(data);
        if (response.data.success) {
            var similarPatentFound = response.data.similarPatentFound;
            var uploadFileName = response.data.message;
            self.setState({ similarPatentFound, checked: true, checking: false });
            this.props.changeFileName(uploadFileName);
        }
        else {
            self.setState({ similarPatentFound: true, checked: true, checking: false });

        }

    }

    handleSubmit = async () => {
        var data = {
            uploadFileName: this.props.uploadFileName,
            owners: this.props.owners,
            lisenceHolders: this.props.lisenceHolders,
            patentName: this.props.patentName,
            patentType: this.props.patentType,
            patentSubType: this.props.patentSubType
        };
        var response = await service.registerPatent(data);
        console.log(response);
        alert("Patent registered successfully.");
    }



    render() {

        return (
            <div className="md-grid">

                <input type="file" name="audio" id="audio" allow="audio/*, image/*" onChange={this.handleSelectedFile} />

                <Button raised primary className="md-cell md-cell--3" disabled={this.state.checking}
                    id="check-audio-file" onClick={this.handleUpload}>Check <MdCheck></MdCheck></Button>

                {this.state.similarPatentFound ?
                    <span>Similar Patent Already Registered</span> : <Button raised primary className="md-cell md-cell--3" id="check-audio-file" disabled={!this.state.checked} onClick={this.handleSubmit}>Submit</Button>
                }


            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        uploadFileName: state.patent.uploadFileName,
        owners: state.patent.owners,
        lisenceHolders: state.patent.lisenceHolders,
        patentName: state.patent.patentName,
        patentType: state.patent.patentType,
        patentSubType: state.patent.patentSubType
    }
}

const mapDispatchToProps = {
    changeFileName
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageFile);


