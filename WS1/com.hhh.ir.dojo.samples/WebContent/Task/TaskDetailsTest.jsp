<!DOCTYPE HTML>
<html>
<head>
<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
<link rel="stylesheet" type="text/css"
	href="./themes/resetStyle.css">	
<link rel="stylesheet" type="text/css"
	href="./themes/generalStyle.css">	
<link rel="stylesheet" type="text/css"
	href="./themes/TaskDetails.css">
<title>index</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script type="text/javascript">
	dojo.registerModulePath("jazz", "/dojo/jazz");
	dojo.require("jazz.Task.TaskDetails");
	dojo.require("dijit.form.TextBox");
	dojo.require("dijit.layout.BorderContainer");
	dojo.require("dijit.layout.ContentPane");
	dojo.require("dijit.form.Textarea");
</script>

<script type="text/javascript">
	dojo.addOnLoad(function() {

		dojo.xhrGet({
			url : "sampleJSON/taskDetails.json",
			handleAs : "json",
			load : function(response, ioArgs) {
				var refNode = dojo.byId("programatic");
				var node = dojo.create("div", {}, refNode, "after");

				var taskDetailsWidget = new jazz.Task.TaskDetails({
					summary : response.summary
				}, node);
			},
			error : function(response, ioArgs) {
				console.log("error loading json with an ajax call...");
			}
		});

	});
</script>

</head>
<body class="claro">

	<!-- div data-dojo-type="jazz.Task.TaskDetails"
		data-dojo-props="summary: 'declarativeSummary'"></div-->
	<div id="programatic"></div>

</body>
</html>