package com.ibm.wiki.main.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ibm.wiki.common.dao.AbstractDAO;
import com.ibm.wiki.item.vo.WikiItemVO;

@Repository("wikiLstDAO")
public class WikiLstDAO extends AbstractDAO{

	@SuppressWarnings("unchecked")
	public List<WikiItemVO> selectItemList() throws Exception{
		return (List<WikiItemVO>)selectList("main.selectItemList");
	}

}