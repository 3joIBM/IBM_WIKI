/*!
 * bird Default JavaScript v1.0.0
 */

var framenm = "";
var spinner = null;
var treeFlag = false;
var treeMoveFlag = false;
var childMoveOnClickFlag = false;
var childMoveFlag = false;
var childMoveNonFlag = false;
var dragFlag = false;
var selFlag = false;
var splitFrag = false;
var treeNode = {};
var paramList = new Map();
var allTheFiles;
var omitformtags=["input", "textarea", "select"];
var curGrprole = "";
var userType ="";
//이지훈 - 현재 사용자가 선택한 분류를 가져오기 위한 글로벌 변수
var globalClsid;

var globalCurId = "tree_asset";

var blockindex;
		

//이지훈 - 분류트리 가로 사이즈 저장을 위한 변수
var gxPos=0;
omitformtags=omitformtags.join("|");
function disableselect(e){
	if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1)
	return false;
}
function reEnable(){
	return true;
}
if (typeof document.onselectstart!="undefined"){
	//document.onselectstart=new Function ("return false");
}else{
	//document.onmousedown=disableselect;
	//document.onmouseup=reEnable;
}

$(function(){
//	alert(jsCurGrpRole());
	var frclose = $("#frclose");
	frclose.click(function() {
		$.unblockUI();
	});
	
	if($("body").width() <= 900)
    {
    	$(".searchBox").css({
    		"position": "fixed",
    		"top": "137px",
    		"margin-left": "270px",
    		"right": "0px"
    	});
    	
    	$(".topSearch").css({
    		"background-size": "54px 64px",
    		"height": "40px"
    	});
    	
    }
	
	if($("body").width() > 900){
    	$(".searchBox").css({
    		"position": "fixed",
    		"top": "106px",
    		"right": "265px",
    		"margin-left": "270px"
    	});
    	
    	$(".topSearch").css({
    		"background-size": "auto",
    		"height": "10px"
    	});
    }	
	
	$("#excelList").css({"cursor":"pointer"}).click(function() {
    	
		if(!confirm("현재 선택 되어진 폴더의 전체 리스트를 \n엑셀로 내려 받을 수 있습니다. \n계속 하시겠습니까?")){
			return;
		}	
 		var param = {};
		
	    param.CLS_ID = $("input[name=CLS_ID]").val();
	    param.CLS_KIND_CD = $("input[name=CLS_KIND_CD]").val();
	    
	    if(param.CLS_KIND_CD == "0001"){
	        param.USER_ID = $("input[name=USER_ID]").val();     
	    }else if(param.CLS_KIND_CD == "0002"){
	        param.USER_ID = $("input[name=GRP_ID]").val();
	    }else if(param.CLS_KIND_CD == "0003"){
	        param.USER_ID = 0;
	    } 
	    
	    param.CLS_SEQ = $("input[name=CLS_SEQ]").val();
	    
	    var $iframeCnts = $("iframe[name="+framenm+"]").contents();
	    $iframeCnts.find("input[name=pPage]").val(parseInt($iframeCnts.find("input[name=pPage]").val())+1);
	    
		param.pLstOrder = $("input[name=pLstOrder]").val();
		param.pPage = $("input[name=pPage]").val();
		param.ANDOR = $("select[name=ANDOR]").map(function() { return $(this).val(); }).get().join(",");
		param.TYPE = $("select[name=TYPE]").map(function() { return $(this).val(); }).get().join(",");
	    param.SRCH_GUBUN = $("input[name=SRCH_GUBUN]").val();
	    param.OPT = $("select[name=OPT]").map(function() { return $(this).val(); }).get().join(",");
		param.SRCH_NM = $("input[name='SRCH_OPTION_NM']").val();
		
		var frm = document.sendform;
	    frm.target = "resultFrame";
	    frm.action = "/ContExcel.kait";
	    frm.submit();
	    frm.target = "";	
		
		/*new Ajax.Request(
	            "/ContExcel.kait",
	            {
	            	method:'post',
	                timeout:150000,
	                parameters : param,
	                onSuccess: function(response){
	                },
	                onFailure: function(response){
	                    alert("fail 1029");
	                }
	            });*/
	});
	
	blockindex = $(".block").size() -1;
	
	$(".block:eq("+(blockindex-2)+")").addClass("hover");
	
	var speed = 300; // 스크롤속도
	
    $(".gotop").css({
    	"cursor":"pointer",
    	"right": 30 + "px",
    	"bottom" : 30 + "px"
    }).click(function()
    {
      	 $('.conBox').animate({scrollTop:0}, speed);
    });
	
    $('.conBox').scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.gotop').fadeIn();
		} else {
			$('.gotop').fadeOut();
		}
	});
	
	$("#sfile").niceFileInput();

	formTrans();
	
	var menuHeight = $("body").height() - 158;
	var menuLiHeight = menuHeight / $("a.block").size();
	
	
	$(".menu ul li").find(".c_box").css({
		"height": menuLiHeight+"px",
		"max-height": menuLiHeight+"px"
	});
	$(".menu ul li").find(".dynatree-container").css({
		"height": menuLiHeight+"px"
	});
	
	$.fn.outerHTML = function() {
	    var el = $(this);
	    if( !el[0] ) return "";
	 
	    if (el[0].outerHTML) {
	        return el[0].outerHTML;
	    } else {
	        var content = el.wrap('<p/>').parent().html();
	        el.unwrap();
	        return content;
	    }
	};
	
    //윈도우 이벤트
    $(window)
        .resize(function(){
            jsResize();
            
            
            if($("body").width() <= 900)
            {
            	$(".searchBox").css({
            		"position": "fixed",
            		"top": "137px",
            		"margin-left": "270px",
            		"right": "0px"
            	});
            	
            	$(".topSearch").css({
            		"background-size": "54px 64px",
            		"height": "40px"
            	});
            }
            
            if($("body").width() > 900){
            	$(".searchBox").css({
            		"position": "fixed",
            		"top": "106px",
            		"right": "265px",
            		"margin-left": "270px"
            	});
            	
            	$(".topSearch").css({
            		"background-size": "auto",
            		"height": "10px"
            	});
            }		
            
            $(".archiveContents,.topSearch, .navBox").width($("body").width());
    		$(".archiveContents").width($("body").height());
    		
    		var curHeight = $("html").height() - 158;
    		var curLiHeight = curHeight / $("a.block").size();
    		
    		$(".menu ul li").find(".c_box").css({
    			"height": curLiHeight+"px",
    			"max-height": curLiHeight+"px"
    		});
    		$(".menu ul li").find(".dynatree-container").css({
    			"height": curLiHeight+"px"
    		});
    		
    		$(".gotop").css({"float":"right"});
        })
        .keyup(function(event){
	        selFlag = false;
	    })
	    .keydown(function(event){
	        var code = (event.keyCode?event.keyCode:event.which);
	        if(code == 38){
	            var nDiv = $(".end").length > 0 ? $(".end"):$(".start");
	            if(typeof(nDiv.prev().html()) != "undefined"){
	                $(".dataImgBox").removeClass("start").removeClass("end").removeClass("dataImgBox_over");
	                nDiv.prev().addClass("dataImgBox_over").addClass("start");
	            }
	        }else if(code == 40){
	            var nDiv = $(".end").length > 0 ? $(".end"):$(".start");
	            if(typeof(nDiv.next().html()) != "undefined"){
	                $(".dataImgBox").removeClass("start").removeClass("end").removeClass("dataImgBox_over");
	                nDiv.next().addClass("dataImgBox_over").addClass("start");
	            }
	        }
	        selFlag = true;
	    });
    
    $(document).ready(function(){
//    	alert($(".moveTextBox").size());
    	curGrprole = jsLoadGrpRole();
//    	alert(curGrprole);
    	userType = jsLoadUserType();
        jsResize();
    	jsTreeinit("tree_asset", {CLS_P_ID : 0, CLS_KIND_CD : "0003"});
    	jsTreeinit("tree_user", {CLS_P_ID : 0, CLS_KIND_CD : "0001", USER_ID : $("input[name=USER_ID]").val()});
    	jsTreeinit("tree_group", {CLS_P_ID : 0, CLS_KIND_CD : "0002", USER_ID : $("input[name=GROUP_ID]").val()});
    	
    	jsDraginit();
    	jsInitPage();
    	startSpinner();
    	
    	
    });
    
    $("#SortselBtn").click(function(){
    	$(".selectBox").slideToggle(100);
    });
    
    $("input[name=SortInput]").css("cursor","pointer").click(function(){
        $(".selectBox").slideToggle(100);
    });
    
    $(".selectBox p").click(function(){
    	$("input[name=SortInput]").val($(this).text());
    	$("input[name=pLstOrder]").val($(this).attr("val"));
        $(".selectBox").slideToggle(100);
        $("input[name=pPage]").val(1);
        $("#AjaxLinkTime").attr("href","#"+new Date().getTime());
        $("#AjaxLink").click();
    });

	$(".block").click(function(){
		
//		$(this).addClass("hover");
		if($(this).hasClass("hide")){
			$(this).removeClass("hide");
		}else{
			$(this).addClass("hide");
		}
		$(this).next().slideToggle(200);
	});
	
	
	$(".nav_split01").mousedown(function(){
		if(!$(this).prev().prev().hasClass("hide")){
			var $helper = $(".nav_split01").clone();
			$helper.css({
				"position":"absolute",
				"width":$(this).width(),
				"top":$(this).offset().top-$(this).parent().offset().top + "px",
				"z-index":1000
			});
			$helper.addClass("helper");
			$(this).after($helper.outerHTML());
			splitFrag = true;
		}
	});

	$(".nav_split").css("left","0");
	
	$(".nav_split").draggable({ 
		
		axis: "x",
		handle: ".nav_split",
		drag : function(e) 
		{
			var offset = $(this).offset();
			
			gxPos = offset.left;
			
			if(gxPos < 256)
			{
				gxPos = 256;
			}	
			
			
			if(gxPos > 500)
			{
				gxPos = 500;
			}	
			
			var xx = gxPos - 261;
			
			var dd = 261 + xx;
			
			
//			$(".arrayBox h3").text(gxPos);
			$(".category .menu").width(dd+"px");
			$(".archiveContents").css("margin-left",dd+"px");
			
		},
		stop : function() 
		{
			var offset = $(this).offset();
			
			gxPos = offset.left;
			
			if(gxPos < 256)
			{
				gxPos = 261;
				$(".nav_split").css("left","5px");
			}	
			
			if(gxPos > 500)
			{
				gxPos = 500;
				$(".nav_split").css("left","244px");
			}	
			
			var xx = gxPos - 256;
			
			var dd = 256 + xx;
//			$(".arrayBox h3").text(gxPos);
			$(".category .menu").width(dd+"px");
			$(".archiveContents").css("margin-left",dd+"px");
			jsResize();
				
		}
	});
	
	$(document)
		.mousemove(function(e){
			if(splitFrag){
				var helperTop = e.pageY-$(".helper").parent().offset().top;
				if(helperTop < 100){
					helperTop = 100;
				}
				$(".helper").css("top",helperTop+"px");
			}
	    }).mouseup(function(e){
	    	if($(".helper").length > 0){
				splitFrag = false;
				var TreeHeight = $(".helper").offset().top-$(".helper").parent().offset().top-74;
				var $cbox = $(".helper").prev().prev().children("div.c_box");
				$cbox.css("max-height", TreeHeight+"px");
				$cbox.css("height", TreeHeight+"px");
				$cbox.children("ul.dynatree-container").css("height", TreeHeight+"px");
				$(".helper").remove();
	    	}
	    }); 
	    
    $('#archDataBox').scroll(function() {
    	if(($('#archDataBox').scrollTop()+$('#archDataBox').height())==($('#archDataBox')[0].scrollHeight-10)){
    		var param = {};
    		if($(hs.getExpander()).attr("src") == "/SrchMain.kait"){
    			jsSendSrch();
    		}else{
	    		$("input[name=pPage]").val(parseInt($("input[name=pPage]").val())+1);
	            param.pPage = $("input[name=pPage]").val();
	            param.pLstOrder = $("input[name=pLstOrder]").val();
	            param.CLS_ID = $("input[name=CLS_ID]").val();
	            param.CLS_SEQ = $("input[name=CLS_SEQ]").val();            
	            param.CLS_KIND_CD = $("input[name=CLS_KIND_CD]").val();
	            if(param.CLS_KIND_CD == "0003"){
	            	param.USER_ID = "0";            	
	            }else{
	            	param.USER_ID = $("input[name=USER_ID]").val();
	            }
	            param.SRCH_GUBUN = $("input[name=SRCH_GUBUN]").val();
	    		$("#loadingDiv").show();            
	            jsLoadFileAppend("contentData", "/ContView.kait", param, "jsDraginit");
    		}
    	}
    });
    
    $.History.bind(function(state){
        var param = {};
        param.pPage = $("input[name=pPage]").val();
        param.pLstOrder = $("input[name=pLstOrder]").val();
        param.USER_ID = $("input[name=USER_ID]").val();
        param.CLS_ID = $("input[name=CLS_ID]").val();
        param.CLS_SEQ = $("input[name=CLS_SEQ]").val();
        param.CLS_KIND_CD = $("input[name=CLS_KIND_CD]").val();
        if(param.CLS_KIND_CD == "0002"){
            param.USER_ID = $("input[name=GRP_ID]").val();        	
        }else if(param.CLS_KIND_CD == "0003"){
            param.USER_ID = 0;        	
        }
        param.SRCH_GUBUN = $("input[name=SRCH_GUBUN]").val();
        jsSendInit();
        if(typeof(paramList.get(state)) == "undefined"){
            paramList.put(state, param);
        }
        if(state != "" && paramList.get(state).pPage != ""){
        	jsLoadFile("contentData", "/ContView.kait", paramList.get(state), "jsDraginit");
        }else if(state == ""){
        	jsInitPage();
        	$(".treemenu").hide();
        }
        if($("input[name=SRCH_GUBUN]").val() == "NOT"){
        	$(".treemenu").hide();
        }
    });
});

