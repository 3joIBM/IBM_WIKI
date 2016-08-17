package com.ibm.wiki.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component("webInterceptor")
public class interceptor extends HandlerInterceptorAdapter {

	protected final Logger log = LoggerFactory.getLogger(this.getClass());

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session =  request.getSession (true);
		Boolean loginInfo = (Boolean) session.getAttribute("loginInfo");

		if("/log/Login.do".equals(request.getRequestURI())){
		    return true;
		}
		if(null == loginInfo){
		    response.sendRedirect("/log/Login.do");
		    return false;
		}
		return true;
	}
}