(function(){
	var express = require('express'),
		router = express.Router();

	router.get('/employees', function(req, res){
		res.json([{"name": "Patrick Thompson",
					"position": "Director",
					"email": "patrick.thompson@mwlecc.gov.jm",
					"extension": "2918",
					"cug": "876-564-0131"}
				]);
	});

	router.get('/employees/birthday', function(req, res){
		res.json([{"name": "Tremaine Buchanan",
			"department": "ICT Division"},
			{"name": "Nicholas Bailey",
				"department": "ICT Division"},
			{"name": "Patrick Thompson",
				"department": "ICT Division"}
		]);
	});

	module.exports = router;
})();