<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Wiki</title>
	<script src="/jscript/jquery-1.9.1.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
	
	function jsSendRgst(){
		document.sendform.action="/item/itemAddAction.do"
		document.sendform.submit();
	}
	
	</script>
</head>
<body>
<form name="sendform" id="sendform" method="post" enctype="multipart/form-data">
<table border="1">
	<tr><td colspan="3">위키 등록</td></tr>
	<tr><td>제목 : </td></tr><tr><td><input type="text" name="pItemTitle" id="pItemTitle"/></td></tr>
	<tr><td>내용 : </td></tr><tr><td><input type="text" name="pItemContent" id="pItemContent"/></td></tr>
	<tr><td>이미지 : </td></tr><tr><td><input type="file" name="pItemAtch" id="pItemAtch"/></td></tr>
	<tr><td colspan="2"><input type="button" value="등록" onclick="javascript:jsSendRgst();"/></td></tr>
</table>
</form>
</body>
</html>
