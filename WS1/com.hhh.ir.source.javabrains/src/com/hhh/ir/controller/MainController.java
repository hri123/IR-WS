package com.hhh.ir.controller;

import java.util.HashMap;
import java.util.Map;

import javabrains.AppContextUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.hhh.ir.container.Triangle;

// http://localhost:1085/javabrains/MainController.do
public class MainController implements Controller {

	@Override
	public ModelAndView handleRequest(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		// TODO Auto-generated method stub
		
		Triangle triangle1= (Triangle) AppContextUtil.getBean("triangle1");
		System.out.println(triangle1.getSide1());
		System.out.println(triangle1.getSide2());
		System.out.println(triangle1.getSide3());
		
		Map<String, Object> resultModel = new HashMap<String, Object>();
		resultModel.put("side1", triangle1.getSide1());
		resultModel.put("side2", triangle1.getSide2());
		resultModel.put("side3", triangle1.getSide3());
		
		return new ModelAndView("MainControllerResult", resultModel);
	}

}
