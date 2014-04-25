package com.hhh.ir.infra.web.module;

public class ModuleContributor implements IModuleContributor {

	@Override
	public int compareTo(IModuleContributor arg0) {
		// TODO Auto-generated method stub
		return 0;
	}
	
    protected String groupID = "";
    
    protected String label = "";
    
    protected String moduleURL = "";
    
    protected int priorityOrder = 100;

	public String getGroupID() {
		return groupID;
	}

	public void setGroupID(String groupID) {
		this.groupID = groupID;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getModuleURL() {
		return moduleURL;
	}

	public void setModuleURL(String moduleURL) {
		this.moduleURL = moduleURL;
	}

	public int getPriorityOrder() {
		return priorityOrder;
	}

	public void setPriorityOrder(int priorityOrder) {
		this.priorityOrder = priorityOrder;
	}

}
