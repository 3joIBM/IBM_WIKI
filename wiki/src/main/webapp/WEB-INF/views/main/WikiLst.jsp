<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<html>
<head>
<title>Home</title>
<style>
#paging div div {float:left;margin-right:10px; cursor:pointer;}
.aaa a {color:#F00;}
.LstSize {float:right;}
</style>
<script type="text/javascript" src="/jscript/jquery-1.8.3.js"></script>
<script type="text/javascript">
function jsSendAdd(){
	var frm = document.sendform;
	frm.action = "/bbs/bbsadd.kait";
	frm.submit();
}

function jsSendView(id){
    var frm = document.sendform;
    frm.pBbsId.value = id;
    frm.action = "/bbs/bbsview.kait";
    frm.submit();
}

function jsSendPage(page){
	var frm = document.sendform;
	frm.pPage.value = page;
	frm.action = "/bbs/bbslst.kait";
	frm.submit();
}
function jsSendLstSize(sLs){
    var frm = document.sendform;
    frm.pPage.value = 1;
    frm.pLstSize.value = sLs;
    frm.action = "/bbs/bbslst.kait";
    frm.submit();	
}
function jsPageinit(page, lstsize, totalcnt, pagesize){
	var totalpage = parseInt((totalcnt-1)/lstsize)+1;
	var startPage = parseInt((page-1)/pagesize)*pagesize+1;
    var endPage = startPage + pagesize - 1;
    if(endPage > totalpage) endPage = totalpage;
    
    
    for(var i = startPage; i < endPage; ++i){
        var pageDefault = $(".pPage").last().clone();
        $(".pPage").last().after(pageDefault);
    }
    
    var pageNum = startPage;
    $(".pPage").each(function(){
        $(this).html("<a href=\"javascript:jsSendPage('"+pageNum+"');\">"+pageNum+"</a>");
        pageNum++;
    });
    if(startPage == 1){
        $(".pFirst").html("<a href=\"javascript:;\"><<</a>");
        $(".pPrev").html("<a href=\"javascript:;\"><</a>");
    }else if(startPage != 1){
        $(".pFirst").html("<a href=\"javascript:jsSendPage('1');\"><<</a>");
        $(".pPrev").html("<a href=\"javascript:jsSendPage('"+(startPage-pagesize)+"');\"><</a>");
    }
    if(endPage == totalpage){
        $(".pNext").html("<a href=\"javascript:;\">></a>");
        $(".pLast").html("<a href=\"javascript:;\">>></a>");
    }else if(endPage != totalpage){
        $(".pNext").html("<a href=\"javascript:jsSendPage('"+(startPage+pagesize)+"');\">></a>");
        $(".pLast").html("<a href=\"javascript:jsSendPage('"+totalpage+"');\">>></a>");
    }
    
}
</script>
</head>
<body>
<form name="sendform" method="post">
<input type="hidden" name="pBbsId"/>
<input type="hidden" name="pPage" value="${pPage}"/>
<input type="hidden" name="pLstSize" value="${pLstSize}"/>
<input type="hidden" name="pLstOrder" value="${pLstOrder}"/>
<input type="hidden" name="pLstLine" value="${pLstLine}"/>
</form>
<table border="1">
<tr>
<td colspan="4">
    전체 : ${iTotalCnt}건(${pPage}/<fmt:parseNumber value="${(iTotalCnt-1)/pLstSize+1}" integerOnly="true" />)
    <select class="LstSize" name="LstSize" onchange="jsSendLstSize(this.value)">
    <option value="10">10건</option>
    <option value="20">20건</option>
    <option value="30">30건</option>
    <option value="50">50건</option>
    <option value="100">100건</option>
    </select>
    <script type="text/javascript">$("select[name=LstSize]").val(${pLstSize});</script>
</td>
</tr>
        <tr>
           <td width="40" align='center'>ID</td>
           <td width="200" align='center'>제목</td>
           <td width="100" align='center'>작성자</td>
           <td width="150" align='center'>작성일시</td>
        </tr>
<c:forEach var="BbsLst" items="${BbsLst}">
        <tr>
           <td align='center'>${BbsLst.BBS_ID}<br></td>
           <td ><a href="javascript:jsSendView('${BbsLst.BBS_ID}');">${BbsLst.BBS_TITLE}</a><br></td>
           <td align='center'>${BbsLst.REG_NM}<br></td>
           <td align='center'>${BbsLst.REG_DT}<br></td>
        </tr>
</c:forEach>
<tr>
<td colspan="4" style="text-align:center;">
<table id="paging">
	<tr>
		<td class="aaa pFirst"><<</td>
		<td class="aaa pPrev"><</td>
		<td class="aaa pPage">1</td>
		<td class="aaa pNext">></td>
		<td class="aaa pLast">>></td>
	</tr>
</table>
</td>
</tr>
<tr>
<td colspan="4" style="text-align:right;">
<a href="javascript:jsSendAdd();">등록</a>
</td>
</tr>
</table>
<script type="text/javascript">
jsPageinit(${pPage}, ${pLstSize}, ${iTotalCnt}, 5);
</script>
</body>
</html>
