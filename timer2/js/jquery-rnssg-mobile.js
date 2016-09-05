/**
 * ProjectName	:	ssgdfs mobile
 * fileName		:	jquery-rnssg-mobile.js
 * author			:	eyjeon
 * Copyright ssg Corp. All rights reserved.
 */
var myScroll;
var moveStop = function(e){ 
	e.preventDefault();
}
var gnbPosition;

$(function(){
	//topBtn
	$('body').on('click', '.rnBtnTop', function(){
		$(window).scrollTop(0);
	});
	
	//gnb

	if(gnbPosition == 'gnbHome'){
		$('.rnTopHome').addClass('on').siblings('a').removeClass('on');
	}else if(gnbPosition == 'gnbEvent'){
		$('.rnTopEvent').addClass('on').siblings('a').removeClass('on');
	}else if(gnbPosition == 'gnbHotsale'){
		$('.rnTopSale').addClass('on').siblings('a').removeClass('on');		
	}else if(gnbPosition == 'gnbBrand'){
		$('.rnTopBrand').addClass('on').siblings('a').removeClass('on');
	}
	
	//swiper
	footSwiper($('.rnFootSlide'));
	mySwiper($('.rnMySlide01'));
	mySwiper($('.rnMySlide02'));
});

$(window).scroll(function(){
	//topGnb
	if($(window).scrollTop() > 74){
		$('.rnTopWrap').addClass('on');
	}else{
		$('.rnTopWrap').removeClass('on');	
	}
	
	//topBtn
	if($(window).scrollTop() > $(window).height() / 8){
		$('.rnBtnTop').addClass('on');
	}else{
		$('.rnBtnTop').removeClass('on');
	}
});

function touchStop(){
	$('body').bind('touchmove', moveStop);
}
function touchStart(){
	$('body').unbind('touchmove', moveStop);
}
function rnScroller(){
	$('.rnScrollWrap').each(function(){
		myScroll = new IScroll(this, {
			bounceEasing: 'elastic', 
			bounceTime: 1200 ,
			mouseWheel: true,
			click: false,
			tap: false,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale'
		});
	});
}
function rnMenuScroller(el){
	menuScroll = new IScroll(el, {
		bounceEasing: 'elastic', 
		bounceTime: 1200 ,
		mouseWheel: true,
		click: false,
		tap: false,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale'
	});
}
function rnMyScroller(el){
	myScroll = new IScroll(el, {
		bounceEasing: 'elastic', 
		bounceTime: 1200 ,
		mouseWheel: true,
		click: false,
		tap: false,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale'
	});
}

//swiper
function mySwiper(swipeObject){
	var swiper = new Swiper(swipeObject, {
		pagination: swipeObject.find('.swipeNavWrap'),
		nextButton: swipeObject.find('.swiperNavNxt'),
        prevButton: swipeObject.find('.swiperNavPrv'),
		slidesPerView: 'auto',
        loop:false,
        paginationClickable: true,
        spaceBetween: 0
    });
}
function footSwiper(swipeObject){
	var swiper = new Swiper(swipeObject, {
		pagination: swipeObject.find('.swipeNavWrap'),
		slidesPerView: 'auto',
		loop:false,
		paginationClickable: true,
		spaceBetween: 0
	});
}