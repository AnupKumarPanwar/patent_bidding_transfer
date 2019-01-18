import React, { Component } from 'react';
import { MdFileUpload, MdCheck } from 'react-icons/md';
import { TextField, FileUpload, LinearProgress, Button } from 'react-md';

class ManageFile extends Component {
    state = {
        sending: false,
        toasts: [],
        fileName: '',
        progress: null,
        uploadProgress: undefined,
        fileSize: 0,
    }

    progressTimeout = null;
    uploadProgressTimeout = null;

    handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const file = data.get('file');
        if (!file || !file.name) {
            this.addToast('A file is required.');
            return;
        }

        console.log("Uploading File !")

        // fetch(`${API_ENDPOINT}${FAKE_UPLOAD_ENDPOINT}`, {
        //   method: 'POST',
        //   body: data,
        // }).then((response) => {
        //   this.setState({ sending: false, uploadProgress: 0 });
        //   if (!response.ok) {
        //     const error = new Error(response.statusText);
        //     error.response = response;
        //     throw error;
        //   }

        //   return this.handleServerProgress(response.body.getReader());
        // }).catch((error) => {
        //   if (__DEV__) {
        //     throw error;
        //   }

        // });

        this.setState({ sending: true });
    };

    handleServerProgress = async (reader) => {
        const result = await reader.read();
        const chunk = result.value;

        if (result.done) {
            this.addToast(`"${this.state.fileName}" successfully uploaded!`);
            this.setState({ uploadProgress: 100 });
            this.uploadProgressTimeout = setTimeout(() => {
                this.uploadProgressTimeout = null;
                this.setState({ uploadProgress: undefined });
            }, 500);
            return null;
        }

        const bytes = chunk.byteLength;
        this.setState(({ uploadProgress, fileSize }) => ({
            uploadProgress: uploadProgress + ((bytes / fileSize) * bytes),
        }));

        return this.handleServerProgress(reader);
    };

    handleProgress = (file, progress) => {
        this.setState({ progress });
    };

    handleLoad = ({ name, size }) => {
        this.progressTimeout = setTimeout(() => {
            this.progressTimeout = null;
            this.setState({ progress: null });
        }, 500);
        this.setState({ fileName: name, fileSize: size });
    };

    handleLoadStart = () => {
        this.setState({ progress: 0 });
    };

    dismiss = () => {
        const [, ...toasts] = this.state.toasts;
        this.setState({ toasts });
    };

    handleReset = () => {
        this.setState({ fileName: '' });
    };

    render() {

        const {
            toasts,
            fileName,
            progress,
            sending,
            uploadProgress,
        } = this.state;

        let progressBar;
        if (typeof progress === 'number') {
            progressBar = (
                <span className="file-inputs__upload-form__progress">
                    <LinearProgress id="file-upload-status" value={progress} />
                </span>
            );
        } else if (sending || typeof uploadProgress === 'number') {
            progressBar = (
                <span className="file-inputs__upload-form__progress">
                    <LinearProgress id="file-upload-server-status" query value={uploadProgress} />
                </span>
            );
        }

        return (<div className="md-grid">

            {progressBar}
            <FileUpload
                id="server-upload-file"
                label={<div>Choose file</div>}
                required
                accept="audio/*"
                onLoad={this.handleLoad}
                onLoadStart={this.handleLoadStart}
                onProgress={this.handleProgress}
                name="file"
                className="md-cell md-cell--4"
                primary
                icon={<MdFileUpload />}
                iconBefore
            />

            <TextField
                active={false}
                id="server-upload-file-field"
                placeholder="No file chosen"
                value={fileName}
                className="md-cell md-cell--8"
                readOnly
                fullWidth={false}
            />

            <p className="md-cell md-cell--6 m-2">Once the File has upload - Click on check button to validate the authenticity of your file</p>
            <Button raised primary className="md-cell md-cell--3"
                id="check-audio-file">Check <MdCheck></MdCheck></Button>

            <p className="md-cell md-cell--6 m-2">On Successful Validation Click on Submit Button</p>
            <Button raised primary className="md-cell md-cell--3"
                id="check-audio-file">Submit           <MdFileUpload></MdFileUpload></Button>


        </div>);
    }
}

export default ManageFile;


