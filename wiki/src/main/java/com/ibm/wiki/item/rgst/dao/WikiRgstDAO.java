package com.ibm.wiki.item.rgst.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ibm.wiki.common.dao.AbstractDAO;
import com.ibm.wiki.item.vo.WikiItemVO;

@Repository("wikiRgstDAO")
public class WikiRgstDAO extends AbstractDAO{

	@SuppressWarnings("unchecked")
	public void insertItem(WikiItemVO wikiItemVO) throws Exception{
		insert("item.insertItem", wikiItemVO);
	}

}