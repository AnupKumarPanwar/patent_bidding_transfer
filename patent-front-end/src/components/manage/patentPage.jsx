import React, { Component } from 'react';
import {
    Card,
    CardTitle,
    CardText,
    Divider,
    Button,
    TableRow,
    DataTable,
    TableColumn
} from "react-md";

import "../css/patentPage.scss";
import AuctionForm from './auctionPage';
import { connect } from "react-redux";

import { showAuctionAction } from "../../store/actions/patent/PatentAction"
import service from '../../services/patentService';


class PatentPage extends Component {

    state = {
        patent : {},
        patentIndex: ''
    }

    componentDidMount() {
        const patentIndex = this.props.match.params.id;
        
        // TODO Define a thunk for it. also in other files too.
        service.getPatent({ id: patentIndex })
            .then(async (res) => {
                this.setState({patent:res.message, patentIndex});
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {
        return (

            
            <Card className="md-cell md-cell--12 md-text-container">
                <CardTitle
                    title={"Patent Name"}
                />
                <CardText>

                    <DataTable plain={true}>

                        {Object.keys(this.state.patent).map((key) => (
                            <TableRow>
                                <TableColumn>
                                    <b>{key}</b>
                                </TableColumn>
                                <TableColumn>
                                    {this.state.patent[key]}
                                </TableColumn>
                            </TableRow>
                        ))}

                    </DataTable>


                    <Divider className="m-3" />

                    <Button flat secondary swapTheming className="action-button" onClick={() => this.props.showAuctionAction(this.props.visibleAuction, this.props.visibleTransfer)}>Auction</Button>
                </CardText>

                {this.props.visibleAuction && <AuctionForm
                    key={this.state.patentIndex}
                    patentIndex={this.state.patentIndex}
                    history = {this.props.history}
                    />}

                {/* <TransferForm visible={this.state.visible_transfer}/> */}

            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        visibleAuction: state.patent.visibleAuction,
        patents: state.patent.patents,
        visibleTransfer: state.patent.visibleTransfer
    }
}

const mapDispatchToProps = {
    showAuctionAction
}

export default connect(mapStateToProps, mapDispatchToProps)(PatentPage);

