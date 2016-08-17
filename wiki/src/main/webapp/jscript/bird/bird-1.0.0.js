/*!
 * bird Default JavaScript v1.0.0
 */

var spinner = null;
var treeFlag = false;
var treeMoveFlag = false;
var childMoveOnClickFlag = false;
var childMoveFlag = false;
var childMoveNonFlag = false;
var dragFlag = false;
var selFlag = false;
var divCnt = 0;
var paramList = new Map();
var treeNode = new Map();
var allTheFiles = new Array();
var mousePosition = {};

$(function(){
	//윈도우 이벤트
    $(window)
	    .resize(function(){
	    	jsResize();
	    })
	    .keyup(function(event){
	        selFlag = false;
	    })
	    .keydown(function(event){
	        var code = (event.keyCode?event.keyCode:event.which);
	        if(code == 38){
	            var nDiv = $(".end").length > 0 ? $(".end"):$(".start");
	            if(typeof(nDiv.prev().html()) != "undefined"){
	                $(".imgdiv").removeClass("start").removeClass("end").removeClass("selectDiv").addClass("aaa");
	                nDiv.prev().addClass("selectDiv").addClass("start").removeClass("unselectDiv");
	            }
	        }else if(code == 40){
	            var nDiv = $(".end").length > 0 ? $(".end"):$(".start");
	            if(typeof(nDiv.next().html()) != "undefined"){
	                $(".imgdiv").removeClass("start").removeClass("end").removeClass("selectDiv").addClass("unselectDiv");
	                nDiv.next().addClass("selectDiv").addClass("start").removeClass("unselectDiv");
	            }
	        }
	        selFlag = true;
	    });
    
    $("body")
		.keypress(function(e){
			var charCode = (e.which)? e.which : window.event.keyCode;
	    	if(charCode == 27){
	    		$("#TreeMenu").hide();
		        $(".movespan").remove();
	    		$(".brspan").remove();
	        }
	    });
    
    //onload 후 실행
    $(document).ready(function(){
    	jsResize("init");
    	//setDnDhandler($("#content")[0]);
    	
    	jsTreeinit("tree_asset", {CLS_P_ID : 0, CLS_KIND_CD : "0003"});
    	jsTreeinit("tree_user", {CLS_P_ID : 0, CLS_KIND_CD : "0001", USER_ID : $("input[name=USER_ID]").val()});
    	jsTreeinit("tree_group", {CLS_P_ID : 0, CLS_KIND_CD : "0002", USER_ID : $("input[name=GROUP_ID]").val()});
    	jsInitPage();
    	startSpinner();
    });
    
    $.History.bind(function(state){
        var param = {};

        param.pPage = $("input[name=pPage]").val();
        param.USER_ID = $("input[name=USER_ID]").val();
        param.CLS_ID = $("input[name=CLS_ID]").val();
        param.CLS_SEQ = $("input[name=CLS_SEQ]").val();
        param.CLS_KIND_CD = $("input[name=CLS_KIND_CD]").val();
        param.SRCH_GUBUN = $("input[name=SRCH_GUBUN]").val();
        if(typeof(paramList.get(state)) == "undefined"){
            paramList.put(state, param);
        }
        
        if(state != "" && paramList.get(state).pPage != ""){
        	jsLoadFile("content", "/ContView.kait", paramList.get(state), "jsDraginit");
            jsSetContBorder(paramList.get(state).CLS_KIND_CD);
            if(paramList.get(state).CLS_KIND_CD == "0003"){
                $("#tree_asset").dynatree("getTree").getNodeByKey(paramList.get(state).CLS_ID).activate();
            }
            var ActiveNode = $(".dynatree-active").children(".dynatree-title");
            $("#TreeMenu").css({
                top : ActiveNode.offset().top,
                left : ActiveNode.offset().left + ActiveNode.width() + 10
            });
        }else if(state == ""){
        	jsInitPage();
        	$("#TreeMenu").hide();
        }
        if($("input[name=SRCH_GUBUN]").val() == "NOT"){
        	$("#TreeMenu").hide();
        }
    });
    
    $('#content').scroll(function() {
    	if(($('#content').scrollTop()+$('#content').height())==$('#content')[0].scrollHeight){
    		var param = {};
    		if($(hs.getExpander()).attr("src") == "/SrchMain.kait"){
    			alert("검색 조건 있음");
    		}
    		$("input[name=pPage]").val(parseInt($("input[name=pPage]").val())+1);
            param.pPage = $("input[name=pPage]").val();
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
            jsLoadFileAppend("content", "/ContView.kait", param, "jsDraginit");
    	}
    });
    
    $(document).bind('mousemove',function(e){ 
    	mousePosition.x = e.pageX;
    	mousePosition.y = e.pageY; 
    }); 
});