//div 크기조절
function jsResize(){
/*	$(".archDataBox").css("height", $("body").height()-$(".archDataBox").offset().top-10 + "px");
	$(".conBox").css("height", $("body").height()-$(".archDataBox").offset().top-15 + "px");*/
	$(".archDataBox").css("height", ($("body").height()-$(".archDataBox").offset().top) + "px");
	$(".conBox").css("height", ($("body").height()-$(".archDataBox").offset().top) + "px");
	$(".archiveContents").css("width", $("body").width()-$(".archiveContents").offset().left + "px");
	var scrollWidth = 0;
	if(($(".archiveData").height()+26) > $(".conBox").height()){
		scrollWidth = 13;
	}
	$(".archDataBox").css("width", $(".archiveContents").width()-10 + "px");
	$(".archiveData").css("width", $(".archDataBox").width()-scrollWidth-26 + "px");
}

function jsTreeinit(id, param){

	$("#"+id).dynatree({
	    title: "타이틀",
	    rootVisible: true,
	    persist: false,
	    fx: { height: "toggle", duration: 50 },
	    clickFolderMode: 1,
	    initAjax: {
	        url: "/TreeClsSubLst.kait",
	        dataType: 'json',
	        data: param
	    },
	    onLazyRead: function(dtnode){
	        dtnode.appendAjax({
	            url: "/TreeClsSubLst.kait",
	            dataType: 'json',
	            data: { CLS_P_ID: dtnode.data.id, USER_ID:dtnode.data.userid , CLS_KIND_CD:dtnode.data.clskind},
	            success: function(){
	            	
	            }
	        });
	        
	    },
	    onActivate: function(dtnode) {
//	    	$("#userAtag").text(jsLoadGrpRole());
	    	$(".dBtn01").hide();
	    	$(".dBtn02").hide();
	    	$(".dBtn03").hide();
	    	$(".dBtn04").hide();
	    	var node = dtnode;
//	    	alert(dtnode.data.id);
	    	
	    	globalCurId = id; 
	    		
	    	if(id != "tree_user")
	    	{
	    		curGrprole = jsCurGrpRole();
	    	} 
	    	else
	    	{
	    		curGrprole = "1111";
	    	}	
//	    	alert(dtnode.data.gtitle);
	    	globalClsid = dtnode.data.id;
	    	var $treemenu = $(dtnode.li).children().children("a.treemenu");
            $(".treemenu").hide();
            $(".treemenu").css({
            	"padding" : "0"
            });
        	$treemenu.show();
        	
	    	if(dtnode.data.clskind != "0001"){
	    		if($("#tree_user").dynatree("getActiveNode") != null){
		    		$("#tree_user").dynatree("getActiveNode").deactivate();	    			
	    		}
	    	}
	    	if(dtnode.data.clskind != "0002"){
	    		if($("#tree_group").dynatree("getActiveNode") != null){
		    		$("#tree_group").dynatree("getActiveNode").deactivate();	    			
	    		}
	    	}
	    	if(dtnode.data.clskind != "0003"){
	    		if($("#tree_asset").dynatree("getActiveNode") != null){
		    		$("#tree_asset").dynatree("getActiveNode").deactivate();	    			
	    		}
	    	}
	    	
	    	if(!treeFlag && !treeMoveFlag && !childMoveNonFlag){
        		$(".movespan").remove();
        		$(".brspan").remove();
        		//트리를 클릭하면 매번 다시 로드 되도록 수정 by kdi333 131220.(IF 문 만 막으면 예전 복구)
		    	//if($("input[name=CLS_KIND_CD]").val() != dtnode.data.clskind || $("input[name=CLS_ID]").val() != dtnode.data.id){
		    		$("#loadingDiv").show();
		    		var pActiveTree = null;
		    		if($("input[name=CLS_KIND_CD]").val() == "0001"){
		    			pActiveTree = $("#tree_user").dynatree("getActiveNode");
		    		}else if($("input[name=CLS_KIND_CD]").val() == "0002"){
		    			pActiveTree = $("#tree_group").dynatree("getActiveNode");
		    		}else if($("input[name=CLS_KIND_CD]").val() == "0003"){
		    			pActiveTree = $("#tree_asset").dynatree("getActiveNode");
		    			
		    		}
		    		if(pActiveTree != null && $("input[name=CLS_KIND_CD]").val() != dtnode.data.clskind){
		    			pActiveTree.deactivate();
		    		}
		    		
		            $("input[name=pPage]").val("1");
			    	$("input[name=CLS_SEQ]").val(dtnode.data.seq);
			    	$("input[name=CLS_NM]").val(dtnode.data.gtitle);
			    	$("input[name=CLS_ID]").val(dtnode.data.id);
		            $("input[name=CLS_KIND_CD]").val(dtnode.data.clskind);
		            $("input[name=USER_ID]").val(dtnode.data.userid);
		            $("input[name=SRCH_GUBUN]").val("");
		            $("#AjaxLinkTime").attr("href","#"+new Date().getTime());
		            $("#AjaxLink").click();
			    //}
	    	}else{
	    		$("#"+id).dynatree("getActiveNode").deactivate();
	    	}
    		if(jsLoadUserType() == "0001" && id == "tree_asset"){
    			$(".treemenu").hide();
//    			curGrprole = jsLoadGrpRole();
//    			alert(curGrprole);
    		}
    		if((jsLoadGrpRole() != "0003" || jsLoadGrpRole() == "") && id == "tree_group"){
//    			alert("jsLoadGrpRole : " + jsLoadGrpRole());
    			$(".treemenu").hide();
//    			$("#userAtag").text(jsLoadGrpRole());
    		}
    		
    		var treePath = "";
    		var treeNm = "";
    		$("#upDiv").hide();
    		
    		if (id == "tree_user")
    		{
    			if($("input[name=USER_LOG_ID]").val() == $("input[name=SELECT_ID]").val())
	  			{
    				if($(".dataImgBox_over").length == 0)
    				{
    					$("#excelList").hide();
    				}
    				else
    				{
    					$("#excelList").show();
    				}	
	  			}
    			else
    			{
    				$("#excelList").hide();
    			}	
    			
    			$("#upDiv").show();
    			if($.browser.msie && ($.browser.version == "7.0" || $.browser.version == "8.0" || $.browser.version == "9.0"))
    			{
    				$("#fileDrag").hide();
    			}	
    			
    			treeNm = $(".block:eq("+(blockindex-1)+")").html();
    			$(".block:eq("+(blockindex-1)+")").addClass("hover");
    			
    			$(".block").not(":eq("+(blockindex-1)+")").removeClass("hover");
    		}
    		else if (id == "tree_asset")
    		{
				if($("input[name=USER_TYPE]").val() == "0002" || $("input[name=USER_TYPE]").val() == "0003")
	  			{
					if($(".dataImgBox_over").length == 0)
    				{
    					$("#excelList").hide();
    				}
    				else
    				{
    					$("#excelList").show();
    				}	
	  			}
				else
				{
					$("#excelList").hide();
				}	
				  
    			treeNm = "전체 자산";
    			$(".block:eq("+(blockindex-2)+")").addClass("hover");
    			
    			$(".block").not(":eq("+(blockindex-2)+")").removeClass("hover");
    		}
    		else if (id == "tree_group")
    		{
    			if(jsLoadGrpRole() == "0003")
    			{
    				if($(".dataImgBox_over").length == 0)
    				{
    					$("#excelList").hide();
    				}
    				else
    				{
    					$("#excelList").show();
    				}	
  			  	}
    			else
    			{
    				$("#excelList").hide();
    			}	
    			
    			treeNm = $(".block:eq("+blockindex+")").html();	
    			$(".block:eq("+blockindex+")").addClass("hover");
    			
    			$(".block").not(":eq("+blockindex+")").removeClass("hover");
    		}
    		
    		
            /*while(true)
            {
            	var title = node.data.gtitle;
        		treePath += "||" + title;
            	node = node.getParent();
            	if(node.data.title == null) break;
            }	
            treePath = treePath.substring(2).split("||");
            
        	treeNm = "<span>" + treeNm + "</span>\n";
	    	
	    	for(var iCnt = treePath.length; iCnt > 1; iCnt--){
	    		treeNm += "<span>" + treePath[iCnt-1] + "</span>\n";
	    	}
	    	treeNm += "<span class=\"bold\">" + treePath[0] + "</span>";
	    	
	    	$(".bgHome").html(treeNm);*/
    		
    		$(".bgHome").html(getTreePath(node));
            
//            alert(treePath);
    		
    		childMoveNonFlag = false;
	    	treeFlag = false;
	    },
        onPostInit: function(isReloading, isError) {
            bindContextMenu(id);
        },
        dnd: {        
        	onDragStart: function(node) {
        		$(".dynatree-drag-helper").hide();
        		
        		if(node.getLevel() == 1){
        			return false;
        		}
        		if(jsLoadUserType() == "0001" && id == "tree_asset"){
        			return false;
        		}else if(jsLoadGrpRole() != "0003" && id == "tree_group"){
        			return false;	        			
        		}
        		childMoveOnClickFlag = false;
        		$(".movespan").remove();
        		$(".brspan").remove();
        		$("#dynatree-drop-marker").hide();
	    		$(".treemenu").hide();
			    return true;
			},
			preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
	        onDragOver: function(node, sourceNode, hitMode) {
	        },
	        onDrop: function(node, sourceNode, hitMode, ui, draggable) {
//	        	alert(id);
	        	if(sourceNode == null){
	        		$(node.li).children("a.dynatree-title").css("background-color","");
	        		if(jsLoadUserType() == "0001" && id == "tree_asset"){
	        			alert("자산관리자만 등록가능합니다.");
	        			return;
	        		}else if(jsLoadUserType() != "0003" && (jsLoadGrpRole() == "" || jsLoadGrpRole() == "0001") && id == "tree_group"){
	        			alert("그룹구성원만 등록가능합니다.");
	        			return;	        			
	        		}else if(jsLoadUserType() != "0003" && jsLoadGrpRole() == "0002" && id == "tree_group"){
	        			if($(".selectDiv:not([regid="+jsLoadMyUserId()+"])").length > 0){
	        				alert("자신이 등록한 자료만 이동 가능합니다.\n다음은 이동할수 없습니다.\n"+$(".selectDiv:not([regid="+jsLoadMyUserId()+"])").map(function(){return "- "+$(this).children("div#itemTitle").text();}).get().join("\n"));
	        				return;
	        			}
	        		} 
	        		else if(jsLoadUserType() != "0001" || curGrprole == "1111")
	        		{
	        			if(jsLoadUserType() == "")
	        			{
	        				alert("일반사용자 또는 자료에 대한 접근허용자는 자신의 자료 이외의 자료를 보기만 가능합니다.");
		        			return;
	        			}
//	        			jsSelDiv(node.data,id);
	        		}
	        		else 
	        		{
	        			alert("일반사용자 또는 자료에 대한 접근허용자는 자신의 자료 이외의 자료를 보기만 가능합니다.");
	        			return;
	        		}	
	        		jsSelDiv(node.data,id);
	        	}else{
	        		treeFlag = true;
	        		treeNode.node = node;
	        		treeNode.sourceNode = sourceNode;
	        		childMoveOnClickFlag = true;

	        		$(".movespan").remove();
	        		$(".brspan").remove();
	        		node.deactivate();
	        	}
	        },
	        onDragEnter: function(node, sourceNode) {
	        	if(sourceNode==null){
	        		$(node.li).children().children("a.dynatree-title").css("background-color","#D8F0FA");
	        	}else if(sourceNode != null){
		        	if((node.data.key == sourceNode.data.key && node.data.clskind == sourceNode.data.clskind) || node.data.clskind != sourceNode.data.clskind || node.getLevel() == 1){
		        		$(".movespan").remove();
		        		$(".brspan").remove();
		        		return true;
		        	}
		        	var parentNode = node;
		        	while(true){
		        		parentNode = parentNode.getParent();
		        		if(parentNode == null){
		        			break;
		        		}
		        		if(parentNode == null || parentNode == sourceNode){
		        			$(".movespan").remove();
			        		$(".brspan").remove();
			        		return true;
		        			break;
		        		}
		        	}
	        		if(jsLoadUserType() == "0001" && id == "tree_asset"){
	        			return true;
	        		}else if(jsLoadGrpRole() != "0003" && id == "tree_group"){
	        			return true;	        			
	        		}
		        	var $MoveHelper = "<span class=\"dynatree-icon\"></span><a class=\"moveTitle\" href=\"javascript:;\" onclick=\"jsTreeMove('";
		        	var $MoveHelperEnd = "');\">"+sourceNode.data.title+"</a>"; 
		        	var $NodeHelper = $(node.li).children().first();
		        	$NodeHelper.after("<span class=\"movespan\">"+$MoveHelper+"after"+$MoveHelperEnd+"</span>");
		        	$NodeHelper.after("<span class=\"brspan\"></br></span>");
		        	$NodeHelper.after("<span class=\"movespan child\">"+$MoveHelper+"child"+$MoveHelperEnd+"</span>");
		        	$NodeHelper.before("<span class=\"movespan\">"+$MoveHelper+"before"+$MoveHelperEnd+"</span>");
		        	$NodeHelper.before("<span class=\"brspan\"></br></span>");
		        	$(".movespan").css("opacity","0.5");
		        	$(".movespan").css("padding-left","16px");
		        	$(".child").css("padding-left","0px");
	        		treeNode.node = node;
	        		treeNode.sourceNode = sourceNode;
		        	$(".moveTitle").mouseup(function(){
		        		if(node.data.clskind != sourceNode.data.clskind){
			        		$(".movespan").remove();
			        		$(".brspan").remove();
		        			alert("동일한 분류로만 이동 가능합니다.");
		        			return;
		        		}
		        		eval($(this).attr("onclick"));
		        	});
		            return true;
	        	}
	        },
	        onDragLeave: function(node, sourceNode) {
	        	$(node.li).children().children("a.dynatree-title").css("background-color","");
	        	if(sourceNode != null){
		        	if(!childMoveOnClickFlag){
		        		$(".movespan").remove();
		        		$(".brspan").remove();
		        	}
	        	}
	        }
        }
	});
}

