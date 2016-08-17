<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<title>회원가입</title>
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript">
	function jsSendSave(){
	    var frm = document.sendform;
	    
	    if($.trim(frm.pUsrID.value) == ""){
	    	alert("'아이디'을 입력하여주세요.");
	    	frm.pUsrID.focus();
	    	return;
	    }
	    
	    if($.trim(frm.pUsrPW.value) == ""){
	        alert("'비밀번호'를 입력하여주세요.");
	        frm.pUsrPW.focus();
	        return; 
	    }
	    
		if($.trim(frm.pUsrEmail.value) == ""){
	        alert("'이메일'을 입력하여주세요.");
	        frm.pUsrEmail.focus();
	        return;
		}
	
		if($.trim(frm.pUsrNM.value) == ""){
	        alert("'이름'을 입력하여주세요.");
	        frm.pUsrEmail.focus();
	        return;
		}
		
		if(!confirm("회원가입 하시겠습니까?")) return;
	    frm.action = "/log/JoinAction.do";
	    frm.submit();
	}
	</script>
</head>
<body>
<form name="sendform" method="post">
<table>
	<tr>
		<td>아이디 : </td><td><input type="text" name="pUsrID"/></td>
		<td>비밀번호 : </td><td><input type="password" name="pUsrPW"/></td>
		<td>이메일 : </td><td><input type="text" name="pUsrEmail"/></td>
		<td>이름 :  </td><td><input type="text" name="pUsrNM"/></td>
		<td>성별 : </td><td><input type="text" name="pUsrSex"/></td>
	</tr>
	<tr>
		<td colspan="5" align="right">
		<a href="javascript:jsSendSave();"/>확인</td>
	</tr>
</table>
</form>
</body>
</html>
