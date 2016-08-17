package com.ibm.wiki.common;

import java.text.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <PRE>
 * Filename		: StrUtil.java <BR>
 * Class		: com.kait.rms.common.util.StrUtil <BR>
 * Fuction		: String 관련. <BR>
 * Comment		: <BR>
 * History		: 
 * </PRE>
 * @version		: 1.0
 * @author		: kait
 */

public class StrUtil
{
	/**
	* 	Null 이면 rtn값을 리턴하고, Null이 아니면 str을 trim하여 리턴한다.<BR>
	* 	@param	String str : 입력 문자열<BR>
	* 			String rtn : 입력 문자열
	* 	@return	String str or rtn : 리턴 문자열
	*/
	public static String gfIsNull(String str, String rtn) {
		if (str == null || str.trim().equals("")) {
			return rtn;
		}else {
			return str.trim();
		}
	}
	
	/**
	*	Null 이면 공백("")을 리턴하고, Null이 아니면 str을 trim하여 리턴한다. <BR>
	*	@param	String str : 입력 문자열<BR>
	*  	@return	String "" or str : 리턴 문자열
	*/
	public static String gfIsNull(String str) {
		if (str == null || str.trim().equals("")) {
			return "";
		}else {
			return str.trim();
		}
	}

	/**
	*	Null 이면 rtn값을 리턴하고, Null이 아니면 str을 Integer.parseInt하여 리턴한다. <BR>
	*	@param	String str : 입력 문자열<BR>
	*           int rtn : 입력 숫자
	*  	@return	int rtn : 리턴 문자열
	*/
	public static int gfIsNull(String str, int rtn) {
		if (str == null  || str.trim().equals("")) {
			return rtn;
		}else {
			return gfParseInt(str.trim());
		}
	}
	
	/**
	*	null이라 의심되는 스트링 변수의 값을 공백으로 변환함 아니면 trim과 동일함.<BR>
	*	@param	String szValue	: null이 의심되는 String
	*  	@return	String szValue	: Null 또는 Parameter로 넘어온 szValue
	*/
	public static String gfNullTrim(String szValue) throws Exception
	{
		if (szValue == null) {
			szValue = "";
		}
		else
		{
			szValue = szValue.trim();
		}
		return szValue;
	}

	/**
	*	szNullTrim(String szValue)을 수행하고, 주어진 숫자 만큼의 byte length로 문자를 자른다.<BR>
	*	@param	String szValue	: null이 의심되는 String
	*			int nOffset
	* 	@return	String szValue	: "" 또는 Parameter로 넘어온 szValue
	*/
	public static String gfNullTrim(String szValue, int nOffset) throws Exception
	{
		try
		{
			szValue = gfNullTrim(szValue, "", nOffset);
		}
		catch (Exception e)
		{
			throw e;
		}
		return szValue;
	}

	/**
	*	szNullTrim(String szValue)을 수행하여 값이 없는 경우 기본값을 설정하고, 주어진 숫자 만큼의 byte length로 문자를 자른다.<BR>
	*	@param	String szValue : null이 의심되는 String
	*			String szDefault : null인 경우 기본값
	*			int nOffset
	*  	@return	String szValue	: "" 또는 Parameter로 넘어온 szValue
	*/
	public static String gfNullTrim(String szValue, String szDefault, int nOffset) throws Exception
	{
		try
		{
			if (szValue == null) szValue = szDefault;
			//szValue = szGetSubstring(szValue.trim(), 0, nOffset);
		}
		catch (Exception e)
		{
			throw e;
		}
		return szValue;
	}

	/**
	*	null이라 의심되는 스트링 변수의 값을 szSetValue로 변환함 아니면 trim과 동일함.<BR>
	*	@param	String szValue		: null이 의심되는 String
				String szSetValue	: null인 경우 대치될 문자열
	*  	@return	String szValue		: Null 또는 Parameter로 넘어온 szValue
	*/
	public static String gfNullTrim(String szValue, String szSetValue)  throws Exception
	{
		if (szValue == null)
		{
			szValue = szSetValue;
		}
		else
		{
			szValue = szValue.trim();
			if (szValue.equals(""))
			{
				szValue = szSetValue;
			}
		}
		return szValue;
	}
		
	/**
	*	010 등의 String 을 Int 형으로(010 -> 10) 변환하여 리턴한다. <BR>
	*	@param	String str : 입력 문자열<BR>
	*  	@return	int Integer.parseInt(str)
	*/
	public static int gfParseInt(String str) {
		if (str == null || str.equals("") || (str.length() == 0)) {
			return 0;
		} else if (str.length() == 1) {
			return Integer.parseInt(str);
		}

		while ((str.length() > 1) && (str.substring(0,1).equals("0"))) {
			str = str.substring(1);
		}

		if (str.equals("0")) {		//000000일때 0 리턴
			return 0;
		}
		return Integer.parseInt(str);
	}
	
	/**
	*	입력내용중에 Space가 있으면 없애줌 <BR>
	*	@param	String szIn	: 입력 내용
	*   @return	String szIn에서 스페이스를 없앤 값
	*/
	public static String gfRmSpace(String szIn)  throws Exception
	{
		StringBuffer   sbBuffer=new StringBuffer();
		for(int i=0;i<szIn.length();i++)
		{
			char chIn=szIn.charAt(i);
			if(Character.isSpaceChar(chIn)) continue;
			else sbBuffer.append(chIn);
		}
		return sbBuffer.toString();
	}
	
	/**
	*	src 의 문자열속에 있는 sub 의 갯수를 리턴 <BR>
	*	@param	String src : 입력 문자열<BR>
	*			String sub : 찾는 문자열
	*  	@return	int count : sub의 갯수
	*/
	public static int gfStrCount(String src, String sub) {
		int count = 0;
		int index = 0;

		while( (index = src.indexOf(sub, index)) > -1 ) {
			count++;
			index += sub.length();
		}
	
		return count;
	}

	/**
	*	전달받은 원래의 문자열에서 해당 문자열을 모두 찾아서 원하는 문자열로 바꾸어준다.<BR>
	*	@param	String szOrgText	: 원래의 문자열<BR>
	*			String szFindText	: 찾을 문자열<BR>
	*			String szRplcText	: 바꿀 문자열
	*	@return	String sbResult	: 변환된 문자열
	*/
	public static String gfRplcAllStr(String szOrgText, String szFindText, String szRplcText)
	{
		int nBegin		= 0;
		int nEnd		= szOrgText.indexOf(szFindText);	// 찾으려는 문자열의 위치
		int nRplcSize	= szFindText.length();				// 변환할 문자열의 길이
		StringBuffer sbResult	= new StringBuffer();

		while(nEnd != -1)
		{
			sbResult.append(szOrgText.substring(nBegin,nEnd));
			sbResult.append(szRplcText);

			nBegin	= nEnd + nRplcSize;
			nEnd	= szOrgText.indexOf(szFindText,nBegin);
		}
		sbResult.append(szOrgText.substring(nBegin));

		return sbResult.toString();
		
	}

	/**
	* string 에서 src에 해당하는 문자열을 tag로 바꿔줌.<BR>
	* @param String szTotLine	: 전체 문자열<BR>
	*		 String szSrcWord	: 변경대상문자<BR>
	*		 String szTgtWord	: 변경문자
	* @return String szTotLine : 수행결과(변환된 문자열)
	*/
	public static String gfRplcStr(String szTotLine, String szSrcWord, String szTgtWord)  throws Exception
	{
		int nSrcStrt = szTotLine.indexOf(szSrcWord);
		if(nSrcStrt >= 0)
		{
			int nSrcEnd = nSrcStrt+szSrcWord.length();
			szTotLine = szTotLine.substring(0,nSrcStrt) + szTgtWord + szTotLine.substring(nSrcEnd,szTotLine.length());
		}
		return szTotLine;
	}
	
	/**
	* str에서 nl의 문자열을 찾아서, n2로 교체한다.<BR>
	* @param String str	: 전체 문자열<BR>
	*		 String n1	: 변경대상문자<BR>
	*		 String n2	: 변경문자
	* @return String sb : 수행결과(변환된 문자열)
	*/
	public static String gfRplcStr2(String str, String n1, String n2) {

		int i = 0;
		if (str == null) return "";
		
		StringBuffer sb = new StringBuffer();
		sb.append("");
		while ((i = str.indexOf(n1)) > -1) {
			sb.append(str.substring(0, i));
			if (n2 != null)	sb.append(n2);
			str = str.substring(i + n1.length());
		}
		sb.append(str);
		
		return sb.toString();
/*
		if (str == null) return "";
		if (n1 == null) return str;
		if (n2 == null) return str.replaceAll(n1, "");

		return str.replaceAll(n1, n2);
*/		
	}
	
	/**
	* sSource의 문자열에서 sLoopStart 과 sLoopEnd 사이의 문자열을 리턴한다.<BR>
	* @param String sSource	: 입력 문자열<BR>
	*		 String sLoopStart : 시작 문자열<BR>
	*		 String sLoopEnd : 끝 문자열
	* @return String sSource : 찾는 문자열
	*/
	public static String gfGetLoopStr(String sSource, String sLoopStart, String sLoopEnd) {
		int idxStart = 0;
		int idxEnd = 0;
		
		idxStart = sSource.indexOf(sLoopStart);
		idxEnd = sSource.indexOf(sLoopEnd);
		return sSource.substring(idxStart + sLoopStart.length(),idxEnd);
	}
	
