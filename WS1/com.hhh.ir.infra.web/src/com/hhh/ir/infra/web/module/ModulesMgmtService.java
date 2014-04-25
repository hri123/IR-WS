package com.hhh.ir.infra.web.module;

import java.util.ArrayList;
import java.util.List;

public class ModulesMgmtService implements IModulesMgmtService {

    protected static ModulesMgmtService INSTANCE = null;
    
    public ModulesMgmtService()
    {
        super();
        INSTANCE = this;
    }

    public static ModulesMgmtService getInstance()
    {
        return INSTANCE;
    }

    protected List<IModuleContributor> moduleContributors = new ArrayList<IModuleContributor>();
    
    @Override
    public List<IModuleContributor> getModuleContributors(String groupID)
    {
        return moduleContributors;
    }

    public void setModuleContributors(List<IModuleContributor> moduleContributors)
    {
        this.moduleContributors = moduleContributors;
    }

}
