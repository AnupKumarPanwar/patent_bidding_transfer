const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  		res.status(200).json({ hey: "name" });
});


router.post('/', function (req, res, next) {
//   print(req);
  res.status(200).json({
    message: "Got Regis form"
  })
})


module.exports = router;
