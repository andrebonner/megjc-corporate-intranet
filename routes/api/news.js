(function(){
	
	var express = require('express'),
		router = express.Router(),
		request = require('request'),
		_ = require('underscore');
	/**
	 * [description]
	 * @param  {[type]} req      [description]
	 * @param  {[type]} response [description]
	 * @param  {String} next)    {	           	var base_url [description]
	 * @return {[type]}          [description]
	 */
	router.get('/news', function(req, response, next) {
	 	var base_url = 'http://rss2json.com/api.json?rss_url=',
			feed_url = 'http://www.jamaicaobserver.com/rss/news/',
			abs_url = base_url + encodeURI(feed_url);
	 	
	 	request(abs_url, function(err, res, body){
	 		'use strict';
	 		var data = JSON.parse(body);

	 		if(!err && res.statusCode  === 200 && data.status === 'ok'){	 		
	 			var news_items  = [];
	 			if(req.query.limit === 'three'){
	 				news_items = data.items.slice(0,3);
	 			}else if(req.query.limit === 'all'){
	 				news_items = data;
	 			}
	 			response.json(news_items);	 			
	 		}else{
	 			response.json({message: 'RSS Feed Down'});
	 		}
	 	});
	});

	module.exports = router;

})();