<%@ page language="java" contentType="text/json; charset=UTF-8" %>
<%@page import="java.util.List"%>
<%@page import="java.util.Locale"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.hhh.ir.infra.web.module.IModuleContributor"%>


<%
/*
var pets = '{"pets":[{"name":"jack"},{"name":"john"},{"name":"joe"}]}';
var arr = JSON.parse(pets);
alert(arr.pets[0].name);
*/
%>
{"moduleContributors":[
<%
    List<IModuleContributor> moduleContributors= (List<IModuleContributor>) request.getAttribute("MODULE_CONTRIBUTORS");
    
    for (int i= 0; i < moduleContributors.size(); i++) {
    	IModuleContributor moduleContributor= moduleContributors.get(i);
%>    

{"label": "<%=moduleContributor.getLabel()%>"}
<%
		if (i + 1 < moduleContributors.size()) {
%>
,
<%		
		}
	}  	
%>
]}