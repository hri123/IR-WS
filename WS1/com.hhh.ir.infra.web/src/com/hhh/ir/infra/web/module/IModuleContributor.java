package com.hhh.ir.infra.web.module;

public interface IModuleContributor extends Comparable<IModuleContributor> {
	
	public String getGroupID();

	public void setGroupID(String groupID);

	public String getLabel();

	public void setLabel(String label);

	public String getModuleURL();

	public void setModuleURL(String moduleURL);

	public int getPriorityOrder();

	public void setPriorityOrder(int priorityOrder);
    
}
