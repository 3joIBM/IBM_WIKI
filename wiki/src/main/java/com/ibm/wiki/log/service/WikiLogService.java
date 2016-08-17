package com.ibm.wiki.log.service;

import com.ibm.wiki.log.vo.WikiLogVO;

public interface WikiLogService {

	/*
	 * 전체 유저 수를 카운팅 함
	 * Param : Void
	 * RESULT : Int(총 유저수)
	 */
	int selectUsrCnt() throws Exception;
	
	/*
	 * 신규유저 등록
	 * Param : WikiLogVO
	 * RESULT : Void
	 */
	void insertWikiMember(WikiLogVO wikiLogVO) throws Exception;
	
	/*
	 * 해당유저가 있는지 없는지 체크
	 * Param : USER_ID, USER_PW
	 * RESULT : 1(존재), 0(없음)
	 */
	int selectUsrChk(WikiLogVO wikiLogVO) throws Exception;

	/*
	 * 유저 정보를 얻어옴
	 * Param : WikiLogVO(USER_ID 필수)
	 * RESULT : WikiLogVO
	 */	
	WikiLogVO selectUsrInfo(WikiLogVO wikiLogVO) throws Exception;
}
