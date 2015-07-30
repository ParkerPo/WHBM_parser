var request = require('request');
var cheerio = require('cheerio');
var fs = require('graceful-fs');

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
       	var counter=1;
		$('a.product-name').each(function(i,item){
			names[i]=$(this).clone().children().remove().end().text().trim();
			//console.log(names[i]);
			rating[i]=$(this).children('.BVRRRatingNormalOutOf').children('.BVRRRatingNumber').text();
            rating_count[i]=$(this).children('.BVRRRatingNormalOutOf').children('.BVRRRatingReviewsCount').text();
			var price=$(this).parent().children('div.product-price')
			price_now[i]=price.children('span.product-price-now').text().replace(/\D+/,"").trim();
			price_was[i]=price.children('span.product-price-was').text().replace(/\D+/,"").replace(/\)/,"").trim();
			product_price[i]=price.children('span.product-price').text().replace(/\D+/,"").trim();
            product_id[i]=$(this).attr('onclick').replace("s_objectID='product_","").replace("_name';","");
		});

		//每次都產生一個file記錄這次的資訊
		var time = new Date;
        var price_file_name = "price_"+time;
        fs.writeFileSync(price_file_name, "product_id"+"\t"+"name"+"\t"+"rating"+"\t"+"rating_count"+"\t"+"price_now"+"\t"+"price_was"+"\t"+"product_price"+"\n");
		for (var i=0;i<names.length;i++){
            var output_string = product_id[i]+"\t"+names[i]+"\t"+rating[i]+"\t"+rating_count[i]+"\t"+price_now[i]+"\t"+price_was[i]+"\t"+product_price[i]+"\n";
         //    fs.appendFile(price_file_name, output_string, function (err) {
         //    if (err) throw err;
        	// });
		}

		//把資訊加到舊的file裡面
        if (series.length==0){
        	series[0]="id\tname\t"+time;
        	for (var i =0;i<product_id.length;i++){
        		var price=product_price[i];
        		if (product_price[i].length < price_now[i].length){
        			price=price_now[i];
        		}
        		series[i+1]=[product_id[i],names[i],price];
        	}
        }
        else{
            series[0]=series[0]+"\t"+time;
        	for (var i =0; i<product_id.length;i++){
        		var price=product_price[i];
        		if (product_price[i].length < price_now[i].length){
        			price=price_now[i];
        		}
        		var flag=0;
        		for (var j=1;j<series.length;j++){
        			if (series[j][0]===product_id[i]){
        				series[j].push(price);
        				flag=1;
        				break;
        			}
        		}
        		if (flag===0){
        			var length=series.length;
        			series[length]=[];
        			series[length].push(product_id[i]);
        			series[length].push(names[i]);
        			for (var k=0;k<counter;k++){
        				series[length].push("");
        			}
        			series[length].push(price);
        		}
        	}
        }
    console.log(series) ;
	});

}
var series=[];
parser("http://www.whitehouseblackmarket.com/store/product-list/?No=0&Nrpp=10");
parser("http://www.whitehouseblackmarket.com/store/product-list/?No=5&Nrpp=15");
