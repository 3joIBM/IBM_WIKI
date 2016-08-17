package com.ibm.wiki.log.dao;

import org.springframework.stereotype.Repository;

import com.ibm.wiki.common.dao.AbstractDAO;
import com.ibm.wiki.log.controller.WIkiLogController;
import com.ibm.wiki.log.vo.WikiLogVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Repository("wikiLogDAO")
public class WikiLogDAO extends AbstractDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(WIkiLogController.class);
	
	/*
	 * 전체 유저 수를 카운팅 함
	 * Param : Void
	 * RESULT : Int(총 유저수)
	 */
	@SuppressWarnings("unchecked")
	public int selectUsrCnt() throws Exception{
		return (Integer) selectOne("member.selectUsrCnt");
	}

	/*
	 * 신규유저 등록
	 * Param : WikiLogVO
	 * RESULT : Void
	 */
	@SuppressWarnings("unchecked")
	public void insertWikiMember(WikiLogVO wikiLogVO) {
		insert("member.insertWikiMember", wikiLogVO);
	}

	/*
	 * 해당유저가 있는지 없는지 체크
	 * Param : USER_ID, USER_PW
	 * RESULT : 1(존재), 0(없음)
	 */
	@SuppressWarnings("unchecked")
	public int selectUsrChk(WikiLogVO wikiLogVO){
		logger.info("User ID : " + wikiLogVO.getUSER_ID());
		logger.info("User PW : " + wikiLogVO.getUSER_PW());
		return (Integer) selectOne("member.selectUsrChk", wikiLogVO);
	}
	
	public WikiLogVO selectUsrInfo(WikiLogVO wikiLogVO){
		return (WikiLogVO) selectOne("member.selectUsrInfo", wikiLogVO);
	}
}