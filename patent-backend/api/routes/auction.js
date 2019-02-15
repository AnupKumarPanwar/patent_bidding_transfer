const express = require('express');
const router = express.Router();
const ethConfig = require("../../blockchainConfig");
const Web3 = require('web3');
const AuctionProcess = require("../../build/contracts/AuctionProcess.json");

const provider = new Web3.providers.HttpProvider("http");

const web3 = new Web3(provider);
const contractABI = AuctionProcess.abi;
const auctionInstance = new web3.eth.Contract(contractABI, ethConfig.auctionContractAddress);

router.post("/setAuction", async function (req, res){
  // res = {username : username, publicAddress : publicAddress, patentId : patentId}
  auctionInstance.methods.createAuction().call({from : publicAddress})
})

module.exports = router;