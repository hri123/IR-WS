package com.hhh.ir.infra.web.module;

import java.util.List;

public interface IModulesMgmtService {
	
	public List<IModuleContributor> getModuleContributors(String groupID);

}