//div 크기조절
function jsResize(init){
    var mainHeight = $("body").height(); 
    var minHeight = 700;
    var scrollHeight = 17;
    if(mainHeight > 700){
	    $("#container").css("height",mainHeight-$("#top").height()+"px");
	    $("#left").css("height",mainHeight-$("#top").height()+"px");
	    $("#content").css("height",mainHeight-$("#top").height()-$("#srch").height()-6+"px");
    }else{
        $("#container").css("height","700px");
        $("#left").css("height","700px");
	    $("#content").css("height","594px");
    }
    if($("#main").width() < 1141){
    	$("#right").css("width","835px");
    	$("#top").css("width","1141px");
    	if(init == "init"){
	        $("#container").css("height",$("#container").height()-scrollHeight+"px");
	        $("#left").css("height",$("#left").height()-scrollHeight+"px");
		    $("#content").css("height",$("#content").height()-scrollHeight+"px");
    	}
    }else{
        $("#right").css("width","");
        $("#top").css("width","");    	
    }
    setTreeBorder();

    var ActiveNode = $(".dynatree-active").children(".dynatree-title");
    if(typeof(ActiveNode.offset()) != "undefined"){
    	$("#TreeMenu").css({
			top : ActiveNode.offset().top,
			left : ActiveNode.offset().left + ActiveNode.width() + 10
		});
    }

	$(".movespan").remove();
	$(".brspan").remove();
	var node = treeNode.get("node");
	if(typeof(node) != "undefined"){
		node.li.style.paddingTop = "0px";
		node.li.style.paddingBottom = "0px";
	}
}

//Drag 초기화 함수
function jsDraginit(){
	$(".imgdiv").shadow()
	.draggable({
		connectToDynatree:true,
		helper: function(){
			return $("<div id=\"MoveData\"><div id=\"MoveData2\"><br/>"+$(".selectDiv").length+"</div></div>");
		},
	    start : function(ev, dd){
	        if(!selFlag){
	            dragFlag = true;
	            $("#MoveData").show();
		        $(".movespan").remove();
	    		$(".brspan").remove();
	        }
	    },
	    drag : function(ev, dd){
	        if(!selFlag){
	        	$("#MoveData2").css({
	        		top: ev.pageY-$("#MoveData").offset().top + 5,
	                left: ev.pageX-$("#MoveData").offset().left + 5
	        	});
	        }
	    },
	    stop : function(ev, dd){
	        if(!selFlag){
	        	$("#MoveData").hide();
	        }
	        dragFlag = false;
	    }
	})
    .dblclick(function(){
    	jsContItemView($(this).attr("val"));
    })
    .mouseup(function(event){
        if(!dragFlag && $(this).hasClass("selectDiv") && !event.ctrlKey && !event.shiftKey){
            $(".imgdiv").removeClass("start").removeClass("end").removeClass("selectDiv").addClass("unselectDiv");
            $(this).removeClass("unselectDiv").addClass("selectDiv").addClass("start");
        }else{
            dragFlag = false;
        }
        $(".unselectDiv").removeClass('jquery-shadow-raised');
        $(".selectDiv").shadow('raised');
    })
    .mousedown(function(event){
        if(!dragFlag && (!$(this).hasClass("selectDiv")||event.ctrlKey||event.shiftKey)){
            if(event.ctrlKey){
                $(".imgdiv").removeClass("start");
                if($(this).hasClass("unselectDiv")){
                    $(this).removeClass("unselectDiv").addClass("selectDiv");
                }else if($(this).hasClass("selectDiv")){
                    $(this).removeClass("selectDiv").addClass("unselectDiv");
                }
                $(this).addClass("start");  
                selFlag = true;
            }else if(event.shiftKey){
                $(".imgdiv").removeClass("end");
                $(this).addClass("selectDiv");
                if($(".selectDiv").length == 1){
                    $(".imgdiv").removeClass("start");
                    $(this).addClass("start"); 
                }else{
                    $(".imgdiv").addClass("unselectDiv").removeClass("selectDiv");
                    $(".start").addClass("selectDiv");
                    $(this).removeClass("unselectDiv").addClass("end").addClass("selectDiv");
                }
                var boolCk = false;
                if($(".selectDiv").length != 1){
                    $(".imgdiv").each(function(){
                        if($(this).hasClass("start") || $(this).hasClass("end")){
                            if(boolCk) boolCk = false;
                            else boolCk = true;
                        }
                        if(boolCk) $(this).removeClass("unselectDiv").addClass("selectDiv");
                    });
                }
            }else if($(this).hasClass("unselectDiv") || $(this).hasClass("selectDiv")){
                $(".imgdiv").removeClass("start").removeClass("selectDiv").addClass("unselectDiv");
                $(this).addClass("selectDiv").addClass("start");
            }
        }else{
            dragFlag = false;
        }
        $(".unselectDiv").removeClass('jquery-shadow-raised');
        $(".selectDiv").shadow('raised');
    });
}

