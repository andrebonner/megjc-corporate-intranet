/**
 * Created by captain-kirk on 4/18/16.
 */
(function(){
    var express = require('express'),
        router = express.Router();

    router.get('/notices', function(req, res){
        res.json([{"title": "Forum: Reversing Diabetes to be held at the Courtleigh Auditorium","date": "April 7, 2016"},
            {"title": "MIND upcoming programmes and courses","date": "March 4, 2016"},
            {"title": "Applications for Sagicor Foundation GSAT Scholarships 2016 now open","date": "March 27, 2016"}
        ]);
    });

    module.exports = router;
})();