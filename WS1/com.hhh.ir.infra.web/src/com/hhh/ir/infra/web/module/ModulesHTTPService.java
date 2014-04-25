package com.hhh.ir.infra.web.module;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

public class ModulesHTTPService extends MultiActionController {

	protected ModulesMgmtService modulesMgmtService = null;

	public ModulesMgmtService getModulesMgmtService() {
		return modulesMgmtService;
	}

	public void setModulesMgmtService(ModulesMgmtService modulesMgmtService) {
		this.modulesMgmtService = modulesMgmtService;
	}

	// http://localhost:1085/infraweb/request.do
	public ModelAndView test(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		PrintWriter writer = response.getWriter();
		writer.write("test successful");

		return null;

	}
	
	// http://localhost:1085/infraweb/request.do?action=getModuleContributors
	public ModelAndView getModuleContributors(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		List<IModuleContributor> moduleContributors= modulesMgmtService.getModuleContributors("APPLICATION");

//		PrintWriter writer = response.getWriter();
//		writer.write("number of moduleContributors= " + moduleContributors.size());
		
		Map<String, Object> resultModel = new HashMap<String, Object>();
		resultModel.put("MODULE_CONTRIBUTORS", moduleContributors);

		return new ModelAndView("getModuleContributors", resultModel);

	}
}
