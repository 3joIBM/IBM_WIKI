package com.ibm.wiki.log.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ibm.wiki.log.dao.WikiLogDAO;
import com.ibm.wiki.log.service.WikiLogService;
import com.ibm.wiki.log.vo.WikiLogVO;
import com.ibm.wiki.main.service.WikiLstService;
import com.ibm.wiki.main.vo.WikiLstVO;

@Service("wikiLogService")
public class WikiLogServiceImpl implements WikiLogService{
	Logger log = Logger.getLogger(this.getClass());
	
	@Resource(name="wikiLogDAO")
	private WikiLogDAO wikiLogDAO;
	
	@Override
	public int selectUsrCnt() throws Exception {
		return wikiLogDAO.selectUsrCnt();
	}

	@Override
	public void insertWikiMember(WikiLogVO wikiLogVO) throws Exception {
		wikiLogDAO.insertWikiMember(wikiLogVO);
	}

	@Override
	public int selectUsrChk(WikiLogVO wikiLogVO) throws Exception {		
		return wikiLogDAO.selectUsrChk(wikiLogVO);
	}

	@Override
	public WikiLogVO selectUsrInfo(WikiLogVO wikiLogVO) throws Exception {		
		return wikiLogDAO.selectUsrInfo(wikiLogVO);
	}
}
