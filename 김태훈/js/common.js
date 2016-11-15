$(document).ready(function(){

	//////////// header ///////////
		function header(){
			var $gnb = $(".gnb_Open_btn a");
			$gnb.bind("click",function(){
				var _this = $(this),
					$bar = _this.closest(".gnb_Open_btn");
					if($bar.hasClass("on")==true){
						$bar.removeClass("on");
					}else {
						$bar.addClass("on");
						$(".gnb_Open_btn").stop().animate({"opacity":"0"},500);
						$(".gnb").stop().animate({"right":"0"},500);
						$("#wrap").stop().animate({"left":"-300px"},500);
					}
				return false;
			});
			$(".logo").find("a").bind("click",function(){
				$("html, body").animate({
					"scrollTop":0
				}, 10);
			});
			$(".gnb").find(".cancel a").bind("click", function(){
				$(".gnb_Open_btn").removeClass("on").stop().animate({"opacity":"1"},500);
				$(".gnb").stop().animate({"right":"-300px"},500);
				$("#wrap").stop().animate({"left":"0"},500);
				return false;
			});	
			
		}
		header();
	////////////////////////////////	


	//////////// 창 사이즈에 맞춘 ////////////
		var all_height = $(window).height();
		$(".main_bg").css("height",all_height);
		$(".counseling_pop").css("height",all_height);
		$(".counseling_pop_zone").css("height",all_height);
		$(".gnb").css("height",all_height);
		$(window).on("resize",function(){ 
			all_height = $(window).height(); 	
			$(".main_bg").css("height",all_height);
			$(".counseling_pop").css("height",all_height);
			$(".counseling_pop_zone").css("height",all_height);
			$(".gnb").css("height",all_height);
		});
	/////////////////////////////////////////

	//////////// main ///////////
		function main_(){
			var $instagram_inner = $(".instagram_inner"),
				  $instagram = 	$instagram_inner.find(".instagram_info"),
				  $li = $instagram.find("li");
				$li.each(function(){ // 각자의 li, 이미지
					var _li = $(this),
						$img = _li.find(".img"),
						$focus = _li.find(".focus_on"),
						$txt_zone = _li.find(".text_zone"),
						$src = _li.find(".img_none > img").attr("src");
						_width = parseInt(_li.css("width")),
						_margin = parseInt(_li.css("margin-right"));
						$img.css({"background":"url("+$src+") no-repeat 50% 0%","background-size": "cover"});
						_total = _width+_margin;
						$txt_zone.hide();

						_li.on("mouseenter", function(){	
							var $focus_on = _li.find(".focus_on");
							if(!$focus_on.hasClass("hover") == true){
								$focus_on.addClass("hover");
								$txt_zone.show().addClass("on");
							}
						});
						_li.on("mouseleave", function(){		
							var $focus_on = _li.find(".focus_on");
								$focus_on.removeClass("hover");
								$txt_zone.hide().removeClass("on");

						});
						//a에 가면 버튼에 포커스가 가도록 설정 바로 보이게
				}); //each

				$(".counsel_zone").find(".btn_article a").bind("click",function(){
					counseling_popop();
					return false;
				});
				$(".counseling a").bind("click",function(){
					auto();
					counseling_popop();
					return false;
				});
				/* gnb 상담신청 */
				$(".gnb").find(".gnb_counseling a").bind("click",function(){
					counseling_popop();
					auto();
					console.log("d");
					return false;
				});	
				
				var $counseling = $(".counseling_pop"),
					  $name_zone = $counseling.find(".studio_name"),
					  $agreement =	 $counseling.find(".agreement_zone"),
					  _cancel = $counseling.find(".cancel"),
					  $name = $name_zone.find(".name_txt"),
					  _kyoungmin = $name.find("span.txt"),
					  _size = _kyoungmin.size(),
					  num = 0;
							function auto(){
									_auto2 = setInterval(function(){
									_kyoungmin.eq(num).addClass("show").siblings().removeClass("show");
										num ++;
										if(num == _size){
											num = 0;
										}
									},1500);
							}
							
							function _agreement(){
								var _check = $agreement.find(".check01");
									
								_check.bind("click",function(){
									var _this = $(this),
										 _span = _this.find(".checkbox_style"),
										_zone = _this.closest(".agreement_zone"),
										_check = _zone.find("#check01");
									if(!_span.hasClass("check") == true){
										_span.addClass("check");
										_check.prop("checked",true);
									}else {
										_span.removeClass("check");
										_check.prop("checked",false);
									}
									return false;
								})
							}_agreement();
							var	$form = $(".pop_form"),
									_submit = $form.find(".btn_article");

							_submit.bind("click",function(){
								alert("준비중입니다.");

								return false;
							});

							_cancel.find("a").bind("click", function(){
										clearInterval(_auto2);
										$(".counseling_pop_zone").fadeOut();
										$(".counseling_pop").removeClass("show").fadeOut().css("right","-1070px");
										$("body").css("overflow","visible");
								return false;
							});
		}
		main_();
		function counseling_popop(){
			$("body").css("overflow","hidden");
			$(".counseling_pop_zone").fadeIn();
			$(".counseling_pop").addClass("show").show().stop().animate({"right":"0"},500);
		}
		$(".portfolio_info li").css("opacity","0");
			
	////////////////////////////////	

	//////////// portfolio ////////////
		function portfolio(){
				setTimeout(function  () {
					$(".portfolio_inner").addClass("on");
				}, 1000);				
				var $tit_zone = $(".portfolio_tit_zone"),
					  $tit_inner = $tit_zone.find(".tit_inner"),
					_size = $tit_inner.size(),
					 _su02 = 0;
				function portfolio_tit(){
						portfolio_auto = setInterval(function(){
						$tit_inner.eq(_su02).addClass("show").siblings().removeClass("show");
							_su02 ++;
							if(_su02 == _size){
								_su02 = 0;
							}
						},4000);
				}portfolio_tit();
				/* 그룹 */
				var $group_zone = $(".picture_group_zone");
				function group_zone(){
					var $category_zone = $group_zone.find(".category_zone"),
						 $category =  $category_zone.find(".category_inner"),
					  	 $control = $category_zone.find(".btn_article"),
						 $li =	 $category.find(".category_slider > li"),
						 $album_zone = $group_zone.find(".Album_zone"),
						 $album_ = $album_zone.find(".Album_inner > li"),
						 $view = $li.find("a"),
						 _size = $li.size(),
						 total = 1,total2 = 2,total3 = 3,total4 = 4,total5 = 5,total6 = 6;
						
						
						$album_.each(function(){ 
							var _this = $(this),
								$list = _this.find(".album_list > li");

								console.log($list.size());
								$list.each(function(){
									var _this02 = $(this),
										$bg = _this02.find(".picture_type"),
										$bottom = $bg.find(".bottom"),
										$img = $bg.find(".img img"),
										_src02 = $img.attr("src");
										$bg.css({"background":"url("+_src02+") no-repeat 50% 0","background-size": "cover"});	
										$bottom.css({"transform":"rotateX(180deg)skew(-10deg,0)","background":"url("+_src02+") no-repeat 50% 100%","background-size": "cover"});
								});
								
						});


					category_title();
					/*  회전 버튼 */
					$control.find("ul li a").bind("click",function(){
						var _this = $(this),
							  _li = _this.closest("li");	
						if(_li.hasClass("prev") == true ){
							total--;total2--;total3--;total4--;total5--;total6--;
							console.log("이전");
							if(total == 0){	total = 6 ; }$li.eq(0).removeClass().addClass("list_0"+total); 
							if(total2 == 0){ total2 = 6 ;} $li.eq(1).removeClass().addClass("list_0"+total2); 
							if(total3== 0){	total3 = 6 ; }$li.eq(2).removeClass().addClass("list_0"+total3); 
							if(total4 == 0){ total4 = 6 ;} $li.eq(3).removeClass().addClass("list_0"+total4); 
							if(total5 == 0){ total5 = 6 ; }$li.eq(4).removeClass().addClass("list_0"+total5); 
							if(total6 == 0){ total6 = 6 ;} $li.eq(5).removeClass().addClass("list_0"+total6); 
							category_title();
						}else {
							console.log("다음");
							total++;total2++;total3++;total4++;total5++;total6++;
							if(total == 7){	total = 1 ; }$li.eq(0).removeClass().addClass("list_0"+total); 
							if(total2 == 7){ total2 = 1 ;} $li.eq(1).removeClass().addClass("list_0"+total2); 
							if(total3== 7){	total3 = 1 ; }$li.eq(2).removeClass().addClass("list_0"+total3); 
							if(total4 == 7){ total4 = 1 ;} $li.eq(3).removeClass().addClass("list_0"+total4); 
							if(total5 == 7){ total5 = 1 ; }$li.eq(4).removeClass().addClass("list_0"+total5); 
							if(total6 == 7){ total6 = 1 ;} $li.eq(5).removeClass().addClass("list_0"+total6); 
							category_title();
						}
						return false;
					});
					function category_title(){
							var _txt = $(".list_01 span").text();
							$(".category_title span").text(_txt);
					}
					/* 앨범 보기 */
					$view.bind("click", function(){
						var _this = $(this),
							 _li = _this.parent(),
							_index = _li.index(),
							_folder = "";

							//best
							$album_.eq(_index).addClass("show").fadeIn().siblings().removeClass("show").hide();
							var test2 = $(".img_list_zone").size();

							setTimeout(function(){
								$("html, body").animate({
									"scrollTop":"2084px"
								}, 700);
							},100);

							if(_index == 0){ _folder="wedding"}
							if(_index == 1){ _folder="family"}
							if(_index == 2){ _folder="datesnap"}
							if(_index == 3){ _folder="person"}
							if(_index == 4){ _folder="landscape"}
							if(_index == 5){ _folder="etc"}
          
							var _zone = $(".img_list_zone"),
								  _li = _zone.find(".img_list_inner > li");
							
							//  사진에 맞는 text값 입력하기 
							var arr = [
								[ //웨딩
									["길성준, 남예지 예비부부 "," 정말 멋진 사진이 나왔는데 얼굴공개를 원하시지 않으셔서","이렇게라도 허락받고 올리네요. 감사합니다 고생하셨습니다!","2016. 12. 01"],// 1
									["최승준, 이유리 예비부부 ","추운날씨에도 웃음이 끊이질 않는 촬영이었습니다","두 분다 고생많으셨고! 행복하세요!","2016. 11. 14"],// 2
									["최경민, 김가영 예비부부"," 남편분이 아이디어가 정말 좋으셔서 재밌고 유쾌한 촬영했네요!","두 분다 고생많으셨고 행복하세요!","2016. 11. 11"],// 3
									["김준수, 이슬기 예비부부  ","두 분다 바다가 보이는장소를 원하셨는데","어려움이 있기에 이렇게라도 진행하였네요 그래도 잘 마무리된것 같아 다행입니다!","2016. 11. 10"],// 4
									["박성준, 이미윤 예비부부 ","야외촬영을 진행하였는데 두분다 지친기색없이","너무 활기차셔서 저도 힘차게 촬영하였습니다!","2016. 11. 01"],// 5
									["김민성, 최경민 예비부부","늘 웨딩촬영은 더 쉬운게 정말 사랑한다는 느낌이 자연스럽게 나니까","저는 그냥 셔터만 누를뿐입니다 오히려 작가는 고객님이었습니다.","2016. 10. 25"],// 6
									["김길성,박예진예비부부 ","초등학교 동창에서 부부까지 정말 예쁜사랑 영원하시고!","행복하게 잘사세요! 고생하셨습니다.","2016. 10. 10"],// 7
									["서민준, 이현아 예비부부 "," 남편분의 사랑이 돋보이는 촬영이었습니다","어찌나 달달하던지 부러워 죽을뻔했습니다 고생하셨어요! 행복하세요!","2016. 09. 15"],// 8
									["윤성일, 이예린 예비부부 "," 두 분의 케미가 느껴지는 사진촬영이었어요","호흡도 정말 좋았고 유쾌하셔서 좋은촬영 잘했습니다!","2016. 09. 11"],// 9
									["김민준, 윤지수 예비부부 ","흑백웨딩은 흔치않은데 두분다 옳고그름이 정확하셔서","무리없이 좋은촬영 잘 마무리했습니다! 고생하셨습니다!행복하세요!","2016. 09. 05"],// 10
								],
								[ //가족사진
									["이해일, 김지수부부","출산후 젊음을 간직하신다는 컨셉으로 진행하였습니다","너무 행복해보이는 사진이 나왔네요!","2016. 12. 01"],
									["남매가족사진","남자분이 막내라는데... 휴...","워낙 기가쎄셔서 무서운촬영을 잘 마무리 하였습니다","2016. 11. 14"],
									["김춘삼고객님 가족사진","행복함이 느껴지는 사진이 나왔네요","재미있게 촬영을 진행하여서 어려움없이 잘 마무리했습니다 고생하셨습니다:)","2016. 11. 11"],
									["김진호 고객님 가족사진","워낙 막내분이 말썽을 많이 부리셔서 이게 집안 내력이시라고","자연스러운 고객님만의 가족사진이 연출되었네요 ","2016. 11. 10"],
									["김시호 고객님 가족사진","소품을 이용한 가족사진을 촬영을 진행하였습니다","어려움없이 즐겁게 촬영을 마무리 하였습니다","2016. 11. 01"],
									["김민우 고객님 가족사진 고객님 가족사진","소품을 이용한 가족사진을 촬영을 진행하였습니다","가족분들이 다들 공무원분이셔서 그에 맞는 촬영을 진행하였습니다","2016. 10. 25"],
									["최진수 고객님 가족사진","남자들의 강인한 가족사진의 컨셉을 요구하셔서 그에 맞는 ","컨셉으로 잘 진행하였습니다 워낙 훤칠하셔서 멋진사진이 나왔네요!","2016. 10. 10"],
									["이성령 고객님 자매사진","자매단체 사진촬영을 진행하였습니다","다들워낙 유쾌하셔서 즐겁게 촬영했네요!","2016. 09. 15"],
									["안민경 고객님 가족사진","막내분도 다음번엔 꼭.. 장가가셔서","다시한번 다같이 찍는날이 오시길.. 고생하셨습니다!","2016. 09. 11"],
									["김수미 고객님 가족사진","단합된 가족사진의 컨셉으로 진행하였으며","무난하고 화목한 사진이 나왔네요! 다들 고생하셨습니다!","2016. 09. 05"],
								],
								[ //데이트 스냅
									["강준일,이미수 커플","유일하게 촬영중 얼굴이 가려진 촬영이였어요","두 분다 자신이 없다고...하지만 분위기는 정말 좋았습니다!","2016. 12. 01"],
									["박철수,지영은 커플","분위기부터 소품까지 철저히 준비하신","계획이 투철한 커플덕에 좋은촬영 했네요! 고생했어요!","2016. 11. 14"],
									["이강철,유은미 커플","예정일에 비가온다고 했는데도 촬영을 진행하신다고 ","다행이 촬영날 비는 안왔습니다 하늘이도왔어요!","2016. 11. 11"],
									["유일준,최서희 커플","야외촬영 임에도 불구하고 이렇게 달달한 커플이..","부러움의 가득찬 촬영이었습니다 고생하셨어요!","2016. 11. 10"],
									["유일준,최서희 커플","한복촬영을 진행하였고요! 두분다 너무 유쾌하시고","재밌게 촬영에 임해주셔서 저도 너무 즐거웠네요!","2016. 11. 01"],
									["김민수,이지예 커플","조금다른 야외촬영을 요구하였는데요 저로서도 ","특이한 컨셉촬영을 좋아하지만 덕분에 즐거운 촬영했습니다 고생하셨어요:)","2016. 11. 25"],
									["유진수,김지은 커플","뒷모습에 힘을준 커플 앞모습도 멋지시고 아름다우신데","분위기가 너무 좋게 나와서 만족스럽네요! 고생하셨습니다","2016. 11. 10"],
									["전유성,황유이 커플","장소자체를 고객님이 정해주셔서 원활하였고","두 분의 눈에서 사랑이느껴지는 사진이 나왔네요 고생많으셨어요!","2016. 11. 15"],
									["서시경, 이예나 커플","티격태격한 분위기의 사진을 찍으면서도 달콤한이 느껴지는 사진이 나왔네요 하하!!","이날 여성분은 아이스크림을 다섯개나 먹었다죠...","2016. 11. 11"],
									["김정준, 서예린 커플","야외촬영을 진행하였는데 파파라치연출을 요구하셔서 진행하였는데","정말 제가 파파라치가 된기분이었습니다 하하.. 고생하셨어요!","2016. 11. 05"],
								],
								[ //인물
									["디제이킹펀 프로필촬영","디제이페스티벌에 사용할 프로필촬영을 진행하였습니다","성격이 너무좋으셔서 재밌게 촬영 진행했니다 :)","2016. 12. 01"],
									["모델 이시우 프로필사진"," 개인소장용으로 진행된 프로필촬영임에도 불구하고","정말 프로다운 모습이 많으 느껴집니다!! 고생하셨습니다!","2016. 11. 14"],
									["모델 배수현 프로필사진","모델 배수현씨의 프로필촬영을 진행하였습니다","따뜻한 오빠컨셉이 뭔지는 모르겠지만... 그렇게 진행하였습니다","2016. 11. 11"],
									["모델 윤교야 프로필사진","모델 윤교야씨의 프로필촬영을 진행하였습니다","미소가 너무 아름다우셔서 그미소를 담을 수 있다는거에 감사했습니다 ","2016. 11. 10"],
									["배우 이지유 프로필사진"," 밝고 장난스러운 표정의 컨셉을잡고 프로필촬영을 진행하였습니다,"," 워낙 성격이 쾌활하셔서 재미있게 촬영했네요!","2016. 11. 01"],
									["모델 윤이수 프로필촬영","모델 윤이수씨의 프로필촬영을 진행하였고요","고뇌라는 주제로 컨셉을 잡아 진행하였고요 포인트를 잘살려 마무리했습니다","2016. 10. 25"],
									["배우 이윤미 프로필사진","이번 드라마에 사용될 프로필촬영을 진행하였는데요 ","제가 알던 이윤미씨의 느낌이 너무 달랐지만 역시.. 대단한 여배우십니다! 멋진 프로필촬영이였습니다!","2016. 10. 10"],
									["배우 이혜진 프로필사진","개인소장용으로 진행된 촬영이었고요!","혜진씨의 젊음을 담을 수 있어 좋았습니다! 고생하셨습니다!","2016. 09. 15"],
									["모델 현 프로필사진","신인모델 현씨의 프로필촬영이었지만 신인같지 않은 프로의","모습이 저에게는 느껴졌습니다! 앞으로 활동 기대할께요!","2016. 09. 11"],
									["가수 전효성 프로필사진","매번 느끼는거지만 효성씨는 어떠한 포즈 어떠한 컨셉으로 촬영해도","섹시함이 묻어나는것 같습니다! 고생하셨어요!","2016. 09. 05"],
								],
								[ //풍경
									["라스베가스","라스베가스의 혼잡한 도심광고를 담아 보았습니다","확실히 어떻게 찍든 분위기에 빠져드네요","2016. 12. 01"],
									["강원도 ","강원도 ","낚시하는분이 잠깐 자리비운사이에 몰래 찍은사진 외로움이 느껴지는 느낌이네요","2016. 11. 14"],
									["몰디브","몰디브비치풍경을 담아보았습니다","몰디브 바다는 정말 예쁜것 같아요 저의 마음처럼","2016. 11. 11"],
									["부산","사진은 참으로 대단합니다","휴가도중 놀다가 찍은사진 저의 친구가 이렇게 멋있었나?","2016. 11. 10"],
									["하와이","하와이산맥을 담다!","이사진을 찍으려고 고생한걸 생각하니 눈물이 아직도 흐르고있네요","2016. 11. 01"],
									["이집트","이집트 북부에 위치한 교각입니다 저는 이런 교각사진을","찍는게 정말 좋더라고요 이집트에도 바다는 있답니다!","2016. 10. 25"],
									["석양","석양을 담으려면 정말 운이 필요한데 그운이","저에게 찾아왔습니다 어쩌면 사진은 인내심이 필요하죠 너무 멋진 석양을 담았네요","2016. 10. 10"],
									["제주도","제주도 출장중 비자림로에서 무심코찍은사진","저에게있어 사진은 무심코찍은사진이 정말 잘나오더라고요..","2016. 09. 15"],
									["제주도","국내 바다중 제가 정말 좋아하는 제주도 바다","바다를 담을 수 있는건 저에게 큰영광이기도 합니다","2016. 09. 11"],
									["하와이","하와이 브로드워크를 담다","저는 이러한 사진을 찍는걸 정말 좋아해요 걷고싶어지는 사진","2016. 09. 05"],
								],
								[ //기타
									["기타 타이틀"," 첫번째 설명글","2222","2016. 12. 01"],
									["기타","ㅇㅇ","2222","2016. 11. 14"],
									["기타","ㅁㄹ","2222","2016. 11. 11"],
									["기타","","2222","2016. 11. 10"],
									["기타","ㅎ 설명글","2222","2016. 11. 01"],
									["기타","기타","2222","2016. 10. 25"],
									["기타","기타","2222","2016. 10. 10"],
									["기타","기타","2222","2016. 09. 15"],
									["기타","기타","2222","2016. 09. 11"],
									["기타","기타","2222","2016. 09. 05"],
								],
							] ;
							var test = _li.eq(0).find(".img img").attr("src");
							

							   for(var i = 0; i<=10 ; i++){	  
								var j = i+1; 
									_li.eq(i).find("img").attr("src","image/portfolio/"+_folder+"/"+_folder+"_"+j+".png");
									_li.eq(i).find(".tit").text(arr[_index][i][0]);
									_li.eq(i).find(".txt").text(arr[_index][i][1]);
									_li.eq(i).find(".txt2").text(arr[_index][i][2]);
									_li.eq(i).find(".date").text(arr[_index][i][3]); 
							   }
									console.log("test1");
					       
								_li.each(function(){
									var _this = $(this),
										  _bg = _this.find("a"),
										  img = _bg.find(".img img"),
										  _SRC = img.attr("src");
										console.log(_SRC);
										console.log("test2");
										_bg.css({"background":"url("+_SRC+") no-repeat 50% 0","background-size": "cover"});	
								});
								var first_img = _li.eq(0).find(".img img").attr("src"),
									  first_tit = _li.eq(0).find(".tit").text(),
									  first_txt = _li.eq(0).find(".txt").text(),
									  first_date = _li.eq(0).find(".date").text();

								$(".select_img_inner").css({"background":"url("+first_img+") no-repeat 50% 0","background-size": "cover"});
								$(".select_img_inner").find(".tit").text(first_tit);
								$(".select_img_inner").find(".txt").text(first_txt);
								$(".select_img_inner").find(".date").text(first_date);
						_li.eq(0).find(".img img").attr("src","image/portfolio/person/top1.png");
						// 배열을 사용하여 텍스트 값을 가져온다  
						return false;
					});
				}group_zone();

				/* img list */
				var $Album_box = $(".Album_zone");
				function _Album(){
					var $album_info = $Album_box.find(".Album_inner"),
						  $album_li = $album_info.find("li");
							
						/* 사진 카테고리 li  */
						$album_li.each(function(){ 
							var $category_li = $(this),
								  $album = $category_li.find(".album_list"),
								  $img = $album.find("li"),
								  $txt_zone = $album.find(".txt_zone"),
								  $text_list = $txt_zone.find(".txt_inner"),
								  $text = $text_list.find("li"),
								  $control = $category_li.find(".btn_article"),
								  $btn = $control.find("p a"),
								_su = 0, num1=1,num2=2,num3=3,num4=4,num5=5;

								$control.find("p.prev").hide();
								$btn.bind("click", function(){
										var _this = $(this),
											  $p = _this.closest("p"),
											  $closest = _this.closest("li"),
											  $zone = $closest.find(".txt_inner"),
											  $li = $zone.find("li");
											  $slide_list = $closest.find(".album_list"),
											  $slide = $slide_list.find("li"),
											  _su2 = _su-1;
								    if($p.hasClass("prev") == true ){
										console.log("이전");
										_su--;num1++;num2++;num3++;num4++;num5++;
										$li.eq(_su).addClass("on").fadeIn().siblings().removeClass("on").hide();
										$img.find(".bottom").removeClass("show");
										$img.eq(_su2).find(".bottom").addClass("show");
										$img.eq(0).removeClass().addClass("type0"+num1); 
										$img.eq(1).removeClass().addClass("type0"+num2);
										$img.eq(2).removeClass().addClass("type0"+num3);
										$img.eq(3).removeClass().addClass("type0"+num4);
										$img.eq(4).removeClass().addClass("type0"+num5);
										if($img.hasClass("type00")==true){
											$img
										}
										ini()
									}else {
										console.log("다음");
										_su++; num1--;num2--;num3--;num4--;num5--;
										$li.eq(_su).addClass("on").fadeIn().siblings().removeClass("on").hide();
										$img.eq(_su).find(".bottom").addClass("show");
										$img.eq(0).removeClass().addClass("type0"+num1); 
										$img.eq(1).removeClass().addClass("type0"+num2);
										$img.eq(2).removeClass().addClass("type0"+num3);
										$img.eq(3).removeClass().addClass("type0"+num4);
										$img.eq(4).removeClass().addClass("type0"+num5);
										
										ini()
									}		
									/* < >  처음과 끝 숨기기  */
									function ini(){
										if(_su == 4){
											$control.find(".next").hide();
										}else if(_su == 0){
											$control.find(".prev").hide();
										}else {
											$control.find("p").show();
										}
									}
									return false;
								});

						});  //사진 카테고리 end 
				}_Album();
				

				////////마지막 리스트 
				var _picture_list_zone = $group_zone.find(".select_list_zone"), //마지막 리스트 부분
			  		  _picture_list = _picture_list_zone.find(".img_list_zone");

				_picture_list.each(function(){ //each : s  2016. 11. 09 li 하나로 수정 이미지값 변경할 예정
						var _this = $(this),
						 	  $list = _this.find(".img_list_inner"),
							  $img = $list.find("li"),		
							  $select = $img.find("a"),
							  _width =  $select.css("width"),
							  _margin = $img.css("margin-right"),
						 	  $total = parseInt(_width+_margin),
							  _slider_auto = "";
							
							$img.each(function(){
								var _this = $(this),
									 _btn = _this.find("a");
									_Img = _btn.find(".img img"),
									_Src = _Img.attr("src");
								_btn.css({"background":"url("+_Src+") no-repeat 50% 0","background-size": "cover"});
							});

							function img_move(){// 바로 실행
								if($(".img_list_inner:animated").length < 1){
									$list.stop().animate({"margin-left":$total*-1},3970,"linear",function(){
										$(this).children("li:first").insertAfter($(this).children("li:last"));
										$(this).css("margin-left","0");
									});
								}
							} 
						//	img_move();

							function auto_play(){ // 일정시간 반복
								_slider_auto = setInterval(function(){
									img_move();
								},4000);
							}
						//	auto_play(); 
							
							$list.on("mouseenter",function(){
								var _this = $(this);
							//	_this.addClass("stop");
							//	_this.stop();//바로 정지
								//_this.stop().animate({"margin-left":0},500); 맨 오른쪽에 조금 보이는 이미지를 클릭하면 불편함
								clearInterval(_slider_auto); //반복 중지
							});

							$list.on("mouseleave",function(){
								var _this = $(this);
								_this.removeClass("stop");
								if(!_this.hasClass("stop")==true){
								//	img_move();//바로
								//	auto_play();//4초후
								}
							});

						var center_img = $(".select_img_inner").find(".img img"),
							  _src = center_img.attr("src");
							 $(".select_img_inner").css({"background":"url("+_src+") no-repeat 50% 0","background-size": "cover"});


						$select.on("click",function(){  // 슬라이드 동작하고 있는 이미지 클릭 시 
							var _this = $(this),
								  _li = _this.closest("li");
								  _img = _li.find(".img img"),
								  _c_src = _img.attr("src"),
								 _tit = _li.find(".tit").text(),
								 _txt = _li.find(".txt").text(),
								 _txt2 = _li.find(".txt2").text(),
								 _date = _li.find(".date").text(),
								_text_zone = $(".select_img_inner").find(".text_zone");
							
								console.log(_c_src);

								_text_zone.find(".tit").text(_tit);
								_text_zone.find(".txt").text(_txt);
								_text_zone.find(".txt2").text(_txt2);
								_text_zone.find(".date").text(_date);
								$(".select_img_inner").css({"background":"url("+_c_src+") no-repeat 50% 0","background-size": "cover"});

							return false;
						});
				});//each : e



		}portfolio();
	//////////////////////////////////


	/////////////  scroll top  /////////////
		$(window).scroll(function() {
				var Scroll=$(this).scrollTop(),
					$header = $("#header_zone");
				if(Scroll<=80){
					$header.removeClass("scrolltype");
				}if(Scroll>=81){
					$header.addClass("scrolltype");

				}if(Scroll>=280){
					$(".category_inner").addClass("scroll");
					$(".category_zone").find(".btn_article").addClass("scroll");
				}if(Scroll>=500){
					$(".about_zone").find(".sub_tit").addClass("scroll");
					$(".about_zone").find(".txt_inner li").addClass("scroll2");
					$(".about_zone").find(".btn_article").addClass("scroll");
				}if(Scroll<=600){
					$(".top_btn").fadeOut();
				}if(Scroll>=700){
					$(".top_btn").fadeIn();
					$(".portfolio_zone").find(".sub_tit").addClass("scroll");
					$(".portfolio_zone").find(".txt").addClass("scroll");
					for(var i = 1 ; i<=5; i++){
						$(".portfolio_info").find(".list_0"+i+"").addClass("scroll2").css("opacity","1");
					}
				}if(Scroll>=950){
					$(".portfolio_info").find(".list_06").addClass("scroll2").css("opacity","1");
				}if(Scroll>=1000){
					$(".portfolio_info").find(".list_07").addClass("scroll2").css("opacity","1");
				}if(Scroll>=1050){
					$(".portfolio_info").find(".list_08").addClass("scroll2").css("opacity","1");
				}if(Scroll>=1100){
					$(".portfolio_info").find(".list_09").addClass("scroll2").css("opacity","1");
				}if(Scroll>=1150){
					$(".portfolio_info").find(".list_10").addClass("scroll2").css("opacity","1");
				}if(Scroll>=1200){
					$(".portfolio_info").find(".list_11").addClass("scroll2").css("opacity","1");
				}if(Scroll>=1350){
					$(".Album_inner").addClass("scroll");
				}if(Scroll>=1700){
					$(".counsel_zone").find(".sub_tit").addClass("scroll");
					$(".counsel_zone").find(".txt").addClass("scroll");
				}if(Scroll>=1750){
					$(".counsel_zone").find(".btn_article").addClass("scroll");
				}if(Scroll>=2000){
					$(".instagram_zone").find(".sub_tit").addClass("scroll");
					$(".instagram_zone").find(".txt").addClass("scroll");
				}if(Scroll>=2200){
					$(".instagram_info").find("li:eq(0)").addClass("scroll");
					$(".instagram_info").find("li:eq(1)").addClass("scroll");
					$(".instagram_info").find("li:eq(2)").addClass("scroll");
				}if(Scroll>=2450){
					$(".instagram_info").find("li:eq(3)").addClass("scroll");
					$(".instagram_info").find("li:eq(4)").addClass("scroll");
					$(".instagram_info").find("li:eq(5)").addClass("scroll");
				}if(Scroll>=2700){
					$(".instagram_info").find("li:eq(6)").addClass("scroll");
					$(".instagram_info").find("li:eq(7)").addClass("scroll");
					$(".instagram_info").find("li:eq(8)").addClass("scroll");
				}if(Scroll>=3200){
					$(".news_zone").find(".sub_tit").addClass("scroll")
					$(".news_zone").find(".txt").addClass("scroll")
				}if(Scroll>=3300){
					$(".news_zone").find(".news_info li").addClass("scroll")
				}if(Scroll>=3700){
					$(".map_zone").find(".map").addClass("scroll")
				}if(Scroll>=3850){
					$(".map_zone").find(".addr_zone").addClass("scroll")
				}		
		});
	///////////////////////////////
	
});//document

 $(function(){  
	   $(".click1").click(function(event){        
	   event.preventDefault();		
	   $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
	  }); 
	 });

function jsTop(){
	$("html, body").animate({
		"scrollTop":0
	}, 700);
}