import React from 'react';
import { Card, CardTitle, DataTable } from 'react-md';

const ActiveAuction = ({ props }) => (
  <React.Fragment>
    <ActiveAuctionTable />
    <ActiveAuctionDetails />
  </React.Fragment>
);


export default ActiveAuction;