function jsInitPage(){
	
	/*jsTreeinit("tree_user", {CLS_P_ID : 0, CLS_KIND_CD : "0001", USER_ID : $("input[name=USER_ID]").val()});
	jsTreeinit("tree_group", {CLS_P_ID : 0, CLS_KIND_CD : "0002", USER_ID : $("input[name=GROUP_ID]").val()});*/
	
    var param = {};
    
    param.pPage = "1";
    param.USER_ID = "0";
    param.CLS_ID = "1";
    param.CLS_SEQ = "A";            
    param.CLS_KIND_CD = "0003";
    $("#loadingDiv").show();
    jsLoadFile("contentData", "/ContView.kait", param, "jsDraginit");
    location.href = "#";
}

//Drag 초기화 함수
function jsDraginit(){
  $(".dBtn01").hide();
  $(".dBtn02").hide();
  $(".dataImgBox")
  .draggable({
      connectToDynatree:true,
      helper: function(){
          return $("<div id=\"OuterMovePaper\"><div class=\"movePaper\" style=\"display:none;\"><span>"+$(".dataImgBox_over").length+"</span></div></div>");
      },
      start : function(ev, dd){
          if(!selFlag){
              dragFlag = true;
              $(".movePaper").show();
          }
      },
      drag : function(ev, dd){
          if(!selFlag){
              $(".movePaper").css({
                  top: ev.pageY-$("#OuterMovePaper").offset().top + 5,
                  left: ev.pageX-$("#OuterMovePaper").offset().left + 5
              });
          }
      },
      stop : function(ev, dd){
          if(!selFlag){
              $(".movePaper").hide();
          }
          dragFlag = false;
      }
  })
  .dblclick(function(){
      jsContItemView($(this).attr("val"));
  })
  
/*  .click(function(){
      jsContItemView($(this).attr("val"));
  })*/
  .mouseup(function(event){
      if(!dragFlag && $(this).hasClass("dataImgBox_over") && !event.ctrlKey && !event.shiftKey){
          $(".dataImgBox").removeClass("start").removeClass("end").removeClass("dataImgBox_over");
          $(this).addClass("dataImgBox_over").addClass("start");
          
          jsSearchBtnToggle($(".dataImgBox_over").length);
          
      }else{
          dragFlag = false;
      }
  })
  .mousedown(function(event){
      if(!dragFlag && (!$(this).hasClass("dataImgBox_over")||event.ctrlKey||event.shiftKey)){
          if(event.ctrlKey){
              $(".dataImgBox").removeClass("start");
              if($(this).hasClass("dataImgBox_over")){
                  $(this).removeClass("dataImgBox_over");
              }else {
                  $(this).addClass("dataImgBox_over");
              }
              $(this).addClass("start");  
              selFlag = true;
              
              jsSearchBtnToggle($(".dataImgBox_over").length);
  
          }else if(event.shiftKey){
              $(".dataImgBox").removeClass("end");
              $(this).addClass("dataImgBox_over");
              if($(".dataImgBox_over").length == 1){
                  $(".dataImgBox").removeClass("start");
                  $(this).addClass("start"); 
              }else{
                  $(".dataImgBox").removeClass("dataImgBox_over");
                  $(".start").addClass("dataImgBox_over");
                  $(this).addClass("end").addClass("dataImgBox_over");
              }
              var boolCk = false;
              if($(".dataImgBox_over").length != 1){
                  $(".dataImgBox").each(function(){
                      if($(this).hasClass("start") || $(this).hasClass("end")){
                          if(boolCk) boolCk = false;
                          else boolCk = true;
                      }
                      if(boolCk) $(this).addClass("dataImgBox_over");
                  });
              }
              
              jsSearchBtnToggle($(".dataImgBox_over").length);
              
          }else {
              $(".dataImgBox").removeClass("start").removeClass("dataImgBox_over");
              $(this).addClass("dataImgBox_over").addClass("start");
              
              jsSearchBtnToggle($(".dataImgBox_over").length);

          }
      }else{
          dragFlag = false;
      }
  });
  formTrans();
}

