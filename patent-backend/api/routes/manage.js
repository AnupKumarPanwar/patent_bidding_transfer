const express = require('express');
const router = express.Router();
const PatentManager = require("./contracts/PatentManager.json");
const Web3 = require('web3');

router.post("/auction", function (req, res, next) {
    console.log(req.body.data);
})


router.post('/registerPatent', async function (req, res) {
    const patent_data = req.body.data;

    // var instance = await contract.deployed();

    var owners = patent_data.owners;
    var lisenceHolders = patent_data.lisenceHolders;

    var patentId = await instance.methods.registerPatent(owners, lisenceHolders);

    // console.log(patentId);

    res.status(201).json({
        message: patentId
    })

})


router.post('/getPatents', async function (req, res) {
    const patent_data = req.body.data;

    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:9545"
    );
    
    const web3 = new Web3(provider);
    
    var contractABI = PatentManager.abi;
    var contractAddress = PatentManager.networks.address;
    var instance = new web3.eth.Contract(contractABI, contractAddress);

    instance.options.address = "0x6c58Ebc7146A23e82e396cFAEA8bEe0CB5423215"

    
    var params = {
        gas: 40000,
        from:"0xb592cfCa9dd2c7fb024203D756bCdF0b232C81ef"
        };

    var patent = await instance.methods.getPatents(patent_data.id).call();

    console.log(patent);

    res.status(201).json({
        message: JSON.stringify(patent)
    })

})

module.exports = router;

