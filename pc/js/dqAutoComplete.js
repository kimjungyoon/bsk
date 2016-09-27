
	//설정값
	var dq_searchForm = document.topSearchForm;
	var dq_searchTextbox = dq_searchForm.searchTerm;
	var dq_RecommandKwd = dq_searchForm.topRecommandKwd;

	var dq_resultDivID = "dqAuto";               //자동완성레이어 ID
	var dq_hStartTag = "<span>";                    //하이라이팅 시작 테그
	var dq_hEndTag = "</span>";                     //하이라이팅 끝 테그
	var dq_bgColor = "#77624f";                  //선택빽그라운드색
	var dq_intervalTime = 500;                   //자동완성 입력대기 시간
	
	//고정값
	var dq_acResult = new Object();              //결과값
	var dq_acLine = 0;                           //자동완성 키워드 선택  위치(순번)	
	var dq_keywordResultList = "";                //자동완성결과리스트 전방
	var dq_productResultList = "";                //상품
	var dq_planResultList = "";                //기획전 전방

	var dq_searchKeyword = "";	                 //검색어(한영변환안된)
	var dq_ajaxReqObj = "";                      //ajax request object

	var dq_keyStatus = 1;                        //키상태구분값
	var dq_acuse = 1;                            //자동완성사용여부
	var dq_engFlag = 0;                          //자동완성한영변환체크
	var dq_acDisplayFlag = 0;                    //자동완성 display 여부
	var dq_acArrowFlag = 0;                      //마우스이벤트용 flag	
	var dq_acArrowOpenFlag = 0;                  //마우스이벤트용 flag
	var dq_acFormFlag = 0;                       //마우스이벤트용 flag
	var dq_acListFlag = 0;                       //자동완성 레이어 펼쳐진 상태 여부
	var dq_browserType = dqc_getBrowserType();	 //브라우져타입
	var dq_keywordBak = "";                      //키워드빽업
	var dq_keywordOld = "";                      //키워드빽업
	
	dq_keywordBak = dq_keywordOld = dq_searchTextbox.value;

	jQuery(function($){

		if(dq_RecommandKwd.value!=""){
				if(dq_searchForm.topRecommandKwdColor.value == "") {
					dq_searchForm.topRecommandKwdColor.value = '#ffffff';
				}
				$("#head div.search-form input[type='text']").css("color",dq_searchForm.topRecommandKwdColor.value);
/*				$("[name='searchTerm']").val(dq_RecommandKwd.value);*/
				dq_searchTextbox.value = ' ' + dq_RecommandKwd.value;
		};

	    $("[name='searchTerm']").focusin(function(){
	    	
	    	if(chkRecommandKeyword())
	    	{
	    		$("#head div.search-form input[type='text']").css("color","#fff");
	    		$(this).val("");
	    	}
	    });		
	});
	
	function chkRecommandKeyword(){
		var k = dq_searchTextbox.value.trim();
		var rk= dq_RecommandKwd.value.trim();
		
		if ( k == rk) {
			return true;  
		}
		else
		{
			return false;
		}
	}		
	
	//엔터체크
	function dq_handleEnter(event)
	{		
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode; 

		if (keyCode == 13)
		{
			//검색스크립트
			goTopSearch();	
			return false;
		}	
		else
		{
			return true;
		}	
	}
	