	/**
	* sFullString 의 문자열에서 sLoopStart 와 sLoopEnd 사이의 문자열을 sLoop으로 교체한다.<BR>
	* @param String sFullString	: 입력 문자열<BR>
	* 		 String sLoop : 교체할 문자열<BR>
	*		 String sLoopStart : 시작 문자열<BR>
	*		 String sLoopEnd : 끝 문자열
	* @return String sFullString : 변환된 문자열
	*/
	public static String gfRplcLoopStr(String sFullString, String sLoop, String sLoopStart, String sLoopEnd){
		if (sFullString == null || sFullString.equals(""))	{return "";}

		if (sLoop == null || sLoop.equals(""))
		{
			return sFullString.substring(0, sFullString.indexOf(sLoopStart)) + sFullString.substring(sFullString.indexOf(sLoopEnd) + sLoopEnd.length());
		} else {
			return sFullString.substring(0, sFullString.indexOf(sLoopStart)) + sLoop + sFullString.substring(sFullString.indexOf(sLoopEnd) + sLoopEnd.length());
		}
	}
	
	/**
	*	전달받은 원래의 문자열에서 CarrageReturn, NewLine(\r\n)을 찾아서 공백으로 바꾸어준다.<BR>
	*	@param	String	szOrgText	원래의 문자열
	*	@return	String	szReturn	변환된 문자열
	*/
	public static String gfRplcCRToSpace(String szOrgText) throws Exception
	{
		String szReturn = null;
		try
		{
			szReturn = gfRplcAllStr(szOrgText, "\r\n", " ");
		}
		catch(Exception e)
		{
			throw e;
		}
		return szReturn;
	}
	
	/**
	*	전달받은 원래의 문자열에서 CarrageReturn, NewLine(\r\n)을 찾아서 &lt;BR&gt;으로 바꾸어준다.<BR>
	*	@param	String	szOrgText	원래의 문자열
	*	@return	String	szReturn	변환된 문자열
	*/
	public static String gfRplcCRToBR(String szOrgText) throws Exception
	{
		String szReturn = null;
		try
		{
			szReturn = gfRplcAllStr(szOrgText, "\r\n", "<BR>");
		}
		catch(Exception e)
		{
			throw e;
		}
		return szReturn;
	}
	
	/**
	*	파라메터를 Input으로 받아 사이즈를 계산해서 리턴한다.<BR>
	*		1.1000byte 가 않되는 내용은 xxxB return<BR>
	*		2.1000byte가 넘는 내용은   xxxK <BR>
	*			단 한자리수는 x.xK (소수점 두째자리에서 반올림)<BR>
	*		3.1000K 가 넘는 내용은 xxxM<BR>
	*			단 한자리수는 x.xM (소수점 두째자리에서 반올림)
	*	@param	String	szContents	내용
	*  @return	String	szRetString	단위를 추가한 크기
	*/
	public static String gfGetStrSize(String szContents)  throws Exception
	{
		int nLength=szContents.getBytes().length;
		String szLength=Integer.toString(nLength);
		String szRetString=null;
		int nStringLength= szLength.length();
		if(nStringLength<=3)
		{
			szRetString=szLength+"B";
		}
		else if(nStringLength<=7)
		{
			if(nStringLength==4)
			{
				int    nTemp=0;
				nTemp=Integer.parseInt(szLength.substring(2,4));
				if(nTemp>=50) nLength+=100;
				szLength=Integer.toString(nLength);
				szRetString = szLength.substring(0,1);
				if(szLength.substring(1,2).compareTo("0")!=0)	szRetString+="."+szLength.substring(1,2);
				szRetString+="K";
			}
			else	szRetString=szLength.substring(0,szLength.length()-3)+"K";
		}
		else
		{
			if(nStringLength==8)
			{
				int    nTemp=0;
				nTemp=Integer.parseInt(szLength.substring(2,4));
				if(nTemp>=50000) nLength+=100000;
				szLength=Integer.toString(nLength);
				szRetString = szLength.substring(0,1);
				if(szLength.substring(1,2).compareTo("0")!=0) szRetString+="."+szLength.substring(1,2);
				szRetString+="M";
			}
			else szRetString=szLength.substring(0,szLength.length()-3)+"M";
		}
		return szRetString;
	}
	
	/**
	* 특수문자를 escape sequence로 바꾼다. 스크립트에서 사용될 수 있도록 바꾼다. <BR>
	* 	' -> \&#39; , " -> \&quot; , < -> &lt; , > -> &gt; 로 변환 <BR>
	* @param	String	szStr 입력 문자열
	* @return	String	escaped String
	*/
	public static String gfScriptEscape(String szStr) throws Exception
	{
		try
		{
/*
			szStr = gfRplcEscape(szStr);
			szStr = gfRplcAllStr(szStr,"&#39;","\\&#39;");
			szStr = gfRplcAllStr(szStr,"&quot;","\\&quot;");
*/
            szStr = gfRplcEscape(szStr);
			szStr = gfAddBackSlashRmCR(szStr);

			return szStr;
		}
		catch(Exception e)
		{
			throw e;
		}
	}
	
	/**
	 *
	 * DoubleQuote와 SingleQuote, BackSlash 앞에 BackSlash(\)를 앞에 붙인다.<BR>
	 * @param	String szStr : 입력 문자열<BR>
	 * @return	String szResult
	 */
	public static String gfAddBackSlash(String szStr)  throws Exception
	{
		Hashtable<String, String> ht = new Hashtable<String, String>();

		if(szStr == null)
			return null;

		ht.put("'", "\\'");
		ht.put("\"", "\\\"");
		ht.put("\n", "\\n");
		ht.put("\t", "\\t");
		ht.put("\\", "\\\\");

		String szResult = new String();

		for(int i=0; i < szStr.length(); i++)
		{
			String tmp = String.valueOf(szStr.charAt(i));

			if(ht.containsKey(tmp))
				szResult += ht.get(tmp);
			else
				szResult +=  tmp;
		}

		return szResult;
	}
	
	/**
	 *
	 * DoubleQuote와 SingleQuote 앞에 BackSlash(\)를 앞에 붙인다.<BR>
	 * CR 을 없앤다.<BR>
	 * @param	String szStr : 입력 문자열<BR>
	 * @return	String szResult
	 */
	public static String gfAddBackSlashRmCR(String szStr)  throws Exception
	{
		Hashtable<String, String> ht = new Hashtable<String, String>();

		if(szStr == null)
			return null;

		ht.put("'", "\\'");
		ht.put("\"", "\\\"");
		ht.put("\n", "\\n");
		ht.put("\r","");
		ht.put("\t", "\\t");
		ht.put("\\", "\\\\");


		String szResult = new String();

		for(int i=0; i < szStr.length(); i++)
		{
			String tmp = String.valueOf(szStr.charAt(i));

			if(ht.containsKey(tmp))
				szResult += ht.get(tmp);
			else
				szResult +=  tmp;
		}

		return szResult;
	}
	
	/**
	 *
	 * 첨부화일내 특수문자(&,%,',",<,>)를 escape sequence로 바꾼다.<BR>
	 * @param	String szStr	입력 문자열<BR>
	 * @return	String szReturn
	 */
	public static String gfFileEscape(String szStr) throws Exception
	{
		String szReturn = null;

		if(szStr == null)
			return null;

//		szReturn = gfRplcEscape(szStr);

		szReturn = gfRplcAllStr(szStr, "&", "%26");
		szReturn = gfRplcAllStr(szReturn, "#", "%23");
		szReturn = gfRplcAllStr(szReturn, "'", "%27");
		szReturn = gfRplcAllStr(szReturn, "\"", "%22");
		szReturn = gfRplcAllStr(szReturn, "<", "%3C");
		szReturn = gfRplcAllStr(szReturn, ">", "%3E");
		szReturn = gfRplcAllStr(szReturn, "+", "%2B");
		szReturn = gfRplcAllStr(szReturn, " ", "+");
		szReturn = gfRplcAllStr(szReturn, "%", "%25");

		return szReturn;
	}
	
	/**
	*	String 을 입력받아 null trim 을 한후 String 에 값이 존재하지 않는 경우 &nbsp; 로 변경한다.<BR>
	*	@param	String szOrgText 입력 문자열<BR>
	*	@return	String szOrgText
	*/
	public static String gfNullToNbsp(String szOrgText) throws Exception
	{
		try
		{
			szOrgText = gfNullTrim(szOrgText);

			if(szOrgText.equals(""))
				szOrgText = "&nbsp;";

			return szOrgText;
		}
		catch(Exception e)
		{
			throw e;
		}
	}
	