//Drop 초기화 함수
function jsDropinit(id){
    $('.drop' + id+ ' a.dynatree-title')
        .drop("start",function(){
            if(!selFlag){
            	$(this).addClass("selectNote");
            }
        })
        .drop("end",function(){
            if(!selFlag){
            	$(this).removeClass("selectNote");
            }
        })
        .drop("drop",function(){
            if(!selFlag){
            	divCnt++;
                jsSelDiv(divCnt, $(this));
            }
        });
    
    $.drop({ mode:true });
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
	            alert("fail");
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
	            alert("fail");
	        }
	    });
}

//파일업로드 초기화
function setDnDhandler(obj) {
	if(checkDragAndDropAPI()){
	    obj.addEventListener("dragover", function(event) {
	        event.preventDefault();
	    }, false);
	    obj.addEventListener("drop", function(event) {
	        event.preventDefault();
	        for(var i = 0; i < event.dataTransfer.files.length; ++i){
	        	if(typeof(allTheFiles) == "undefined"){
		        	allTheFiles[0] = event.dataTransfer.files[i];	        		
	        	}else{
		        	allTheFiles[allTheFiles.length] = event.dataTransfer.files[i];	        		
	        	}
	        }
	        jsContUpLoad();
	    }, false);
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

//Tree 테두리 설정
function setTreeBorder(){
	var setTreeWidth = $("#tree_asset").width()-6;
    var setTreeHeight = $("#tree_asset").height()-6;
    $("#tree_asset ul.dynatree-container").css("width",setTreeWidth+"px");
    $("#tree_asset ul.dynatree-container").css("height",setTreeHeight+"px");
    $("#tree_asset ul.dynatree-container").css("border","3px solid #66FF66");
    $("#tree_user ul.dynatree-container").css("width",setTreeWidth+"px");
    $("#tree_user ul.dynatree-container").css("height",setTreeHeight+"px");
    $("#tree_user ul.dynatree-container").css("border","3px solid #0000FF");
    $("#tree_group ul.dynatree-container").css("width",setTreeWidth+"px");
    $("#tree_group ul.dynatree-container").css("height",setTreeHeight+"px");
    $("#tree_group ul.dynatree-container").css("border","3px solid #FF9900");
}

//Tree 테두리 초기화
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
	        // typically we would call something like this:
	        // ... but in this sample we just simulate the behaviour:           
	        dtnode.appendAjax({
	            url: "/TreeClsSubLst.kait",
	            dataType: 'json',
	            data: { CLS_P_ID: dtnode.data.id, USER_ID:dtnode.data.userid , CLS_KIND_CD:dtnode.data.clskind},
	            success: function(){
	            	if(childMoveFlag){
	            		var node = treeNode.get("node");
	            		var sourceNode = treeNode.get("sourceNode");
	            		sourceNode.remove();
	            		childMoveFlag = false;
	            	}
	            }
	        });
	    },
	    onClick: function(dtnode) {
	    	if(typeof($("span.dynatree-expander:hover").offset()) != "undefined"){
	    		$("#TreeMenu").hide();
	    	}
	    	if(!childMoveOnClickFlag && !treeMoveFlag){
        		$(".movespan").remove();
        		$(".brspan").remove();
	    	}
	    	childMoveOnClickFlag = false;
	    },
	    onActivate: function(dtnode) {
	    	if(!treeFlag && !treeMoveFlag && !childMoveNonFlag){
        		$(".movespan").remove();
        		$(".brspan").remove();
		    	if(typeof($("span.dynatree-expander:hover").offset()) != "undefined"){
		    		$("#TreeMenu").hide();
		    	}else if($("input[name=CLS_KIND_CD]").val() != dtnode.data.clskind || $("input[name=CLS_ID]").val() != dtnode.data.id){
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
			    }
		    	if(typeof($("span.dynatree-expander:hover").offset()) != "undefined"){
		    		$("#TreeMenu").hide();
		    	}else{
			    	var ActiveNode = $(".dynatree-active").children(".dynatree-title");
			    	$("#TreeMenu").hide();
			    	$("#TreeMenu").css({
			    		top : ActiveNode.offset().top,
			    		left : ActiveNode.offset().left + ActiveNode.width() + 10
			    	});
			    	if($("#"+id).offset().top-3 < ActiveNode.offset().top) $("#TreeMenu").show();
		    	}
	    		treeMoveFlag = false;
	    	}else{
	    		$("#"+id).dynatree("getActiveNode").deactivate();
	    	}
    		if(jsLoadUserType() == "0001" && id == "tree_asset"){
    			$("#TreeMenu").hide();
    		}
    		if(jsLoadGrpRole() != "0003" && id == "tree_group"){
    			$("#TreeMenu").hide();
    		}
    		childMoveNonFlag = false;
	    	treeFlag = false;
	    },
        onPostInit: function(isReloading, isError) {
            bindContextMenu(id);
        	$("#" + id +  " ul.dynatree-container").scroll(function() {
        		if($("#"+id).offset().top + $("#"+id).height() > $("#TreeMenu").offset().top && $("#"+id).offset().top < $("#TreeMenu").offset().top){
                	$("#TreeMenu").hide();
        		}
            });
        	jsInitTreeMenu(id);
        	setTreeBorder();
        },
        dnd: {        
        	onDragStart: function(node) {
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
	    		$("#TreeMenu").hide();
			    return true;
			},
	        preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
	        onDragOver: function(node, sourceNode, hitMode) {
	        },
	        onDrop: function(node, sourceNode, hitMode, ui, draggable) {
	        	
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
	        		jsSelDiv(node.data);
	        	}else{
	        		treeFlag = true;
	        		treeNode.put("node", node);
	        		treeNode.put("sourceNode", sourceNode);
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
	        		treeNode.put("node", node);
	        		treeNode.put("sourceNode", sourceNode);
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

function jsTreeMove(hitMode){
	childMoveNonFlag = true;
	if(!confirm("해당위치로 이동하시겠습니까?")){
		return;
	}
	var node = treeNode.get("node");
	var sourceNode = treeNode.get("sourceNode");
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
	        		$("#TreeMenu").hide();
		        },
		        onFailure: function(response){
		            alert("fail");
		        }
		    });
}

