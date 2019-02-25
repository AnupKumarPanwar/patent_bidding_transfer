const express = require('express');
const router = express.Router();
const AuctionProcess = require('../../build/contracts/AuctionProcess.json');
const ethConfig = require('../../blockchainConfig');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(
  ethConfig.networkAddress
);

const web3 = new Web3(provider);
const contractABI = AuctionProcess.abi;

router.post("/bidForPatent", async (req, res) => {
  const publicAddress = req.body.publicAddress;
  const auctionId = req.body.auctionId;
  const bidAmount = req.body.bidAmount;
  const auctionInstance = new web3.eth.Contract(contractABI, ethConfig.auctionContractAddress);
  const accounts = await web3.eth.getAccounts();
  auctionInstance.methods.addBid(auctionId, bidAmount, publicAddress)
    .send({
      from: accounts[0], gas: 300000
    })
    .on('receipt', (receipt) => {
      res.send(receipt)
    })
})
module.exports = router;