	/**
	*	특수문자를  escape sequence로 바꾼다. ' -> &#39; , " -> &quot; 로 변환 <BR>
	* 	@param String szStr : 입력 문자열<BR>
	* 	@return escaped String
	*/
	public static String gfRplcEscape(String szStr) throws Exception
	{
		try
		{
			String szReturn = null;

			if(szStr == null)
				return null;

//			szReturn = gfRplcAllStr(szStr, "&", "%26");
//			szReturn = gfRplcAllStr(szReturn, "%", "%25");
//			szReturn = gfRplcAllStr(szReturn, "#", "%23");
			szReturn = gfRplcAllStr(szStr, "'", "&#39;");
			szReturn = gfRplcAllStr(szReturn, "\"", "&quot;");
			szReturn = gfRplcAllStr(szReturn, "<", "&lt;");
			szReturn = gfRplcAllStr(szReturn, ">", "&gt;");

			return szReturn;
		}
		catch (Exception e)
		{
			throw e;
		}
	}
	
	/**
	*	특수문자를  escape sequence로 바꾼다. ' -> &#39; , " -> &quot; 로 변환 <BR>
	*   자바스크립트에서의 싱글 쿼터 문제로 추가 변경을 가한다.
	* 	@param String szStr : 입력 문자열<BR>
	* 	@return escaped String
	*/
	public static String gfRplcEscape(String szStr, String single_quot) throws Exception
	{
		try
		{
			String szReturn = null;

			if(szStr == null)
				return null;

//			szReturn = gfRplcAllStr(szStr, "&", "%26");
//			szReturn = gfRplcAllStr(szReturn, "%", "%25");
//			szReturn = gfRplcAllStr(szReturn, "#", "%23");
			szReturn = szStr;
			if ( single_quot.equals("javascript")) {
				szReturn = gfRplcAllStr(szReturn, "'", "\\&#39;");
			}
			szReturn = gfRplcAllStr(szReturn, "\"", "&quot;");
			szReturn = gfRplcAllStr(szReturn, "<", "&lt;");
			szReturn = gfRplcAllStr(szReturn, ">", "&gt;");

			return szReturn;
		}
		catch (Exception e)
		{
			throw e;
		}
	}
	
	/**
	* 	Single Quotation을 DB에 입력하기 위해서 Single Quotation하나를 두개로 바꿔준다.<BR>
	*  	@param String szStr : 입력 문자열<BR>
	*	@return Replaced String
	*/
	public static String gfRplcEscapeToDB(String szStr) throws Exception
	{
		try
		{
			if(szStr == null)
				return null;

			return gfRplcAllStr(szStr, "'", "''");
		}
		catch (Exception e)
		{
			throw e;
		}
	}
	
	/**
	* 	연도와 일련번호를 입력받아 '2008-123'과 같은 형태로 리턴한다.<BR>
	*  	@param String sStr1 : 입력 문자열<BR>
	*  			String sStr2 : 입력 문자열<BR>
	*	@return Replaced String
	*/
	public static String gfRplcYearNum(String sYear, String sNum) throws Exception
	{
		try
		{
			String szReturn = null;

			szReturn = sYear + "-" + sNum;

			return szReturn;
		}
		catch (Exception e)
		{
			throw e;
		}
	}
	
	/**
	* 	메뉴권한 여부를 리턴한다.<BR>
	*  	@param String sCurMenu : 현재 페이지<BR>
	*  			String sUserMenu : 메뉴권한<BR>
	*	@return Replaced String
	*/
	public static boolean gfChkUserMenu(String sCurMenu, String sUserMenu) 
	{
		
		boolean szReturn = true;
/*		
		int iLen = 0;
		
		if (sCurMenu.indexOf("/servlet/") > -1) {	//Cmd 페이지 호출 시
			iLen = sCurMenu.lastIndexOf(".");
			
			if (iLen == -1) iLen = sCurMenu.length();
			sCurMenu = sCurMenu.substring(0, iLen);
			
			sCurMenu = gfRplcAllStr(sCurMenu, "/servlet/com.kait.", "");
		}
		else {	//jsp 페이지 호출 시
			iLen = sCurMenu.lastIndexOf("/");
		
			if (iLen == -1) iLen = sCurMenu.length();
			sCurMenu = sCurMenu.substring(0, iLen);
			
			sCurMenu = gfRplcAllStr(sCurMenu, "/", ".");
			sCurMenu = gfRplcAllStr(sCurMenu, ".mms", "mms");
		}			
		
		if (sUserMenu.indexOf(sCurMenu) > -1) {
			szReturn = true;
		}
*/
		return szReturn;
		
	}
	
	
	/**
	* 	str에서 len만큼의 문자를 뒤에서 부터 잘라낸다. str이 len보다 짧아도 에러나지 않는다.<BR>
	*  	@param 	String str : 입력 문자열<BR>
	*  			int	len 
	*	@return String rtn
	*/
	public static String gfSubRight(String str, int len) {
		String rtn = "";
		if (str == null || len <= 0) return "";
		if (str.length() < len) len = str.length();
		
		rtn = str.substring(str.length() - len, str.length());
		return rtn;
	}
	
	/**
	* 	str에서 len만큼의 문자를 앞에서 부터 잘라낸다. str이 len보다 짧아도 에러나지 않는다.<BR>
	*  	@param 	String str : 입력 문자열
	*  			int	len 
	*	@return String rtn
	*/
	public static String gfSubLeft(String str, int len) {
		String rtn = "";
		if (str == null || len <= 0) return "";
		if (str.length() < len) len = str.length();
		
		rtn = str.substring(0, len);
		return rtn;
	}
	
	/**
	* 	str에서 len만큼의 문자를 앞에서 부터 잘라낸다. str이 len보다 짧아도 에러나지 않는다.<BR>
	*  	@param 	String str : 입력 문자열<BR>
	*  			int	len 
	*	@return String rtn
	*/
	public static String gfSubStr(String str, int len) {
		String rtn = "";

		if (str == null) return "";

		if (str.getBytes().length > len) {
			for (int i=0; i < str.length(); i++) {
				rtn += str.charAt(i);
				if (rtn.getBytes().length >= len) break;
			}
		} else {
				rtn = str;
		}
		return rtn;
	}
	
	/**
	* 	str에서 len만큼의 문자를 앞에서 부터 잘라내고 뒤에 ... 을 붙여서 리턴한다.<BR>
	*  	@param 	String str : 입력 문자열
	*  			int	len 
	*	@return String rtn
	*/
	public static String gfSubStrDot(String str, int len) {
		String rtn = "";

		if (str == null) return "";

		if (str.getBytes().length > len) {
			for (int i=0; i < str.length(); i++) {
				rtn += str.charAt(i);
				if (rtn.getBytes().length >= len) break;
			}
			rtn = rtn + "...";
		} else {
			rtn = str;
		}

		return rtn;
	}
	
	/**
    * 	Integer 숫자를 지정된 문자로, 정해진 자리수 만큼의 문자열로 생성<BR>
    * 	Oracle의 LPAD 함수처럼 작동<BR>
    *  	@param 	int iNum : 숫자<BR>
	*  			String sPadStr : 지정한 문자열<BR>
	*  			int iMaxLen : 정해진 자리수
	*	@return String sTemp
    */
	public static final String gfLpad(int iNum, String sPadStr, int iMaxLen) {

		String sTemp = "";
		int iCnt = 0;
		int iLen = 0;
		
		sTemp = sTemp + iNum; // Integer형을 String 형으로 변환
		iLen = sTemp.length();
		
		if (iCnt < iMaxLen) {
			for (iCnt = 0; iCnt < iMaxLen - iLen; iCnt++) {
				sTemp = sPadStr + sTemp;
			}
		}
	
		return sTemp;
	}
	
	/**
    * 	원본 String문자를 지정된 문자로, 정해진 자리수 만큼의 문자열로 생성<BR>
    * 	Oracle의 LPAD 함수처럼 작동<BR>
    * 	원본 문자열이 Null or 공백 문자열 일 경우에는 공백 문자열 return<BR>
    *  	@param 	String sNum <BR>
	*  			String sPadStr : 지정한 문자열<BR>
	*  			int iMaxLen : 정해진 자리수
	*	@return String sTemp
    */
	public static final String gfLpadStr(String sNum, String sPadStr, int iMaxLen) {

		String sTemp = "";
		int iCnt = 0;
		int iLen = 0;
		
		sTemp = sNum;
		
		if (sTemp != null && !(sTemp.equals(""))) {
			iLen = sTemp.length();
			
			if (iCnt < iMaxLen) {
				for (iCnt = 0; iCnt < iMaxLen - iLen; iCnt++) {
					sTemp = sPadStr + sTemp;
				}
			}
		}
	
		return sTemp;
	}
	
	/**
	* 	String의 substring을 byte단위로 구한다.<BR>
	* 	@param	String szStr	입력 문자열(input string)<BR>
	* 			int nOffset		문자 개수(offset)
	* 	@return	String
	*/
	public static String gfGetSubStr(String szStr, int nOffset) throws Exception
	{
		if(szStr == null || szStr.length() == 0)
			return null;

		if(szStr.length() == 0)
			return "";

		return gfGetSubStr(szStr, 0, nOffset);
	}