function jsSearchBtnToggle(selCount) 
{
	if(selCount >= 2)
	{
	  $(".dBtn01").show();
	  if(globalCurId == "tree_user")
	  {
		  if($("input[name=USER_LOG_ID]").val() == $("input[name=SELECT_ID]").val())
		  {
			  $(".dBtn02").show();
			  $(".dBtn03").show();
			  $(".dBtn04").show();
		  }	  
	  }
	  else if(globalCurId == "tree_asset")
	  {
		  if($("input[name=USER_TYPE]").val() == "0002" || $("input[name=USER_TYPE]").val() == "0003")
		  {
			  $(".dBtn03").show();
			  
		  }	  
	  }
	  else if(globalCurId == "tree_group")
	  {
		  if(jsLoadGrpRole() == "0003")
		  {
			  $(".dBtn03").show();
			  $(".dBtn04").show();
		  }	  
	  }  
	}
	else if(selCount <= 1)
	{
	  $(".dBtn01").hide();
	  $(".dBtn02").hide();
	  $(".dBtn03").hide();
	  $(".dBtn04").hide();
	}	
		
}

//tree 펼치기
function bindContextMenu(name){
	$("#"+name).dynatree("getRoot").visit(function(dtnode){
	    dtnode.expand(true);
	});
	
	return false;
}

//Ajax Append Html
function jsLoadFileAppend(target, url, param, callback) {
  new Ajax.Request(
	    url,
	    {
	        method:'post',
	        timeout:150000,
	        parameters: param,
	        onSuccess: function(response){
	            $('#'+target).append(response.responseText);
	            if(callback != ""){
	            	eval(callback + "();");
	        	}
	            $("#loadingDiv").hide();
	        },
	        onFailure: function(response){
	            alert("fail 532");
	        }
	    });
}

//Ajax Inner Html
function jsLoadFile(target, url, param, callback) {
  new Ajax.Request(
	    url,
	    {
	        method:'post',
	        timeout:150000,
	        parameters: param,
	        onSuccess: function(response){
	            $('#'+target).html(response.responseText);
	            if(callback != ""){
	            	eval(callback + "();");
	        	}
	            $("#loadingDiv").hide();
	        },
	        onFailure: function(response){
	            alert("fail 553");
	            $("#loadingDiv").hide();
	        }
	    });
}

function jsContViewPop(id,filecd) 
{
	hs.htmlExpand(null, {
		objectType : 'iframe',
		src : "/ContItemViewPop.kait?ITEM_ID="+id+"&filecd="+filecd ,
		width: screen.availWidth-200,
		zIndexCounter : '1015',
		outlineType : "",
		align : 'auto',
		creditsPosition : 'center',
		allowSizeReduction : true 
	}); 
	
/*	var leftPx = ($("body").width() - 300) / 2;
    var src = "/ContItemViewPop.kait?ITEM_ID="+id+"&filecd="+filecd;
    var width = screen.availWidth-400;
    var height = $("body").height() - 100;
	$.blockUI({ 
		message: $('<img src="'+src+'"></img>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: ($(window).width() - 400) /2 + 'px',  
			top :  ($(window).height() - 400) /2 + 'px',
			width : width,
			height : height
		}
	});*/
}

function jsViewPDF(id)
{
//	var frm = document.sendform;
//	frm.ITEM_ID = id;
//	frm.action = "/ContPDFViewer.kait";
//	frm.submit();
	hs.htmlExpand(null, {
		objectType : 'iframe',
		src : "/ContPDFViewer.kait?ITEM_ID="+id ,
		width: $("body").width() - 300,
		height :$("body").height() - 50,
		outlineType : "",
		zIndexCounter : '1015',
	}); 
}

function jsLoadUserType(){
	var resultType = "";
	new Ajax.Request(
		"/LogLoadUserType.kait",
		{
		    method:'post',
		    timeout:150000,
		    asynchronous: false,
		    onSuccess: function(response){
		    	resultType = response.responseText;
		    },
		    onFailure: function(response){
		    	location.href = "/j_spring_security_logout";
		    	
		    	
		    }
		});

	return resultType;
}


function jsLoadGrpRole(){
	var resultType = "";
	var param = {};
//	param.USER_ID = $("input[name=USER_ID]").val();
	param.USER_ID = $("input[name=LOG_USER_ID]").val();
	param.GRP_ID = $("input[name=GRP_ID]").val();
	new Ajax.Request(
            "/GrpAccessCk.kait",
            {
                method:'post',
                timeout:150000,
                parameters: param,
    		    asynchronous: false,
                onSuccess: function(response){
    		    	resultType = response.responseText;
                },
                onFailure: function(response){
                	location.href = "/j_spring_security_logout";
                }
            });
	return resultType;
}

