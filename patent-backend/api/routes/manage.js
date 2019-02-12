const express = require('express');
const router = express.Router();
const AuctionProcess = require("../../build/contracts/AuctionProcess.json");
const Web3 = require('web3');
var Busboy = require('busboy');
const fs = require('fs');
var exec = require('child_process').exec;

const path = require('path');
const formidable = require('formidable');
// const multer = 
const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:8545"
);

const web3 = new Web3(provider);
var contractABI = AuctionProcess.abi;
var contractAddress = AuctionProcess.networks.address;
var auctionInstance = new web3.eth.Contract(contractABI, contractAddress);

// change the address when ever there is a change in machine !
auctionInstance.options.address = "0x99AD37D58Fd83558f89b67f950DfE185d522bBB4"


router.post("/auction", function (req, res, next) {
    console.log(req.body.data);
})

router.post('/registerPatent', async function (req, res) {

    const patent_data = req.body.data;
    var auctionInstance = await contract.deployed();
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

router.post('/getPatents', async function (req, res) {
    console.log("Hey");
    res.status(200).json([{
        title: 'Conan the Barbarian',
        date: '1982',
    }, {
        title: 'Conan the Destroyer',
        date: '1984',
    }, {
        title: 'The Terminator',
        date: '1984',
    }, {
        title: 'Red Sonja',
        date: '1985',
    }, {
        title: 'Commando',
        date: '1985',
    }, {
        title: 'Raw Deal',
        date: '1986',
    }, {
        title: 'The Running Man',
        date: '1987',
    }, {
        title: 'Total Recal',
        date: '1990',
    }, {
        title: 'Terminator 2: Judgement Day',
        date: '1991',
    }, {
        title: 'Eraser',
        date: '1996',
    }, {
        title: 'Jingle All The Way',
        date: '1986',
    }, {
        title: 'The 6th Day',
        date: '2000',
    }, {
        title: 'Terminator 3: Rise of the Machines',
        date: '2003',
    }, {
        title: 'The Last Stand',
        date: '2013',
    }, {
        title: 'Terminator Genisys',
        date: '2015',
    }]
    )
    // const patent_data = req.body.data;

    // var patent = await patentManagerInstance.methods.getPatentsByOwner(patent_data.owner).call();

    // console.log(patent);

    // res.status(201).json({
    //     message: JSON.stringify(patent)
    // })
})


router.post('/checkSignature', function (req, res) {
    var uploadFile = req.files.file;
    var uploadFileName = 'u' + Date.now() + req.files.file.name;
    var fileExtention = path.extname(uploadFileName);
    var allowedImageExtentions = ['.jpg', '.png', '.jpeg'];
    var allowedAudioExtentions = ['.mp3', '.wav'];

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

    var uploadPath = '';
    var command = '';

    if (patentType === "Image") {
        uploadPath = './uploads/Image/' + uploadFileName;
        command = 'python ImageComparision/dejavu.py --recognize "uploads/Image/' + uploadFileName + '"';
    }
    else if (patentType === "Audio") {
        uploadPath = './uploads/Audio/' + uploadFileName;
        command = 'python AudioComparision/dejavu.py --config AudioComparision/dejavu.cnf.SAMPLE --recognize file "uploads/Audio/' + uploadFileName + '"';
    }

    
    uploadFile.mv(uploadPath, (err) => {
        if (err) console.log('error'+err);
        exec(command, (err, stdout, stderr) => {
            console.log(stderr);
            console.log(err);
            console.log(stdout);
            var result = stdout.replace(/\'/g, '"');
            if (result !== 'None\n') {
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
                    res.status(200).json({
                        success: true,
                        message: uploadFileName,
                        similarPatentFound: false
                    })
                }
            }
            else {
                res.status(200).json({
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

    console.log(response);
    res.status(201).json({
        message: JSON.stringify(response)
    })
})

module.exports = router;

