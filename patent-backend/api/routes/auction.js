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
const contractAddress = ethConfig.auctionContractAddress;

router.post("/getResult", async (req, res) => {
  const auctionInstance = new web3.eth.Contract(contractABI, contractAddress);

  let obj = req.body;
  // console.log(obj);
  let accounts = await web3.eth.getAccounts();
  auctionInstance.methods.getResult(parseInt(obj.auctionId), new Date().getTime()).send({
    from: accounts[0],
    gas: 3000000
  }).
    on('receipt', (receipt) => {
      // const remainingTime = receipt["events"]["printRemainingAuctionTime"]["returnValues"]['remainingTime'];

      if (receipt["events"]["printAuctionResult"]) {
        const winner = receipt["events"]["printAuctionResult"]["returnValues"]['winner'];

        Patent.updateOne({
          $and: [{
            patentId: obj.auctionId
          }]
        }, {
            status: "RESULT_AVAILABLE"
          }).then((data, err) => {
            if (!err) {
              res.status(200).json({
                success: true,
                message: "Auction results are available.",
                data: {
                  winner: winner
                }
              })
            }
          })
      } else {
        console.log(receipt)
        res.status(200).json({
          success: false,
          message: "Auction not complete yet.",
          data: {
            // remainingTime: remainingTime,
            winner: null
          }
        })
      }

    })
})

router.post("/setAuction", async function (req, res) {

  const auctionInstance = new web3.eth.Contract(contractABI, contractAddress);

  let obj = req.body.data;
  let accounts = await web3.eth.getAccounts();

  let endDate = new Date().getTime() + parseFloat(obj.numberOfDays) * 24 * 60 * 60 * 1000;
  let minBid = parseInt(obj.minimumBid);
  auctionInstance.methods.createAuction(parseInt(obj.patentId), minBid, parseInt(endDate), obj.publicAddress).send({ from: accounts[0], gas: 3000000 }).
    on('receipt', (receipt) => {
      if (Object.keys(receipt["events"]).includes("AuctionIdReturn")) {
        const auctionId = receipt["events"]["AuctionIdReturn"]["returnValues"]['auctionId'];

        if (typeof (auctionId) !== "number") {

          Patent.find({
            $and: [{
              patentId: obj.patentId
            },
            {
              owners: obj.publicAddress
            },
            {
              status: false
            }
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
                  auctionId: auctionId,
                  endDate: endDate,
                  minBid: minBid
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

      } else if (Object.keys(receipt["events"]).includes("duplicateAuction")) {
        res.status(200).json({
          success: false,
          message: "This IP is already up for Auction",
          auctionId: null
        })
      }

    });
})

// this route will basically return all the patents that are up for the auction except the one's user has for auction
router.post("/getActiveAuctions", (req, res) => {

  Patent.find({

    

    $and: [{
      status: true
    },
    {
      owners: { $not: { $eq: req.body.data.publicAddress } }
    }
    ]
  }

  ).then((data, err) => {
    console.log(data)
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data
      })
    } else {
      res.status(200).json({
        success: false,
        message: "Not Success",
        data: [],
        log: err
      })
    }
  })
})

// this route will return all the patents that are up 
router.post("/getUserActiveAuctions", (req, res) => {
  const user = req.body.data;
  // TODO Remove unwanted comments.
  // console.log(us

  Patent.find(
    {
      $and: [
        { "status": ["true", "RESULT_AVAILABLE"] },
        { "owners": user.publicAddress }
      ]
    }
  ).then((data, err) => {
    // console.log(data)
    if (!err) {
      res.status(200).json({
        success: true,
        message: "Success",
        data
      })
    } else {
      res.status(200).json({
        success: false,
        message: "Failure",
        data: []
      })
    }
  })
})


module.exports = router;