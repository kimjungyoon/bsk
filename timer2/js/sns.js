
//sns이벤트 시작
//<%-- Twitter --%>
function goEventTwitter(eventTitle){
	var localUrl     = location.href;
	
	if (localUrl.indexOf("local.m.ssgdfs.com") != -1 ) {
		localUrl = localUrl.split("local.m.ssgdfs.com:8080").join("www.ssgdfs.com");
	}else if (localUrl.indexOf("dev-m.ssgdfs.com") != -1 ) {
		localUrl = localUrl.split("dev-m.ssgdfs.com").join("www.ssgdfs.com");
	}else if (localUrl.indexOf("m.ssgdfs.com") != -1 ) {
		localUrl = localUrl.split("m.ssgdfs.com").join("www.ssgdfs.com");
	}
	
	var eventUrl  = encodeURIComponent(localUrl);
   var eventName = encodeURIComponent("[" + eventTitle + "]");
   
	var url      = "http://twitter.com/intent/tweet?text="+eventName+"&url="+eventUrl;
   var result = window.open(url, 'twitter', 'width=466, height=356');
   if (result) {
       result.focus();
   }
   return false;
}
 

function goEventTwitterForApp(eventTitle){
	var localUrl     = location.href;
	
	if (localUrl.indexOf("local.m.ssgdfs.com") != -1 ) {
		localUrl = localUrl.split("local.m.ssgdfs.com:8080").join("www.ssgdfs.com");
	}else if (localUrl.indexOf("dev-m.ssgdfs.com") != -1 ) {
		localUrl = localUrl.split("dev-m.ssgdfs.com").join("www.ssgdfs.com");
	}else if (localUrl.indexOf("m.ssgdfs.com") != -1 ) {
		localUrl = localUrl.split("m.ssgdfs.com").join("www.ssgdfs.com");
	}
	
	var eventUrl  = encodeURIComponent(localUrl);
	var eventName = encodeURIComponent("[" + eventTitle + "]");
	var via 		= encodeURIComponent("신세계인터넷면세점");

   var url      = "ssgdfs://snsShare?goUrl=";
   var goUrl 	 = "https://twitter.com/intent/tweet?text="+eventName+"&via="+via+"&url="+eventUrl;
   location.href = url+goUrl+" "+eventUrl;
   return false;
}

//<%-- facebook --%>
function goEventFaceBook(name, image){
   var url     = location.href;
	if (url.indexOf("local.m.ssgdfs.com") != -1 ) {
		url = url.split("local.m.ssgdfs.com:8080").join("www.ssgdfs.com");
	}else if (url.indexOf("dev-m.ssgdfs.com") != -1 ) {
		url = url.split("dev-m.ssgdfs.com").join("www.ssgdfs.com");
	}else if (url.indexOf("m.ssgdfs.com") != -1 ) {
		url = url.split("m.ssgdfs.com").join("www.ssgdfs.com");
	}    
   var title   = "[신세계 인터넷 면세점]" + name;
   var summary = "[신세계 인터넷 면세점]";
   var url     = "http://www.facebook.com/sharer.php?s=100&p[url]=" + url + "&p[images][0]=" + image + "&p[title]=" + title + "&p[summary]=" + summary;
   url = url.split("#").join("%23");
   url = encodeURI(url);
   window.open(url);
   return false;
}

function goEventFacebookForMobile(name, image){
   var url     = location.href;
   var title     = "[신세계 인터넷 면세점]" + name;
   var summary   = "[신세계 인터넷 면세점]";
   
	if (url.indexOf("local.m.ssgdfs.com") != -1 ) {
		url = url.split("local.m.ssgdfs.com:8080").join("www.ssgdfs.com");
	}else if (url.indexOf("dev-m.ssgdfs.com") != -1 ) {
		url = url.split("dev-m.ssgdfs.com").join("www.ssgdfs.com");
	}else if (url.indexOf("m.ssgdfs.com") != -1 ) {
		url = url.split("m.ssgdfs.com").join("www.ssgdfs.com");
	}
   var goUrl       = "http://m.facebook.com/sharer.php?s=100&u=" + url + "&p[images][0]=" + image + "&p[title]=" + title + "&p[summary]=" + summary;
   goUrl = goUrl.split("#").join("%23");
   goUrl = encodeURI(goUrl);
   window.open(goUrl);
   return false;
}

function goEventFaceBookForApp(name, image){
	var url 		= "ssgdfs://snsShare?goUrl=";
	var ssgdfsUrl 	= location.href;
	if (ssgdfsUrl.indexOf("local.m.ssgdfs.com") != -1 ) {
		ssgdfsUrl = ssgdfsUrl.split("local.m.ssgdfs.com:8080").join("www.ssgdfs.com");
	}else if (ssgdfsUrl.indexOf("dev-m.ssgdfs.com") != -1 ) {
		ssgdfsUrl = ssgdfsUrl.split("dev-m.ssgdfs.com").join("www.ssgdfs.com");
	}else if (ssgdfsUrl.indexOf("m.ssgdfs.com") != -1 ) {
		ssgdfsUrl = ssgdfsUrl.split("m.ssgdfs.com").join("www.ssgdfs.com");
	} 
	
	var title 		= "[신세계 인터넷 면세점]" + name;
	var summary 	= "[신세계 인터넷 면세점]";
	var goUrl 		= "http://m.facebook.com/sharer.php?s=100&u=" + ssgdfsUrl + "&p[images][0]=" + image + "&p[title]=" + title + "&p[summary]=" + summary;
	goUrl = encodeURI(goUrl.split("#").join("%23"));	
	location.href = url+goUrl;
	return false;
}
//sns이벤트 끝