/*	function goTopSearch(){
		if(dq_searchTextbox.value == "") {
			alert("請輸入一個搜索詞。");
			dq_searchTextbox.focus();
			return false;
		}else{
			dq_searchForm.submit();
		}		
	}*/
	
	function goTopSearch(){
		if(dq_searchTextbox.value == "") {
			alert("請輸入一個搜索詞。");
			dq_searchTextbox.focus();
			return false;
		}
		
		var schText = dq_searchTextbox.value;
		
		if(schText.substring(0,1) == " "){
			schText = schText.substring(1);
		}
		
        $.ajax({
            url : "/shop/common/getKeywordSrchByKeyword"
            , type : "POST"
            , data : "searchTerm=" + encodeURIComponent(schText)
            , dataType : "json"
            , success : function(data) {

                if (data.isKeyword) {
                	var url = data.keywordSrch.linkUrl;
                	if(data.keywordSrch.linkTaget){
                        window.open(url,'_blank' , "scrollbars=yes,toolbar=yes,location=yes, resizable=yes,status=yes,menubar=yes,resizable=yes,width=1280,height=768");

                	}else{
                		window.location.href = url;
            		}
                } else {
                	dq_searchForm.submit();
                }
            }
            , error: function(xhr, status, error) {
                alert("<ui:message key='error.common.system'/>"); 
            }
        });				
	}
	function keywordClick(word){
		dq_searchTextbox.value = word;
		goTopSearch();
	}
	
	
	function oneShotClick(){
		if(document.getElementById("oneShotLayer").style.display== "none") document.getElementById("oneShotLayer").style.display= "block";
		else document.getElementById("oneShotLayer").style.display= "none";
	}
	
	function oneShotSearch(){
		var termStr = "";
		var replaceStr = "請輸入一個搜索詞。";
		if(document.getElementById("oneShotTerm0").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm0").value + "/;/";
		if(document.getElementById("oneShotTerm1").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm1").value + "/;/";
		if(document.getElementById("oneShotTerm2").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm2").value + "/;/";
		if(document.getElementById("oneShotTerm3").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm3").value + "/;/";
		if(document.getElementById("oneShotTerm4").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm4").value + "/;/";
		if(document.getElementById("oneShotTerm5").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm5").value + "/;/";
		if(document.getElementById("oneShotTerm6").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm6").value + "/;/";
		if(document.getElementById("oneShotTerm7").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm7").value + "/;/";
		if(document.getElementById("oneShotTerm8").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm8").value + "/;/";
		if(document.getElementById("oneShotTerm9").value.replace(replaceStr, "") != "") termStr += document.getElementById("oneShotTerm9").value + "/;/";
		
		if(termStr != "") {
			dq_searchTextbox.value = termStr.substring(0, termStr.indexOf("/;/"));			
			document.getElementById("topOneShotTerm").value = termStr;
			dq_searchForm.submit();		
		}else{
			alert("請輸入一個搜索詞。");
		}		
	}
	
	function oneShotInit(inputId){
		var replaceStr = "請輸入一個搜索詞。";
		document.getElementById(inputId).value = document.getElementById(inputId).value.replace(replaceStr, "");
	}
	
	//마우스클릭시검색
	function dq_keywordSearch(keyword)
	{
		dq_searchTextbox.value = keyword;
		/*		dq_searchForm.submit();*/
		goTopSearch();
	}
	
	//입력값 체크 - setTextbox
	function dq_setTextbox(flag, ev) 
	{	
		var _event; 
		var key;
		
		document.getElementById("oneShotLayer").style.display= "none";				

			dq_stateChange();
			
			switch(dq_browserType)
			{
				case 1 : // IE
					_event = window.event;				
					key = _event.keyCode;
					break;
				case 2 : // Netscape
					key = ev.which;
					break;
				default :				
					key = _event.keyCode;
					break;
			}
								
			if(dq_keyStatus == 1 && flag && key != 13)
				dq_keyStatus = 2;	


	}
		
	//자동완성레이어 상태변경 - wd
	function dq_stateChange() 
	{					
		dq_searchTextbox.onclick = dq_acDisplayView;
		dq_searchTextbox.onblur = dq_acDisplayCheck;
		//document.body.onclick = dq_acDisplayCheck;				
		
	}
	
	function dq_acMouseOver(){
		if(dq_searchTextbox.value != "") dq_setDisplayStyle(1);
	}
	
	function dq_acMouseOut(){
		if(dq_searchTextbox.value != "") dq_setDisplayStyle(0);
	}
	
	//자동완성레이어 보여 주기 - req_ipc
	function dq_acDisplayView() 
 	{ 		
		dq_acDisplayFlag = 1;
		dq_acFormFlag = 0;
		dq_reqAcResultShow();
 	}

	//자동완성레이어 감추기전  체크 - dis_p
 	function dq_acDisplayCheck() 
 	{ 		 		
		if(dq_acDisplayFlag) 
		{ 
			dq_acDisplayFlag=0;			
			return ;
		} 
			
		if(dq_acArrowFlag)		
			return;
				
	
		if(dq_acFormFlag)
			return;
		
		dq_acDisplayHide();
	}
 	
 	//자동완성레이어 감추기 - ac_hide
 	function dq_acDisplayHide()
 	{  		
 		
 		var resultDiv = document.getElementById(dq_resultDivID);
 		
		if(resultDiv.style.display == "none") 
			return ;
		
		dq_setDisplayStyle(0);
		dq_acListFlag = 0;
		dq_acLine = 0;
				
	}
 	
 	//자동완성레이어 display style 설정 - popup_ac
 	function dq_setDisplayStyle(type)
 	{	 		
 		var resultDiv = document.getElementById(dq_resultDivID);

 		if(type==0)
		{
			resultDiv.style.display = "none";
			//dq_switchImage(0);
		}
		else if(type==1)
		{
			resultDiv.style.display = "block";
			//dq_switchImage(1);
		}
		else if(type==2)
		{
			resultDiv.style.display = "none";
			//dq_switchImage(1);
		}		
		else if(type==3)
		{
			resultDiv.innerHTML = dqDisableSuggest();
			resultDiv.style.display = "block";
		}
 	}
 	
	function dqDisableSuggest(){
 		
 		text = "<div class=\"off-autocomplete\" id=\"disableSuggest\">";
 		text += "<p>"; 		
 		text += "请使用自动完成功能。<br />";
 		text += "输入搜索词，可方便查看相关词汇以及推荐商品、推荐企划展。"; 		
 		text += "</p>";
 		text += "<p class=\"stop\"><a href=\"#\" onclick=\"suggestToggle('on');\">关闭自动完成  O</a></p>";
 		text += "</div>";
 		
 		return text;
 	} 	
 	
 	//자동완성 결과 보기 요청 - req_ac2
 	function dq_reqAcResultShow() 
	{		
 		var resultDiv = document.getElementById(dq_resultDivID);
 		
		if(dq_searchTextbox.value == "" || dq_acuse == 0)
			return ;
			
	 	if(dq_acListFlag && dq_acDisplayFlag)
	 	{ 
	 		dq_acDisplayHide();
			return;
		} 
	
		var o = dq_getAcResult();
	 
	 	if(o && o[1][0] != "") 
	 		dq_acResultShow(o[0], o[1], o[2], o[3]);
	 	else
	 		dq_reqSearch();
 	}
 	
 	//자동완성 결과 object 리턴 - get_cc
 	function dq_getAcResult()
 	{ 
		var ke = dqc_trimSpace(dq_searchTextbox.value);
		
	 	return typeof(dq_acResult[ke])=="undefined" ? null : dq_acResult[ke];
 	} 
 	
 	//자동완성 결과 object 생성 - set_cc
 	function dq_setAcResult(aq, al, al2, al3)
 	{
 		dq_acResult[aq] = new Array(aq, al, al2, al3);
 	}
 	
 	//자동완성 결과 보기 - ac_show
 	function dq_acResultShow(aq, al, al2, al3)
 	{
		if(aq != dqc_trimSpace(dq_searchTextbox.value))
			dq_engFlag = 1;
 		else
			if(aq && aq != "" && aq != dqc_trimSpace(dq_searchTextbox.value)) 			
				return ;

	 	dq_searchKeyword = aq;
	 	dq_keywordResultList = al;
	 	dq_productResultList = al2;
	 	dq_planResultList = al3;

			
	 	dq_printAcResult();

	 	if(dq_keywordResultList.length || dq_productResultList.length || dq_planResultList.length)
		 	dq_acListFlag = 1;
	 	else
			dq_acListFlag = 0;
		
	 	if(dq_acListFlag)
	 	{ 
	 		dq_setAcPos(0);
			
			if(dq_browserType == 1)
				dq_searchTextbox.onkeydown = dq_acKeywordTextViewIE;
			else if(dq_browserType == 2)
				dq_searchTextbox.onkeydown = dq_acKeywordTextViewFF;
		} 
	} 
 	
 	//자동완성결과 라인 위치 지정 - set_acpos
 	function dq_setAcPos(v)
 	{
 		dq_acLine = v;
		setTimeout('dq_setAcLineBgColor();', 10);
 	}
 	
 	//자동완성레이어에 결과 출력 - print_ac
 	function dq_printAcResult() 
 	{ 
 		var resultDiv = document.getElementById(dq_resultDivID);
 		 		
 		
		if(dq_keywordResultList[0] == "" && dq_productResultList[0] == "" && dq_planResultList[0] == "")
			resultDiv.innerHTML = dq_getAcNoResultList();
	 	else
	 		resultDiv.innerHTML = dq_getAcResultList();
		
		var suggestCookie = Suggest_getCookie('dqSuggest');
		
		if (suggestCookie != 'off')
		{			
			dq_setDisplayStyle(1); //자동완성창 보여줌.
		}else{
			dq_setDisplayStyle(3);
		}
	 	
	 	setTimeout('dq_setAcLineBgColor();', 10); 		
 	}
 	
 	//자동완성 키워드 라인의 백그라운드색 설정 - set_ahl
 	function dq_setAcLineBgColor()
 	{
 		var o1, o2, qs_ac_len, qs_ac_len1;
 		
		if(!dq_acListFlag)
			return;
		
		qs_ac_len = dq_keywordResultList.length;

	 	for(i=0;i<qs_ac_len;i++)
	 	{
			o1 = document.getElementById('dq_ac' + (i+1));
			
			if(o1 != null)
			{			
				if((i+1) == dq_acLine){
					o1.style.backgroundColor = dq_bgColor;
					o1.style.color = "#fff";
				}else{
						o1.style.backgroundColor = '';
						o1.style.color = '';
				}
			}
		}
 		
 		/*
 		$(".auto-complete ul li").mouseover(function(){
			$(".auto-complete ul li").attr("class" , "");
			$(this).attr("class" , "selected");
		});
 		*/
 	}
 	
 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE) - ackhl
 	function dq_acKeywordTextViewIE()
	{
		var e = window.event;
		var ac, acq;
		var resultDiv = document.getElementById(dq_resultDivID);
		var qs_ac_len = dq_keywordResultList.length;

		
		if(dq_keywordResultList == ""){
			qs_ac_len = 0;
		}

			
	 	if(e.keyCode==39)
	 		dq_reqAcResultShow();	 	 
	 	
	 	if(e.keyCode==40 || (e.keyCode==9 && !e.shiftKey))
	 	{
		 	if(!dq_acListFlag)
		 	{
				dq_reqAcResultShow();
			 	return;
			}
			
			if(dq_acLine < qs_ac_len)
			{
				if(dq_acLine == 0)
					dq_keywordBak = dq_searchTextbox.value;
				
				dq_acLine++;
						 
			 	ac = eval('dq_ac' + dq_acLine);
			 	acq = eval('dq_acq' + dq_acLine);
			 	dq_keywordOld = dq_searchTextbox.value = acq.outerText;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
		 	}
	 	}
	 	
	 	if(dq_acListFlag && (e.keyCode==38 || (e.keyCode==9 && e.shiftKey)))
	 	{		 			 	
			if(!dq_acListFlag) 
				return;
		 
		 	if(dq_acLine <= 1)
		 	{ 
		 		dq_acDisplayHide();
			 	dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
		 	} 
		 	else
		 	{
				dq_acLine--;
							
			 	ac = eval('dq_ac'+ dq_acLine);
			 	acq = eval('dq_acq' + dq_acLine);
			 	dq_keywordOld = dq_searchTextbox.value = acq.outerText;
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	e.returnValue = false;
			}
		}
	}
 	
 	//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE외 브라우져) - ackhl_ff
 	function dq_acKeywordTextViewFF(fireFoxEvent)
	{		
		var ac, acq;
		var resultDiv = document.getElementById(resultDiv);
		var qs_ac_len = dq_keywordResultList.length;

		
		if(dq_keywordResultList == "" ){
			qs_ac_len = 0;
		}

		
	 	if(fireFoxEvent.keyCode==39)
	 		dq_reqAcResultShow();
	 		 
	 	if(fireFoxEvent.keyCode==40 || fireFoxEvent.keyCode==9)
	 	{			
		 	if(!dq_acListFlag)
		 	{
		 		dq_reqAcResultShow();
			 	return;
			}
			
			if(dq_acLine < qs_ac_len)
			{ 
				if(dq_acLine == 0) 
					dq_keywordBak = dq_searchTextbox.value;
					
				dq_acLine++;
						 
			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);
			 	
			 	dq_keywordOld = dq_searchTextbox.value = acq.value;
			 	
			 	dq_searchTextbox.focus();
			 	dq_setAcLineBgColor();
			 	fireFoxEvent.preventDefault();
		 	}
	 	}
	 	
	 	if(dq_acListFlag && (fireFoxEvent.keyCode==38 || fireFoxEvent.keyCode==9))
	 	{
			if(!dq_acListFlag) 
				return;
		 
		 	if(dq_acLine <= 1)
		 	{ 
		 		dq_acDisplayHide();
			 	dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
		 	} 
		 	else
		 	{
		 		dq_acLine-- ;
			 
			 	ac = document.getElementById('dq_ac' + dq_acLine);
			 	acq = document.getElementById('dq_acqHidden' + dq_acLine);
			 	
			 	dq_keywordOld = dq_searchTextbox.value = acq.value;
			 	dq_searchTextbox.focus() ;
			 	dq_setAcLineBgColor() ;
			 	fireFoxEvent.preventDefault();
			}
		}						
	}
 	
 	//검색요청 - reqAc
 	function dq_reqSearch() 
 	{	 				
		var sv;
		var ke = dqc_trimSpace(dq_searchTextbox.value);
		
		//ke = ke.replace(/ /g, "%20");
		
		while(ke.indexOf("\\") != -1)
			ke = ke.replace(/ /g, "%20").replace("\\", "");
		
		while(ke.indexOf("\'") != -1)
			ke = ke.replace(/ /g, "%20").replace("\'", "");
	 
	 	if(ke == "")
	 	{ 
	 		dq_acDisplayHide();
			return;
		} 
					
	 	//sv = "getAuto.jsp?q=" + escape(encodeURIComponent(ke));
	 	
	 	sv = "/search/suggest?searchTerm=" + encodeURI(encodeURIComponent(ke)) +"&rnd=" + Math.round(Math.random() * 1000);
//	 	alert(sv);
	 	dq_ajaxReqObj = dqc_getXMLHTTP();
	 	
	 	if(dq_ajaxReqObj)
	 	{ 		 		
			dq_ajaxReqObj.open("GET", sv, true);
		 	dq_ajaxReqObj.onreadystatechange = dq_acShow;
	 	} 
	 
	 	try
	 	{		 	
			dq_ajaxReqObj.send(null);
	 	}
	 	catch(e)
	 	{		
			return 0;
		} 
	}
 
 	//자동완성 결과 보기 - showAC
 	function dq_acShow() 
 	{	 		 		
 		var suggestCookie = Suggest_getCookie('dqSuggest');
 		
 		if(suggestCookie != "off"){
 			if(dq_acuse == 1)
 		 	{		 		
 				if(dq_ajaxReqObj.readyState==4 && dq_ajaxReqObj.responseText && dq_ajaxReqObj.status==200)
 				{					
// 					alert(dq_ajaxReqObj.responseText);
 					
 					eval(dq_ajaxReqObj.responseText);
 					dq_setAcResult(dq_searchKeyword, dq_keywordResultList, dq_productResultList, dq_planResultList);
 					dq_acResultShow(dq_searchKeyword, dq_keywordResultList, dq_productResultList, dq_planResultList);
 				}
 		 	}
 		 	else
 		 	{
 		 		dq_setDisplayStyle(2);
 		 	}
 		}else{
 			dq_setDisplayStyle(3);
 		}
 		
 		
 	}
 	
 	//선택키워드저장 - set_acinput
 	function dq_setAcInput(keyword) 
 	{	 		
		if(!dq_acListFlag) 
			return;				
		
	 	dq_keywordOld = dq_searchTextbox.value = keyword;		 			 	
	 	dq_searchTextbox.focus();
	 	dq_acDisplayHide();		 
 	}
 	
 	//기능끄기 버튼을 눌렀을때 - ac_off
	function dq_acOff() 
	{		
		if(dq_searchTextbox.value == "")
			dq_setDisplayStyle(0);
		else
			dq_acDisplayHide();
	
		dq_acuse = 0;

		
		/***cookie setting ***/
		Suggest_setCookie("dqSuggest", "off", 7, "local.admin.ssgdfs.com");
		/***cookie setting ***/
 	}

	//화살표클릭 - show_ac
	function dq_acArrow()
	{	
		/***cookie setting ***/
		Suggest_setCookie("dqSuggest", "on", 7, "local.admin.ssgdfs.com");
		/***cookie setting ***/

		var resultDiv = document.getElementById(dq_resultDivID);
		
		if(dq_acuse == 0)
		{
			dq_keywordOld = "";
			dq_acuse = 1;		
			
			if(dq_searchTextbox.value == "")			
				resultDiv.innerHTML = dq_getAcOnNoKeyword();			
		}
		else
		{
			if(dq_searchTextbox.value == "")
				resultDiv.innerHTML = dq_getAcNoKeyword();						
		}
		
		if(dq_searchTextbox.value == "" && (resultDiv.style.display == "block"))
			dq_setDisplayStyle(0);
		else
			dq_setDisplayStyle(1);
		
		dq_acDisplayView();
		dq_searchTextbox.focus();
		dq_wi();
		
		document.body.onclick=null;
	}
	
	//검색어입력창의 자동완성 화살표를 위, 아래로 변경한다. - switch_image	
	function dq_switchImage(type)
	{			
		var arrow_obj = document.getElementById("dq_autoImg").src;			
		var former_part = arrow_obj.substring(0,arrow_obj.length-6);
		
		if(type==0)
		{
			document.getElementById("dq_autoImg").src = former_part+"01.gif";
			document.getElementById("dq_autoImg").title = "자동완성 펼치기";
		}
		else if(type==1)
		{			
			document.getElementById("dq_autoImg").src = former_part+"02.gif";
			document.getElementById("dq_autoImg").title = "자동완성 닫기";
		}
 	}
	
 	
 	//자동완성 레이어 mouse on
	function dq_setMouseon() 
 	{ 		
	 	dq_acFormFlag = 1;
	 	dq_acMouseOver();
 	}

	//자동완성 레이어 mouse out
 	function dq_setMouseoff()
 	{		
	 	dq_acFormFlag = 0;		
		dq_searchTextbox.focus();
		dq_acMouseOut();
 	}
 	
 	//자동완성 결과 코드 - get_aclist
 	function dq_getAcResultList()
 	{ 	 		 	
 		var keyword = "";
 		var keywordOrign = ""; 		
 		var keywordLength = 0;
 		var lenValue = 15;
 		var text = "";
 		var count = 0;
 		
 		var pos = 0;
 		var result = "";
		
 		text = "<div class=\"search-layer\">";
 		
 		if(dq_keywordResultList != null && dq_keywordResultList.length > 0)
		{			 			
 			text += "<div class=\"auto-complete\"><dl><dt>自动完成搜索词</dt><dd><ul>" ;
 			
		 	for(i=0;i<dq_keywordResultList.length;i++)
		 	{		 		
		 		result = dq_keywordResultList[i];
		 		keyword = keywordOrign = result;

				keyword = cleanQueryTerm(keyword);
				keywordOrign = cleanQueryTerm(keywordOrign);
				
				keywordLength = dqc_strlen(keywordOrign);
				
				if(keywordLength > lenValue)
					keyword = dqc_substring(keywordOrign, 0, lenValue) + "..";
				 
				if(dq_engFlag == 0)
					pos = keywordOrign.toLowerCase().indexOf(dq_searchTextbox.value.toLowerCase());
				else if(dq_engFlag == 1)
					pos = keywordOrign.toLowerCase().indexOf(dq_searchKeyword.toLowerCase());
			
				if(pos >= 0)
				{
					if(pos == 0)
					{	
						if(dq_engFlag == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
						else if(dq_engFlag == 1)
							keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
					}
					else if(pos == keywordOrign.length - 1)
					{
						if(dq_engFlag == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
						else if(dq_engFlag == 1)
							keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);													
					}												
					else
					{					
						if(dq_engFlag == 0)
							keyword = dqc_highlight(keyword, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
						else if(dq_engFlag == 1)
							keyword = dqc_highlight (keyword, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
					}
				}
				
				text += "<li>";
				text += "<a href=\"#\" id='dq_ac" + (i+1) + "' onmouseover=\"dq_setAcPos('" + (i+1) + "')\" onFocus=\"dq_setAcPos('" + (i+1) + "');\" onmouseout=\"dq_setAcPos(0);\"  onBlur=\"dq_setAcPos(0);\" onclick=\"dq_keywordSearch('" + keywordOrign + "');\" onkeypress=\"dq_setAcInput('" + keywordOrign + "');\">" + keyword + "</a>";			
				text += "<input type=\"hidden\" id=\"dq_acqHidden" + (i+1) + "\" value=\"" + keywordOrign + "\"/>";
				text += "<span id='dq_acq" + (i+1) + "' style='display:none'>" + keywordOrign + "</span>";
				text += "</li>";				
		 	}
		 	
		 	text += "</ul></dd></dl></div>";
	 	} 
 		
 		text += "<div class=\"recommend\">";
 		text += "<dl>";

 		text += "<dt>推荐商品</dt>";
 		text += "<dd class=\"product\">";

 		if(dq_productResultList != null && dq_productResultList.length > 0)
		{
 			text += "<ul>";
 			
		 	for(i=0;i<dq_productResultList.length;i++)
		 	{
		 		if(dq_productResultList[i] != ""){
			 		result = dq_productResultList[i].split("|;|");
			 		prdt_id = result[0];
			 		prdt_name = result[1];
			 		brand_name = result[2];
			 		
			 		disp_prdt_name = "["  + brand_name+ "]" + prdt_name; 
			 		
			 		if(disp_prdt_name != null && disp_prdt_name.length > 20) {
			 			tmp_name = "";
			 			l=0;
			 			for(z=0;z<disp_prdt_name.length && l< 20; z++)
			 			{
			 				if(disp_prdt_name.charCodeAt(z) > 127) 
			 					l+=2;
			 				else
			 					l++;
			 			
			 				tmp_name += disp_prdt_name.substr(z,1);
			 		 	}
			 			disp_prdt_name = tmp_name + "...";
			 					 			
			 		}
			 		
			 		disp_prdt_name = disp_prdt_name.replace("[", "<span>[");
			 		disp_prdt_name = disp_prdt_name.replace("]", "]</span> ");
			 		
			 		text += "<li onmouseover=\"dq_previewChange('dqPreview_" + i + "')\"><a href=\"/shop/product/productDetail?prdtCode="+ prdt_id + "\">" + disp_prdt_name + "</a></li>";		 		
		 		}
		 	}
		 	text += "</ul>";
		 	
		 	for(i=0;i<dq_productResultList.length;i++)
		 	{
		 		if(dq_productResultList[i] != ""){
			 		result = dq_productResultList[i].split("|;|");
			 		prdt_id = result[0];
			 		prdt_name = result[1];
			 		brand_name = result[2];
			 		priceDal = result[3];
			 		priceWon = result[4];
			 		
			 		dalRate = result[5];
			 		yuanRate = result[6];
			 		imageSrc = result[7];
			 		disp_prdt_name = prdt_name; 
			 		
			 		if(disp_prdt_name != null && disp_prdt_name.length > 15) {
			 			tmp_name = "";
			 			dd =0;
			 			for(zz=0;zz<disp_prdt_name.length && dd< 20; zz++)
			 			{
			 				if(disp_prdt_name.charCodeAt(zz) > 127) 
			 					dd+=2;
			 				else
			 					dd++;
			 			
			 				tmp_name += disp_prdt_name.substr(zz,1);
			 		 	}
			 			disp_prdt_name = tmp_name + "...";
			 		}
		 		
			 		if(i == 0) text += "<div class=\"product-view\" id=\"dqPreview_" + i + "\">"; 
			 		else text += "<div class=\"product-view\" style=\"display:none;\" id=\"dqPreview_" + i + "\">";
			 		text += "<p class=\"photo\"><a href=\"/shop/product/productDetail?prdtCode="+ prdt_id + "\"><image src=\"" + imageSrc + "\" alt=\""+ prdt_name + "\" width=\"110px\" height=\"110px\" onerror=\"this.src='//image2.ssgdfs.com/images/noimage.jpg';\"/></a></p>";
	//		 		text += "<p class=\"photo\"><ui:image src=\"" + imageSrc + "\" alt=\""+ prdt_name + "\" width=\"110px\" height=\"110px\"/></a></p>";
			 		text += "<p class=\"brand\"><a href=\"/shop/product/productDetail?prdtCode="+ prdt_id + "\">[" + cleanQueryTerm(brand_name) + "]</a></p>";
			 		text += "<p class=\"product-name\"><a href=\"/shop/product/productDetail?prdtCode="+ prdt_id + "\">" + cleanQueryTerm(disp_prdt_name) + "</a></p>";
			 		text += "<p class=\"price\">";		 		
			 		text += "<span class=\"us-currency\">$" +price_format(wonToDal(priceDal.split(",").join(""), dalRate)) + "</span>";
			 		text += "<span class=\"nation-currency\">(约 ￥" +price_format(wonToCny(priceDal.split(",").join(""), yuanRate, dalRate)) + ")</span>";
			 		text += "</p>";
			 		text += "</div>";
		 		}
		 	}
		}
 		text += "</dd>";		 	
 		
 		text += "<dt class=\"plan\">推荐企划展</dt>";
 		text += "<dd class=\"plan\">";
 		text += "<ul>";
 		
 		if(dq_planResultList != null && dq_planResultList.length > 0)
		{ 			 	 		
 			for(i=0;i<dq_planResultList.length;i++)
		 	{ 				
 				result = dq_planResultList[i].split("|;|");
 				plan_title = result[0];
 				plan_id = result[1];
 				
 				disp_plan_title = cleanQueryTerm(plan_title); 
		 		
		 		if(disp_plan_title != null && disp_plan_title.length > 40) {
		 			tmp_name = "";
		 			dd =0;
		 			
		 			for(zz=0;zz<disp_plan_title.length && dd< 40; zz++)
		 			{
		 				if(disp_plan_title.charCodeAt(zz) > 127) 
		 					dd+=2;
		 				else
		 					dd++;
		 			
		 				tmp_name += disp_plan_title.substr(zz,1);
		 		 	}
		 			disp_plan_title = tmp_name + "...";
		 		}
 				
 				text += "<li><a href=\"/shop/specialsell/viewSpecialSell?splId=" + plan_id + "\">" + disp_plan_title +"</a></li>";
		 	}
 			
		}
 		
		text += "</ul>";
 		text += "</dd>"; 		
 		text += "</dl>";
 		text += "</div>";		
		text += "<p class=\"stop\"><a href=\"#\" onclick=\"suggestToggle('off');\">关闭自动完成 X</a></p></div>";			
		
	 	return text;
	}
 	
 	function dq_previewChange(target){
 		for(i=0;i<dq_productResultList.length;i++)
	 	{ 			
 			document.getElementById("dqPreview_" + i).style.display = "none";
	 	}
 		document.getElementById(target).style.display = "block";
 	}
 	
 	
 	
 	function suggestToggle(toggle){
 		var resultDiv = document.getElementById(dq_resultDivID);
 		if(toggle == "on"){
 			dq_reqSearch();
 			//document.getElementById("disableSuggest").style.display = "none"; 			
 			Suggest_setCookie("dqSuggest", "on", 7, "");
 			
 		}else{
 			dq_setDisplayStyle(0);
 			resultDiv.innerHTML = "";
 			//document.getElementById("disableSuggest").style.display = "block";
 			Suggest_setCookie("dqSuggest", "off", 7, "");
 		}
 	}
 	
 	//자동완성 결과 없는 경우 - get_ac0
 	function dq_getAcNoResultList() 
 	{ 	 		
 		var text = "";
 		/*var ment = "해당 단어로 시작하는 검색어가 없습니다.";
	 	
 		text += "<ul>";
 		text += "	<li></li>";
 		text += "	<li>";	
 		text += ment;
 		text += "	</li>";
 		text += "	<li></li>";
 		text += "	<li class=\"header\">검색어자동완성 <span onclick=\"javascript:dq_acOff();\">기능끄기</span></li>";
 		text += "</ul>";
 		text += "<span id=dq_acq1 style='display:none'></span>";
 		
 		text += "<ul>";
 		text += "<li id='ac1'>"+ ment + "</li>";
 		//text += "<span id=dq_acq1 style='display:none'></span>";
 		//text += "<span id='acq1' style='display:none'>" + old + "</span>";
 		text += "</ul>";
		text += "<h4>검색어 자동완성기능</h4>";*/
	 	return text;
 	}
 	
 	//자동완성 키워드 없는 경우
 	function dq_getAcNoKeyword() 
 	{ 	 		
 		var text = "";
 		/*var ment = "현재 자동완성 기능을 사용하고 계십니다.";
	 	
 		text += "<ul>";
 		text += "	<li></li>";
 		text += "	<li>";														
 		text += ment;
 		text += "	</li>";
 		text += "	<li></li>";
 		text += "	<li class=\"header\">검색어자동완성 <span onclick=\"javascript:dq_acOff();\">기능끄기</span></li>";
 		text += "</ul>";
 		text += "<span id=dq_acq1 style='display:none'></span>";
	 	*/
	 	return text;
 	}
 	
 	//자동완성 복구시 키워드 없는 경우
 	function dq_getAcOnNoKeyword() 
 	{ 	 		
 		var text = "";
 		/*var ment = "자동완성기능이 활성화 되었습니다.";
	 	
 		text += "<ul>";
 		text += "	<li></li>";
 		text += "	<li>";														
 		text += ment;
 		text += "	</li>";
 		text += "	<li></li>";
 		text += "	<li class=\"header\">검색어자동완성 <span onclick=\"javascript:dq_acOff();\">기능끄기</span></li>";
 		text += "</ul>";
 		text += "<span id=dq_acq1 style='display:none'></span>";
	 	*/
	 	return text;
 	}

 	//검색박스 키워드 처리 루프 - wi()
 	function dq_wi() 
 	{	 		
		if(dq_acuse==0)
			return;
		
		var keyword = dq_searchTextbox.value;

	 	if(keyword == "" && keyword != dq_keywordOld)
	 		dq_acDisplayHide();
	 	
		if(keyword != "" && keyword != dq_keywordOld && dq_keyStatus != 1)
		{
			var o = null;
			
			o = dq_getAcResult();
			
			if(o && o[1][0] != "") 
				dq_acResultShow(o[0], o[1], o[2], o[3]);
			else
				dq_reqSearch();
		}
		
		dq_keywordOld = keyword;		
		setTimeout("dq_wi()", dq_intervalTime);
 	}
 	
 	function cleanQueryTerm(target) {
	   // var specialChars='~`!@#$%%^&*-=+\|[{]};:\',<.>/?';
	   //. & [] = - 허용
	    var specialChars='`$%%^*+\|{};:\',<>/';
	    var str=target;
	    var i, j;
	   
	    for (i = 0; i < str.length; i++) {
	      for (j = 0; j < specialChars.length; j++) {
	        if (str.charAt(i) == specialChars.charAt(j))
		      str = str.replace(str.charAt(i), " ");
	      }
	    }
	    return str;
	  }

 	 	
	//cookie setting
	function Suggest_setCookie(name, value, expiredays, domain) {
		var todayDate = new Date();
		if (expiredays) {
			todayDate.setDate(todayDate.getDate() + expiredays);
		}
		document.cookie = name + "=" + escape(value) + "; path=/;" +
		((expiredays != null) ? " expires=" + todayDate.toGMTString() + ";" : "");
		//+((domain != null) ? " domain=" + domain + ";" : "");	
		
	}
	function Suggest_setCookie_Time(name, value, expireTimes, domain) {
		var todayDate = new Date();
		if (expireTimes) {
			todayDate.setTime(todayDate.getTime() + (1000 * 60 * 60 * expireTimes));
		}
		document.cookie = name + "=" + escape(value) + "; path=/;" +
		((expiredays != null) ? " expires=" + todayDate.toGMTString() + ";" : "") +
		((domain != null) ? " domain=" + domain + ";" : "");
	}

	//cookie get
	function Suggest_getCookie(name) {
		var nameOfCookie = name + "=";
		var x = 0;
		
		while (x <= document.cookie.length) {
			var y = (x + nameOfCookie.length);
			if (document.cookie.substring(x, y) == nameOfCookie) {
				if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
					endOfCookie = document.cookie.length;
				return unescape(document.cookie.substring(y, endOfCookie));
			}
			x = document.cookie.indexOf(" ", x) + 1;
			if (x == 0)
				break;
		}
		return "";
	}
	

    function bookmarksite(title,url) {  
    	
    	var agt = navigator.userAgent.toLowerCase();
    	if (agt.indexOf("msie") != -1){//IE
    		window.external.AddFavorite(url, title);
    	} else if (agt.indexOf("rv:11.0") != -1) {//IE
    		window.external.AddFavorite(url, title); 
    	} else if (agt.indexOf("safari") != -1) {//safari
    		alert("请按 Ctrl+D收藏本站");
    	} else if(window.chrome){ //Chrome
    		alert("请按 Ctrl+D收藏本站");
    	} else if (window.sidebar){ //FF
    		window.sidebar.addPanel(title, url, "");
    	} else if(window.opera && window.print) { // opera
    		var elem = document.createElement('a');
    		elem.setAttribute('href',url);
    		elem.setAttribute('title',title);
    		elem.setAttribute('rel','sidebar');
    		elem.click();
    	}    	
    }	
	

	setTimeout("dq_wi()", dq_intervalTime);
