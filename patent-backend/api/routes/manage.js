const express = require('express');
const router = express.Router();
const AuctionProcess = require('../../build/contracts/AuctionProcess.json');
const ethConfig = require('../../blockchainConfig');
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
const contractAddress = ethConfig.auctionContractAddress;

async function getPatents(ownerAddress) {
    const auctionInstance = new web3.eth.Contract(contractABI, contractAddress);
    let patentRes = [];
    const list = ["owners", "licenseHolders", "patentName", "patentType", "patentSubType", "issueDate", "patentId"];

    try {
        const patent = await auctionInstance.methods.getPatentsByOwner(ownerAddress).call();

        // TODO SPELLINGS CHECK
        patent.map((arraya) => {
            obj = {}
            arraya.map((val, index) => {
                obj[list[index]] = val

            })
            patentRes.push(obj)

        })
        return patentRes;
    } catch (err) {
        // here we are passing a null array because at the front end 
        // if any scenario we dont get a empty array the code collapses
        return [];
    }
}

router.post('/getPatents', async function (req, res) {
    
    const ownerAddress = req.body.data.publicAddress;
    let patentRes = await getPatents(ownerAddress);

    console.log(patentRes)
    res.status(200).send(patentRes)
})

router.post('/registerPatent', async function (req, res) {

    try {

        const patent_data = req.body.data;
        let accounts = await web3.eth.getAccounts();

        const auctionInstance = new web3.eth.Contract(contractABI, contractAddress);

        let owners = patent_data.owners;
        let lisenceHolders = []
        let patentName = patent_data.patentName;
        let patentType = patent_data.patentType;
        let patentSubType = patent_data.patentSubType;
        let issueDate = '' + new Date().getTime();
        let uploadFileName = patent_data.uploadFileName;
        patent_data.status = 'false';

        auctionInstance.methods.registerPatent(owners, lisenceHolders, patentName, issueDate, patentType, patentSubType).send({
                from: accounts[0],
                gas: 3000000
            })
            .on('receipt', function (data) {

                let patentId = data['events'].printIntValue.returnValues.value;

                patent_data.patentId = parseInt(patentId);
                patent_data.auctionId = null;

                const patent = new Patent(patent_data);

                if (patentType === "Audio") {
                    console.log("Audio");
                    exec('python AudioComparision/dejavu.py --config AudioComparision/dejavu.cnf.SAMPLE --fingerprint uploads/Audio/' + uploadFileName, (err, stdout, stderr) => {

                        console.log('err', err);
                        console.log('stdout', stdout);
                        console.log('stderr', stderr);

                        patent
                            .save()
                            .then(msg => {
                                console.log("saved")
                                res.status(201).json({
                                    success: true,
                                    message: 'Patent registered successfully',
                                    data: data
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
                } else if (patentType === "Image") {
                    console.log("Image");

                    exec('python ImageComparision/dejavu.py --fingerprint uploads/Image/' + uploadFileName, (err, stdout, stderr) => {
                        console.log(err);
                        console.log(stdout);
                        console.log(stderr);
                        patent
                            .save()
                            .then(msg => {
                                console.log(msg)
                                res.status(201).json({
                                    success: true,
                                    message: 'Patent registered successfully',
                                    data: data
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(200).json({
                                    success: false,
                                    message: 'Patent registration failed.',
                                    data: err
                                })
                            })
                    })
                }
            })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: 'Server error.',
            data: error
        })
    }
})

router.post('/getPatent', async function (req, res) {
    const auctionInstance = new web3.eth.Contract(contractABI, contractAddress);
    const patent_data = req.body.data;
    let patent = await auctionInstance.methods.getPatent(patent_data.id).call();
    console.log(patent);
    let patentRes = [];
    const list = ["owners", "licenseHolders", "patentName", "patentType", "patentSubType", "issueDate", "patentId"];

    obj = {}
    patent.map((val, index) => {
        obj[list[index]] = val

    })
    patentRes = obj;

    Patent.findOne({
        patentId: patent_data.id
    }).then((data, err) => {
        patentRes.uploadFileName = data.uploadFileName

        res.status(201).json({
            message: patentRes
        })
    })
})

router.post('/transferPatent', async function (req, res) {
    const auctionInstance = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await new web3.eth.getAccounts();
    const obj = req.body.data;
    let patent = await auctionInstance.methods.transferPatent(obj.patentId, obj.receiver, obj.sender).send({
            from: accounts[0],
            gas: 3000000
        })
        .on('receipt', function (data) {
            console.log(data);
            Patent.findOne({
                $and: [{
                    patentId: obj.patentId
                }]
            }).then((result, err) => {
                if (result) {
                    console.log(result)
                    let owners = result.owners
                    let index = owners.indexOf(obj.sender)
                    if (index !== -1) {
                        owners[index] = obj.receiver
                    }
                    Patent.updateOne({
                        $and: [{
                            patentId: obj.patentId
                        }]
                    }, {
                        owners: owners, 
                        status : "false",
                        endDate:null,
                        minBid:null
                    }).then((data, err) => {
                        if (!err) {
                            console.log("Sending Auction id !!")
                            res.status(200).json({
                                success: true,
                                message: "Patent transferred successfully"
                            })
                        }
                    })
                } else {
                    res.status(200).json({
                        success: false,
                        message: "Something does not seems right"
                    })
                }
            })
        });
})

router.post('/checkSignature', function (req, res) {

    try {

        let uploadFile = req.files.file;
        let size = uploadFile.size;
        if (size > 1 * 1024 * 1024) {
            res.status(200).json({
                success: false,
                message: 'Upload file too large.',
                data: null
            })
            return;
        }
        let uploadFileName = 'u' + Date.now() + req.files.file.name;
        let fileExtention = path.extname(uploadFileName);

        uploadFileName = uploadFileName.replace(fileExtention, '');

        uploadFileName = uploadFileName.replace(/\W/g, '');

        uploadFileName = uploadFileName + fileExtention;

        console.log(uploadFileName);
        let allowedImageExtentions = ['.jpg', '.png', '.jpeg'];
        let allowedAudioExtentions = ['.mp3', '.wav'];

        if (allowedImageExtentions.includes(fileExtention)) {
            patentType = "Image";
        } else if (allowedAudioExtentions.includes(fileExtention)) {
            patentType = "Audio";
        } else {
            res.status(200).json({
                success: false,
                message: 'Invalid file format.'
            })
        }

        let uploadPath = '';
        let command = '';

        if (patentType === "Image") {
            // TODO Define constants file for this.
            uploadPath = './uploads/Image/' + uploadFileName;
            command = 'python ImageComparision/dejavu.py --recognize "uploads/Image/' + uploadFileName + '"';
        } else if (patentType === "Audio") {
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
                            message: "Similar Patent Found",
                            similarPatentFound: true,
                            similarPatent: result
                        })
                    } else {
                        res.status(201).json({
                            success: true,
                            message: "No Similar Patent Found !",
                            fileName: uploadFileName,
                            similarPatentFound: false
                        })
                    }
                } else {
                    res.status(201).json({
                        success: true,
                        fileName: uploadFileName,
                        message: "No Similar Patent Found !",
                        similarPatentFound: false
                    })
                }
            })
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: 'Server error.',
            data: error
        })
    }
})

