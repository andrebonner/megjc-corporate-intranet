(function(){
	var express = require('express'),
		router = express.Router(),
		fs = require('fs');

/* GET home page. */
// router.get('/policy', function(req, res, next) {
 
//   var tempFile="../files/StaffOrder.pdf";
//   fs.readFile(tempFile, function (err,data){
//      res.contentType("application/pdf");
//      res.send(data);
//   });
// });

	router.get('*', function(req, res, next) {
	 	res.render('index');  
	});

	module.exports = router;
})();

