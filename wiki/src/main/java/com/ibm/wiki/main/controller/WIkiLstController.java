package com.ibm.wiki.main.controller;

import java.text.DateFormat;
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

import com.ibm.wiki.main.service.WikiLstService;
import com.ibm.wiki.main.vo.WikiLstVO;


@Controller
public class WIkiLstController {
	
	private static final Logger logger = LoggerFactory.getLogger(WIkiLstController.class);
	
	@Resource(name="wikiLstService")
	private WikiLstService wikiLstService;
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		//List<WikiLstVO>() wikiLst = wikiLstService.selectBoardList();
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}

}
