const express = require('express');
const router = express.Router();
const Auction = require("../../build/contracts/Auction.json");
const PatentManager = require("../../build/contracts/PatentManager.json");
const Web3 = require('web3');
var Busboy = require('busboy');
const fs = require('fs');
var exec = require('child_process').exec;

const path = require('path');
const formidable = require('formidable');
// const multer = 
const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:9545"
);

const web3 = new Web3(provider);
var contractABI = Auction.abi;
var contractAddress = Auction.networks.address;
var auctionInstance = new web3.eth.Contract(contractABI, contractAddress);

contractABI = PatentManager.abi;
contractAddress = PatentManager.networks.address;
var patentManagerInstance = new web3.eth.Contract(contractABI, contractAddress);


// var accounts;

// async function getAccount(){
//     accounts = await web3.eth.getAccounts();
//     console.log(accounts);
// }

// getAccount();

// change the address when ever there is a change in machine !
auctionInstance.options.address = "0x99AD37D58Fd83558f89b67f950DfE185d522bBB4"
patentManagerInstance.options.address = "0xaC3B34f592d598B575066a637e92ec325156e6F6"

router.post("/auction", function (req, res, next) {
    console.log(req.body.data);
})


router.post('/registerPatent', async function (req, res) {
    const patent_data = req.body.data;

    // var auctionInstance = await contract.deployed();
    var accounts = await web3.eth.getAccounts();

    console.log(accounts);

    var owners = patent_data.owners;
    var lisenceHolders = patent_data.lisenceHolders;
    var patentName = patent_data.patentName;
    var patentType = patent_data.patentType;
    var issueDate = patent_data.issueDate;
    var uploadFileName = patent_data.uploadFileName;

    patentManagerInstance.methods.registerPatent(owners, lisenceHolders, patentName, patentType, issueDate).send({ from: accounts[0], gas: 3000000 }, function (error, data) {

        console.log(data);

        if (patentType === "Audio") {
            exec('python AudioComparision/dejavu.py --config dejavu/dejavu.cnf.SAMPLE --fingerprint uploads/Audio/' + uploadFileName, (err, stdout, stderr) => {
                res.status(201).json({
                    message: JSON.stringify(data)
                })
            })
        }
        else {
            res.status(201).json({
                message: JSON.stringify(data)
            })
        }
    });

})


router.post('/getPatent', async function (req, res) {
    const patent_data = req.body.data;

    var patent = await patentManagerInstance.methods.getPatent(patent_data.id).call();

    console.log(patent);

    res.status(201).json({
        message: JSON.stringify(patent)
    })

})

router.post('/myPatents', async function (req, res) {
    const patent_data = req.body.data;

    var patent = await patentManagerInstance.methods.getPatentsByOwner(patent_data.owner).call();

    console.log(patent);

    res.status(201).json({
        message: JSON.stringify(patent)
    })

})


router.post('/checkSignature', function (req, res) {
    let uploadFile = req.files.file;
    let uploadFileName = 'u' + Date.now() + req.files.file.name;
    uploadFile.mv('./uploads/Audio/' + uploadFileName, (err) => {
        if (err) console.log(err);
        exec('python AudioComparision/dejavu.py --config dejavu/dejavu.cnf.SAMPLE --recognize file "uploads/Audio/' + uploadFileName + '"', (err, stdout, stderr) => {
            console.log(stderr);
            console.log(err);
            console.log(stdout);
            var result = stdout.replace(/\'/g, '"');
            if (result !== 'None\n') {
                result = JSON.parse(result);
                console.log(result);
                if (parseInt(result.confidence) > 100) {
                    res.status(200).json({
                        message: uploadFileName,
                        similarPatentFound: true,
                        similarPatent: result
                    })
                }
                else {
                    res.status(200).json({
                        message: uploadFileName,
                        similarPatentFound: false
                    })
                }
            }
            else {
                res.status(200).json({
                    message: uploadFileName,
                    similarPatentFound: false
                })
            }
        })
    })
})

router.post('/checkSignature', function (req, res) {
    let uploadFile = req.files.file;
    let uploadFileName = 'u' + Date.now() + req.files.file.name;
    uploadFile.mv('./uploads/' + uploadFileName, (err) => {
        if (err) console.log(err);
        exec('python dejavu/dejavu.py --config dejavu/dejavu.cnf.SAMPLE --recognize file "uploads/' + uploadFileName + '"', (err, stdout, stderr) => {
            console.log(stderr);
            console.log(err);
            console.log(stdout);
            var result = stdout.replace(/\'/g, '"');
            if (result !== 'None\n') {
                result = JSON.parse(result);
                console.log(result);
                if (parseInt(result.confidence) > 100) {
                    res.status(200).json({
                        message: uploadFileName,
                        similarPatentFound: true,
                        similarPatent: result
                    })
                }
                else {
                    res.status(200).json({
                        message: uploadFileName,
                        similarPatentFound: false
                    })
                }
            }
            else {
                res.status(200).json({
                    message: uploadFileName,
                    similarPatentFound: false
                })
            }
        })
    })
})


router.post("/bidPatent", async function (req, res) {
    // create contract auctionInstance
    const bid = req.body;
    console.log(bid);
    const response = await auctionInstance.methods.addBid(parseInt(bid.patentId), parseInt(bid.minimum_bid))
        .send({
            from: "0xfe4e2178395430069d9590e4a4c61820f03f57c5", gas: 2000000
        }).catch(err => {
            console.log(err);
        });

    console.log(response);
    res.status(201).json({
        message: JSON.stringify(response)
    })
})

module.exports = router;

