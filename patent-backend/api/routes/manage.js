const express = require('express');
const router = express.Router();
const PatentManager = require("./contracts/PatentManager.json");
const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:9545"
);

const web3 = new Web3(provider);
var contractABI = PatentManager.abi;
var contractAddress = PatentManager.networks.address;
var instance = new web3.eth.Contract(contractABI, contractAddress);

instance.options.address = "0x3F3035fb802F2f24055adf521A4FF6B54a831cbb"

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

module.exports = router;

