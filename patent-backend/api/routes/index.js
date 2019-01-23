const express = require('express');
const router = express.Router();
const SimpleStorageContract = require("./contracts/SimpleStorage.json");
const Web3 = require('web3');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ hey: "name" })
});



router.get('/', function (req, res, next) {
  print(req);
  res.status(200).json({
    message: "Got Regis form"
  })
})


router.get('/generatePK', async function (req, res, next) {

    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:9545"
    );


    const web3 = new Web3(provider);

    var contractABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
    var contractAddress ="0x6c58Ebc7146A23e82e396cFAEA8bEe0CB5423215";
    // //creating contract object
    try{
    	var contract = new web3.eth.Contract(contractABI,contractAddress);
	}
	catch(e)
	{
		console.log(e);
	}

    // console.log(contract);

    var accounts = await web3.eth.personal.newAccount();

    console.log('accounts');
    console.log(accounts);
    // print(accounts);

    res.status(200).json({
        "message": accounts
    });

})



module.exports = router;
