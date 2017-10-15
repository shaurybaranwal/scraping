var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var urls=[];

request('http://photosforclass.com/search/camping',function(err,res,body){
	if(!err && res.statusCode==200){
		var $=cheerio.load(body);
		$('a img','#photo-container').each(function(){
			var url=$(this).attr('src');
			urls.push(url);
		});
	}
	console.log(urls);
	for(var i=0;i<urls.length;i++){
		//first create a directory img inside current directory
		request(urls[i]).pipe(fs.createWriteStream('img/'+i+'.jpg'));
	}
});