function jsCurGrpRole(){
	var resultType = "";
	var param = {};
	param.USER_ID = $("input[name=LOG_USER_ID]").val();
//	alert("gid :: "+gid);
	param.GRP_ID = $("input[name=GRP_ID]").val();
	new Ajax.Request(
            "/GrpAccessCk.kait",
            {
                method:'post',
                timeout:150000,
                parameters: param,
    		    asynchronous: false,
                onSuccess: function(response){
    		    	resultType = response.responseText;
                },
                onFailure: function(response){
                    alert("fail 595");
                }
            });
	return resultType;
}

function jsSelDiv(obj,treeid){
//	alert(treeid);
    var seldivVal = "";
    $(".dataImgBox_over ").each(function(){
    	seldivVal = "," + $(this).attr("val") + seldivVal;
    });
   	seldivVal = seldivVal.substring(1);
   	var confirmStr = "";
    var param = {};
    
    if(treeid == "tree_user")
    {
	    param.USER_ID = obj.userid;
	    param.CLS_ID = obj.id;
	    param.CLS_KIND_CD = obj.clskind;
	    param.ITEM_ID_LST = seldivVal;
	    param.RATING_YN = "n";
	    if(obj.clskind == $("input[name=CLS_KIND_CD]").val() && $("input[name=SRCH_GUBUN]").val() != "NOT"){
	    	param.LINK_GUBUN = "move";
	    	confirmStr = "이동";
	    }else{
	    	param.LINK_GUBUN = "copy";
	    	confirmStr = "복사";
	    }
	    var title = obj.title;
	    title = title.substring(0, title.indexOf("</a>"));
	    if(!confirm("\""+title+"\"에 " + seldivVal + "를 "+confirmStr+"하시겠습니까?")) return;
	    jsLoadFile("resultDiv", "/ContLink.kait", param, "jsReload");
    }
    
    if(treeid == "tree_group")
    {
	    param.USER_ID = obj.userid;
	    param.CLS_ID = obj.id;
	    param.CLS_KIND_CD = obj.clskind;
	    param.ITEM_ID_LST = seldivVal;
	    param.RATING_YN = "n";
	    if(obj.clskind == $("input[name=CLS_KIND_CD]").val() && $("input[name=SRCH_GUBUN]").val() != "NOT"){
	    	param.LINK_GUBUN = "move";
	    	confirmStr = "이동";
	    }else{
	    	param.LINK_GUBUN = "copy";
	    	confirmStr = "복사";
	    }
	    var title = obj.title;
	    title = title.substring(0, title.indexOf("</a>"));
	    if(!confirm("\""+title+"\"에 " + seldivVal + "를 "+confirmStr+"하시겠습니까?")) return;
	    jsLoadFile("resultDiv", "/ContLink.kait", param, "jsReload");
    }
    
    if(treeid == "tree_asset")
    {
    	param.USER_ID = obj.userid;
	    param.CLS_ID = obj.id;
	    param.CLS_KIND_CD = obj.clskind;
	    param.ITEM_ID_LST = seldivVal;
	    param.RATING_YN = "y";
	    if($("input[name=SRCH_GUBUN]").val() == "REQ" && obj.clskind == $("input[name=CLS_KIND_CD]").val())
	    {
	    	param.LINK_GUBUN = "copy";
	    	confirmStr = "복사";
	    }	
	    else if(obj.clskind == $("input[name=CLS_KIND_CD]").val() && $("input[name=SRCH_GUBUN]").val() != "NOT"){
	    	param.LINK_GUBUN = "move";
	    	confirmStr = "이동";
	    }else{
	    	param.LINK_GUBUN = "copy";
	    	confirmStr = "복사";
	    }
	    var title = obj.title;
	    title = title.substring(0, title.indexOf("</a>"));
	    if(!confirm("\""+title+"\"에 " + seldivVal + "를 "+confirmStr+"하시겠습니까?(자산화)"))
	    {
	    	return;
	    }
	    else
	    {
	    	var reval = prompt("자산 평가를 입력해주세요","");
	    	
	    	if(reval == null || reval == " " ||  reval == "")
	    	{
	    		alert("자산평가가 입력 되지 않아서 복사를 취소합니다.");
	    		return;
	    	}	
	    	param.RATING = reval;
	        
	    	
	    	
	    	jsLoadFile("resultDiv", "/ContLink.kait", param, "jsReload");
	    }
	    
    }	
}


function jsTreeMove(hitMode){
	childMoveNonFlag = true;
	if(!confirm("해당위치로 이동하시겠습니까?")){
		return;
	}
	var node = treeNode.node;
	var sourceNode = treeNode.sourceNode;
	var param = {};
	param.pUserId = node.data.userid;
	param.pClsKindCd = node.data.clskind;
	param.pClsId = node.data.id;
	param.pSourceClsId = sourceNode.data.id;
	param.hitMode = hitMode;
	new Ajax.Request(
		    "/TreeMove.kait",
		    {
		        method:'post',
		        timeout:150000,
		        parameters: param,
		        onSuccess: function(response){
		        	if(hitMode == "child" && !node.hasChildren() && node.data.isFolder){
		        		childMoveFlag = true;
		        		node.render();
		        		node.expand(true);
		        		if(!node.hasChildren()){
			        		sourceNode.move(node, hitMode);
		        		}
		        	}else{
		        		if(hitMode == "child"){
			        		node.data.isFolder = true;
			        		node.data.isLazy = true;
			        		var parentNode = sourceNode.getParent();
			        		if(node.hasChildren()){
				        		sourceNode.move(node, hitMode);
			        		}else{
				        		sourceNode.remove();
			        		}
			        		node.expand(true);
			        		if(!parentNode.hasChildren()){
			        			parentNode.data.isFolder = false;
			        			parentNode.data.isLazy = false;
			        		}
		        		}else{
		        			sourceNode.move(node, hitMode);
		        		}
		        	}
	        		$(".movespan").remove();
	        		$(".brspan").remove();
	        		$(".treemenu").hide();
		        },
		        onFailure: function(response){
		            alert("fail 679");
		        }
		    });
}

function startSpinner() {
    var opts = {
        lines: 11, // The number of lines to draw
        length: 25, // The length of each line
        width: 18, // The line thickness
        radius: 45, // The radius of the inner circle
        color: '#EEEEEE', // #rgb or #rrggbb
        speed: 1.6, // Rounds per second
        trail: 88, // Afterglow percentage
        shadow: false// Whether to render a shadow

    };
    var target = document.getElementById('loadingDiv');
    if (spinner == null) {
        spinner = new Spinner(opts).spin(target);
    }
}

function stopSpinner() {
    if (spinner != null) {
        spinner.stop();
        spinner = null;
    }
}

function activeNodeSel(){
    var activeNode = null;
    
    if($("#tree_asset").dynatree("getActiveNode") != null) activeNode = $("#tree_asset").dynatree("getActiveNode");
    if($("#tree_user").dynatree("getActiveNode") != null) activeNode = $("#tree_user").dynatree("getActiveNode");
    if($("#tree_group").dynatree("getActiveNode") != null) activeNode = $("#tree_group").dynatree("getActiveNode");
	return activeNode;
}

function getTreePath(dtnode){
	var treePath = "";
	var treePathNm = "";
	
	if(dtnode.data.clskind == "0001"){
		treePathNm = $(".block:eq("+(blockindex-1)+")").html();
	}else if(dtnode.data.clskind == "0002"){
			var GroupNm = $(".moveTextBox:eq("+($(".moveTextBox").size()-1)+")").children("p").html().split("&gt;");
			treePathNm = GroupNm[GroupNm.length-1];
	}else if(dtnode.data.clskind == "0003"){
		treePathNm = "전체 자산";
	}
	
	while(true){
		var title = dtnode.data.title;
		title = title.substring(0, title.indexOf("</a>"));
		treePath += "||" + title;
		dtnode = dtnode.getParent();
		if(dtnode.data.title == null) break;
	}
	treePath = treePath.substring(2).split("||");
	
	treePathNm = "<span>" + treePathNm + "</span>\n";

	for(var iCnt = treePath.length; iCnt > 1; iCnt--){
		treePathNm += "<span>" + treePath[iCnt-1] + "</span>\n";
	}
	treePathNm += "<span class=\"bold\">" + treePath[0] + "</span>";
	return treePathNm;
}

function jsReload(){
	$(".dbtn03").hide();
	$(".dbtn04").hide();
    $("#loadingDiv").show();
	var state = $.url.attr("anchor");
	jsLoadFile("contentData", "/ContView.kait", paramList.get(state), "jsDraginit");
	unBlock();
}

function unBlock()
{
	$.unblockUI();
}

function jsAdd(obj){
	/*var frm = document.sendform;
	
	hs.htmlExpand(null, { 
	    objectType: 'iframe', 
	    src: '/TreeAdd.kait',
	    width: 720, 
	    headingText: '', 
	    wrapperClassName: 'titlebar', 
	    preserveContent: false
	});*/
	
/*	var leftPx = ($("body").width() - 800) / 2;
    var iframe = $("#logUserFrame");
	iframe.attr("src","/TreeAdd.kait");
	
	iframe.css("height","315px");
	$.blockUI({ 
	message: $("#iframeContainer3"),
	onOverlayClick: $.unblockUI,
	css : {
		left : leftPx+"px",
		top : '30%'
	}
	});*/
	
	var leftPx = ($("body").width() - 800) / 2;
    var src = "/TreeAdd.kait";
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="800px" height="315px"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
			top : '30%'
		}
	});
}

