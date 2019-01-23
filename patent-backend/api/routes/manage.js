const express = require('express');
const router = express.Router();

router.post("/auction", function (req, res, next) {
    console.log(req.body.data);
})

module.exports = router;