var request = require('request');
var cheerio = require('cheerio');

request.get("http://www.whitehouseblackmarket.com/store/category/sale-up-to-70-off/cat9159276",function (err,res,body){
	$ = cheerio.load(body);
	var rating=[];
	var names=[];
	var price_now=[];
	var price_was=[];
//	var counter=1;
	$('a.product-name').each(function(i,item){
		names[i]=$(this).clone().children().remove().end().text().trim();
		//console.log(names[i]);
		rating[i]=$(this).children('.BVRRRatingNormalOutOf').children('.BVRRRatingNumber').text()
		var price=$(this).parent().children('div.product-price')
		price_now[i]=parseInt(price.children('span.product-price-now').text().split(/TWD/)[1].replace(/,/i,""))
		price_was[i]=parseInt(price.children('span.product-price-was').text().split(/TWD/)[1].replace(/,/i,""))
	});

	for (var i=0;i<names.length;i++){
		console.log(names[i]+"\t"+rating[i]+"\t"+price_now[i]+"\t"+price_was[i])
	}
});