$(document).ready(function(){
	function about_story(){
		var $zone = $(".about_story_inner"),
			$slider_zone = $zone.find(".slider_zone"),
			$slider_zone2 = $zone.find(".slider_zone2"),
			$inner = $slider_zone.find(".slider_inner"),
			$inner2 = $slider_zone2.find(".slider_inner2"),
			$li = $inner.find("li"),
			$control = $zone.find(".btn_article"),
			$btn = $control.find("li > a");
		

			$li.each(function(){
				var _this = $(this),
					$info = _this.find(".about_story.on"),
					$icon = $info.find(".icon"),
					$txtBox = $info.find(".txt_box");

				$info.bind("mouseenter",function(){
					if(!$icon.hasClass("hide") ==true){
						$icon.addClass("hide");
						$icon.fadeOut(500);
						$txtBox.fadeIn(500);
					}
				});
				$info.bind("mouseleave",function(){
					if($icon.hasClass("hide") ==true){
						$icon.removeClass("hide");
						$icon.fadeIn(500);
						$txtBox.fadeOut(500);
					}
				});
			});//each

			$btn.bind("click", function(){
				var _this = $(this),
				    $p = _this.closest("li"),
					_margin = parseInt($(".about_story.type01").css("margin-top")),
					s = 215,
					_title = $(".title_move"),
					_titMargin = parseInt($(".title_move").css("margin-top"));
				console.log(_titMargin);
				if($(".about_story.type01:animated").length < 1){
					if($p.hasClass("prev") ==true){
						console.log("이전");
						$slider_zone2.removeClass("show").hide();
						$slider_zone.addClass("show").fadeIn();
						btn();
						_title.animate({"top":"0"},1000,"easeInOutCirc");
					}else{
						console.log("다음");
						$slider_zone.removeClass("show").hide();
						$slider_zone2.addClass("show").fadeIn();
						btn();
						_title.animate({"top":"-48px"},1000,"easeInOutCirc");
					} 
					function btn(){
						$p.removeClass("on").siblings().addClass("on");	
					}
				}
				return false;
			});
			setTimeout(function(){
				$(".slider_inner li.info_01").addClass("show");
			},500);
			setTimeout(function(){
				$(".slider_inner li.info_02").addClass("show");
			},800);
			setTimeout(function(){
				$(".slider_inner li.info_03").addClass("show");
			},1100);
	}
	about_story();
		
	function process(){
		var $process = $(".process"),
			$zone = $process.find(".process_zone"),
			$inner = $process.find(".process_inner"),
			$img = $inner.find("li"),
			_size = $img.size(),
			$txt_zone = $process.find(".process_txt"),
			$txt = $txt_zone.find("li"),
			$control = $process.find(".btn_article"),
			$num= $control.find("li"),
			$btn = $num.find("a"),
			i = 0;
		
		function select(){
			$img.eq(i).addClass("on").siblings().removeClass("on");
			$txt.eq(i).addClass("on").fadeIn().siblings().removeClass("on").hide();
			$num.eq(i).addClass("on").siblings().removeClass("on");
		}
		$btn.bind("click",function(){
			var _this = $(this),
				_index = _this.closest("li").index();
			clearInterval(auto);	
			i = _index;
			select();
			setTimeout(function(){
				process_auto();
			},10)
			return false;
		});
		function process_auto(){
			 auto = setInterval(function(){		
				i++;
				if(i == _size){ i = 0; }
				select();
			},4000);
		}process_auto();
	}
		
	var su = 0;
	$(window).scroll(function() {
			var Scroll=$(this).scrollTop();
			if(Scroll>=100){
				$(".about_story_inner").find(".btn_article").addClass("scroll");
			}
			if(Scroll>=430){
				$(".process_content").find(".subtit_zone").addClass("scroll");
			}
			if(Scroll>=550){
				$(".process_content").find(".process_inner").addClass("scroll");
			}
			if(Scroll>=750){
				$(".process_content").find(".process_txt").addClass("scroll");
				if(su == 0){
					process();
				}
				su++;
			}
			if(Scroll>=780){
				$(".process_content").find(".btn_article").addClass("scroll");
			}
			if(Scroll>=1200){
				$(".boundary_01").addClass("on");
			}
			if(Scroll>=1300){
				$(".event_photo").show();
				$(".studio_photo").find(".subtit_zone").addClass("scroll");
				$(".shutter").addClass("on").fadeOut();

				if($("body").hasClass("test") == true){
					confirm_zone();
				}
			}
			if(Scroll>=1500){
				$(".studio_photo").find(".photo_zone").addClass("scroll");
			}
	});
	

	$(".page_move a").bind("click",function(){
		alert("진짜 누르네 너 미쳤어? ");
	});

	
	var $height = $(window).height();
		$(".event_photo").css("height",$height);
		$(".shutter").css("height",$height);
		centerPosition();
	$(window).on("resize",function(){ 
		$height = $(window).height(); 	
		$(".event_photo").css("height",$height);
		$(".shutter").css("height",$height);
		centerPosition();
	});


	function centerPosition () {
		var leftPos=($(window).width()-$(".confirm_zone").outerWidth())/2;
		var topPos=($(window).height()-$(".confirm_zone").outerHeight())/2;
		$(".confirm_zone").css({left:leftPos, top:topPos});
	}
	function confirm_zone(){
		setTimeout(function(){
				$(".confirm_zone").fadeIn();
				$(".event_photo").addClass("on");
				$("body").css("overflow","hidden");
			},500);
	}
	$(".confirm_zone_inner").find("a").bind("click",function(){
			var _this = $(this),
				  _btn = _this.closest("li");

			if(_btn.hasClass("ok") == true){
				$(".picture_zone").show();
				$(".confirm_zone").fadeOut();
				setTimeout(function(){
					$(".picture").find("img").addClass("on");
				},1000);
				setTimeout(function(){
					$(".picture").find("img").css("opacity","1");
				},4000);
			}else {
				$(".event_photo").fadeOut().remove();
				$("body").css("overflow","visible").removeClass("test");
			}

		return false;
	});
	

	/* date */
	function picture_inner(){
		var	$picture_inner = $(".picture_inner"),
				$picture = $picture_inner.find(".picture"),
				$picture_img = $picture.find("img"),
				$date = $picture_inner.find(".date"),
				_mon = "";
				_day = "",
				_dd = "",
				$picture_su = parseInt(Math.random()*4);
				console.log($picture_su);
				$picture_img.attr("src","image/about/picture_"+$picture_su+".png");		
	}picture_inner();
	var now = new Date(),
				y =	now.getFullYear(),
				mon = now.getMonth(),
				d = now.getDate(),
				week = now.getDay(),
				_mon = parseInt(mon+1),
				$date = $(".picture_inner .date");
				
				if(week==0){_day="Sunday";}else if(week==1){_day="Monday";
				}else if(week==2){_day="Tuesday";}else if(week==3){_day="Wednesday";
				}else if(week==4){_day="Thursday";}else if(week==5){_day="Firday";
				}else if(week==6){_day="Saturday";}
			
			if(d<10){
				_dd = "0"+d;
			}else{
				_dd=d;
			}
			$date.text(y+". "+_mon+". "+_dd+". "+_day);

	$(".picture_remove").find("a").bind("click",function(){
			$(".event_photo").fadeOut().remove();
			$("body").css("overflow","visible").removeClass("test");
			return false;
	});
});