	/**
	* 	String의 substring을 byte단위로 구한다.<BR>
	* 	@param	String szStr	입력 문자열(input string)<BR>
	* 			int nBegin		시작위치(begin index)<BR>
	* 			int nOffset		문자 개수(byte)
	* 	@return	String
	*/
	public static String gfGetSubStr(String szStr, int nBegin, int nOffset) throws Exception
	{
		if(szStr == null || szStr.length() == 0)
			return null;

		if(szStr.length() == 0)
			return "";

		byte lpStr[]  = null;
		String szRet = null;

		lpStr = szStr.getBytes();

		if(nBegin < 0) nBegin = 0;
		if(nBegin >= lpStr.length) nBegin = lpStr.length - 1;
		if(nOffset < 0) nOffset = 0;
		if((nBegin + nOffset) >= lpStr.length) nOffset = lpStr.length - nBegin;
		szRet = new String(lpStr, nBegin, nOffset);

		if(szRet.length() == 0)
			szRet = new String(lpStr, nBegin, nOffset-1);

		return szRet;
	}
	
	/**
	*	String을 원하는 Byte 수만큼 자르고 나머지는 '...' 으로 표시함.<BR>
	* 	@param	String szStr	입력 문자열(input string)<BR>
	* 			int nOffset		문자 개수(byte)
	* 	@return	String szStr
	*/
	public static String gfGetSubTitle(String szStr, int nOffset) throws Exception
	{
		if(szStr != null && szStr.getBytes().length > nOffset)
		{
			szStr = gfGetSubStr(szStr, nOffset) + "...";
		}

		return szStr;
	}
	
	/**
	* 	loat ,double등의 data 를 소숫점 둘째자리에서 짜름.<BR>
	* 	@param	double dValue		변경대상
	* 	@return	String szRetValue	수행결과
	*/
	public static String gfDoubleToStr(double dValue)  throws Exception
	{
		String szValue= Double.toString(dValue);
		String szRetValue="";

		szRetValue = gfDoubleToStr(szValue);

		return szRetValue;
	}

	/**
	* 	float ,double등의 data 를 String으로 받아서 소숫점 둘째자리에서 짜름.<BR>
	* 	@param	String szValue		변경대상
	* 	@return	String szRetValue	수행결과
	*/
	public static String gfDoubleToStr(String szValue)  throws Exception
	{
		String szRetValue="";
		int nComma = szValue.indexOf(".");

		if(nComma==0)
		{
			szValue= "0"+szValue;
			nComma++;
		}

		if(szValue.length()> (nComma+2)  && nComma>=0)
			szRetValue = szValue.substring(0,nComma+2);
		else
			szRetValue = szValue;

		if(nComma>= 0)
		{
			while(szRetValue.charAt(szRetValue.length()-1)=='0')
			{
				szRetValue=szRetValue.substring(0,szRetValue.length()-1);
			}

			if(nComma==szRetValue.length()-1)
				szRetValue=szRetValue.substring(0,szRetValue.length()-1);
		}

		if(szRetValue.length()==0)
			szRetValue="0";

		return szRetValue;
	}
	
	/**
	*	뒤에 확장자 잘라내는 모듈 <BR>
	*	@param String szFileName : 파일명
	*	@return String szPrvsFileName : 확장자를 뺀 파일명<BR>
	*			예)abc.html -> abc
	*/
	public static String gfEraseExt(String szFileName) throws NullPointerException
	{
		StringTokenizer st = new StringTokenizer(szFileName, ".");
		String szPrvsFileName = szFileName;

		if (st.hasMoreTokens())
  	    	szPrvsFileName = st.nextToken();

		return szPrvsFileName ;
	}
	
	/**
	*	파일의 확장자 구하는 모듈 <BR>
	*	@param String szFileName : 파일명
	*	@return String szFileName : 확장자<BR>
	*			예)abc.html -> html
	*/
	public static String gfGetExt(String szFileName) throws NullPointerException
	{
		int nlastStart = szFileName.lastIndexOf(".");
		
		if (nlastStart>=0)
		{
			szFileName = szFileName.substring(nlastStart+1);
		}
		return szFileName;
	}
	
	/**
	*	파일의 확장자 구하는 모듈 <BR>
	*	@param String szFileName : 파일명
	*	@return String szFileName : 확장자<BR>
	*			예)abc.html -> html
	*/
	public static boolean gfChkImg(String szFileName) throws NullPointerException
	{
		int nlastStart = szFileName.lastIndexOf(".");
		boolean bChk = false;
		
		if (nlastStart>=0)
		{
			szFileName = szFileName.substring(nlastStart+1);
			szFileName = szFileName.toLowerCase();
		}
		
		if (szFileName.equals("jpg") || szFileName.equals("jpeg") || szFileName.equals("gif") || szFileName.equals("tif") || szFileName.equals("bmp") || szFileName.equals("png")) {
			bChk = true;
		}
		
		return bChk;
	}
	
	/**
	*	특정 마지막 구분자 이후의 값 ex) com.hs.eip.XXX ==> XXX <BR>
	*	@param 	String szDel : 구분자<BR>
	*			String szVal : 입력 문자열
	*	@return String szVal
	*/
	public static String gfGetLastStr(String szDel, String szVal) throws Exception
	{
		int nlastStart=szVal.lastIndexOf(szDel);
		if (nlastStart>=0)
		{
			szVal=szVal.substring(nlastStart+1);
		}
		return szVal;
	}
	
	/**
	* 	여러개의 값을 특정문자로 구분하여 잘라낸다.<BR>
	*	@param 	String inputstr : 입력 문자열<BR>
	*			String szVal : 특정문자
	*	@return Vector vResult
	*/
	public static Vector<String> gfTokenStr(String inputstr, String szVal) throws NullPointerException{
		StringTokenizer st = new StringTokenizer(inputstr, szVal);
		Vector<String> vResult = new Vector<String>();
		String	szRst;

		while(st.hasMoreTokens()) {
  	    	szRst = st.nextToken();
			vResult.addElement(szRst);
		}
		return vResult ;
	}
	
	/**
	* 	여러개의 값을 특정문자로 구분하여 잘라서 String Array로 return한다.<BR>
	*  	#EXAMPLE MenuMgr menumgr = new MenuMgr(); <BR>
	*                   menumgr.setQuery(query); <BR>
	*                   menumgr.voAppInfo(int menuId); <BR>
	*	@param 	String szInputStr : 입력 문자열<BR>
	*			String szDelimeter : 특정문자
	*	@return String[] szRet
	*/
	public static String[] gfTokenStrArry(String szInputStr, String szDelimeter) throws Exception
	{
		int nIndex = 0;
		String[] szRet = null;

		StringTokenizer st = new StringTokenizer(szInputStr, szDelimeter);
		int nCount = st.countTokens();
		if(nCount > 0)
		{
			szRet = new String[nCount];
			while(st.hasMoreTokens())
			{
				String szToken = st.nextToken();
				szRet[nIndex++] = szToken.trim();
			}
		}
		return szRet;
	}
	
	/**	
	*	Vector의 element들을 "('V1', V2, 'V3', ...,'Vn')"으로 만든다.
	* 	@param	List values : 변경될 vector
	* 	@return	String szSet
	* 			예) "('V1', V2, 'V3', ...,'Vn')"
	*/
	public static String gfValueSet(List<String> values) throws Exception
	{
		if(values.isEmpty())
			return "('')";
		int nCount = values.size();
		StringBuffer szSet = new StringBuffer(12*nCount); // 12 : element값이 대개 9자리
		szSet.append("('").append(values.get(0).toString());
		for(int i=1; i < nCount; i++){
			szSet.append("','").append(values.get(i).toString());
		}
		szSet.append("')");
		return szSet.toString();
	}
	
	/**
	* 	toValueSet과 동일한 일을 수행하지만<BR>
	* 	여기서는 특별히 SQL의 IN 절을 만드는 일을 수행한다.<BR>
	* 	ORACLE같은 경우 IN절에 ITEM을 250개 이상을 사용할 수 없으므로<BR>
	* 	중간에 OR를 사용해 두개의 IN절로 만든다.<BR>
	* 	@param	String szFieldName : DB필드명<BR>
	* 			List vItems : IN절에 들어갈 ITEM들(String)
	* 	@return	String szSQL <BR> 
	* 			예) "szFieldName IN ('V1', V2,...,'V250') OR szFieldName IN ('V251', V252, ...,'Vn')"
	*/
	public static String gfValueSetSql(String szFieldName, List<String> vItems) throws Exception
	{
		int nCount = vItems.size();
		StringBuffer szSQL = new StringBuffer(12*nCount);
		String szItemTmp = null;
		List<String> vTmp = new ArrayList<String>(nCount);
		int nMAXITEMCOUNT = 250;
		if (nCount > nMAXITEMCOUNT){
			int nStartIndex = 0;
			int nEndIndex = nMAXITEMCOUNT;
			szSQL.append("(");
			for(int i = 0; i < Math.round(nCount/nMAXITEMCOUNT+0.5); i++){
				for(int j = nStartIndex; j < nEndIndex; j++){
					vTmp.add(vItems.get(j).toString());
				}
				if(vTmp.size() == 0) break;
				nStartIndex = nEndIndex;
				nEndIndex = nEndIndex + nMAXITEMCOUNT;
				if(vItems.size() < nEndIndex){
					nEndIndex = vItems.size();
				}
				szItemTmp = gfValueSet(vTmp);
				if(i == 0){
					szSQL.append(szFieldName).append(" IN ").append(szItemTmp);
				}else{
					szSQL.append(" OR ").append(szFieldName).append(" IN ").append(szItemTmp);
				}
				vTmp.clear();
			 }
			szSQL.append(")");
		 }else{
			szSQL.append(szFieldName).append(" IN ").append(gfValueSet(vItems));
		 }
		 return szSQL.toString();
	}
	
