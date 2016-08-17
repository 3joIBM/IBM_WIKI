<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<title>Home</title>
</head>
<body>
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
	<tr><td> 작성자 </td><td width="200px"> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>
	<tr><td> 작성자 </td><td> 제목 </td><td>08.11.2016</td></tr>	

</table>

</body>
</html>