//Tree 선택함수 (사용자, 그룹)
function jsTreeSel(sel){
	var ActiveNode;
	if(sel == 'user'){
		$("#tree_group").hide();
		ActiveNode = $("#tree_group").dynatree("getActiveNode");
		$("#tree_user").show();
	}else if(sel == 'group'){
		$("#tree_user").hide();
		ActiveNode = $("#tree_user").dynatree("getActiveNode");
		$("#tree_group").show();
	}
	if(ActiveNode != null){
		ActiveNode.deactivate();
	}
	$("#TreeMenu").hide();

	$(".movespan").remove();
	$(".brspan").remove();
}

//tree 펼치기
function bindContextMenu(name){
	$("#"+name).dynatree("getRoot").visit(function(dtnode){
      dtnode.expand(true);
  });
  return false;
}

//tree 추가
function jsTreeAdd(CLS_ID){
    var TreeId = "";
    if($("input[name=CLS_KIND_CD]").val() == "0001"){
        TreeId = "tree_user";
    }else if($("input[name=CLS_KIND_CD]").val() == "0002"){
        TreeId = "tree_group";
    }else if($("input[name=CLS_KIND_CD]").val() == "0003"){
        TreeId = "tree_asset";
    }
    var node = $("#"+TreeId).dynatree("getTree").getNodeByKey($("input[name=CLS_ID]").val());
    var param = {};
    param.USER_ID = $("input[name=USER_ID]").val();
    param.CLS_KIND_CD = $("input[name=CLS_KIND_CD]").val();
    param.CLS_ID = CLS_ID;
    param.pGubun = "A";
    new Ajax.Request(
            "/TreeAdd.kait",
            {
                method:'post',
                timeout:150000,
                parameters: param,
                onSuccess: function(response){
                    var obj = jQuery.parseJSON(response.responseText);
                    if(node.data.isFolder){
                    	node.reloadChildren(function(node, isOk){
                        	if(isOk) node.expand(true);
                        });
                    }else{
                        var childNode = node.addChild({
                            key: obj.key,
                            id: obj.id,
                            userid: obj.userid,
                            clskind: obj.clskind,
                            seq: obj.seq,
                            title: obj.title,
                        });
                        node.data.isFolder = true;
                        node.data.isLazy = true;
                        node.render();
                        node.expand(true);
                    }
                    hs.close();
                },
                onFailure: function(response){
                    alert("fail");
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
	node.data.title = title;
	node.render();
	var ActiveNode = $(".dynatree-active").children(".dynatree-title");                          
	$("#TreeMenu").css({
	    left : ActiveNode.offset().left + ActiveNode.width() + 10
	});
	hs.close();
}

//Content Div 테두리 설정
function jsSetContBorder(kindcd){
	if(kindcd == "0001"){
        $("#right").css("border","3px solid #0000FF");
    }else if(kindcd == "0002"){
        $("#right").css("border","3px solid #FF9900");
    }else if(kindcd == "0003"){
        $("#right").css("border","3px solid #66FF66");
    }
}



function jsSelDiv(obj){
    var seldivVal = "";
    $(".selectDiv").each(function(){
    	seldivVal = "," + $(this).attr("val") + seldivVal;
    });
   	seldivVal = seldivVal.substring(1);
   	var confirmStr = "";
    var param = {};
    param.USER_ID = obj.userid;
    param.CLS_ID = obj.id;
    param.CLS_KIND_CD = obj.clskind;
    param.ITEM_ID_LST = seldivVal;
    if(obj.clskind == $("input[name=CLS_KIND_CD]").val() && $("input[name=SRCH_GUBUN]").val() != "NOT"){
    	param.LINK_GUBUN = "move";
    	confirmStr = "이동";
    }else{
    	param.LINK_GUBUN = "copy";
    	confirmStr = "복사";
    }
    
    if(!confirm("\""+obj.title+"\"에 " + seldivVal + "를 "+confirmStr+"하시겠습니까?")) return;
    jsLoadFile("resultDiv", "/ContLink.kait", param, "");
}

function jsInitPage(){
    var param = {};
    
    param.pPage = "1";
    param.USER_ID = "0";
    param.CLS_ID = "1";
    param.CLS_SEQ = "A";            
    param.CLS_KIND_CD = "0003";
    $("#loadingDiv").show();
    jsLoadFile("content", "/ContView.kait", param, "jsDraginit");
    jsSetContBorder(param.CLS_KIND_CD);
    location.href = "#";
}

function jsContUpLoad(){    
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: '/ContUploadPop.kait',
        width: 720, 
        headingText: '', 
        wrapperClassName: 'titlebar', 
        preserveContent: false
    });
}

function jsClsAdd(){
    var frm = document.sendform;
    
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: '/TreeAdd.kait',
        width: 720, 
        headingText: '', 
        wrapperClassName: 'titlebar', 
        preserveContent: false
    });
}

