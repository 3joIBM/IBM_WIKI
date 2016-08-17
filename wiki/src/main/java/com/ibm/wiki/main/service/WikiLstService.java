package com.ibm.wiki.main.service;

import java.util.List;
import java.util.Map;

import com.ibm.wiki.main.vo.WikiLstVO;

public interface WikiLstService {

	List<WikiLstVO> selectBoardList() throws Exception;
}
