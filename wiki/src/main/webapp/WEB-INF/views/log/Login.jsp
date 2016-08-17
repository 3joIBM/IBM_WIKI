<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko"> -->
<!DOCTYPE>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="/css/bird/style.css" />
<link rel="stylesheet" type="text/css" href="/jscript/capsdetector/jquery.capsalerttipsy.css" />


<script type="text/javascript" src="/jscript/jquery-1.8.3.js"></script>
<script type="text/javascript" src="/jscript/jquery.url.js"></script>

<script type="text/javascript">
$(function(){
/* 	var agt = navigator.userAgent.toLowerCase();
	
	if (agt.indexOf("msie") != -1)
	{
		alert("일부 인터넷 익스플로러에서는 \n음원,동영상,PDF등 일부 컨텐츠가 제대로 보이지 않을 수 있으므로 \n파이어폭스나 크롬을 권장합니다.");
	} 
	 */
	$(window)
    .keydown(function(event){
        var code = (event.keyCode?event.keyCode:event.which);
        
        if(code == 13){
        	document.sendform.submit();
        }
    });
	
	$('[type=password]').CapsLockAlert();
	
	$(document).ready(function(){
		$("input[name=pUsrID]").focus();
		$.url.setUrl(parent.location.href);
		if($.url.attr("path") != "/log/LoginAction.do"){
			parent.location.href="/";
		}
	});
});

function jsSendLogin(){
	document.sendform.submit();
}
</script>
</head> 
<body>
<form name="sendform" action='/log/LoginAction.do' method="post">
    <div id="warp">
        <div id="loginContainer">
            <div class="logo"></div>
            <div class="login">
                <div class="loginTextBox">
                    <div class="inputArea">
                        <p class="fClear">
                            <label for="inputID">아이디</label>
                            <input id="pUsrID" type="text" name="pUsrID" />
                        </p>
                        <p class="fClear">
                            <label for="inputPW">비밀번호</label>
                            <input id="pUsrPW" type="password" name="pUsrPW"/>
                        </p>
                    
                    </div>
                    <p class="btnLogin"><button type="button" onclick="document.sendform.submit();">로그인</button></p>
                </div>
                <div class="idpwCheck">
                    <c:if test="${param.error}">
					<p>아이디, 비밀번호를 확인하세요</p>
					</c:if>
                <div>
            </div>
        </div>
    </div>
    
  </div>
</div>
<div>

</div>    
</form>
</body>
</html>