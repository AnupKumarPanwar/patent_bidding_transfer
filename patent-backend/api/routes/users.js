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

router.post('/register', function (req, res) {
    const user_data = req.body.data;
    console.log(user_data);
    let message = "";
    let account_created = false;

    User.findOne({
        $or: [
            { 'username': user_data.username },
            { 'email': user_data.email }
        ]
    }).exec(async (err, result) => {
        if (result) {
            message = "User Already Exists";
            account_created = false;
            res.status(201).json({
                message: message,
                account_created: account_created
            });
        } else {
            user_data.password = bcrypt.hashSync(user_data.password);

            const provider = new Web3.providers.HttpProvider(
                "http://127.0.0.1:9545"
            );


            const web3 = await new Web3(provider);

            var contractABI = SimpleStorageContract.abi;
            var contractAddress = SimpleStorageContract.networks.address;
            var contract = await new web3.eth.Contract(contractABI, contractAddress);

            var publicKey = await web3.eth.personal.newAccount();

            user_data.publicKey = publicKey;

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
                .catch(err => {
                    message = "Account Could Not be Created"
                    res.status()
                });
        }
    });


})


router.post('/login', function (req, res) {
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


module.exports = router;
