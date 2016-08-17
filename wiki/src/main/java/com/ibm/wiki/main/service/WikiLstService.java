package com.ibm.wiki.main.service;

import java.util.List;

import com.ibm.wiki.item.vo.WikiItemVO;

public interface WikiLstService {

	List<WikiItemVO> selectItemList() throws Exception;
}
