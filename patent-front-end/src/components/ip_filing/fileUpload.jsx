import React, { Component } from 'react';
import { MdFileUpload, MdCheck } from 'react-icons/md';
import { TextField, FileUpload, LinearProgress, Button } from 'react-md';
import service from "../../services/patentService";

class ManageFile extends Component {
    state = {
        file : null
    }

    progressTimeout = null;
    uploadProgressTimeout = null;

    handleSelectedFile = (event) => {
            console.log(event.target.files[0])
            this.setState({
              selectedFile: event.target.files[0],
            })
    }

    handleUpload = () => {
        console.log("Going for it !")
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        service.fileUpload(data);
      }

    

    render() {

        return (
            <div className="md-grid">
            
            <input type="file" name="audio" id="audio" allow="audio/*, image/*" onChange={this.handleSelectedFile} />

                <Button raised primary className="md-cell md-cell--3"
                    id="check-audio-file" onClick = {this.handleUpload}>Check <MdCheck></MdCheck></Button>
                
            </div>);
    }
}

export default ManageFile;


