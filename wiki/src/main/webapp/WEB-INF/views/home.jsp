<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Wiki Main</title>
	<script src="/jscript/jquery-1.9.1.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
	
	function jsSendRgst(){
		document.sendform.action="/item/itemAdd.do"
		document.sendform.submit();
	}
	
	</script>
</head>
<body>
<form name="sendform" id="sendform" method="post">
<table border="1">
	<tr>
		<td>WikiPedia</td>
		<td colspan="2" align="right">
			<c:choose>
				<c:when test="${pUsrID eq '' || pUsrID eq null}">
					<a href="/log/Login.do">Login</a>
				</c:when>
				<c:when test="${pUsrID ne '' || pUsrID ne null}">
					<c:out value="${pUsrID}"></c:out>님 환영합니다.
				</c:when>
			</c:choose>
		</td>
		<c:if test="${pUsrID eq '' || pUsrID eq null}">
			<td align="right">
				<a href="/log/Join.do">Join</a>
			</td>
		</c:if>
		
	</tr>
	<tr>	
		<td rowspan="16"><input type="text"></input><input type="button" value="검색"/></td>
	</tr>
	<tr><td colspan="3" align="right">총  ${itemLstCnt}개</td></tr>
	<c:choose>
	<c:when test="${fn:length(itemLst) > 0}">
		<c:forEach var="item" items="${itemLst}">
			<tr><td> ${item.REG_NM} </td><td width="200px"> ${item.ITEM_TITLE} </td><td> ${item.REG_DT} </td></tr>
		</c:forEach>
	</c:when>
	<c:otherwise>
		<tr>
			<td colspan="4">조회된 결과가 없습니다.</td>
		</tr>
	</c:otherwise>
	</c:choose>
	<tr><td colspan="4" align="right"><input type="button" value="등록" onclick="javascript:jsSendRgst();"/></td></tr>
</table>
</form>
</body>
</html>