function jsClsMod(){
    var frm = document.sendform;
    
	hs.overrides.push('onAfterExpand');
	hs.htmlExpand(null, { 
		objectType: 'iframe', 
		src: '/TreeAdd.kait',
		width: 720, 
		headingText: '', 
		wrapperClassName: 'titlebar', 
		preserveContent: false,
		onAfterExpand: function(expander) {
			frm.action = "/TreeMod.kait";
			frm.target = expander.iframe.name;
			frm.submit();
	    }
	});
}

function jsClsDel(){
	var TreeId = "";
    if($("input[name=CLS_KIND_CD]").val() == "0001"){
        TreeId = "tree_user";
    }else if($("input[name=CLS_KIND_CD]").val() == "0002"){
        TreeId = "tree_group";
    }else if($("input[name=CLS_KIND_CD]").val() == "0003"){
        TreeId = "tree_asset";
    }
    var node = $("#"+TreeId).dynatree("getTree").getNodeByKey($("input[name=CLS_ID]").val());
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
	                    if(!confirm(node.data.title + "(을)를 삭제 하시겠습니까?")) return;
	                    $("#TreeMenu").hide();
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
                    	alert(node.data.title + " 하위에 " + response.responseText + "건의 데이터가 있어 삭제 할수없습니다.");
                    }
                },
                onFailure: function(response){
                    alert("fail");
                }
            });
}

