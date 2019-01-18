import React, { Component } from 'react';
import { MdArrowDropDown, MdAdd } from 'react-icons/md';
import { TextField, SelectField, Button } from 'react-md';


const GENRE_ITEMS = [
    { label: 'Rock', value: 'R' },
    { label: 'Electronic', value: 'E' },
    { label: 'Pop', value: 'P' },
    { label: 'Blues', value: 'Blues' },
    { label: 'Hip Hop', value: 'H' },
    { label: 'Folk', value: 'F' },
]


class AudioFiling extends Component {

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

    render() {

        if (this.props.type_visible === 'A') {
            return (<div className='container md-grid'>
                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the audio"
                    className="md-cell md-cell--12"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />
                <SelectField
                    id="type"
                    placeholder="Select the type of Intellectual Property"
                    className="md-cell md-cell--12"
                    menuItems={GENRE_ITEMS}
                    simplifiedMenu={true}
                    dropdownIcon={<MdArrowDropDown></MdArrowDropDown>}
                    onChange={this.onTypeChange}
                />

                <TextField
                    id="name"
                    type="text"
                    label="Enter the collaborator in generation of the audio"
                    className="md-cell md-cell--12"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />

                <Button icon className="md-cell md-cell--12" onClick={this.add_collaborator}><MdAdd /></Button>

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

                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the audio"
                    className="md-cell md-cell--12"
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

export default AudioFiling;