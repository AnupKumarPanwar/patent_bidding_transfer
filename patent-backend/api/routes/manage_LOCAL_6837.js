const express = require('express');
const router = express.Router();
const AuctionProcess = require("../../build/contracts/AuctionProcess.json");
const ethConfig = require("../../blockchainConfig");
const Web3 = require('web3');
var Busboy = require('busboy');
const fs = require('fs');
var exec = require('child_process').exec;

const path = require('path');
const formidable = require('formidable');

const provider = new Web3.providers.HttpProvider(
    ethConfig.networkAddress
);

const web3 = new Web3(provider);
const contractABI = AuctionProcess.abi;
const auctionInstance = new web3.eth.Contract(contractABI, ethConfig.auctionContractAddress);


router.post('/getPatents', async function (req, res) {

    let patentRes = []
    
    const list = ["owners", "licenseHolders","patentName", "patentType","patentDate", "patentId"];

    const ownerAddress = req.body.data.publicAddress;
    try{
        const patent = await auctionInstance.methods.getPatentsByOwner(ownerAddress).call();

        patent.map((arraya) => {
            obj = {}
            arraya.map((val, index) => {
                obj[list[index]]=val
            
        })
            patentRes.push(obj)
        
        }) 

        console.log(patentRes)

        res.status(200).send(patentRes)
    }catch(err) {
        console.error(err)
    }
})

module.exports = router;

