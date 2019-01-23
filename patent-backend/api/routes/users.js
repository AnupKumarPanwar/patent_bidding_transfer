const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SimpleStorageContract = require("./contracts/SimpleStorage.json");
const Web3 = require('web3');


// register resource is used to register a user on the MongoDB
// the existence of a user is first checked by checking the DB and if an instance already exists then 
// new user is not registered else  we register the user ! 
// BCRYPT - USED !

router.get('/register', function (req, res, next) {
    const user_data = req.body.data;
    let message = "";
    let account_created = false;

    User.findOne({
        $or: [
            { 'username': user_data.username },
            { 'email': user_data.email }
        ]
    }).exec((err, result) => {
        if (result) {
            message = "User Already Exists";
            account_created = false;
            res.status(201).json({
                message: message,
                account_created: account_created
            });
        } else {
            user_data.password = bcrypt.hashSync(user_data.password);
            const user = new User(user_data);

            user
                .save()
                .then(msg => {
                    console.log(msg);
                    message = "Account Created";
                    account_created = true;
                    res.status(201).json({
                        message: message,
                        account_created: account_created
                    })
                })
                .catch(err => console.log(err));
        }
    });


})


router.get('/login', function (req, res, next) {
    const user = req.body.data;
    let message = '';
    console.log(user);
    User.findOne({ username: user.username })
        .then((res_user) => {

            if (res_user !== null) {
                bcrypt.compare(user.password, res_user.password, (err, result) => {
                    console.log("RESULT : " + result);
                    if (result) {
                        message = true;

                    } else {
                        message = false;
                    }

                    res.status(200).json({
                        "message": message
                    })

                })
            }
            else {
                message = false;
                
                res.status(200).json({
                    "message": message
                })
            }
        })
        .catch(
            err => {
                console.error("ERROR : " + err)
                message = "SERVER ERROR";
            }
        )



})


router.get('/generatePK', function (req, res, next) {

    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:9545"
    );

    const web3 = new Web3(provider);

    var contractABI =SimpleStorageContract;
    var contractAddress ="0x6c58Ebc7146A23e82e396cFAEA8bEe0CB5423215";
    //creating contract object
    var contract = new web3js.eth.Contract(contractABI,contractAddress);

    var accounts = web3.eth.getAccounts();

    console.log('accounts');
    console.log(accounts);

    res.status(200).json({
        "message": accounts
    });

})


module.exports = router;
