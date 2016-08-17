package com.ibm.wiki.log.controller;

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
import org.springframework.web.servlet.ModelAndView;

import com.ibm.wiki.log.service.WikiLogService;
import com.ibm.wiki.log.vo.WikiLogVO;

@Controller
public class WIkiLogController {
	
	private static final Logger logger = LoggerFactory.getLogger(WIkiLogController.class);
	
	@Resource(name="wikiLogService")
	private WikiLogService wikiLogService;
	
	@RequestMapping(value = "/log/Login.do", method = RequestMethod.GET)
	public String login(Locale locale, Model model) {
		logger.info("User Login Process");
		
		//List<WikiLstVO>() wikiLst = wikiLstService.selectBoardList();
		int totUsrCnt = 0;
		try {
			totUsrCnt = wikiLogService.selectUsrCnt();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		model.addAttribute("totUsrCnt", totUsrCnt);
		
		return "/log/Login";
	}
	
	@RequestMapping(value = "/log/LoginAction.do")
	public ModelAndView loginAction(HttpServletRequest request, HttpServletResponse response, Locale locale, Model model,
			@RequestParam(value = "pUsrID", required = false) String pUsrID,
			@RequestParam(value = "pUsrPW", required = false) String pUsrPW
	){
		WikiLogVO wikiLogVO = new WikiLogVO();
		
		wikiLogVO.setUSER_ID(pUsrID);
		wikiLogVO.setUSER_PW(pUsrPW);
				
		//아이디랑 비번 체크하고 맞으면 메인화면
		int result = 0;
		try {
			result = wikiLogService.selectUsrChk(wikiLogVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		ModelAndView mv = new ModelAndView();
		
		if(result == 0){
			//아니면 로그인 화면 다시 + alert
			logger.info("No Like User Account");
			mv.setViewName("/log/Login");
			mv.addObject("rsltMsg", "아이디나 비밀번호가 일치하지 않습니다.");
		}else{
			//메인화면으로 이동
			logger.info("User Account Check Success");
			mv.setViewName("/home");
			mv.addObject("pUsrID", pUsrID);
			mv.addObject("pUsrPW", pUsrPW);
			
			try {
				wikiLogVO = wikiLogService.selectUsrInfo(wikiLogVO);
			} catch (Exception e) {				
				e.printStackTrace();
			}
			
			request.getSession().setAttribute("pUsrID", pUsrID);
			request.getSession().setAttribute("pUsrPW", pUsrPW);
			request.getSession().setAttribute("pUsrNM", wikiLogVO.getUSER_NM());
			request.getSession().setAttribute("pUsrEmail", wikiLogVO.getUSER_EMAIL());
			request.getSession().setAttribute("pUsrRegDT", wikiLogVO.getREG_DT());			
			request.getSession().setAttribute("loginInfo", true);
		}
    	
    	return mv;
	}
	
	@RequestMapping(value = "/log/Join.do", method = RequestMethod.GET)
	public ModelAndView joinToJsp(Locale locale, Model model) {	
		logger.info("Move to Join View");
	
		ModelAndView mv = new ModelAndView("/log/WikiJoin");
    	
    	return mv;
	}
	
	@RequestMapping(value = "/log/JoinAction.do", method = RequestMethod.POST)
	public ModelAndView JoinAction(Locale locale, Model model,
			@RequestParam(value = "pUsrID", required = false) String pUsrID,
			@RequestParam(value = "pUsrPW", required = false) String pUsrPW,
			@RequestParam(value = "pUsrEmail", required = false) String pUsrEmail,
			@RequestParam(value = "pUsrNM", required = false) String pUsrNM,
			@RequestParam(value = "pUsrSex", required = false) String pUsrSex) {	
		logger.info("Try to insert New Member");
		
		WikiLogVO wikiLogVO = new WikiLogVO();
		wikiLogVO.setUSER_ID(pUsrID);
		wikiLogVO.setUSER_PW(pUsrPW);
		wikiLogVO.setUSER_NM(pUsrNM);
		wikiLogVO.setUSER_EMAIL(pUsrEmail);
		wikiLogVO.setREG_DT(new Timestamp(System.currentTimeMillis())+"");
		
		try {
			wikiLogService.insertWikiMember(wikiLogVO);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("New Member Insert Fail");
		}
		
		logger.info("New Member Insert Success");
		ModelAndView mv = new ModelAndView("/log/Login");
    	
    	return mv;
	}
}