	/**
	*	전달받은 원래의 문자열에서 CarrageReturn, NewLine(\r\n)을 제거한다.<BR>
	*	@param	String	szOrgText	입력 문자열
	*	@return	String	szReturn	변환 문자열
	*/
	public static String gfRmCR(String szOrgText) throws Exception
	{
		String szReturn = null;
		try
		{
			szReturn = gfRplcAllStr(szOrgText, "\r\n", "");
			szReturn = gfRplcAllStr(szOrgText, "\n", "");
		}
		catch(Exception e)
		{
			throw e;
		}
		return szReturn;
	}
	
	/**
	* 	Stirng  으로 넘어온 list 값을 list배열로 만듬
	*	@param	String inputstr	: 입력 문자열<BR>
	*			String discriminator
	*	@return	List listBind
	*/
	public static List<String> gfGetLst(String inputstr , String discriminator) throws Exception
	{
		 List<String> listBind = new ArrayList<String>();

		StringTokenizer st = new StringTokenizer(inputstr, discriminator);
		int count = st.countTokens();
        if(count > 0)
        {            
            while(st.hasMoreTokens())
            {
                String szToken = st.nextToken();
                listBind.add(szToken);				
            }
        }
        return listBind;
    }
	
	/**
    * 	지정한 자리수에 맞도록 앞에 '0'을 채운다. (예: "00001")
    * 	@param  String szSequenceNm : 입력 문자열<BR>
    * 			int nSize : 자릿수
    * 	@return String sbId
    */
    public static String gfRtnPrm(String szSrctNm, int nSize) throws Exception
    {
        StringBuffer sbId = new StringBuffer(szSrctNm);
        for(int i=0; i<(nSize-sbId.length())*nSize; i++)
        {
            sbId.insert(0,"0");
        }
        return sbId.toString();
    }
    
    /**
    * 	지정한 자리수에 맞도록 앞에 '0' 을 채운다. (예: "00001")
    * 	@param	String szSrctNm : 입력 문자열
    * 			String szInsrtStr
    * 			int nSize : 자릿수
    * 	@return String  sbId
    */
    public static String gfRtnStrPrm(String szSrctNm, String szInsrtStr, int nSize) throws Exception
    {
        StringBuffer sbId = new StringBuffer(szSrctNm);
        for(int i=0; i<(nSize-sbId.length())*nSize; i++)
        {
            sbId.insert(0, szInsrtStr);
        }
        return sbId.toString();
    }
    
    /**
    * 	검색어 Escape ("%", "_", "'") 처리
 	* 	pfSearchEscape(검색어) -> " LIKE '%검색어%' " 처리
 	* 	@param	String str : 입력 문자열
    * 	@return String strRtn
    */
 	public static String gfRplcSrchEscape(String str) {

 		String strRtn = "";

 		if (str.indexOf("'") > -1) str = StrUtil.gfRplcStr2(str, "'", "''");
 		
 		if (StrUtil.gfStrCount(str, "%") > 0 || StrUtil.gfStrCount(str, "_") > 0) {
 			if (str.indexOf("/") > -1) str = StrUtil.gfRplcStr2(str, "/", "//");
 			if (str.indexOf("%") > -1) str = StrUtil.gfRplcStr2(str, "%", "/%");
 			if (str.indexOf("_") > -1) str = StrUtil.gfRplcStr2(str, "_", "/_");
 			strRtn = " LIKE '%" + str + "%' ESCAPE '/' ";
 		} else {
 			strRtn = " LIKE '%" + str + "%' ";
 		}

 		return strRtn;
 	}
 	
 	/**
    * 	TextArea에서 받은 캐리지 리턴값을 <BR>태그로 변환
  	* 	@param	String comment : 입력 문자열
    * 	@return String buffer
    */
	public static String gfRplcNToBr(String comment)
	{			
		if (comment==null || comment=="") return "";
	
		int length = comment.length();
		StringBuffer buffer = new StringBuffer();
	
		for (int i=0; i < length; ++i) {
			String comp= comment.substring(i, i+1);
			if("\r".compareTo(comp) == 0) {
				comp = comment.substring(++i, i+1);
				if("\n".compareTo(comp) == 0)
					buffer.append("<BR>\r");
				else
				  buffer.append("\r");
			}		
			buffer.append(comp);
		}	
		return buffer.toString();
	}
	
	/**
    * 	읽기 화면에서 링크 주소가 있는경우 자동으로 링크 태그를 만들어주는 함수.
  	* 	@param	String str : 입력 문자열
    * 	@return String sb
    */
	public static String gfAutoLink(String str) {
		if (str==null) return "";
		
		String tmp = str;
		int itmp = 0;
		int wend = 0;
	
		StringBuffer sb = new StringBuffer();
		sb.append("");
		
		while(tmp.indexOf("http://")>-1) {
			itmp = tmp.indexOf("http://");
			wend = tmp.indexOf(" ",itmp);
			if (wend>tmp.indexOf(")",itmp) && tmp.indexOf(")",itmp)>-1) wend = tmp.indexOf(")",itmp);
			if (wend>tmp.indexOf("<",itmp) && tmp.indexOf("<",itmp)>-1) wend = tmp.indexOf("<",itmp);
			if (wend==-1) wend = tmp.length();
			sb.append(tmp.substring(0,itmp));
		
			if(itmp>3 && tmp.substring(itmp-3,itmp).indexOf("=")>-1) {
				wend = tmp.indexOf("</a>",itmp)+3;
				if (wend==2) wend = tmp.indexOf(">",itmp);
					sb.append(tmp.substring(itmp,wend));
				} else {
					sb.append("<a href=\""+tmp.substring(itmp,wend)+"\" target=\"_blank\""+">");
					sb.append(tmp.substring(itmp,wend));
					sb.append("</a>");
				}
			tmp=tmp.substring(wend);
		}
		sb.append(tmp);
		
		tmp = sb.toString();
		sb.setLength(0);
	
		while(tmp.indexOf("www.")>-1) {
			itmp = tmp.indexOf("www.");
			wend = tmp.indexOf(" ",itmp);
			if (wend>tmp.indexOf(")",itmp) && tmp.indexOf(")",itmp)>-1) wend = tmp.indexOf(")",itmp);
			if (wend>tmp.indexOf("<",itmp) && tmp.indexOf("<",itmp)>-1) wend = tmp.indexOf("<",itmp);
			if (wend==-1) wend = tmp.length();
			sb.append(tmp.substring(0,itmp));
			if(itmp>10 && tmp.substring(itmp-10,itmp).indexOf("=")>-1) {
				wend = tmp.indexOf("</a>",itmp)+3;
		
				if (wend==2) wend = tmp.indexOf(">",itmp);
					sb.append(tmp.substring(itmp,wend));
				} else {
					sb.append("<a href=\"http://"+tmp.substring(itmp,wend)+"\" target=\"_blank\""+" >");
					sb.append(tmp.substring(itmp,wend));
					sb.append("</a>");
				}
			tmp=tmp.substring(wend);
		}
		sb.append(tmp);
	
		return sb.toString();
	}
	
	/**
    * 	str에 해당하는 경고메세지를 띄운다.<BR>
	*   예) out.println(StrUtil.pfMakeAlert("ALERT!!"));<BR>
  	* 	@param	String str : 입력 문자열
    * 	@return String rtn
    */
	public static String gfMakeAlert(String str) {
		String rtn = "";
		if (str == null || str.trim().length() == 0) return "";
		rtn = "<script language=javascript>\r\n" +
			"alert('" + str + "');\r\n" +
			"</script>";
		
		return rtn;
	}
	
	/**
    * 	str에 해당하는 경고메세지를 띄우고 이전 페이지로 이동시킨다.<BR>
	*   예) ex)out.println(StrUtil.pfMakeAlertBack("ALERT!!"));<BR>
  	* 	@param	String str : 입력 문자열
    * 	@return String rtn
    */
	public static String gfMakeAlertBack(String str) {
		String rtn = "";
		if (str == null || str.trim().length() == 0) return "";
		rtn = "<script language=javascript>\r\n" +
			"alert('" + str + "');\r\n" +
			"history.back();\r\n" +
			"</script>";
		
		return rtn;
	}
	
	/**
    * 	세자리마다 콤마찍은 숫자 만들기
  	* 	@param	String strNum : 입력 문자열
    * 	@return String 
    */
	public static String gfCommaNum(String strNum) {
		DecimalFormat cdf = new DecimalFormat("#,###");
		if (strNum == null || strNum.equals("")){
			return "";
		}

		return cdf.format(Double.parseDouble(strNum));
	}
	
