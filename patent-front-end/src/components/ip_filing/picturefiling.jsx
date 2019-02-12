import React, { Component } from 'react';

import { TextField, SelectField, Divider } from 'react-md';
import { MdArrowDropDown } from 'react-icons/md';

import ManageFile from "./fileUpload";
import ManageCollaborators from './manageCollaborators';


const PICTURE_ITEM = [

    { label: 'Painting', value: 'Painting' },
    { label: 'Poster', value: 'Poster' },
    { label: 'Design', value: 'Design' },
    { label: 'Logo', value: 'Logo' }

]

class PictureFiling extends Component {

    render() {

        if (this.props.type_visible === 'B') {
            return (<div className='container md-grid'>

                <SelectField
                    id="type"
                    placeholder="Select the type of Image"
                    className="md-cell md-cell--12"
                    menuItems={PICTURE_ITEM}
                    simplifiedMenu={false}
                    dropdownIcon={<MdArrowDropDown></MdArrowDropDown>}
                    onChange={this.onTypeChange}
                />

                <TextField
                    id="name"
                    type="text"
                    label="Enter the name of the image"
                    className="md-cell md-cell--12"
                    placeholder="Enter name"
                    //   value={this.state.name}
                    //   onChange={this.handleInputChange}
                    required={true}
                />

                <ManageCollaborators className="md-cell" />

                <Divider className="md-cell md-cell--12 m-3" />

                <ManageFile />

            </div>);
        } else {
            return (
                <React.Fragment />
            );
        }

    }
}

export default PictureFiling;