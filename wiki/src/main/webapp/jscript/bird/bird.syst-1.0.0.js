/*!
 * bird.syst Default JavaScript v1.0.0
 */

$(function(){
	//윈도우 이벤트
    $(window)
	    .resize(function(){
	    	jsResize();
	    });
    
    $(document).ready(function(){
    	jsResize("init");
    });
    
});

//div 크기조절
function jsResize(init){
	
    var mainHeight = $("body").height();
//    alert(mainHeight);
    if(mainHeight < 700)
    {
    	$(".archDataBoxSub").height(mainHeight - 50);    	
    }
    else 
    {
    	$(".archDataBoxSub").height(mainHeight + 50);
    }	
    var minHeight = 700;
    var scrollHeight = 17;
    if(mainHeight > 700){
	    $("#left").css("height",mainHeight-$("#top").height()+"px");
	    $("#right").css("height",mainHeight-$("#top").height()+"px");
    }else{
        $("#left").css("height","700px");
        $("#right").css("height","700px");
    }
    if($("#main").width() < 1141){
    	$("#right").css("width","835px");
    	$("#top").css("width","1141px");
    	if(init == "init"){
	        $("#left").css("height",$("#left").height()-scrollHeight+"px");
	        $("#right").css("height",$("#left").height()-scrollHeight+"px");
    	}
    }else{
        $("#right").css("width","");
        $("#top").css("width","");    	
    }
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
//	        	alert(response.responseText);
//	        	alert(target);
	            $('#'+target).html(response.responseText);
	            if(callback != ""){
	            	eval(callback + "();");
	        	}
	        },
	        onFailure: function(response){
	            alert("fail sys");
	        }
	    });
}
