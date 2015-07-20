var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')

function parser(url){
	request.get(url,function (err,res,body){
		$ = cheerio.load(body);
		var rating=[];
        var rating_count=[];
		var names=[];
		var price_now=[];
		var price_was=[];
		var product_price=[];
        var product_id=[];
        
	//	var counter=1;
		$('a.product-name').each(function(i,item){
			names[i]=$(this).clone().children().remove().end().text().trim();
			//console.log(names[i]);
			rating[i]=$(this).children('.BVRRRatingNormalOutOf').children('.BVRRRatingNumber').text()
            rating_count[i]=$(this).children('.BVRRRatingNormalOutOf').children('.BVRRRatingReviewsCount').text()
			var price=$(this).parent().children('div.product-price')
			price_now[i]=price.children('span.product-price-now').text().replace(/\D+/,"").trim();
			price_was[i]=price.children('span.product-price-was').text().replace(/\D+/,"").replace(/\)/,"").trim();
			product_price[i]=price.children('span.product-price').text().replace(/\D+/,"").trim();
            product_id[i]=$(this).attr('onclick').replace("s_objectID='product_","").replace("_name';","");
		});
        var price_file_name = "price_";
        fs.appendFileSync(price_file_name, "product_id"+"\t"+"name"+"\t"+"rating"+"\t"+"rating_count"+"\t"+"price_now"+"\t"+"price_was"+"\t"+"product_price"+"\n");
		for (var i=0;i<names.length;i++){
            var output_string = product_id[i]+"\t"+names[i]+"\t"+rating[i]+"\t"+rating_count[i]+"\t"+price_now[i]+"\t"+price_was[i]+"\t"+product_price[i]+"\n";
            fs.appendFile(price_file_name, output_string, function (err) {
            if (err) throw err;
        });
		}
        
        
	});
}

parser("http://www.whitehouseblackmarket.com/store/product-list/?No=0&Nrpp=1000");
parser("http://www.whitehouseblackmarket.com/store/product-list/?No=1000&Nrpp=1000");
