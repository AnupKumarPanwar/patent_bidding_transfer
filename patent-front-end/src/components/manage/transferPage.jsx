import React, { Component } from 'react';
import { TextField, Button, DialogContainer } from 'react-md';

class TransferForm extends Component {

    state = {
        receiverName: '',
        visible: false
    }

    show = () => {
        this.setState({ visible: true });
    };

    hide = () => {
        this.setState({ visible: false });
    };

    componentDidMount() {
        console.log("Auction Form Mounted");
    }

    handleInputChange = (value, event) => {
        this.setState({
            [event.target.id]: value
        })
    }


    render() {

        const { visible } = this.state;
        // TODO define in constants file.
        const actions = [{
            onClick: this.hide,
            primary: true,
            children: 'Yes, I confirm',
        }, {
            onClick: this.hide,
            primary: true,
            children: 'No thanks',
        }];

        if (this.props.visible) {
            return (
                <div className="md-grid">
                    <TextField
                        id="receiverName"
                        className="md-cell md-cell--12"
                        placeholder="Receiver's address"
                        onChange={this.handleInputChange}
                    />

                    <Button
                        raised
                        primary
                        children="Continue"
                        className="md-cell md-cell--6"
                        onClick={this.show}
                    />
                    <DialogContainer
                        id="speed-boost"
                        visible={visible}
                        title="Do you really want to transfer the patent?"
                        onHide={this.hide}
                        aria-describedby="speed-boost-description"
                        modal
                        actions={actions}
                    >
                        <p id="speed-boost-description" className="md-color--secondary-text">
                        {/* // TODO define in constants file. */}
                            By tranferring the patent, you transfer all the rights of your work to the other party. This process can not be undone.
          </p>
                        <h4>Receiver's Details</h4>
                        <p id="speed-boost-description" className="md-color--secondary-text">
                            <b>Name :</b> Anup Kumar Panwar<br />
                            <b>Nationality :</b> Indian
          </p>
                    </DialogContainer>
                </div>
            );
        } else {
            return (
                <React.Fragment />
            );
        }
    }
}

export default TransferForm;