function jsTreeAdd(clsid){

    var activeNode = activeNodeSel();
    var param = {};
    param.USER_ID = activeNode.data.userid;
    param.CLS_KIND_CD = activeNode.data.clskind;
    param.CLS_ID = clsid;
    param.pGubun = "A";
    new Ajax.Request(
            "/TreeAdd.kait",
            {
                method:'post',
                timeout:150000,
                parameters: param,
                onSuccess: function(response){
                    var obj = jQuery.parseJSON(response.responseText);
                    if(activeNode.data.isFolder){
                    	activeNode.reloadChildren(function(node, isOk){
                            if(isOk) node.expand(true);
                        });
                    }else{
                        var childNode = activeNode.addChild({
                            key: obj.key,
                            id: obj.id,
                            userid: obj.userid,
                            clskind: obj.clskind,
                            seq: obj.seq,
                            title: obj.title,
                        });
                        activeNode.data.isFolder = true;
                        activeNode.data.isLazy = true;
                        activeNode.render();
                        activeNode.expand(true);
                    }
                    hs.close();
                },
                onFailure: function(response){
                    alert("fail 805");
                }
            });
}



function jsMod(obj){
//    var frm = document.sendform;
    
/*    hs.overrides.push('onAfterExpand');
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: '/TreeAdd.kait',
        width: 721, 
        onAfterExpand: function(expander) {
            frm.action = "/TreeMod.kait";
            frm.target = expander.iframe.name;
            frm.submit();
        }
    });*/
    var USER_ID = $("input[name=USER_ID]").val();
    var CLS_KIND_CD = $("input[name=CLS_KIND_CD]").val();
    var CLS_ID = $("input[name=CLS_ID]").val();
    
//    var leftPx = ($("body").width() - 800) / 2;
//    var iframe = $("#logUserFrame");
    
/*	iframe.attr("src","/TreeMod.kait?USER_ID="+USER_ID+"&CLS_KIND_CD="+CLS_KIND_CD+"&CLS_ID="+CLS_ID);
	
	iframe.css("height","315px");
	$.blockUI({ 
	message: $("#iframeContainer3"),
	onOverlayClick: $.unblockUI,
	css : {
		left : leftPx+"px",
		top : '30%'
	}
	});*/
	
	var leftPx = ($("body").width() - 800) / 2;
    var src = "/TreeMod.kait?USER_ID="+USER_ID+"&CLS_KIND_CD="+CLS_KIND_CD+"&CLS_ID="+CLS_ID;
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="800px" height="315px"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
			top : '30%'
		}
	});
}

//tree 수정
function jsTreeMod(title){
    var TreeId = "";
    if($("input[name=CLS_KIND_CD]").val() == "0001"){
        TreeId = "tree_user";
    }else if($("input[name=CLS_KIND_CD]").val() == "0002"){
        TreeId = "tree_group";
    }else if($("input[name=CLS_KIND_CD]").val() == "0003"){
        TreeId = "tree_asset";
    }
    var node = $("#"+TreeId).dynatree("getTree").getNodeByKey($("input[name=CLS_ID]").val());
    node.data.title = title + node.data.title.substring(node.data.title.indexOf("</a>"));    
    node.render();
    
    var $treemenu = $(node.li).children().children("a.treemenu");
    $(".treemenu").hide();
    $(".treemenu").css({
        "padding" : "0"
    });
    $treemenu.show();
    
    unBlock();
}

function jsDel(obj){
    var node = activeNodeSel();
    var title = node.data.title.substring(0, node.data.title.indexOf("</a>"));
    
    var param = {};
    param.USER_ID = $("input[name=USER_ID]").val();
    param.CLS_KIND_CD = $("input[name=CLS_KIND_CD]").val();
    param.CLS_SEQ = $("input[name=CLS_SEQ]").val();
    new Ajax.Request(
            "/TreeItemCnt.kait",
            {
                method:'post',
                timeout:150000,
                parameters: param,
                onSuccess: function(response){
                    if(node.getParent().parent == null){
                        alert("최상위 노드는 삭제 할수 없습니다.");
                    }else if(response.responseText == 0){
                        if(!confirm(title + "(을)를 삭제 하시겠습니까?")) return;
                        $(".treemenu").hide();
                        var parantcode = node.getParent();
                        if(parantcode.hasChildren() == 1){
                            parantcode.data.isFolder = false;
                            parantcode.data.isLazy = false;                         
                        } 
                        parantcode.render();
                        node.remove();
                        var frm = document.sendform;
                        frm.action = "/TreeDel.kait";
                        frm.target = "resultFrame";
                        frm.submit();
                        frm.target = "";
                    }else{
                        alert("'" + title + "' 하위에 " + response.responseText + "건의 데이터가 있어 삭제 할수없습니다.");
                    }
                },
                onFailure: function(response){
                    alert("fail 892");
                }
            });
}

//파일업로드 초기화
function setDnDhandler(obj) {
	if(checkDragAndDropAPI()){
	    obj.addEventListener("dragover", function(event) {
	        event.preventDefault();
	        $("#uploadBox").css({
	        	"background":"url(/images/bird/upload.png) no-repeat",
	        	"background-position":"center",
	        	"background-color":"#1D1D1D"
	        });
	    }, true);
	    obj.addEventListener("dragleave", function(event) {
	        event.preventDefault();
	        $("#uploadBox").css({
	        	"background":"",
	        	"background-color":"#1D1D1D"
	        });
	    }, true);
	    obj.addEventListener("drop", function(event) {

	        $("#uploadBox").css({
	        	"background":"",
	        	"background-color":"#1D1D1D"
	        });
	        event.preventDefault();
	        for(var i = 0; i < event.dataTransfer.files.length; ++i){
	        	if(typeof(allTheFiles) == "undefined"){
		        	allTheFiles[0] = event.dataTransfer.files[i];	        		
	        	}else{
		        	allTheFiles[allTheFiles.length] = event.dataTransfer.files[i];	        		
	        	}
	        }
	        jsContUpLoad();
	    }, true);
	}
}


function checkDragAndDropAPI(){
	var oNavigator = $.browser;
	var bSupportDragAndDropAPI = false;
	try{
		if( !oNavigator.msie){
			if(!!oNavigator.safari && oNavigator.version <= 5){
				bSupportDragAndDropAPI = false;
			}else{
				bSupportDragAndDropAPI = true;
			}
		} else {
			if(oNavigator.version >= 10){
				bSupportDragAndDropAPI = true;				
			}else{
				bSupportDragAndDropAPI = false;
			}
		}
	}catch(e){
		bSupportDragAndDropAPI = false;
	}
	return bSupportDragAndDropAPI;
}

function jsLogOut(){
	if(!confirm("로그아웃 하시겠습니까?")) return;
	location.href = "/j_spring_security_logout";
//	location.href = "/LogOut.kait";
}

function jsUploadInit(){
	allTheFiles = null;
    allTheFiles = new Array();
    new Ajax.Request(
        "/ContUploadInit.kait",
        {
            method:'post',
            timeout:150000,
            asynchronous: false,
            onSuccess: function(response){
                $("#contentData").html(response.responseText);
            },
            onFailure: function(response){
                alert("fail 976");
            }
        }); 
}

function jsUpReload(){
	var UpClsId;
	if($("input[name=UpClsId]").val() == null || $("input[name=UpClsId]").val() == undefined)
	{
		UpClsId = 1;
	}
	else
	{
		UpClsId = $("input[name=UpClsId]").val();
	}
    $("#loadingDiv").show();
    $("input[name=pPage]").val("1");
//	$("input[name=CLS_SEQ]").val(jsLoadTreeSeq(UpClsId));
//	$("input[name=CLS_ID]").val(UpClsId);
    $("input[name=CLS_KIND_CD]").val("0001");
    $("input[name=USER_ID]").val(jsLoadMyUserId());
    $("input[name=SRCH_GUBUN]").val("");
    var node = $("#tree_user").dynatree("getTree").getNodeByKey($("input[name=CLS_ID]").val());
	$(".bgHome").html(getTreePath(node));
    $("#AjaxLinkTime").attr("href","#"+new Date().getTime());
    $("#AjaxLink").click();
}

function jsLoadMyUserId(){
    var resultType = "";
    new Ajax.Request(
            "/LoadMyUserId.kait",
            {
                method:'post',
                timeout:150000,
                asynchronous: false,
                onSuccess: function(response){
                    resultType = response.responseText;
                },
                onFailure: function(response){
                    alert("fail 1007");
                }
            });

    return resultType;
}

function jsLoadTreeSeq(clsid){
    var resultType = "";
	var param = {};
	param.CLS_ID = clsid;
    new Ajax.Request(
            "/TreeLoadSeq.kait",
            {
                method:'post',
                timeout:150000,
                parameters: param,
                asynchronous: false,
                onSuccess: function(response){
                    resultType = response.responseText;
                },
                onFailure: function(response){
                    alert("fail 1029");
                }
            });

    return resultType;
}

