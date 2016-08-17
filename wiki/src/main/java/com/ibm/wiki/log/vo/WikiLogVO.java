package com.ibm.wiki.log.vo;

import org.apache.log4j.Logger;

import com.ibm.wiki.common.member.vo.WikiMemVO;

public class WikiLogVO extends WikiMemVO{
	Logger log = Logger.getLogger(this.getClass());
		
	private boolean IsPass = false;

	public boolean isIsPass() {
		return IsPass;
	}

	public void setIsPass(boolean isPass) {
		IsPass = isPass;
	}
	
}
