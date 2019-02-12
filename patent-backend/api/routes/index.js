const express = require('express');
const router = express.Router();
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function (req, res, next) {
  		res.status(200).json({ hey: "name" });
});



router.get('/fp/:name', function (req, res, next) {
	exec('python dejavu/dejavu.py --config dejavu/dejavu.cnf.SAMPLE --recognize file dejavu/'+req.params.name, (err, stdout, stderr) => {
		var result = stdout.replace(/\'/g, '"');
		result = JSON.parse(result);
		console.log(result);
  		res.status(200).json(result)
	})
});



router.post('/', function (req, res, next) {
//   print(req);
  res.status(200).json({
    message: "Got Regis form"
  })
})


module.exports = router;
