<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.List"%>

<%
	// Hrishikesh: externalizing the dojoroot so that any change in the context root can be done at one place
	String dojoRoot = "/dojoroot/1.9.2";
	// from CDN as below
	// String dojoRoot = "//ajax.googleapis.com/ajax/libs/dojo/1.9.3";
	String hwtiRoot = "/infraweb";
%>

<!-- load Dojo -->
<script type="text/javascript"
	data-dojo-config="
        	packages: [{
            name: 'hwti',
            location: '<%=hwtiRoot%>/hwti'
       		}],
			parseOnLoad: true
		"
	src="<%=dojoRoot%>/dojo/dojo.js"></script>

<link rel="stylesheet" type="text/css"
	href="<%=dojoRoot%>/dijit/themes/dijit.css">
<link rel="stylesheet" type="text/css"
	href="<%=dojoRoot%>/dojo/resources/dojo.css">

	<link rel="stylesheet" href="<%=dojoRoot%>/dijit/themes/claro/claro.css">
	<style type="text/css">@import "<%=dojoRoot%>/dojox/grid/resources/claroGrid.css";

/*Grid needs an explicit height by default*/
#gridDiv {
    height: 20em;
}</style>	

<script type="text/javascript">
	function _wtiLoadStyleSheetInternal(/*String*/cssURL) {
		var headID = document.getElementsByTagName("head")[0];
		var cssNode = document.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = cssURL;
		headID.appendChild(cssNode);
	}
</script>

