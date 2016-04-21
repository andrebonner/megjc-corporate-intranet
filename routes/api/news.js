(function(){
	
	var express = require('express'),
		router = express.Router(),
		request = require('request'),
		keywords = [
			'agro investment corporation', 'development bank of jamaica', 'dbj', 'factories corporation of jamaica',
			'harmonization limited', 'imf cordination unit', 'international financial service authority', 
			'jamaica trade and invest', 'jamaica promotions corporation', 'jampro', 'planning institute of jamaica', 'pioj', 'jamaica business development centre',
			'jbdc', 'self start fund', 'micro investment development agency', 'mida', 'kingston container terminal', 'kct',
			'kingston free zone', 'montego bay free zone', 'national housing trust', 'nht', 'port authority of jamaica', 'paj',
			'port authority management services', 'statistical institute of jamaica', 'statin', 'urban development corporation',
			'land administration and management programme', 'lamp', 'land access for national development project', 'l.a.n.d',
			'land divestment advisory committee', 'nla', 'national land agency', 'national spatial data management division',
			'beach control authority', 'forestry department', 'meteorological services division', 'national environment and planning agency',
			'nepa', 'national resource and conservation authority', 'nrca', 'town planning department', 'town & country planning authority',
			'negril green island area local planning authority', 'nigalpa', 'commission of strata corporations', 'jamaica mortgage bank',
			'housing agency of jamaica', 'haj', 'real estate board', 'relocation of human settlements', 'rent assessment board', 'nwc',
			'national water commission', 'rural water supply limited', 'rwsl', 'water resources authority', 'wra', 'central wastewater treatment company',
			'cwtc', 'national road operating and contruction company', 'nrooc', 'national works agency', 'road maintenance fund', 'rmf', 'toll authority',
			'toll regulator', 'dr horace chang', 'horace chang', 'water', 'housing', 'environment', 'climate change', 'climate', 'investment'
		];
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
	 				news_items = data.items
	 			}
	 			response.json(news_items);	 			
	 		}else{
	 			response.json({message: 'RSS Feed Down'});
	 		}
	 	});
	});

	/**
	 * 
	 * @param  {[type]} items    [description]
	 * @param  {[type]} keywords [description]
	 * @return {[type]}          [description]
	 */
	function filterFeed(items, keywords){
		var i = keywords.length,
			k = items.length,
			result = [];
		while(i--){			
			k = items.length;
			while(k--){
				if(keywordFilter(keywords[i], items[k].title.toLowerCase())){
					result.push(items[k]);
				}
			}
		}
		return result;
	}

	 /**
	 * 
	 * @param  {[type]} keyword [description]
	 * @param  {[type]} title   [description]
	 * @return {[type]}         [description]
	 */
	function keywordFilter(keyword, title){
		var found = false;
		if(title.search(keyword) >= 0){
			found = true;
		}
		return found;
	}

	module.exports = router;

})();