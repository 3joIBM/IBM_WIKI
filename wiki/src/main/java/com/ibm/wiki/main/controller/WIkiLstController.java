package com.ibm.wiki.main.controller;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.ibm.wiki.item.vo.WikiItemVO;
import com.ibm.wiki.main.service.WikiLstService;

@Controller
public class WIkiLstController {
	
	private static final Logger logger = LoggerFactory.getLogger(WIkiLstController.class);
	
	@Resource(name="wikiLstService")
	private WikiLstService wikiLstService;
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public ModelAndView home(Locale locale, Model model) {
		logger.info("Main Frame");
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);		
		
		List<WikiItemVO> itemLst = null;
		
		try {
			itemLst = wikiLstService.selectItemList();
		} catch (Exception e) {			
			e.printStackTrace();
		}
		
		String formattedDate = dateFormat.format(date);
		//model.addAttribute("serverTime", formattedDate );
		
		ModelAndView mv = new ModelAndView();
		
		mv.addObject("itemLst", itemLst);
		mv.addObject("itemLstCnt", itemLst.size());
		
		mv.setViewName("/home");
		
		return mv;
	}

}