	/**
	* 	select ~ option 문자열 생성(&lt;select&gt;~&lt;/select&gt;구문은 제외) :<BR>
	*  	"&lt;option value=''&gt;&lt;/option&gt" 형태의 스트링을 반환한다.<BR>
	* 	@param	String pOptStr <BR>
	* 			String pMatchStr<BR>
	* 			String pCaption
    * 	@return String 
	*/
	public static String gfMakeCombo(String pOptStr, String pMatchStr, String pCaption) {
	
	    String sSelectStr = "";
	    
	    pOptStr = pOptStr.trim();
	    pMatchStr = pMatchStr.trim();
	    pCaption = pCaption.trim();
	    
	    if (pOptStr.equals(pMatchStr)) {
	    	sSelectStr = " selected";
	    }
	    
	    return "<option value='" + pOptStr + "'" + sSelectStr + ">" + pCaption + "</option>";
	}
	
	/**
	* 	input type="radio" 문자열 생성 : pfMakeCombo와 유사하게 작동함 :<BR>
	*  	"&lt;option value=''&gt;&lt;/option&gt" 형태의 스트링을 반환한다.
	* 	@param	String pName <BR>
	* 			String pValue<BR>
	* 			String pMatchStr<BR>
	* 			String pCaption
    * 	@return String 
	*/
	public static String gfMakeRadio(String pName, String pValue, String pMatchStr, String pCaption) {
	        
	    String sCheckStr = "";
	    
	    pName = pName.trim();
	    pValue = pValue.trim();
	    pMatchStr = pMatchStr.trim();
	    pCaption = pCaption.trim();
	    
	    if (pValue.equals(pMatchStr)) {
	    	sCheckStr = " checked";
	    }
	    
	    return "<input type='radio' name='" + pName + "' value='" + pValue + "'" + sCheckStr + ">" + pCaption;
		        
	}

	/**
	* 	17자리 혹은 8자리의 str을 받으면 2003.04.01 의 형식으로 리턴한다.
	* 	@param	String str : 입력 문자열 <BR>
    * 	@return String rtn
	*/
	public static String gfDateFormat(String str) {
		String rtn = "";

		if (str == null) return "";
		if (str.length() == 0) return "";

		if (str.length() >= 8) {
			
			if (str.equals("00000000"))	return "미상";
			if (!str.substring(0,4).equals("0000")) {
				if (str.substring(4,8).equals("0000")) return str.substring(0,4);
			}
			if (!str.substring(0,6).equals("000000")) {
				if (str.substring(6,8).equals("00")) return str.substring(0,4) + "." + str.substring(4,6);
			}
			
			rtn = str.substring(0,4) + "." + str.substring(4,6) + "." + str.substring(6,8);
			
		} 

		return rtn;
	}
	
	/**
	* 	17자리 혹은 8자리의 str을 받으면 2003.04.01 또는 2003.04.01 00:00:00 의 형식으로 리턴한다.
	* 	@param	String str : 입력 문자열 <BR>
    * 	@return String rtn
	*/
	public static String gfDateTimeFormat(String str) {
		String rtn = "";

		if (str == null) return "";
		if (str.length() == 0) return "";

		if (str.length() == 8) {
			rtn = str.substring(0,4) + "." + str.substring(4,6) + "." + str.substring(6,8);
		} else if(str.length() == 17) {
			rtn = str.substring(0,4) + "." + str.substring(4,6) + "." + str.substring(6,17);
		}

		return rtn;
	}
	
	/**
	* 	17자리 혹은 8자리의 str을 받으면 2003.04.01 또는 2003.04.01 00:00:00 의 형식으로 리턴한다.
	* 	@param	String str : 입력 문자열 <BR>
    * 	@return String rtn
	*/
	public static String gfDateTimeFormat(String str, String Gubun) {
		String rtn = "";

		if (str == null) return "";
		if (str.length() == 0) return "";

		if (str.length() == 8) {
			rtn = str.substring(0,4) + Gubun + str.substring(4,6) + Gubun + str.substring(6,8);
		} else if(str.length() == 17) {
			rtn = str.substring(0,4) + Gubun + str.substring(4,6) + Gubun + str.substring(6,17);
		}

		return rtn;
	}
	
	/**
	* 	날짜 Format
	* 	@param String format	
    * 	@return String
	*/
	private static String gfFormat(String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);

