package com.ibm.wiki.main.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ibm.wiki.item.vo.WikiItemVO;
import com.ibm.wiki.main.dao.WikiLstDAO;
import com.ibm.wiki.main.service.WikiLstService;

@Service("wikiLstService")
public class WikiLstServiceImpl implements WikiLstService{
	Logger log = Logger.getLogger(this.getClass());
	
	@Resource(name="wikiLstDAO")
	private WikiLstDAO wikiLstDAO;
	
	@Override
	public List<WikiItemVO> selectItemList() throws Exception {
		return wikiLstDAO.selectItemList();
	}
}
