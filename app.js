var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var urls=[];

request('http://www.delhi.gov.in/wps/wcm/connect/DoIT_Health/health/home/',function(err,res,body){
	if(!err && res.statusCode==200){
		var $=cheerio.load(body);
		$('a','#tab-cont1').each(function(){
			var url=$(this).text();
			urls.push(url);
		});
	}
	console.log(urls);
	for(var i=0;i<urls.length;i++){
		//first create a directory img inside current directory
		request(urls[i]).pipe(fs.createWriteStream('text/'+i+'.txt'));
	}
});