		return sdf.format(new java.util.Date());
	}
	
	/**
	* 	현재(System TimeZone 및 Locale 기준) 날짜정보를 얻는다.<BR>
	* 	"yyyyMMdd" 형태의 스트링을 반환한다.
	* 	@param	
    * 	@return String
	*/
	public static String gfGetCurDate() {
		return gfFormat("yyyyMMdd");
	}
	
	/**
	* 	현재(System TimeZone 및 Locale 기준) 날짜/시간정보를 얻는다.<BR>
	* 	"yyyyMMdd HH:mm:ss" 형태의 스트링을 반환한다.
	* 	@param	
    * 	@return String
	*/
	public static String gfGetCurDateTime() {
		return gfFormat("yyyyMMdd HH:mm:ss");
	}
	
	/**
	* 	현재(System TimeZone 및 Locale 기준) 날짜/시간정보를 얻는다.<BR>
	* 	"yyyyMMdd HH:mm:ss:SSS" 형태의 스트링을 반환한다.
	* 	@param	
    * 	@return String
	*/
	public static String gfGetCurDateTimeMS() {
		return gfFormat("yyyyMMdd HH:mm:ss.SSS");
	}
	
	/**
	* 	TIME STAMP용 함수 : YYYYMMDDHHMISS 로 리턴
	* 	@param	
    * 	@return String
	*/
	public static String gfGetCurDateTimeStmp() {
		return gfFormat("yyyyMMddHHmmss");
	}
	
	/**
	* 	TIME STAMP용 함수 : YYYYMMDDHHMISS 로 리턴
	* 	@param	
    * 	@return String
	*/
	public static String gfGetCurDateTimeStmpMS() {
		return gfFormat("yyyyMMddHHmmssSSS");
	}
	
	/**
	* 	Print용 함수 : 2003. 10. 10 으로 리턴
	* 	@param	
    * 	@return String
	*/
	public static String gfGetCurDatePrt() {
		return gfFormat("yyyy. MM. dd");
	}

	/**
	* 	현재(System TimeZone 및 Locale 기준) 연도를 리턴한다.<BR>
	* 	"yyyy" 형태의 스트링을 반환한다.
	* 	@param	
    * 	@return String
	*/
	public static String gfGetCurYear() {
		return gfFormat("yyyy");
	}
	
	/**
	* 	그 주의 첫날짜 구하기
	* 	@param	String strDate
    * 	@return String
	*/
	public static String gfGetFrstDateOfWeek(String strDate) {
		if (strDate == null || strDate.equals("")) {
			return "";
		}
		
		Calendar oCal = Calendar.getInstance();
		int  iYear = Integer.parseInt(strDate.substring(0,4));
		int  iMonth = Integer.parseInt(strDate.substring(4,6)) - 1;
		int  iDay = Integer.parseInt(strDate.substring(6,8));
		oCal.set(iYear,iMonth,iDay);

		int tempDay = oCal.get(Calendar.DAY_OF_WEEK);
		oCal.add(Calendar.DATE, -1*tempDay + 1);		

		Date tempDate= oCal.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		return sdf.format(tempDate);		
	}
	
	/**
	* 	그 주의 마지막날짜 구하기
	* 	@param	String strDate
    * 	@return String
	*/
	public static String gfGetLastDateOfWeek(String strDate) {
		if (strDate == null || strDate.equals("")) {
			return "";
		}
		
		Calendar oCal = Calendar.getInstance();
		int  iYear = Integer.parseInt(strDate.substring(0,4));
		int  iMonth = Integer.parseInt(strDate.substring(4,6)) - 1;
		int  iDay = Integer.parseInt(strDate.substring(6,8));
		oCal.set(iYear,iMonth,iDay);

		int tempDay = oCal.get(Calendar.DAY_OF_WEEK);
		oCal.add(Calendar.DATE, 7 - tempDay);		

		Date tempDate= oCal.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		return sdf.format(tempDate);		
	}
	
	static int ciPerPage = 10;
	static int ciPerPage3 = 50;
	static int ciJumpCnt = 10;
	static int ciJumpCnt3 = 50;

	/**
	* 	페이징 처리 (배열로 Block 단위로 받아서 처리)
	* 	@param	String[] arrID<BR>
	* 			String pPageID<BR>
	* 			int pPageCnt<BR>
	* 			String pBlockID<BR>
	* 			int pBlockCnt<BR>
	* 			String pDir
    * 	@return String
	*/
	public static String gfPaging(String[] arrID, String pPageID, int pPageCnt, String pBlockID, int pBlockCnt, String pDir) throws Exception {
	
		String sPageLink = "";
		String sTempID = "";

		int iCnt = 0;
		int iRecCnt = arrID.length;
	
		sTempID = arrID[0];
		if (pPageID.equals("")) pPageID = sTempID;

		// (1) [이전10개] 부분 처리
		if (pBlockCnt > 1) {									// 이전페이지
			//sPageLink = "<a href=\"javascript:jsSendPaging('','" + (pBlockCnt - 1) * ciJumpCnt + "','" + sTempID + "','" + (pBlockCnt - 1) + "','P');\" class=\"list\">◀</a>&nbsp;&nbsp;";
			sPageLink = "<a href=\"javascript:jsSendPaging('','" + ((pBlockCnt - 2) * ciJumpCnt + 1) + "','" + sTempID + "','" + (pBlockCnt - 1) + "','P');\" class=\"list\">◀</a>&nbsp;&nbsp;";
		} else {
			sPageLink = "◀&nbsp;&nbsp;";
		}
		
		// (2) Page Jump Link 처리
		for (iCnt=1; iCnt <= iRecCnt; iCnt++) {
			if ((iCnt % ciPerPage == 1) && ((iCnt / ciPerPage) < ciJumpCnt)) {
				if (((iCnt / ciPerPage) + ((pBlockCnt - 1) * ciJumpCnt)) == (pPageCnt - 1)) {
					pPageID = arrID[iCnt - 1];
					sPageLink = sPageLink + "<span class='page'>" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage) + 1) + "</span>&nbsp;&nbsp;";
				} else {
					sTempID = arrID[iCnt - 1];
					sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('" + sTempID + "','" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage) + 1) + "','" + pBlockID + "','" + pBlockCnt + "','" + pDir + "');\" class=\"page\">" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage) + 1) + "</a>&nbsp;&nbsp;";
				}
			}
		}
	
		sTempID = arrID[iRecCnt - 1];

		// (3) [다음10개] 부분 처리
		if (iRecCnt == ciJumpCnt * ciPerPage + 1) {				// 다음페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('" + sTempID + "','" + ((pBlockCnt) * ciJumpCnt + 1) + "','" + sTempID + "','" + (pBlockCnt + 1) + "','N');\" class=\"list\">▶</a>";
		} 
		else {
			sPageLink = sPageLink + "▶&nbsp;";
		}

		return sPageLink;
	}

	/**
	* 	페이징 처리 (배열로 Block 단위로 받아서 처리)
	* 	@param	int iTotalCnt<BR>
	* 			String[] arrID<BR>
	* 			String pPageID<BR>
	* 			int pPageCnt<BR>
	* 			String pBlockID<BR>
	* 			int pBlockCnt<BR>
	* 			String pDir
    * 	@return String
	*/
	public static String gfPaging2(int iTotalCnt, String[] arrID, String pPageID, int pPageCnt, String pBlockID, int pBlockCnt, String pDir) throws Exception {
	
		String sPageLink = "";

		int iCnt = 0;
		int iRecCnt = arrID.length;

		// (1) [처음] 부분 처리
		if (pPageCnt > 1) {										// 첫페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('','1','','1','S');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_first','','/image/common/pg_first_over.gif',1);\"><img src=\"/image/common/pg_first.gif\" name=\"pg_first\" border=\"0\" align=\"absmiddle\"></a>";
		} else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_first.gif\" border=\"0\" align=\"absmiddle\">";
		}

		// (2) [이전] 부분 처리
		if (pBlockCnt > 1) {									// 이전페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('','" + ((pBlockCnt - 2) * ciJumpCnt + 1) + "','" + arrID[0] + "','" + (pBlockCnt - 1) + "','P');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_prev','','/image/common/pg_prev_over.gif',1);\"><img src=\"/image/common/pg_prev.gif\" name=\"pg_prev\" border=\"0\" align=\"absmiddle\"></a>";
		} else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_prev.gif\" border=\"0\" align=\"absmiddle\">";
		}

		sPageLink = sPageLink + "&nbsp;&nbsp;";

		if (pDir.equals("L")) {
			if (iTotalCnt > ciJumpCnt * ciPerPage) {
				pDir = "N";
			} else {
				pDir = "S";
			}
		}

		// (3) Page Jump Link 처리
		for (iCnt=1; iCnt <= iRecCnt; iCnt++) {
			if ((iCnt % ciPerPage == 1) && ((iCnt / ciPerPage) < ciJumpCnt)) {
				if (((iCnt / ciPerPage) + ((pBlockCnt - 1) * ciJumpCnt)) == (pPageCnt - 1)) {
					sPageLink = sPageLink + "<span class='page'>" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage) + 1) + "</span>&nbsp;&nbsp;";
				} else {
					sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('" + arrID[iCnt - 1] + "','" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage) + 1) + "','" + pBlockID + "','" + pBlockCnt + "','" + pDir + "');\" class=\"page\">" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage) + 1) + "</a>&nbsp;&nbsp;";
				}
			}
		}
	
		// (4) [다음] 부분 처리
		if (iRecCnt == ciJumpCnt * ciPerPage + 1) {				// 다음페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('" + arrID[iRecCnt - 1] + "','" + ((pBlockCnt) * ciJumpCnt + 1) + "','" + arrID[iRecCnt - 1] + "','" + (pBlockCnt + 1) + "','N');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_next','','/image/common/pg_next_over.gif',1);\"><img src=\"/image/common/pg_next.gif\" name=\"pg_next\" border=\"0\" align=\"absmiddle\"></a>";
		} 
		else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_next.gif\" border=\"0\" align=\"absmiddle\">";
		}

		// (5) [맨끝] 부분 처리
		if (iTotalCnt / ciPerPage >= pPageCnt) {				// 마지막페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('','" + ((iTotalCnt - 1) / (ciPerPage) + 1) + "','','" + ((iTotalCnt - 1) / (ciJumpCnt * ciPerPage) + 1) + "','L');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_last','','/image/common/pg_last_over.gif',1);\"><img src=\"/image/common/pg_last.gif\" name=\"pg_last\" border=\"0\" align=\"absmiddle\"></a>";
		} else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_last.gif\" border=\"0\" align=\"absmiddle\">";
		}

		return sPageLink;
	}

	/**
	* 	페이징 처리 (배열로 Block 단위로 받아서 처리)
	* 	@param	int iTotalCnt<BR>
	* 			String[] arrID<BR>
	* 			String pPageID<BR>
	* 			int pPageCnt<BR>
	* 			String pBlockID<BR>
	* 			int pBlockCnt<BR>
	* 			String pDir
    * 	@return String
	*/
	public static String gfPaging3(int iTotalCnt, String[] arrID, String pPageID, int pPageCnt, String pBlockID, int pBlockCnt, String pDir) throws Exception {
	
		String sPageLink = "";

		int iCnt = 0;
		int iRecCnt = arrID.length;

		// (1) [처음] 부분 처리
		if (pPageCnt > 1) {										// 첫페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('','1','','1','S');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_first','','/image/common/pg_first_over.gif',1);\"><img src=\"/image/common/pg_first.gif\" name=\"pg_first\" border=\"0\" align=\"absmiddle\"></a>";
		} else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_first.gif\" border=\"0\" align=\"absmiddle\">";
		}

		// (2) [이전] 부분 처리
		if (pBlockCnt > 1) {									// 이전페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('','" + ((pBlockCnt - 2) * ciJumpCnt + 1) + "','" + arrID[0] + "','" + (pBlockCnt - 1) + "','P');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_prev','','/image/common/pg_prev_over.gif',1);\"><img src=\"/image/common/pg_prev.gif\" name=\"pg_prev\" border=\"0\" align=\"absmiddle\"></a>";
		} else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_prev.gif\" border=\"0\" align=\"absmiddle\">";
		}

		sPageLink = sPageLink + "&nbsp;&nbsp;";

		if (pDir.equals("L")) {
			if (iTotalCnt > ciJumpCnt * ciPerPage3) {
				pDir = "N";
			} else {
				pDir = "S";
			}
		}

		// (3) Page Jump Link 처리
		for (iCnt=1; iCnt <= iRecCnt; iCnt++) {
			if ((iCnt % ciPerPage3 == 1) && ((iCnt / ciPerPage3) < ciJumpCnt)) {
				if (((iCnt / ciPerPage3) + ((pBlockCnt - 1) * ciJumpCnt)) == (pPageCnt - 1)) {
					sPageLink = sPageLink + "<span class='page'>" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage3) + 1) + "</span>&nbsp;&nbsp;";
				} else {
					sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('" + arrID[iCnt - 1] + "','" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage3) + 1) + "','" + pBlockID + "','" + pBlockCnt + "','" + pDir + "');\" class=\"page\">" + ((pBlockCnt - 1) * ciJumpCnt + (iCnt / ciPerPage3) + 1) + "</a>&nbsp;&nbsp;";
				}
			}
		}
	
		// (4) [다음] 부분 처리
		if (iRecCnt == ciJumpCnt * ciPerPage3 + 1) {				// 다음페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('" + arrID[iRecCnt - 1] + "','" + ((pBlockCnt) * ciJumpCnt + 1) + "','" + arrID[iRecCnt - 1] + "','" + (pBlockCnt + 1) + "','N');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_next','','/image/common/pg_next_over.gif',1);\"><img src=\"/image/common/pg_next.gif\" name=\"pg_next\" border=\"0\" align=\"absmiddle\"></a>";
		} 
		else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_next.gif\" border=\"0\" align=\"absmiddle\">";
		}

		// (5) [맨끝] 부분 처리
		if (iTotalCnt / ciPerPage3 >= pPageCnt) {				// 마지막페이지
			sPageLink = sPageLink + "<a href=\"javascript:jsSendPaging('','" + ((iTotalCnt - 1) / (ciPerPage3) + 1) + "','','" + ((iTotalCnt - 1) / (ciJumpCnt * ciPerPage3) + 1) + "','L');\" onMouseOut=\"MM_swapImgRestore()\" onMouseOver=\"MM_swapImage('pg_last','','/image/common/pg_last_over.gif',1);\"><img src=\"/image/common/pg_last.gif\" name=\"pg_last\" border=\"0\" align=\"absmiddle\"></a>";
		} else {
			sPageLink = sPageLink + "<img src=\"/image/common/pg_last.gif\" border=\"0\" align=\"absmiddle\">";
		}

		return sPageLink;
	}
	
	
	/**
	*  수집번호, 수집상자번호, 보존상자번호 처리
	*  @param 	int iSerial  		일련번호
	*    		String sGubun  		구분(C:수집상자, B:보존상자)
	*  @return 	String szRetValue 	결과
	*/
	public static String gfGetBoxNo(int iSerial, String sGubun)  throws Exception
	{
		String szRetValue = "";
 
		if (iSerial == 0) {
			return "";
		} else {
			szRetValue = sGubun + iSerial;		
			return szRetValue;
		}				
	}

	/**
	*  수집번호, 수집상자번호, 보존상자번호 처리
	*  @param 	int iSerial  		일련번호
	*    		int iSort  			상자번호
	*    		String sGubun  		구분(C:수집상자, B:보존상자)
	*  @return 	String szRetValue 	결과
	*/
	public static String gfGetBoxNo(String sBoxNo, String sGubun)  throws Exception
	{
		String szRetValue = "";
	 
		szRetValue = StrUtil.gfRplcAllStr(sBoxNo, sGubun, "");

		return szRetValue;
	}
	
	/**
	*  상자번호 처리<BR>
	*  @param String iSerial  일련번호
	*    String dGubun  구분(C:수집상자, B:보존상자)
	*  @return String szRetValue 결과
	*/
	public static String gfGetBoxNo(int iSerial, int iSort, String sGubun)  throws Exception
	{
		String szRetValue = "";
	 
		szRetValue = sGubun + iSerial + "(" + iSort + ")";

		return szRetValue;
	}
	
	/**
	*  숫자,문자 판별<BR>
	*  @param String str 
	*  @return String szRetValue 결과 (true : 문자, false : 숫자 존재)
	*/
	public static boolean gfChkStrType(String str)  throws Exception
	{
		boolean szRetValue = true;
	 
		char ch;
		int i, j;

		for(i = 0 ; i < str.length(); i++){	//정수형
			ch = str.charAt(i);
			if(Character.isDigit(ch) == true){
				szRetValue = false;
				break;
			}
			else if(ch == '.'){
				for(j = i + 1; j < str.length(); j++){	//실수형
					ch = str.charAt(j);
					if(Character.isDigit(ch) == true){
						szRetValue = false;
						break;
					}
				}
			}
		}
		
	 	return szRetValue;
	}
	
	/**
	*  숫자,문자 판별<BR>
	*  @param String str 
	*  @return String szRetValue 결과 (true : 숫자, false : 문자 존재)
	*/
	public static boolean gfChkNumType(String str)  throws Exception
	{
		boolean szRetValue = true;
	 
		char ch;
		int i, j;

		for(i = 0 ; i < str.length(); i++){
			ch = str.charAt(i);
			if(Character.isDigit(ch) == true){
				szRetValue = true;
			}
			else if(ch == '.'){
				for(j = i + 1; j < str.length(); j++){
					ch = str.charAt(j);
					if(Character.isDigit(ch) == true){
						szRetValue = true;
					}
					else{
						szRetValue = false;
						break;
					}
				}
			}
			else {
				szRetValue = false;
				break;
			}
		}
		
	 	return szRetValue;
	}
	
	// 이상호 코드 -----------------------------------------------------------------------------------------
	public static String gfPackageNm(String str) throws Exception {
		return null;
	}

	
	public static String gfJoin(List<String> strArr, String discriminator) {
		int iCnt;
		String strRtn = "";
		
		if (strArr != null) {
            for (iCnt=0; iCnt < strArr.size(); iCnt++) {
            	strRtn += strArr.get(iCnt) + discriminator;
            }
        }
		
		return strRtn;
	}
	
	public static String gfSharpJoiin(String[] strArr) {
		// TODO 이 메소드는 개선될 소지가 다분함
		int iCnt;
		String strRtn = "";
		
		if (strArr != null) {
            for (iCnt=0; iCnt < strArr.length; iCnt++) {
            	strRtn = strRtn + strArr[iCnt] + "##";
            }
        } else {
        	strRtn = "##";
        }
		
		return strRtn;
	}
	
	public static String gfAtchNewFilename(String sFn, int i, String imSize) {
		String sTempFileName = StrUtil.gfGetCurDateTimeStmpMS() + StrUtil.gfLpad(i, "0", 2);
        String sExt = "." + StrUtil.gfGetExt(sFn);
        
        String sNewFileName = "";
        if ( imSize.equals("N") ) sNewFileName =  sTempFileName + sExt;
        else if ( imSize.equals("S") ) sNewFileName =  sTempFileName + "_S" + sExt;
        	
		return sNewFileName;
	}
	
	public static String gfThumbAtch(String sFn) {
		return "/" + StrUtil.gfRplcAllStr(sFn, ".", "_S.");
	}
	
	public static List<String> gfSharpExtract(String src) throws Exception {
		return Arrays.asList(StrUtil.gfTokenStrArry(src, "##"));
	}
	
	public static String vdAtchIM(String FilePath, String separator, Boolean bSeparator) throws Exception {
		// 파일 이름과 경로를 분리한다.
		int iLastSep = FilePath.lastIndexOf(separator);
		
		// 디렉터리와 이름 구분
		//String sDirectoryPath = FilePath.substring(0, iLastSep);
		String sBaseName = FilePath.substring(iLastSep+1);

		return sBaseName;
	}
	
	private static String[] fileSizeTypes={"bytes","KB","MB","GB","TB"};
	
	/**
	 * 파일사이즈를 bytes, KB, MB, GB, TB 등의 단위를 붙여서 알기쉽게 표현한다. <BR>
	 * @param    size 파일사이즈
	 * @return   사이즈스트링
	 */
	public static String pfFormatFileSize(int size)
	{
		int type = 0;
		int div=1024;

		while (size >= 1024)
		{
			type ++;
			size /= div;
		}
		
		return size + " " + fileSizeTypes[type];
	}
	
	
	/**
	 * 파일 확장자를 넘겨 받아 파일종류를 판단 한다.(동영상,이미지,기타)
	 * @param    파일 확장자
	 * @return   img,mov,etc
	 */
	public static String extensionFilter(String sExt)
	{
		boolean resultMov = false;
		boolean resultImg = false;
		boolean resultAudio = false;
		boolean resultDocu = false;
		String extKind = "";
		
		String extPatternMov = "(avi|wmv|asf|mpeg|flv|mov|dat|rm|vob|ram|mpg|asx|mp4|mkv)";
		String extPatternImg = "(tga|vda|icb|vst|sct|pct|pic|pcx|iff|eps|tif|png|gif|jpg|jpeg|bmp|rle|dib|tdi|jpe|jpf|jpx|jp2|j2c|j2k|jpc|jps|pxr|pns|pbm|pgm|ppm|pnm|pfm|pam)";
		String extPatternAudio = "(3gp|aiff|aac|alac|amr|atrac|au|awb|dvf|flac|mmf|mp3|mpc|msv|ogg|opus|ra|tta|vox|wav|wma)";
		String extPatternDocu = "(txt|doc|docx|dotx|dot|docm|rtf|html|htm|ppt|pptx|xls|xlsx|xml)";
		
		Pattern pMov = Pattern.compile(extPatternMov);
		Matcher mMov = pMov.matcher(sExt);
		resultMov = mMov.matches();
		
		Pattern pImg = Pattern.compile(extPatternImg);
		Matcher mImg = pImg.matcher(sExt);
		resultImg = mImg.matches();
		
		Pattern pAudio = Pattern.compile(extPatternAudio);
		Matcher mAudio = pAudio.matcher(sExt);
		resultAudio = mAudio.matches();
		
		Pattern pDocu = Pattern.compile(extPatternDocu);
		Matcher mDocu = pDocu.matcher(sExt);
		resultDocu = mDocu.matches();
		
		if(resultImg)
		{
			extKind = "img";
		}
		else if(resultMov)
		{
			extKind = "mov";
		}
		else if(resultAudio)
		{
			extKind = "audio";
		}
		else if(resultDocu)
		{
			extKind = "docu";
		}
		else if(!resultImg & !resultMov & !resultAudio & !resultDocu)
		{
			extKind = "etc";
		}
		else if(sExt.equals("pdf"))
		{
			extKind = "pdf";
		}
		return extKind;
	}
}
