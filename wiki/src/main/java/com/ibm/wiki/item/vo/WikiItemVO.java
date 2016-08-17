package com.ibm.wiki.item.vo;

import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

public class WikiItemVO{
	Logger log = Logger.getLogger(this.getClass());
		
    private String ITEM_ID = "";
	private String ITEM_TITLE = "";
	private String ITEM_CONTENT = "";
	private String ITEM_IMG = "";
	private String REG_NM = "";
	private String REG_DT = "";
	private String MOD_NM = "";
	private String MOD_DT = "";
	private int IS_DEL = 0;
	private long ITEM_HIT = 0;

	public String getITEM_TITLE() {
		return ITEM_TITLE;
	}
	public void setITEM_TITLE(String iTEM_TITLE) {
		ITEM_TITLE = iTEM_TITLE;
	}
	public String getITEM_CONTENT() {
		return ITEM_CONTENT;
	}
	public void setITEM_CONTENT(String iTEM_CONTENT) {
		ITEM_CONTENT = iTEM_CONTENT;
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
	public String getITEM_ID() {
		return ITEM_ID;
	}
	public void setITEM_ID(String iTEM_ID) {
		ITEM_ID = iTEM_ID;
	}
	public String getITEM_IMG() {
		return ITEM_IMG;
	}
	public void setITEM_IMG(String iTEM_IMG) {
		ITEM_IMG = iTEM_IMG;
	}
	public String getMOD_NM() {
		return MOD_NM;
	}
	public void setMOD_NM(String mOD_NM) {
		MOD_NM = mOD_NM;
	}
	public String getMOD_DT() {
		return MOD_DT;
	}
	public void setMOD_DT(String mOD_DT) {
		MOD_DT = mOD_DT;
	}
	public int getIS_DEL() {
		return IS_DEL;
	}
	public void setIS_DEL(int iS_DEL) {
		IS_DEL = iS_DEL;
	}
	public long getITEM_HIT() {
		return ITEM_HIT;
	}
	public void setITEM_HIT(long iTEM_HIT) {
		ITEM_HIT = iTEM_HIT;
	}
}
