package com.ibm.wiki.item.rgst.controller;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.ibm.wiki.common.StrUtil;
import com.ibm.wiki.item.rgst.service.WikiRgstService;
import com.ibm.wiki.item.vo.WikiItemVO;


@Controller
public class WIkiRgstController {
	
	private static final Logger logger = LoggerFactory.getLogger(WIkiRgstController.class);
	
	@Resource(name="wikiRgstService")
	private WikiRgstService wikiRgstService;
	
	@RequestMapping(value = "/item/itemAddAction.do", method = RequestMethod.POST)
	public String rgstAction(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model,
			@RequestParam(value = "pItemTitle", required = false) String pItemTitle,
			@RequestParam(value = "pItemContent", required = false) String pItemContent,
			@RequestParam(value = "pItemAtch", required = false) MultipartFile pItemAtch) {
		
		logger.info("Item Regist Process Start");
		
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		
		String uploadDir = "D:" + File.separator + "Upload";
		String fileNM = StrUtil.gfEraseExt(pItemAtch.getOriginalFilename());
		String fileExt = StrUtil.gfGetExt(pItemAtch.getOriginalFilename());
		
		String saveFileNM = uploadDir + File.separator + fileNM + "_" + dateFormat.format(calendar.getTime()) + "." + fileExt;
		
		if(!pItemAtch.isEmpty()){
			File file = new File(saveFileNM);
			try {
				pItemAtch.transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}			
		}
		
		WikiItemVO wikiItemVO = new WikiItemVO();
		wikiItemVO.setIS_DEL(0);
		wikiItemVO.setITEM_TITLE(pItemTitle);
		wikiItemVO.setITEM_CONTENT(pItemContent);
		wikiItemVO.setITEM_IMG(saveFileNM);
		wikiItemVO.setITEM_HIT(0);
		wikiItemVO.setREG_DT(new Timestamp(System.currentTimeMillis())+"");
		wikiItemVO.setREG_NM(request.getSession().getAttribute("pUsrID").toString());
		wikiItemVO.setMOD_DT("");
		wikiItemVO.setMOD_NM("");
		wikiItemVO.setMOD_CNT(0);
		
		try {
			wikiRgstService.insertItem(wikiItemVO);
		} catch (Exception e) {			
			e.printStackTrace();
		}
		
		logger.info("Title :" + pItemTitle);
		logger.info("Content :" + pItemContent);
		logger.info("File Name :" + pItemAtch.getOriginalFilename());
		
		return "home";
	}

	@RequestMapping(value = "/item/itemAdd.do", method = RequestMethod.POST)
	public ModelAndView rgstView(Locale locale, Model model){
		
		logger.info("Move to Item Add View");
		
		ModelAndView mv = new ModelAndView("/item/itemAdd");
    	
    	return mv;
	}
	
}
