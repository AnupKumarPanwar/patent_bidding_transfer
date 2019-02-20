const express = require('express');
const router = express.Router();
const ethConfig = require("../../blockchainConfig");
const Web3 = require('web3');
const AuctionProcess = require("../../build/contracts/AuctionProcess.json");

const provider = new Web3.providers.HttpProvider(
  ethConfig.networkAddress
);

const web3 = new Web3(provider);
const contractABI = AuctionProcess.abi;


router.post("/setAuction",async function (req, res){
  
    const auctionInstance = new web3.eth.Contract(contractABI, ethConfig.auctionContractAddress);
  
    let obj = req.body.data;
    let accounts = await web3.eth.getAccounts();
    auctionInstance.methods.createAuction(parseInt(obj.patentId), parseInt(obj.minimumBid), parseInt(obj.numberOfDays), obj.publicAddress).send({ from: accounts[0], gas: 3000000 }, function (error, data) {
      console.log(data)
      if (data !== null){
        const message = {
          status : "Auction Registered"
        }

        res.status(200).json(message);
      }
      
    });
    
})

module.exports = router;