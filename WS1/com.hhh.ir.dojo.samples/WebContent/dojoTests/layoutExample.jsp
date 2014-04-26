<!DOCTYPE HTML>
<html>

<head>
<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
<style type="text/css">

/* Any demo specific styling needed for this tutorial only */
html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
}

#appLayout {
    height: 100%;
}
/* #leftCol {
    width: 14em;
}
 */
/* .claro .demoLayout .edgePanel {
    background-color: #d0e9fc;
}
 */
/* #viewsChart {
	width: 550px;
	height: 550px;
} */

</style>

<script>
	dojo.require("dijit.layout.BorderContainer");
	dojo.require("dijit.layout.TabContainer");
	dojo.require("dijit.layout.ContentPane");
</script>
</head>
<body class="claro">
	<div id="appLayout" style="width: 100%;" class="demoLayout"
		data-dojo-type="dijit.layout.BorderContainer"
		data-dojo-props="design: 'headline'">
		<div class="centerPanel" data-dojo-type="dijit.layout.TabContainer"
			data-dojo-props="region: 'center', tabPosition: 'bottom'">
			<div data-dojo-type="dijit.layout.ContentPane"
				data-dojo-props="title: 'Group 1'">
				<h4>Group 1 Content</h4>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
					enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.</p>
			</div>
			<div data-dojo-type="dijit.layout.ContentPane"
				data-dojo-props="title: 'Group Two'">
				<h4>Group 2 Content</h4>
			</div>
			<div data-dojo-type="dijit.layout.ContentPane"
				data-dojo-props="title: 'Long Tab Label for this One'">
				<h4>Group 3 Content</h4>
			</div>
		</div>
		<div class="edgePanel" data-dojo-type="dijit.layout.ContentPane"
			data-dojo-props="region: 'top'">Header content (top)</div>
		<div id="leftCol" class="edgePanel"
			data-dojo-type="dijit.layout.ContentPane"
			data-dojo-props="region: 'left', splitter: true">Sidebar
			content (left)</div>
	</div>
</body>
</html>