function jsShareFolderMain(){

		var id = $("input[name=LOG_USER_ID]").val();
		var leftPx = ($("body").width() - 800) / 2;
		var src = "/ShareFolderUserMain.kait?USER_ID="+id;
		$.blockUI({ 
			message: $('<iframe src="'+src+'" width="800px" height="610px"></iframe>'),
			onOverlayClick: $.unblockUI,
			css : {
				left: leftPx+"px",  
			    top : '5%'
			}
		});
	}

function jsSendUserMain(){
	
	var leftPx = ($("body").width() - 800) / 2;
	var src = "/LogUserMain.kait";
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="800px" height="610px"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
		    top : '5%'
		}
	});
}

function jsSendGrpMain(){
	/*
	var frm = document.sendform;
	
    hs.overrides.push('onAfterExpand');
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: '/GrpMain.kait',
        width: 721, 
        headingText: '', 
        wrapperClassName: 'titlebar', 
        preserveContent: false,
        height: 625, 
        objectHeight: 590,
        onAfterExpand: function(expander) {
            
        }
    });
      */
	
    /*var leftPx = ($("body").width() - 800) / 2;
    var iframe = $("#logUserFrame");
	iframe.attr("src","/GrpMain.kait");
	
	iframe.css("height","610px");
	$.blockUI({ 
	message: $("#iframeContainer3"),
	onOverlayClick: $.unblockUI,
	css : {
		left : leftPx+"px",
		top : '5%'
	}
	});*/
	
	var leftPx = ($("body").width() - 800) / 2;
	var src = "/GrpMain.kait";
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="800px" height="610px"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
		    top : '5%'
		}
	});
	
}

function jsShareMain() 
{
	
	var width = $("body").width() - 400;
	
	var leftPx = ($("body").width() - width) / 2;
	
	var height = $("body").height() - 200;
	
	var top = ($("body").height() - height) / 2;
	
	var USER_LOG_ID = $("input[name=LOG_USER_ID]").val();
	
	var src = "/TreeShareMain.kait?USER_ID="+USER_LOG_ID;
	
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="'+width+'" height="'+height+'"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
		    top : top+"px"
		}
	});
}

function jsContItemView(id){
	var frm = document.sendform;
  
	var leftPx = ($("body").width() - 800) / 2;
	
//	$("#frclose").css("left",(leftPx+780)+"px");

	var src = "/ContItemView.kait?ITEM_ID="+id;
	var bheight = $("body").height();
	
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="800px" height="'+bheight+'"px"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
		    top : '0%'
		}
	});
	
	/*$("#iframeContainer").height($("body").height());
	
	var iframe = $("#contViewFrame");
	iframe.attr("src","/ContItemView.kait?ITEM_ID="+id);
	iframe.css("height",$("body").height());
	
	$.blockUI({ 
	message: $("#iframeContainer"),
	onOverlayClick: $.unblockUI,
	css : {
		left : leftPx+"px",
		top : '0%'
	}
	});
	$('.blockOverlay').attr('title','클릭하면 자료조회 창이 닫힙니다.');*/
}				

function jsSendModify(){
	var vallst = "";
	$(".dataImgBox_over").each(function(){
		vallst += "," + $(this).attr("val");
	});
	vallst = vallst.substring(1);

	var leftPx = ($("body").width() - 800) / 2;
	
	var bheight = ($("body").height() - 400) / 2;
	var src = "/ContMultiMod.kait?&ITEM_ID_LST="+vallst;
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="800px" height="400px"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
			top : bheight+"px"
		}
	});
}



function jsSendRequestCancle()
{
	if(!confirm("자산화 요청이  되어있지 않은 자료는 자산화 요청 취소가 되지 않습니다. \n 계속 하시겠습니까?"))
	{
		return;
	}	
	
	if($(".dataImgBox_over").length == 1) {
    	jsContItemView($(".dataImgBox_over").attr("val"),'layer2');
        return;
    }
	
	var vallst = "";
	$(".dataImgBox_over").each(function(){
		vallst += "," + $(this).attr("val");
	});
	vallst = vallst.substring(1);
	
	var param = {};
	param.ITEM_ID_LST = vallst;
	new Ajax.Request(
		    "/ContMultiAssetReqCancle.kait",
		    {
		        method:'post',
		        timeout:150000,
		        parameters: param,
		        onSuccess: function(response){
		        	$.blockUI({ 
		        		message: $('<div style="font-size:15px;" class="growlUI"><h1>*사용자 확인*</h1><h2><br>자산 요청취소가 완료 되었습니다. <br><br>(자산 요청이 되어 있지 않은 <br>자료라면 중복 되어 자산요청 취소 처리되지 않습니다.)</h2></div>'), 
		                fadeIn: 700, 
		                fadeOut: 700, 
		                onOverlayClick: $.unblockUI,
		                onUnblock: function(){ parent.jsReload(); },
//		                timeout: 2000, 
		                showOverlay: true, 
		                centerY: true,
		                centerX: true,
		                css: { 
		                    width: '450px',
		                    height : '100px',
		                    border: 'none', 
		                    padding: '5px', 
		                    backgroundColor: '#000', 
		                    opacity: .8, 
		                    color: '#fff'
		                } 
		        	});
		        },
		        onFailure: function(response){
		        	$.blockUI({ 
		        		message: $('<div style="font-size:15px;" class="growlUI"><h1>*사용자 확인*</h1><h2><br>자산 요청에 실패하였었니다. <br><br>(해당 관리자에게 문의해 주세요.)</h2></div>'), 
		                fadeIn: 700, 
		                fadeOut: 700, 
		                onOverlayClick: $.unblockUI,
//		                timeout: 2000, 
		                showOverlay: true, 
		                centerY: true,
		                centerX: true,
		                css: { 
		                    width: '450px',
		                    height : '100px',
		                    border: 'none', 
		                    padding: '5px', 
		                    backgroundColor: '#000', 
		                    opacity: .8, 
		                    color: '#fff'
		                } 
		        	});
		        }
		    });
}


function jsSendRequest()
{
	if(!confirm("이미 자산화 되어 있는 자료는 자산화 요청 되지 않습니다. \n 계속 하시겠습니까?"))
	{
		return;
	}	
	
	if($(".dataImgBox_over").length == 1) {
    	jsContItemView($(".dataImgBox_over").attr("val"),'layer2');
        return;
    }
	
	var vallst = "";
	$(".dataImgBox_over").each(function(){
		vallst += "," + $(this).attr("val");
	});
	vallst = vallst.substring(1);
	
	var param = {};
	param.ITEM_ID_LST = vallst;
	new Ajax.Request(
		    "/ContMultiAssetReq.kait",
		    {
		        method:'post',
		        timeout:150000,
		        parameters: param,
		        onSuccess: function(response){
		        	$.blockUI({ 
		        		message: $('<div style="font-size:15px;" class="growlUI"><h1>*사용자 확인*</h1><h2><br>자산 요청이 완료 되었습니다. <br><br>(이미 자산화 되어있거나 자산 요청이 처리 된 <br>자료라면 중복 되어 자산요청 처리되지 않습니다.)</h2></div>'), 
		                fadeIn: 700, 
		                fadeOut: 700, 
		                onOverlayClick: $.unblockUI,
		                onUnblock: function(){ parent.jsReload(); },
//		                timeout: 2000, 
		                showOverlay: true, 
		                centerY: true,
		                centerX: true,
		                css: { 
		                    width: '450px',
		                    height : '100px',
		                    border: 'none', 
		                    padding: '5px', 
		                    backgroundColor: '#000', 
		                    opacity: .8, 
		                    color: '#fff'
		                } 
		        	});
		        },
		        onFailure: function(response){
		        	$.blockUI({ 
		        		message: $('<div style="font-size:15px;" class="growlUI"><h1>*사용자 확인*</h1><h2><br>자산 요청에 실패하였었니다. <br><br>(해당 관리자에게 문의해 주세요.)</h2></div>'), 
		                fadeIn: 700, 
		                fadeOut: 700, 
		                onOverlayClick: $.unblockUI,
//		                timeout: 2000, 
		                showOverlay: true, 
		                centerY: true,
		                centerX: true,
		                css: { 
		                    width: '450px',
		                    height : '100px',
		                    border: 'none', 
		                    padding: '5px', 
		                    backgroundColor: '#000', 
		                    opacity: .8, 
		                    color: '#fff'
		                } 
		        	});
		        }
		    });
}

