package com.ibm.wiki.main.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibm.wiki.main.service.WikiLstService;
import com.ibm.wiki.main.vo.WikiLstVO;

import com.ibm.wiki.common.dao.AbstractDAO;

@Repository("wikiLstDAO")
public class WikiLstDAO extends AbstractDAO{

	@SuppressWarnings("unchecked")
	public List<WikiLstVO> selectBoardList() throws Exception{
		return (List<WikiLstVO>)selectList("main.selectBoardList");
	}

}