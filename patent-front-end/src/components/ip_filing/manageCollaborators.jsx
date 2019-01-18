import React, { Component } from 'react';
import { Button, TextField } from 'react-md';
import { MdAdd, MdRemove } from 'react-icons/md';

class ManageCollaborators extends Component {
    state = {
        count_colaborators: []
    }

    add_collaborator = () => {
        // const cc = this.state.count_colaborators + 1
        const { count_colaborators } = this.state;
        const cc = [...count_colaborators];
        cc.push(cc[cc.length - 1] + 1);
        this.setState({ count_colaborators: cc });
    }

    remove_collaborator = () => {
        // const cc = this.state.count_colaborators + 1
        const { count_colaborators } = this.state;
        const cc = [...count_colaborators];
        // cc.push(cc[cc.length - 1] + 1);

        if (cc.length > 0) {
            cc.pop()
        }
        this.setState({ count_colaborators: cc });
    }

    render() {
        return (<div>

            <p className="md-cell md-cell--4" >Add Collaborators</p>

            <Button icon className="md-cell md-cell--4" onClick={this.add_collaborator}><MdAdd /></Button>
            <Button icon className="md-cell md-cell--4" onClick={this.remove_collaborator}><MdRemove /></Button>

            {this.state.count_colaborators.map((item) => (

                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the collaborator"
                    className="md-cell md-cell--12"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />
            ))
            }
        </div>);
    }
}

export default ManageCollaborators;