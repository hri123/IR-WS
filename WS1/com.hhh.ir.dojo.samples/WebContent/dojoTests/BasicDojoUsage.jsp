<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Basic DOJO Usage</title>
<style type="text/css">
	.cl{
			color: red;
			font-weight: bold;
	}

	.green{ background-color: green; }
	.yellow{ background-color: yellow; }
	.blue{ background-color: blue; }
	

</style>

<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>

<script type="text/javascript">
	dojo.require("dojo.NodeList-fx");
</script>
<script type="text/javascript">

	function hello(){
		alert("Hello");
		return this;
	}

	function hi(){
		alert("Hi");
		return this;
	}
	
	function bye(){
		alert("Bye");
		return this;
	}

	function doSomething(){
		hello().hi().bye();
	}
	

	/*function changeColor(){
		dojo.query("h1").addClass("cl");
	}

	function revertColor(){
		dojo.query("h1").removeClass("cl");
	}*/

	
	function randomizeHeadings() {
		  dojo.query("h3").forEach(setRandomStyle);
		  dojo.query("h3.green").wipeOut().play();
	}

	function setRandomStyle(h) {
			  var styles = ["blue", "yellow", "green"];
			  var index = Math.floor(Math.random()*styles.length);
			  var str=styles[index]
			  dojo.query(h).addClass(str);
	}


	function revertHeadings() {
		  dojo.query("h3.green").wipeIn().play();
		  dojo.query("h3").removeClass("blue")
		                  .removeClass("yellow")
		                  .removeClass("green");
	}
			
</script>

</head>
<body>
<center>	
<h3  class="green">Green Heading</h3>
<h3 class="green">Green Heading</h3>
<h3 class="green">Green Heading</h3>
<h3>Blue Heading</h3>
<h3>Blue Heading</h3>
<h3 class="green">Green Heading</h3>
<h3 class="green">Green Heading</h3>
<h3>Blue Heading</h3>
<h3>Blue Heading</h3>
<h3>Yellow Heading</h3>
<h3>Yellow Heading</h3>
<h3>Yellow Heading</h3>
<h3>Blue Heading</h3>

<input type="button" value="Hello" onclick="doSomething();" />	
<input type="button" value="Change Color" onclick="randomizeHeadings();" />	
<input type="button" value="Revert Color" onclick="revertHeadings();" />	
</center>
</body>
</html>