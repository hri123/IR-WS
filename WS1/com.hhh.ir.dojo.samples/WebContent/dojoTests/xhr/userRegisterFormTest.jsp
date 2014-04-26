<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>DOJO AJAX Submit Usage</title>

<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>

<script type="text/javascript">
	dojo.require("dojo.NodeList-fx");
	dojo.require("dojo.NodeList-html");
</script>

<script type="text/javascript">

	dojo.addOnLoad(
		function() {
		  dojo.query("#save-button-id").onclick(doXHR);
		}
	);
	
	function doXHR(){
		var nm=dojo.byId("name").value;
		var ag=dojo.byId("age").value;
			
		//dojo.xhrGet({url:'userRegister11.jsp',form: "userFormId" ,load:handleData});
 
		dojo.xhrGet({url:'userRegister.jsp',preventCache:true,content:{name:nm,age:ag},load:handleData});		
		//dojo.xhrPost({url:'userRegister.jsp',content:{name:nm,age:ag},load:handleData});		
		//dojo.xhr("POST",{url:'userRegister.jsp',content:{name:nm,age:ag},load:handleData});		
	}

	function handleData(txt){
		dojo.query("#resultDiv").html(txt);
	}
	
</script>

</head>
<body>
<center>	
<div id="resultDiv">
</div>
	<form id="userFormId">
		Enter Name:
		<input type="text"  name="name" id="name" /><br/>
		Enter Age:
		<input type="text"  name="age"  id="age" /><br/>
		<input type="button" value="Save"  id="save-button-id"  />	
	</form>
</center>
</body>
</html>