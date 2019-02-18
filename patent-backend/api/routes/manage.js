const express = require('express');
const router = express.Router();
const AuctionProcess = require("../../build/contracts/AuctionProcess.json");
const ethConfig = require("../../blockchainConfig");
const Web3 = require('web3');
let Busboy = require('busboy');
const fs = require('fs');
let exec = require('child_process').exec;
const Patent = require('../models/Patents');
const User = require('../models/Users');
const mongoose = require('mongoose');
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

    const list = ["owners", "licenseHolders", "patentName", "patentType", "patentDate", "patentId"];

    const ownerAddress = req.body.data.publicAddress;
    try {
        const patent = await auctionInstance.methods.getPatentsByOwner(ownerAddress).call();

        patent.map((arraya) => {
            obj = {}
            arraya.map((val, index) => {
                obj[list[index]] = val

            })
            patentRes.push(obj)

        })

        console.log(patentRes)
        res.status(200).send(patentRes)
    } catch (err) {
        console.error(err)
    }
})

router.post("/auction", function (req, res, next) {
    console.log(req.body.data);
})

router.post('/registerPatent', async function (req, res) {

    const patent_data = req.body.data;
    // let auctionInstance = await contract.deployed();
    let accounts = await web3.eth.getAccounts();

    console.log(accounts);

    let owners = patent_data.owners;
    let lisenceHolders = patent_data.lisenceHolders;
    let patentName = patent_data.patentName;
    let patentType = patent_data.patentType;
    let patentSubType = patent_data.patentSubType;
    let issueDate = '' + new Date().getTime();
    let uploadFileName = patent_data.uploadFileName;
    patent_data.status = 'false';

    const patent = new Patent(patent_data);

    auctionInstance.methods.registerPatent(owners, lisenceHolders, patentName, issueDate, patentType, patentSubType).send({ from: accounts[0], gas: 3000000 }, function (error, data) {

        console.log(data);

        if (patentType === "Audio") {
            exec('python AudioComparision/dejavu.py --config dejavu/dejavu.cnf.SAMPLE --fingerprint uploads/Audio/' + uploadFileName, (err, stdout, stderr) => {
                console.log(err);
                console.log(stdout);
                console.log(stderr);
                patent
                    .save()
                    .then(msg => {
                        res.status(200).json({
                            success: true,
                            message: 'Patent registered successfully',
                            data: JSON.stringify(data)
                        })
                    })
                    .catch(err => {
                        res.status(200).json({
                            success: false,
                            message: 'Patent registration failed.',
                            data: err
                        })
                    })
            })
        }
        else if (patentType === "Image") {
            exec('python ImageComparision/dejavu.py --fingerprint uploads/Image/' + uploadFileName, (err, stdout, stderr) => {
                console.log(err);
                console.log(stdout);
                console.log(stderr);
                patent
                    .save()
                    .then(msg => {
                        res.status(201).json({
                            message: JSON.stringify(data)
                        })
                    })
                    .catch(err => {
                        message = "Patent could not be registered"
                        res.status()
                    })
            })
        }
    })
})


router.post('/getPatent', async function (req, res) {
    const patent_data = req.body.data;
    let patent = await auctionInstance.methods.getPatent(patent_data.id).call();
    console.log(patent);

    res.status(201).json({
        message: JSON.stringify(patent)
    })

})

router.post('/checkSignature', function (req, res) {
    let uploadFile = req.files.file;
    let uploadFileName = 'u' + Date.now() + req.files.file.name;
    let fileExtention = path.extname(uploadFileName);
    let allowedImageExtentions = ['.jpg', '.png', '.jpeg'];
    let allowedAudioExtentions = ['.mp3', '.wav'];

    if (allowedImageExtentions.includes(fileExtention)) {
        patentType = "Image";
    }
    else if (allowedAudioExtentions.includes(fileExtention)) {
        patentType = "Audio";
    }
    else {
        res.status(200).json({
            success: false,
            message: 'Invalid file format.'
        })
    }

    let uploadPath = '';
    let command = '';

    if (patentType === "Image") {
        uploadPath = './uploads/Image/' + uploadFileName;
        command = 'python ImageComparision/dejavu.py --recognize "uploads/Image/' + uploadFileName + '"';
    }
    else if (patentType === "Audio") {
        uploadPath = './uploads/Audio/' + uploadFileName;
        command = 'python AudioComparision/dejavu.py --config AudioComparision/dejavu.cnf.SAMPLE --recognize file "uploads/Audio/' + uploadFileName + '"';
    }


    uploadFile.mv(uploadPath, (err) => {
        if (err) console.log('error' + err);
        exec(command, (err, stdout, stderr) => {
            console.log(stderr);
            console.log(err);
            console.log(stdout);
            let result = stdout.replace(/\'/g, '"');
            if (result[0] !== 'N') {
                result = JSON.parse(result);
                console.log(result);
                if (parseInt(result.confidence) > 100) {
                    res.status(200).json({
                        success: true,
                        message: uploadFileName,
                        similarPatentFound: true,
                        similarPatent: result
                    })
                }
                else {
                    res.status(201).json({
                        success: true,
                        message: uploadFileName,
                        similarPatentFound: false
                    })
                }
            }
            else {
                res.status(201).json({
                    success: true,
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
})


router.post('/search', async function (req, res) {
    let query = new RegExp(req.body.data.query, "i");
    console.log(query);
    let message = '';
    let patents = [];
    let users = [];
    await Patent.find({
        $or: [
            { 'patentName': query },
            { 'patentType': query },
            { 'patentSubType': query }
        ]
    })
        .then((res_patents) => {
            patents = res_patents;
        })
        .catch(
            err => {
                console.error("ERROR : " + err)
                message = "SERVER ERROR";
            }
        )

    await User.find({
        $or: [
            { 'name': query },
            { 'email': query },
            { 'username': query },
            { 'nationality': query }
        ]
    })
        .then((res_user) => {
            users = res_user;
        })
        .catch(
            err => {
                console.error("ERROR : " + err)
                message = "SERVER ERROR";
            }
        )
        res.status(200).json({
                success: true,
                message: {
                    patents : patents,
                    users : users
                }
            })
});

module.exports = router;
