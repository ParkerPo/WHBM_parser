var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')

function parser(url){
	request.get(url,function (err,res,body){
		$ = cheerio.load(body);
		var rating=[];
		var names=[];
		var price_now=[];
		var price_was=[];
		var product_price=[];
	//	var counter=1;
		$('a.product-name').each(function(i,item){
			names[i]=$(this).clone().children().remove().end().text().trim();
			//console.log(names[i]);
			rating[i]=$(this).children('.BVRRRatingNormalOutOf').children('.BVRRRatingNumber').text()
			var price=$(this).parent().children('div.product-price')
			price_now[i]=price.children('span.product-price-now').text().replace(/\D+/,"").trim();
			price_was[i]=price.children('span.product-price-was').text().replace(/\D+/,"").replace(/\)/,"").trim();
			product_price[i]=price.children('span.product-price').text().replace(/\D+/,"").trim();

		});

		for (var i=0;i<names.length;i++){
			console.log(names[i]+"\t"+rating[i]+"\t"+price_now[i]+"\t"+price_was[i]+"\t"+product_price[i])
		}
	});
}

parser("http://www.whitehouseblackmarket.com/store/product-list/?No=0&Nrpp=1000");
parser("http://www.whitehouseblackmarket.com/store/product-list/?No=1000&Nrpp=1000");
