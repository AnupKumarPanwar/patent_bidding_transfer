import React, { Component } from 'react';
import { Card,
         CardTitle, 
         CardText, 
         Divider, 
         Button, 
         TableRow, 
         DataTable, 
         TableColumn } from "react-md";

import "../css/patentPage.scss";
import AuctionForm from './auctionPage';
import {connect} from "react-redux";

import {showAuctionAction} from "../../store/actions/patent/PatentAction"

class PatentPage extends Component {

    render() {
        const patentIndex = this.props.match.params.id;
        return (

            <Card className="md-cell md-cell--12 md-text-container">
                <CardTitle
                    title={"Patent Name"}
                />
                <CardText>
                    
                    <DataTable plain = {true}>
                    
                        {Object.keys(this.props.patents[patentIndex]).map( (key) => (
                            <TableRow>
                            <TableColumn>
                                <b>{key}</b>
                            </TableColumn>
                            <TableColumn>
                                {this.props.patents[patentIndex][key]}
                            </TableColumn>
                        </TableRow>
                        ))}
                        
                    </DataTable>


                    <Divider className="m-3" />

{/* 
                    <Button flat primary swapTheming id="transfer" className="action-button" onClick={this.show_trans}>Transfer</Button> */}
                    <Button flat secondary swapTheming className="action-button" onClick={() => this.props.showAuctionAction(this.props.visibleAuction, this.props.visibleTransfer)}>Auction</Button>
                </CardText>

                    { this.props.visibleAuction && <AuctionForm
                    key = {patentIndex}
                    patentIndex={patentIndex} /> }
               
                {/* <TransferForm visible={this.state.visible_transfer}/> */}

            </Card>
        );
    }   
}

const mapStateToProps = (state) => {
    return {
        visibleAuction : state.patent.visibleAuction, 
        patents : state.patent.patents,
        visibleTransfer : state.patent.visibleTransfer
    }
}

const mapDispatchToProps = {
    showAuctionAction
}
    
export default connect(mapStateToProps, mapDispatchToProps)(PatentPage);