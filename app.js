var request = require('request');
var cheerio = require('cheerio');

request.get("http://www.whitehouseblackmarket.com/store/category/sale-up-to-70-off/cat9159276",function (err,res,body){
	$ = cheerio.load(body);
	var names=[];
//	var counter=1;
	$('div.product-capsule a.product-name').each(function(i,item){
		names[i]=$(this).clone().children().remove().end().text().trim();
		//console.log(names[i]);
	});

	console.log(names)
});