import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';
import { Button } from 'react-md';
import service from "../../services/patentService";

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
        var similarPatentFound = response.data.similarPatentFound;
        self.setState({ similarPatentFound, checked : true, checking : false });

    }

    handleSubmit = async () => {
        
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

export default ManageFile;


