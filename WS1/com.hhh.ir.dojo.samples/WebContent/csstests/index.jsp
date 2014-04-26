<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@page import="java.util.List"%>

<%
	String requestURL= request.getRequestURL().toString();
	String serviceSpecificClass= "centerTableMDBS";
	String launchConsoleText= "Use the console to easily manage your database services and quickly understand the current state of your databases and connections.";
	if (requestURL.contains("/ijds")) {
		serviceSpecificClass= "centerTableIJDS";
		launchConsoleText= "Use the console to easily manage your database services.";
	}
%>

<html style="width: 100%; height: 100%;">
    
<head >

<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>

    
 	<script type="text/javascript">
 	
		_wtiLoadStyleSheetInternal("Custom.css");
	</script>    

</head>


<body style="width: 100%; height: 100%;" class="oneui">
<div style="width:100%;height:100%" class="olympiaLaunchIndexMainDiv">
			<div dojoType="dijit.layout.TabContainer" doLayout="true" tabStrip="true" style="width:100%;height:100%">
		    	<div dojoType="dijit.layout.ContentPane" title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" 
		    	style="width:100%;height:100%;" closable="false" selected="true" >
				<div class="launchConsoleHeaderText">	
	
					<p>Welcome to the Managed Database console</p>

				</div>
				<br>
				<div class="launchConsoleText">
					<p><%=launchConsoleText%></p>
				</div>
				<br>
				<div class="centerTable <%=serviceSpecificClass%>">
				<table>
					<tr class="row">
						<td>
							<img src="images/manage_127.png" alt="Manage">
						</td>
						<td>
							<img src="images/monitor_127.png" alt="Monitor">
						</td>
					</tr>
					<tr class="row row2">
						<td>
							<p style="color:#16a5fa;">Manage</p>
						</td>
						<td>
							<p style="color:#f0591f;">Monitor</p>
						</td>
					</tr>
					<tr class="row row3">
						<td><p>
							<span class="testConnectivity">Test the connectivity of your databases</span><br>
							Restore data from a backup<br>
							Run a backup
						</p></td>
						<td><p>
							View application connections<br>
							View storage capability<br>
							Review alerts
						</p></td>
					</tr>
				</table>
				</div>
				<br>
				<div align="center">

					<button data-dojo-type="dijit/form/Button" type="button">
						Launch the Console
						<script type="dojo/on" data-dojo-event="click"
							data-dojo-args="evt">showOlympiaConsoleInBrowser();
    					</script>
					</button>

				</div>				
			</div>
		   		<div dojoType="dijit.layout.ContentPane" title="Getting Started" style="width:100%;height:100%" closable="false" selected="false">
		   			<div style="width:100%;height:100%">
		   				<iframe src="http://www.rediff.com" style="width: 100%; height: 100%;"></iframe>
		   			</div>
		   		</div>
			</div>
</div>

<hr>

<div style="width: 100%;">

	<div style="width: 100%;">
		<p
			style="margin-top: 20px; margin-bottom: 20px; font-family: Helvetica; font-size: 24px; color: #3b4b54; text-align: center;">Sync
			data from Cloudant into a database table for BLU Acceleration for
			Cloud</p>
	</div>
	<div style="width: 100%; text-align: center;"
		data-dojo-type="dijit.form.Form"
		data-dojo-attach-point="syncFromCloudantEntryForm"
		encType="multipart/form-data" action="" method="">
		<div
			style="display: inline-block; width: 400px; height: 150px; margin: 1em; vertical-align: top;">
			<div>
				<p
					style="margin: 0px 0px 10px 0px; font-family: Helvetica; font-size: 14px; color: #3b4b54; text-align: center; font-weight: bold;">Source
					Details</p>
			</div>
			<div style="margin: 0px 0px 0px 0px; text-align: center;">
				<label
					style="padding: 5px; display: inline-block; float: left; clear: left; width: 150px; text-align: right;">Cloudant
					URL</label> <input style="margin: 5px; display: inline-block; float: left;"
					type="text" name="cloudantURL" data-dojo-type="dijit/form/TextBox" />
			</div>
		</div>
		<div
			style="display: inline-block; width: 400px; height: 150px; margin: 1em; vertical-align: top;">
			<div>
				<p
					style="margin: 0px 0px 10px 0px; font-family: Helvetica; font-size: 14px; color: #3b4b54; text-align: center; font-weight: bold;">Target
					Details</p>
			</div>
			<div style="margin: 0px 0px 0px 0px; text-align: center;">
				<label
					style="padding: 5px; display: inline-block; float: left; clear: left; width: 150px; text-align: right;">Host
					Name</label> <input
					style="margin: 5px; display: inline-block; float: left;"
					type="text" name="hostName" data-dojo-type="dijit/form/TextBox" />
				<label
					style="padding: 5px; display: inline-block; float: left; clear: left; width: 150px; text-align: right;">Port
					Number</label> <input
					style="margin: 5px; display: inline-block; float: left;"
					type="text" name="portNumber" data-dojo-type="dijit/form/TextBox" />
				<label
					style="padding: 5px; display: inline-block; float: left; clear: left; width: 150px; text-align: right;">Table
					Name</label> <input
					style="margin: 5px; display: inline-block; float: left;"
					type="text" name="tableName" data-dojo-type="dijit/form/TextBox" />

			</div>
		</div>
	</div>
	<div style="width: 100%; text-align:center;">
		<button type="button" data-dojo-type="dijit.form.Button" data-dojo-attach-event="onClick: handleSave" tabIndex="0">Start Sync</button>
	</div>

</div>


 <script type="text/javascript">
     	dojo.require("dijit.layout.TabContainer");
     	dojo.require("dijit.layout.ContentPane");
     	dojo.require("dijit.form.Button");
     	dojo.require("dijit.form.Form");

		function showOlympiaConsoleInBrowser()
		{
		      var url = window.location.href;
		      alert(url);
		}
           
</script>           

</body>
</html>

