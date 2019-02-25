const express = require('express');
const router = express.Router();
const ethConfig = require("../../blockchainConfig");
const Web3 = require('web3');
const AuctionProcess = require("../../build/contracts/AuctionProcess.json");
const Patent = require("../models/Patents")

const provider = new Web3.providers.HttpProvider(
  ethConfig.networkAddress
);

const web3 = new Web3(provider);
const contractABI = AuctionProcess.abi;
const contractAddress = AuctionProcess.networks.address;


router.post("/setAuction", async function (req, res) {

  const auctionInstance = new web3.eth.Contract(contractABI, contractAddress);

  let obj = req.body.data;
  let accounts = await web3.eth.getAccounts();
  auctionInstance.methods.createAuction(parseInt(obj.patentId), parseInt(obj.minimumBid), parseInt(obj.numberOfDays), obj.publicAddress).send({ from: accounts[0], gas: 3000000 }).
    on('receipt', (receipt) => {
      const auctionId = receipt["events"]["AuctionIdReturn"]["returnValues"]['auctionId'];

      if (typeof (auctionId) !== "number") {

        Patent.find({
          $and: [
            { patentId: obj.patentId },
            { owners: obj.publicAddress },
            { status: false }
          ]
        }).then((result, err) => {
          if (result) {
            console.log(result)
            Patent.updateOne(
              {
                $and: [
                  { patentId: obj.patentId },
                  { owners: obj.publicAddress }
                ]
              },
              {
                status: true,
                auctionId: auctionId
              }
            ).then((data, err) => {
              if (!err) {
                console.log("Sending Auction id !!")
                res.status(200).json({
                  success: true,
                  message: "IP set for Auction",
                  auctionId: auctionId
                })
              }
            })
          } else {
            res.status(200).json({
              success: false,
              message: "Something does not Seems right",
              auctionId: null
            })
          }
        })


      } else {
        res.status(200).json({
          success: false,
          message: "IP not set for Auction",
          auctionId: null
        })
      }
    });
})

// this route will basically return all the patents that are up for the auction 
router.get("/getActiveAuctions", (req, res) => {
  Patent.find(
    { status: true }
  ).then((data, err) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data
      })
    }
  })
});

// this route will return all the patents that are up 
router.post("/getUserActiveAuctions", (req, res) => {
  const user = req.body.data;
  Patent.find(
    {
      $and: [
        { status: true },
        { owners: user.publicAddress }
      ]
    }
  ).then((data, err) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data
      })
    }
  })
})

module.exports = router;