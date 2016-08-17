package com.ibm.wiki.main.vo;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ibm.wiki.main.service.WikiLstService;

public class WikiLstVO{
	Logger log = Logger.getLogger(this.getClass());
	
	private int startPage = 0;
	private int endPage = 0;
	private String pLstOrder = "";
	private String pLstLine = "";
	
	public void setPage(int pPage, int pLstSize, String pLstOrder, String pLstLine) {
		this.startPage = (pPage-1)*pLstSize + 1;
		this.endPage = (pPage)*pLstSize; 
		this.pLstOrder = pLstOrder;
		this.pLstLine = pLstLine;
	}
	
	private int BBS_ID = 0;
	private String BBS_TITLE = "";
	private String BBS_CNTS = "";
	private String REG_NM = "";
	private String REG_DT = "";
	
	public int getBBS_ID() {
		return BBS_ID;
	}
	public void setBBS_ID(int bBS_ID) {
		BBS_ID = bBS_ID;
	}
	public String getBBS_TITLE() {
		return BBS_TITLE;
	}
	public void setBBS_TITLE(String bBS_TITLE) {
		BBS_TITLE = bBS_TITLE;
	}
	public String getBBS_CNTS() {
		return BBS_CNTS;
	}
	public void setBBS_CNTS(String bBS_CNTS) {
		BBS_CNTS = bBS_CNTS;
	}
	public String getREG_NM() {
		return REG_NM;
	}
	public void setREG_NM(String rEG_NM) {
		REG_NM = rEG_NM;
	}
	public String getREG_DT() {
		return REG_DT;
	}
	public void setREG_DT(String rEG_DT) {
		REG_DT = rEG_DT;
	}
	public int getStartPage() {
		return startPage;
	}
	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}
	public int getEndPage() {
		return endPage;
	}
	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}
	public String getpLstOrder() {
		return pLstOrder;
	}
	public void setpLstOrder(String pLstOrder) {
		this.pLstOrder = pLstOrder;
	}
	public String getpLstLine() {
		return pLstLine;
	}
	public void setpLstLine(String pLstLine) {
		this.pLstLine = pLstLine;
	}
}
