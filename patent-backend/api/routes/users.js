const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Web3 = require('web3');
const ganache = require('ganache-cli');


// register resource is used to register a user on the MongoDB
// the existence of a user is first checked by checking the DB and if an instance already exists then 
// new user is not registered else  we register the user ! 
// BCRYPT - USED !

router.post('/register', async function (req, res) {
    const user_data = req.body.data;
    console.log(user_data);
    let message = "";
    let account_created = false;

    res.status(200).json({
        message : "Test the Registration"
    })
    
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
            const web3 = new Web3();
            web3.setProvider(ganache.provider());

            // the below line with create a new account and return a public key !
            // these accounts are created with 0 eth balance !
            let publicKey = await web3.eth.personal.newAccount();
            console.log("Address generated : " + publicKey);

            user_data.password = bcrypt.hashSync(user_data.password);
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
                        userInfo.publicAddress = res_user.publicKey;
                    } else {
                        message = false;
                    }

                    res.status(200).json({
                        "message": message, 
                        "userInfo" : userInfo

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
});

module.exports = router;