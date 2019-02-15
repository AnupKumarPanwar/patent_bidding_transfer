import React, { Component } from 'react';
import { Card, CardTitle, CardText, Divider, Button } from "react-md";

import "../css/patentPage.scss";
import AuctionForm from './auctionPage';

class PatentPage extends Component {

    state = {
        title: '',
        visible_transfer: false,
        visible_auction: false
    }

    show_trans = () => {
        this.setState({ visible_transfer: true, visible_auction: false })
    }

    show_auction = () => {
        this.setState({ visible_auction: true, visible_transfer: false })
    }

    componentDidMount() {
        this.setState({ title: this.props.match.params.id });
    }

    render() {
        return (

            <Card className="md-cell md-cell--12 md-text-container">
                <CardTitle
                    title="Commando"
                />
                <CardText>
                    <p>
                        This will contain the description of the patent.
                        </p>
                    <p><b>Type : </b></p>
                    <p><b>Collaborators : </b></p>
                    <Divider className="m-3" />
                    <Button flat primary swapTheming id="transfer" className="action-button" onClick={this.show_trans}>Transfer</Button>
                    <Button flat secondary swapTheming className="action-button" onClick={this.show_auction}>Auction</Button>
                </CardText>

                <AuctionForm visible={this.state.visible_auction} />
                {/* <TransferForm visible={this.state.visible_transfer}/> */}


            </Card>



        );
    }

}

export default PatentPage;