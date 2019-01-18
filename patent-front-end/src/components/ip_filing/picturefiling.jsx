import React, { Component } from 'react';

import { TextField } from 'react-md';

class PictureFiling extends Component {


    render() {

        if (this.props.type_visible === 'B') {
            return (<div className='container md-grid'>
                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the audio"
                    className="md-cell"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />
                <TextField
                    id="name"
                    type="text"
                    label="Enter the genre of the audio"
                    className="md-cell"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />
                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the audio"
                    className="md-cell"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />
                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the audio"
                    className="md-cell"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />
                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the audio"
                    className="md-cell"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />
            </div>);
        } else {
            return (
                <React.Fragment />
            );
        }

    }
}

export default PictureFiling;