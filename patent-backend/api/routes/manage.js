const express = require('express');
const router = express.Router();
const Auction = require("../../build/contracts/Auction.json");
const Web3 = require('web3');



const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:8545"
);

const web3 = new Web3(provider);
var contractABI = Auction.abi;
var contractAddress = Auction.networks.address;
var instance = new web3.eth.Contract(contractABI, contractAddress);

// change the address when ever there is a change in machine !
instance.options.address = "0xfe4e2178395430069d9590e4a4c61820f03f57c5"

router.post("/auction", function (req, res, next) {
    console.log(req.body.data);
})


router.post('/registerPatent', async function (req, res) {
    const patent_data = req.body.data;

    // var instance = await contract.deployed();
    var accounts = await web3.eth.getAccounts();

    console.log(accounts);

    var owners = patent_data.owners;
    var lisenceHolders = patent_data.lisenceHolders;

    instance.methods.registerPatent(owners, lisenceHolders).send({ from: accounts[1], gas:3000000 }, function (error, data) {
        console.log(data);

        res.status(201).json({
            message: JSON.stringify(data)
        })
    });

})


router.post('/getPatents', async function (req, res) {
    const patent_data = req.body.data;

    var patent = await instance.methods.getPatents(patent_data.id).call();

    console.log(patent);

    res.status(201).json({
        message: JSON.stringify(patent)
    })

})

router.post("/fileUpload", function(req, res, err){
    if(err)throw err;
    console.log(req.files.file);
    
})

router.post("/bidPatent", async function(req, res){
    
    // create contract Instance
    const bid = req.body;
    console.log(bid);
    const response = await instance.methods.addBid(parseInt(bid.patentId), parseInt(bid.minimum_bid))
    .send({
        from : "0xfe4e2178395430069d9590e4a4c61820f03f57c5" , gas : 2000000
    }).catch(err => {
        console.log(err);
    });

    console.log(response);
    res.status(201).json({
        message : JSON.stringify(response)
    })
})

module.exports = router;

