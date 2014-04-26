<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>DOJO AJAX Usage</title>

<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>

<script type="text/javascript">
	dojo.require("dojo.NodeList-fx");
	dojo.require("dojo.NodeList-html");
</script>

<script type="text/javascript">

	dojo.addOnLoad(
		function() {
		  dojo.query("#date-button-id").onclick(doXHR);
		}
	);
	
	function doXHR(){
		dojo.xhrGet({url:'date.jsp',load:handleData});		
	}

	function handleData(txt){
		//dojo.query("#resultDiv").html(txt);
		dojo.byId("resultTextBox").value=txt;
	}
	
</script>

</head>
<body>
<center>	
<div id="resultDiv">
</div>
	Result : <input type="text" id="resultTextBox" readonly="readonly" />

	<input type="button" value="Date" onclick="doXHR();" />	
	<input type="button" value="Date"  id="date-button-id"  />	
</center>
</body>
</html>