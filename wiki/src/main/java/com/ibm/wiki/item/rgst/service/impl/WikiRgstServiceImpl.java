package com.ibm.wiki.item.rgst.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ibm.wiki.item.rgst.dao.WikiRgstDAO;
import com.ibm.wiki.item.rgst.service.WikiRgstService;
import com.ibm.wiki.item.vo.WikiItemVO;

@Service("wikiRgstService")
public class WikiRgstServiceImpl implements WikiRgstService{
	Logger log = Logger.getLogger(this.getClass());
	
	@Resource(name="wikiRgstDAO")
	private WikiRgstDAO wikiRgstDAO;

	@Override
	public void insertItem(WikiItemVO wikiItemVO) throws Exception {
		wikiRgstDAO.insertItem(wikiItemVO);
	}
}
