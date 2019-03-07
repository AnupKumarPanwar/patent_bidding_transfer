const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Web3 = require('web3');
const ganache = require('ganache-cli');
const AuctionProcess = require("../../build/contracts/AuctionProcess.json");
const ethConfig = require("../../blockchainConfig");

// register resource is used to register a user on the MongoDB
// the existence of a user is first checked by checking the DB and if an instance already exists then 
// new user is not registered else  we register the user ! 
// BCRYPT - USED !

const provider = new Web3.providers.HttpProvider(
    ethConfig.networkAddress
);
const contractAddress = ethConfig.auctionContractAddress;

router.post('/register', async function (req, res) {
    const user_data = req.body.data;
    console.log(user_data);
    let message = "";
    let account_created = false;
    let userInfo = {};

    User.findOne({
        $or: [
            { 'username': user_data.username },
            { 'email': user_data.email }
        ]
    }).exec(async (err, result) => {
        if (result) {
            message = "User Already Exists.";
            account_created = false;
            res.status(200).json({
                success: false,
                message: message
            })
        } else {
            const web3 = new Web3(provider);
            const contractABI = AuctionProcess.abi;
            const instance = new web3.eth.Contract(contractABI, contractAddress);
            // the below line with create a new account and return a public key !
            // these accounts are created with 0 eth balance !
            let publicAddress = await web3.eth.personal.newAccount(user_data.password);
            console.log("Address generated : " + publicAddress);

            user_data.password = bcrypt.hashSync(user_data.password);
            user_data.publicAddress = publicAddress;

            const user = new User(user_data);

            user
                .save()
                .then(msg => {
                    console.log(msg);
                    message = "Account Created.";
                    account_created = true;

                    userInfo.name = user_data.name;
                    userInfo.username = user_data.username;
                    userInfo.publicAddress = user_data.publicAddress;

                    res.status(201).json({
                        success: true,
                        message: message,
                        data: userInfo
                    })
                })
                .catch(err => {
                    message = "Account Could Not be Created"
                    res.status(500).json({
                        success: false,
                        message: message
                    })
                });
        }
    });
})

router.post('/login', function (req, res) {
    const user = req.body.data;
    let message = '';
    let userInfo = {};
    User.findOne({ username: user.username })
        .then((res_user) => {

            if (res_user !== null) {
                bcrypt.compare(user.password, res_user.password, (err, result) => {
                    console.log(res_user);
                    if (result) {
                        message = true;
                        userInfo.name = res_user.name;
                        userInfo.username = res_user.username;
                        userInfo.publicAddress = res_user.publicAddress;
                        res.status(200).json({
                            success: true,
                            message: "User logged in successfully.",
                            data: userInfo
                        })

                    } else {
                        res.status(200).json({
                            success: false,
                            message: "Invalid password.",
                            data: null
                        })
                    }



                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "User not registered.",
                    data: null
                })
            }
        })
        .catch(
            err => {
                console.error("ERROR : " + err)
                res.status(500).json({
                    success: false,
                    message: "Server Error.",
                    data: null
                })
            }
        )
})

router.post('/userProfile', function (req, res) {
    const user = req.body.data;
    let message = '';
    let userInfo = {};
    User.findOne({ username: user.username })
        .then((res_user) => {
            let result = res_user;
            console.log(result);
            result["password"] = "";
            console.log(result);
            res.status(200).json({
                success: true,
                message: "User profile fetched successfully.",
                data: result
            })
        })
        .catch(
            err => {
                console.error("ERROR : " + err)
                res.status(500).json({
                    success: false,
                    message: "Server Error."
                })
            }
        )
});

module.exports = router;