function jsContItemView(id){
	var frm = document.sendform;
    
	hs.overrides.push('onAfterExpand');
	hs.htmlExpand(null, { 
		objectType: 'iframe', 
		src: 'about:blank',
		width: 720, 
		headingText: '', 
		wrapperClassName: 'titlebar', 
		preserveContent: false,
		height: 700, 
		objectHeight: 665,
		onAfterExpand: function(expander) {
			frm.ITEM_ID.value = id;
			frm.action = "/ContItemView.kait";
			frm.target = expander.iframe.name;
			frm.submit();
	    }
	});
}
function jsSendView(){
	if($(".selectDiv").length == 0) {
		alert("선택된 자료가 없습니다.");
		return;
	}
    if($(".selectDiv").length == 1) {
        jsContItemView($(".selectDiv").attr("val"));
        return;
    }
	var vallst = "";
	$(".selectDiv").each(function(){
		vallst += "," + $(this).attr("val");
	});
	vallst = vallst.substring(1);
	
    var frm = document.sendform;
    
    hs.overrides.push('onAfterExpand');
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: 'about:blank',
        width: 720, 
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
	
}

function jsReload(){
    $("#loadingDiv").show();
	var state = $.url.attr("anchor");
	jsLoadFile("content", "/ContView.kait", paramList.get(state), "jsDraginit");
}

function jsUpReload(){
    $("#loadingDiv").show();
    $("input[name=pPage]").val("1");
	$("input[name=CLS_SEQ]").val(jsLoadTreeSeq($("input[name=UpClsId]").val()));
	$("input[name=CLS_ID]").val($("input[name=UpClsId]").val());
    $("input[name=CLS_KIND_CD]").val("0001");
    $("input[name=USER_ID]").val(jsLoadMyUserId());
    $("input[name=SRCH_GUBUN]").val("");
    $("#AjaxLinkTime").attr("href","#"+new Date().getTime());
    $("#AjaxLink").click();
}

