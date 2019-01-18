import React, { Component } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { Card, CardTitle, SelectField, Divider } from "react-md";

import AudioFiling from './ip_filing/audiofiling';
import PictureFiling from './ip_filing/picturefiling';


const OBJECT_ITEMS = [{
    label: 'Audio Files',
    value: "A"
},
{
    label: 'Pictures',
    value: 'B'
}]

class FilePatent extends Component {

    state = {
        type_value: "",
    }

    onTypeChange = (value, event) => {
        console.log(value);
        this.setState({ type_value: value })
    }

    render() {
        return (
            <Card className="md-cell md-cell--12 md-text-container">
                <CardTitle><h3>Apply a patent</h3></CardTitle>
                <SelectField
                    id="type"
                    placeholder="Select the type of Intellectual Property"
                    className="md-cell md-cell--12"
                    menuItems={OBJECT_ITEMS}
                    simplifiedMenu={true}
                    dropdownIcon={<MdArrowDropDown></MdArrowDropDown>}
                    onChange={this.onTypeChange}
                />
                <Divider />

                <AudioFiling type_visible={this.state.type_value} />
                <PictureFiling type_visible={this.state.type_value} />

            </Card>);
    };
};

export default FilePatent;