function jsSendView(){
	if($(".dataImgBox_over").length == 0) {
		alert("선택된 자료가 없습니다.");
		return;
	}
    if($(".dataImgBox_over").length == 1) {
    	jsContItemView($(".dataImgBox_over").attr("val"),'layer2');
        return;
    }
	var vallst = "";
	$(".dataImgBox_over").each(function(){
		vallst += "," + $(this).attr("val");
	});
	vallst = vallst.substring(1);
	
    var frm = document.sendform;
    
//    $("#iframeContainer").height($("body").height());
	/*var iframe = $("#contViewFrame");
	var leftPx = ($("body").width() - 800) / 2;
	
//	$("#frclose").css("left",(leftPx+780)+"px");
	
	iframe.attr("src","/ContItemMultiView.kait?ITEM_ID="+0+"&ITEM_ID_LST="+vallst+"&MOV_ITEM_ID_LST="+vallst);
	
	$.blockUI({ 
		message: $("#iframeContainer"),
		onOverlayClick: $.unblockUI,
		css : {
			top : '0%',
			left : leftPx+"px"
		}
	});*/
    
	
	var leftPx = ($("body").width() - 800) / 2;
	
	var bheight = $("body").height();
	var src = "/ContItemMultiView.kait?ITEM_ID="+0+"&ITEM_ID_LST="+vallst+"&MOV_ITEM_ID_LST="+vallst;
	$.blockUI({ 
		message: $('<iframe src="'+src+'" width="800px" height="'+bheight+'"px"></iframe>'),
		onOverlayClick: $.unblockUI,
		css : {
			left: leftPx+"px",  
			top : '0%'
		}
	});
	
	frm.MultiGubun.value = "";
	
	
	
   /* alert(vallst);
    
    hs.overrides.push('onAfterExpand');
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: 'about:blank',
        width: 721, 
        headingText: '', 
        wrapperClassName: 'titlebar', 
        preserveContent: false,
        height: 700, 
        objectHeight: 665,
        onAfterExpand: function(expander) {
            frm.ITEM_ID.value = 0;
            frm.ITEM_ID_LST.value = vallst;
            frm.action = "/ContItemMultiView.kait";
            frm.target = expander.iframe.name;
            frm.submit();
            frm.MultiGubun.value = "";
        }
    });
	*/
}

function jsShareSel(id,clspid,clsid) 
{
	$("#tree_user").dynatree("destroy");
	
	$("#tree_user").dynatree({
	    title: "타이틀",
	    rootVisible: false,
	    persist: false,
//	    className : {connector: "dynatree-connector"},
	    fx: { height: "toggle", duration: 50 },
	    clickFolderMode: 1,
	    initAjax: {
	    	 url: "/TreeShareCls.kait",
	         dataType: 'json',
	         data: { CLS_P_ID: clspid, USER_ID:id , CLS_ID:clsid},
	    },
	    onActivate: function(dtnode) {
	    	
	    	$(".dBtn01").hide();
	    	$(".dBtn02").hide();
	    	$(".dBtn03").hide();
	    	$(".dBtn04").hide();
	    	
	    	globalCurId = id; 
	    		
	    	if(id != "tree_user")
	    	{
	    		curGrprole = jsCurGrpRole();
	    	} 
	    	else
	    	{
	    		curGrprole = "1111";
	    	}	
	    	
	    	globalClsid = dtnode.data.id;
	    	var $treemenu = $(dtnode.li).children().children("a.treemenu");
            $(".treemenu").hide();
            $(".treemenu").css({
            	"padding" : "0"
            });
//        	$treemenu.show();
        	
	    	if(dtnode.data.clskind != "0001"){
	    		if($("#tree_user").dynatree("getActiveNode") != null){
		    		$("#tree_user").dynatree("getActiveNode").deactivate();	    			
	    		}
	    	}
	    	if(dtnode.data.clskind != "0002"){
	    		if($("#tree_group").dynatree("getActiveNode") != null){
		    		$("#tree_group").dynatree("getActiveNode").deactivate();	    			
	    		}
	    	}
	    	if(dtnode.data.clskind != "0003"){
	    		if($("#tree_asset").dynatree("getActiveNode") != null){
		    		$("#tree_asset").dynatree("getActiveNode").deactivate();	    			
	    		}
	    	}
	    	
	    	if(!treeFlag && !treeMoveFlag && !childMoveNonFlag){
        		$(".movespan").remove();
        		$(".brspan").remove();
        		//트리를 클릭하면 매번 다시 로드 되도록 수정 by kdi333 131220.(IF 문 만 막으면 예전 복구)
		    	//if($("input[name=CLS_KIND_CD]").val() != dtnode.data.clskind || $("input[name=CLS_ID]").val() != dtnode.data.id){
		    		$("#loadingDiv").show();
		    		var pActiveTree = null;
		    		if($("input[name=CLS_KIND_CD]").val() == "0001"){
		    			pActiveTree = $("#tree_user").dynatree("getActiveNode");
		    		}else if($("input[name=CLS_KIND_CD]").val() == "0002"){
		    			pActiveTree = $("#tree_group").dynatree("getActiveNode");
		    		}else if($("input[name=CLS_KIND_CD]").val() == "0003"){
		    			pActiveTree = $("#tree_asset").dynatree("getActiveNode");
		    		}
		    		if(pActiveTree != null && $("input[name=CLS_KIND_CD]").val() != dtnode.data.clskind){
		    			pActiveTree.deactivate();
		    		}
		    		
		            $("input[name=pPage]").val("1");
			    	$("input[name=CLS_SEQ]").val(dtnode.data.seq);
			    	$("input[name=CLS_ID]").val(dtnode.data.id);
		            $("input[name=CLS_KIND_CD]").val(dtnode.data.clskind);
		            $("input[name=USER_ID]").val(dtnode.data.userid);
		            $("input[name=SRCH_GUBUN]").val("");
		            $("#AjaxLinkTime").attr("href","#"+new Date().getTime());
		            $("#AjaxLink").click();
			    //}
	    	}else{
	    		$("#tree_user").dynatree("getActiveNode").deactivate();
	    	}
    		
    		var treePath = "";
    		var treeNm = "";
    		$("#upDiv").hide();
    		
			treeNm = $(".block:eq("+(blockindex-1)+")").html();
			$(".block:eq("+(blockindex-1)+")").addClass("hover");
			$(".block").not(":eq("+(blockindex-1)+")").removeClass("hover");
    		
            /*while(true)
            {
            	var title = node.data.gtitle;
        		treePath += "||" + title;
            	node = node.getParent();
            	if(node.data.title == null) break;
            }	
            treePath = treePath.substring(2).split("||");
            
        	treeNm = "<span>" + treeNm + "</span>\n";
	    	
	    	for(var iCnt = treePath.length; iCnt > 1; iCnt--){
	    		treeNm += "<span>" + treePath[iCnt-1] + "</span>\n";
	    	}
	    	treeNm += "<span class=\"bold\">" + treePath[0] + "</span>";
	    	
	    	$(".bgHome").html(treeNm);*/
    		
//    		$(".bgHome").html(getTreePath(node));
            
//            alert(treePath);
    		
    		childMoveNonFlag = false;
	    	treeFlag = false;
	    }
	    });

}

function jsUserSel(id){
    $("#tree_user").dynatree("destroy");
    jsTreeinit("tree_user", {CLS_P_ID : 0, CLS_KIND_CD : "0001", USER_ID : id});
}

function jsGrpSel(id){
    $("#tree_group").dynatree("destroy");
    jsTreeinit("tree_group", {CLS_P_ID : 0, CLS_KIND_CD : "0002", USER_ID : id});
    unBlock();
}

function jsNotClsItem(){
	globalCurId = "tree_notCls";
	$(".dBtn01").hide();
	$(".dBtn02").hide();
	$(".dBtn03").hide();
	$(".dBtn04").hide();
	$("#excelList").show();
	$("#upDiv").hide();
	
	$(".block:eq(0)").addClass("hover");
	$(".block").not(":eq(0)").removeClass("hover");
	
	$(".bgHome").html("<span class='bold'>미분류 자산</span>");
	$(".bgHome > span").css("background","none");
	
	$("#dellink").hide();
    $("#loadingDiv").show();
    $("input[name=pPage]").val("1");
    $("input[name=CLS_SEQ]").val("A");
    $("input[name=CLS_ID]").val("1");
    $("input[name=SRCH_GUBUN]").val("NOT");
    $("#AjaxLinkTime").attr("href","#"+new Date().getTime());
    $("#AjaxLink").click();
}

function jsAssetReqItem() {
	globalCurId = "tree_AstReq";
	$(".dBtn01").hide();
	$(".dBtn02").hide();
	$(".dBtn03").hide();
	$(".dBtn04").hide();
	$("#upDiv").hide();
	$("#excelList").show();
	
	$(".block:eq(1)").addClass("hover");
	$(".block").not(":eq(1)").removeClass("hover");
	
	$(".bgHome").html("<span class='bold'>요청 자산</span>");
	$(".bgHome > span").css("background","none");
	
	$("input[name=SRCH_GUBUN]").val("REQ");
	$("input[name=pPage]").val("1");
		
	$("#AjaxLinkTime").attr("href","#"+new Date().getTime());
	$("#AjaxLink").click();
//	jsLoadFile("contentData", "/ContAstReqView.kait", param, "jsDraginit");
}

function formChanger(val) 
{
	var param = {};
	param.VIEW_TYPE = val;
	param.USER_ID = $("input[name=LOG_USER_ID]").val();
	param.USER_LOG_ID = $("input[name=USER_LOG_ID]").val();
	 new Ajax.Request(
		        "/updateViewtype.kait",
		        {
		            method:'post',
		            timeout:150000,
	                parameters: param,
	                asynchronous: false,
		            onSuccess: function(response){
		                $("input[name='VIEW_TYPE_MAIN']").val(val);
		                jsReload();
		            }
		        }); 
}