function jsNotClsItem(){
	$("#dellink").hide();
    $("#loadingDiv").show();
    $("input[name=pPage]").val("1");
    $("input[name=CLS_SEQ]").val("A");
    $("input[name=CLS_ID]").val("1");
    $("input[name=SRCH_GUBUN]").val("NOT");
    $("#AjaxLinkTime").attr("href","#"+new Date().getTime());
    $("#AjaxLink").click();
}

function startSpinner() {
    var opts = {
        lines: 11, // The number of lines to draw
        length: 25, // The length of each line
        width: 18, // The line thickness
        radius: 45, // The radius of the inner circle
        color: '#111111', // #rgb or #rrggbb
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

function jsInitTreeMenu(id){
    if(id == "tree_asset"){
    	if(jsLoadUserType() == "0001"){
    		$("#tree_asset ul li.dynatree-lastsib").first().before("<div style=\"height:30px;background-color:#DDD;\" ></div>");
    	}else if(jsLoadUserType() == "0002"){
    		$("#tree_asset ul li.dynatree-lastsib").first().before("<div style=\"height:30px;background-color:#DDD;\" >&nbsp;<button id=\"tabbtn\" onclick=\"jsNotClsItem()\">미분류 사료</button></div>");
        }else if(jsLoadUserType() == "0003"){
        	$("#tree_asset ul li.dynatree-lastsib").first().before("<div style=\"height:30px;background-color:#DDD;\" >&nbsp;<button id=\"tabbtn\" onclick=\"jsNotClsItem()\">미분류 사료</button></div>");
        }
    }else if(id == "tree_user"){
        $("#tree_user ul li.dynatree-lastsib").first().before("<div style=\"height:30px;background-color:#DDD;\" ><span id=\"userNm\"></span></div>");
        if(jsLoadUserType() != "0001"){
        	$("#userNm").html($("input[name=USER_NM]").val()+"<button onclick=\"JavaScript:jsSendUserMain();\">이동</button>");
        }        
    }else if(id == "tree_group"){
        $("#tree_group ul li.dynatree-lastsib").first().before("<div style=\"height:30px;background-color:#DDD;\" ><span id=\"grpPath\"></span><button onclick=\"JavaScript:jsSendGrpMain();\">이동</button></div>");
        $("#grpPath").html($("input[name=GRP_PATH]").val());
    }
}


function jsSendUserMain(){
    var frm = document.sendform;
    
    hs.overrides.push('onAfterExpand');
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: 'about:blank',
        width: 720, 
        headingText: '', 
        wrapperClassName: 'titlebar', 
        preserveContent: false,
        height: 700, 
        objectHeight: 665,
        onAfterExpand: function(expander) {
        	frm.action = "/LogUserMain.kait";
            frm.target = expander.iframe.name;
            frm.submit();
        }
    });
}

function jsSendGrpMain(){
    var frm = document.sendform;
    
    hs.overrides.push('onAfterExpand');
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: '/GrpMain.kait',
        width: 720, 
        headingText: '', 
        wrapperClassName: 'titlebar', 
        preserveContent: false,
        height: 700, 
        objectHeight: 665,
        onAfterExpand: function(expander) {
            
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
}

function jsLogOut(){
	if(!confirm("로그아웃 하시겠습니까?")) return;
	location.href = "/j_spring_security_logout";
}

function jsUserMod(){
    var frm = document.sendform;
    
    hs.overrides.push('onAfterExpand');
    hs.htmlExpand(null, { 
        objectType: 'iframe', 
        src: '/LogUserMod.kait',
        width: 720, 
        headingText: '', 
        wrapperClassName: 'titlebar', 
        preserveContent: false,
        height: 700, 
        objectHeight: 665,
        onAfterExpand: function(expander) {
        }
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
		        alert("fail");
		    }
		});

	return resultType;
}

function jsLoadGrpRole(){
	var resultType = "";
	var param = {};
	param.USER_ID = $("input[name=USER_ID]").val();
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
                    alert("fail");
                }
            });

	return resultType;
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
                    alert("fail");
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
                    alert("jsLoadTreeSeq//fail");
                }
            });

    return resultType;
}