router.post('/search', async function (req, res) {
    let query = new RegExp(req.body.data.query, "i");
    console.log(query);
    let message = '';
    let imagePatents = [];
    let audioPatents = [];
    let users = [];
    await Patent.find({
            $and: [{
                    'patentType': 'Image'
                },
                {
                    $or: [{
                            'patentName': query
                        },
                        {
                            'patentSubType': query
                        }
                    ]
                }
            ]
        })
        .then((res_patents) => {
            imagePatents = res_patents;
        })
        .catch(
            err => {
                console.error("ERROR : " + err)
                message = "SERVER ERROR";
            }
        )

    await Patent.find({
            $and: [{
                    'patentType': 'Audio'
                },
                {
                    $or: [{
                            'patentName': query
                        },
                        {
                            'patentSubType': query
                        }
                    ]
                }
            ]
        })
        .then((res_patents) => {
            audioPatents = res_patents;
        })
        .catch(
            err => {
                console.error("ERROR : " + err)
                message = "SERVER ERROR";
            }
        )

    await User.find({
            $or: [{
                    'name': query
                },
                {
                    'email': query
                },
                {
                    'username': query
                },
                {
                    'nationality': query
                }
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
            imagePatents: imagePatents,
            audioPatents: audioPatents,
            users: users
        }
    })
});

module.exports = router;