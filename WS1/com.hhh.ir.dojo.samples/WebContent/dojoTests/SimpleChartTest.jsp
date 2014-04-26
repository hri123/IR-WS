<!DOCTYPE HTML>
<html>
<head>
<link rel="stylesheet" href="theme/Master.css" type="text/css">
<title>Wid1Test</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>

<script type="text/javascript">
	dojo.require("dojox.charting.Chart2D");
	dojo.require("dojo.fx");
	dojo.require("dojo.fx.easing");

	var chart1;

	makeCharts = function() {

		var s;

		chart1 = new dojox.charting.Chart2D("simplechart");
		chart1.addPlot("default", {
			type : "Bars",
			gap : 5
		});
		chart1.addAxis("x", {
			min : 0
		});
		chart1.addAxis("y", {
			vertical : true,
			labels : [ {
				value : 1,
				text : "one"
			}, {
				value : 2,
				text : "two"
			} ]
		});
		chart1.addSeries("Series 1", [ 6, 7 ]);
		chart1.render();

};
	
	dojo.connect(dojo.byId("simplechart"), "onclick", function(evt){
		// get the dimensions of our viewport
		d = document.getElementById('simplechart');
		d.style.width="400px";
		d.style.height="600px";
		chart1.setWindow(2, 2, 0, 0).render();
	});

	dojo.addOnLoad(makeCharts);
</script>
</head>
<body class="claro">

	<div id="simplechart" style="width: 290px; height: 150px;"></div>

</body>
</html>