import React, { Component } from 'react';

import { Card, CardTitle, CardText, Divider, Button, DialogContainer } from "react-md";

import "./css/patentPage.scss";

class PatentPage extends Component {

    state = {
        title: ''
    }

    show = () => {
        this.setState({ visible: true });
    };

    hide = () => {
        this.setState({ visible: false });
    };

    componentDidMount() {
        this.setState({ title: this.props.match.params.id });
    }

    render() {

        const { visible } = this.state;
        const actions = [{
            onClick: this.hide,
            primary: false,
            children: 'Yes I confirm',
        }, {
            onClick: this.hide,
            primary: true,
            children: 'No thanks',
        }];

        return (
            <div>
                <Card className="md-cell md-cell--12 md-text-container">
                    <CardTitle><h2>{this.state.title}</h2></CardTitle>
                    <CardText>
                        <p>
                            This will contain the description of the patent.
                    </p>
                        <p><b>Type : </b></p>
                        <p><b>Collaborators : </b></p>
                        <Divider style={{ margin: '15px' }} />
                        <Button flat primary swapTheming className="action-button">Transfer</Button>
                        <Button flat secondary swapTheming className="action-button" onClick={this.show}>Auction</Button>
                    </CardText>
                </Card>
                <DialogContainer
                    id="speed-boost"
                    visible={visible}
                    title="Put on auction?"
                    onHide={this.hide}
                    aria-describedby="speed-boost-description"
                    modal
                    actions={actions}
                >
                    <p id="speed-boost-description" className="md-color--secondary-text">
                        By putting on auction, other users can bid for your patent. You will lose your rights of the patent after auction ends successfully.
                    </p>
                </DialogContainer>
            </div>
        );
    }

}

export default PatentPage;