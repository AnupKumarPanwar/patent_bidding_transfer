const express = require('express');
const router = express.Router();

router.post("/bidForPatent", (req, res)=>{
  console.log(req.body)
  res.send("Response")
})
module.exports = router;