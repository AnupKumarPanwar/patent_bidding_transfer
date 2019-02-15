import React, { Component } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { Card, CardTitle, SelectField } from 'react-md';

import AudioFiling from '../ip_filing/audiofiling';
import PictureFiling from '../ip_filing/picturefiling';
import { changePatentType } from '../../store/actions/patent/PatentAction';
import { connect } from 'react-redux';


const OBJECT_ITEMS = [{
    label: 'Audio Files',
    value: 'Audio'
},
{
    label: 'Pictures',
    value: 'Image'
}]

class FilePatent extends Component {

    // state = {
    //     type_value: '',
    // }

    onTypeChange = (value, event) => {
        console.log(value);
        // this.setState({ type_value: value });
        this.props.changePatentType(value);
    }

    render() {
        return (
            <Card className='md-cell md-cell--12 md-text-container'>
                <CardTitle><h3>Application for your Intellectual Property for</h3></CardTitle>
                <div class='md-grid'>
                    <SelectField
                        id='type'
                        placeholder='Select the type of Intellectual Property'
                        className='md-cell md-cell--12'
                        menuItems={OBJECT_ITEMS}
                        simplifiedMenu={true}
                        dropdownIcon={<MdArrowDropDown></MdArrowDropDown>}
                        onChange={this.onTypeChange}
                    />

                </div>

                <AudioFiling type_visible={this.props.patentType} />
                <PictureFiling type_visible={this.props.patentType} />

            </Card>);
    };
};

const mapStateToProps = (state) => {
    return {
        patentType: state.patent.patentType
    }
}

const mapDispatchToProps = {
    changePatentType
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilePatent);
