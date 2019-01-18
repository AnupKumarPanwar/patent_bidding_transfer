import React, { Component } from 'react';
import { MdArrowDropDown, MdAdd, MdFileUpload, MdRemove, MdCheck } from 'react-icons/md';
import { TextField, SelectField, Button, FileUpload, LinearProgress, Divider } from 'react-md';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransition';

import ManageFile from "./fileUpload";
import ManageCollaborators from './manageCollaborators';

const GENRE_ITEMS = [
    { label: 'Rock', value: 'Rock' },
    { label: 'Electronic', value: 'Electronic' },
    { label: 'Pop', value: 'Pop' },
    { label: 'Blues', value: 'Blues' },
    { label: 'Hip Hop', value: 'Hip Hop' },
    { label: 'Folk', value: 'Folk' },
]


class AudioFiling extends Component {

    state = {}

    componentWillUnmount() {
        if (this.progressTimeout) {
            clearTimeout(this.progressTimeout);
        }

        if (this.uploadProgressTimeout) {
            clearTimeout(this.uploadProgressTimeout);
        }
    }

    render() {

        if (this.props.type_visible === 'A') {
            // this.set_component(this.);

            return (<div className='container md-grid'>
                <TextField
                    id="name"
                    type="text"
                    label={"Enter the name of the Audio"}
                    className="md-cell md-cell--12"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />

                <SelectField
                    id="type"
                    placeholder="Select the Genre"
                    className="md-cell md-cell--12"
                    menuItems={GENRE_ITEMS}
                    simplifiedMenu={true}
                    dropdownIcon={<MdArrowDropDown></MdArrowDropDown>}
                    onChange={this.onTypeChange}
                />


                <ManageCollaborators />

                <Divider className="md-cell md-cell--12 m-3" />

                <ManageFile className="md-cell" />

            </div >);
        } else {
            return (
                <React.Fragment />
            );
        }

    }
}

export default AudioFiling;