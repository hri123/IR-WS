<!DOCTYPE html>
<html style="width: 100%; height: 100%; margin: 0; padding: 0" lang="en-us">
    <head>
    
    <jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
    
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta http-equiv="Cache-Control" content="NO-CACHE">
        <meta http-equiv="Pragma" content="NO-CACHE">

		
		<style>
			body{
				height: 100%;
			}
		</style>

<%
// dojo.registerModulePath is deprecated in Dojo 1.7+. Going forward, the packages configuration property should be used.
%>		
		
        <script type="text/javascript">
        	var treeModel;
        	require(["dojo/ready", 
				"dijit/Menu", "dijit/MenuItem", 
				"dijit/MenuBar", "dijit/MenuBarItem", "dijit/PopupMenuBarItem",
				"dijit/layout/StackContainer", "dijit/layout/ContentPane", 
				"dijit/layout/BorderContainer", 
				"dijit/layout/AccordionContainer","dijit/Tree","dijit/layout/TabContainer",
				"dojo/data/ItemFileWriteStore",	"dijit/tree/TreeStoreModel",
				"hwti/infra/initializer"], 
			function(ready, Menu, MenuItem, MenuBar, MenuBarItem, PopupMenuBarItem,StackContainer, ContentPane){
				var treeData = {
					"identifier": "id",
					"label": "name",
					"items": [
						{ "id": "0", "name":"Root", "numberOfItems":1, "children":[ {"_reference": "1"},  {"_reference": "2"},  {"_reference": "3"} ] },
						{ "id": "1", "name":"Item 1", "numberOfItems":0},
						{ "id": "2", "name":"Item 2", "numberOfItems":0},
						{ "id": "3", "name":"Item 3", "numberOfItems":0}
					]
				};
				treeStore = new dojo.data.ItemFileWriteStore({
					data: treeData
				});
				treeModel = new dijit.tree.TreeStoreModel({
					store: treeStore,
					query: {id: "0"}
				});
                ready(function(){
                
                	// load applications
                	var initializer= new hwti.infra.initializer({});
                	var applicationMainMenu= dijit.byId('t2_contentMenu_02');
                	initializer.loadApplicationMenuItems(applicationMainMenu);
                	
                });
            });
        </script>
    </head>
    <body class="claro">

	<div id="menubar" data-dojo-type="dijit/MenuBar">
		<div id="menu1" data-dojo-type="dijit/PopupMenuBarItem" accessKey="A">
			<span>Menu {1}</span>
			<div id="t2_contentMenu_01" data-dojo-type="dijit.Menu"
				style="display: none">
				<div data-dojo-type="dijit.MenuItem">Menu 1 Item 1</div>
				<div data-dojo-type="dijit.MenuItem">Menu 1 Item 2</div>
				<div data-dojo-type="dijit.MenuItem">Menu 1 Item 3</div>
			</div>
		</div>
		<div id="menu2" data-dojo-type="dijit/PopupMenuBarItem" accessKey="B">
			<span>Menu {2}</span>
			<div id="t2_contentMenu_02" data-dojo-type="dijit.Menu">
				<div data-dojo-type="dijit.MenuItem">Menu 2 Item 1</div>
				<div data-dojo-type="dijit.MenuItem">Menu 2 Item 2</div>
				<div data-dojo-type="dijit.MenuItem">Menu 2 Item 3</div>
			</div>
		</div>
		<div id="menu3" data-dojo-type="dijit/PopupMenuBarItem" accessKey="C">
			<span>Menu {3}</span>
			<div id="t2_contentMenu_03" data-dojo-type="dijit.Menu">
				<div data-dojo-type="dijit.MenuItem">Menu 3 Item 1</div>
				<div data-dojo-type="dijit.MenuItem">Menu 3 Item 2</div>
				<div data-dojo-type="dijit.MenuItem">Menu 3 Item 3</div>
			</div>
		</div>
		<div id="help" data-dojo-type="dijit/PopupMenuBarItem" accessKey="H">
			<span>{Q}uestion Mark</span>
			<div id="helpMenu" data-dojo-type="dijit.Menu">
				<div data-dojo-type="dijit.MenuItem">{H}elp</div>
				<div data-dojo-type="dijit.MenuItem">{A}bout</div>
			</div>
		</div>
		<div id="action" data-dojo-type="dijit/PopupMenuBarItem" accessKey="O">
			<span>Other {A}ctions</span>
			<div id="t2_action" data-dojo-type="dijit.Menu">
				<div data-dojo-type="dijit.MenuItem">Change Password</div>
				<div data-dojo-type="dijit.MenuItem">Log out</div>
			</div>
		</div>
	</div>


		<div data-dojo-type="dijit.layout.StackContainer" data-dojo-props="
			id: 't2_contentContainer', 
			style:'width:100%;height:79%;', 
			doLayout: true">
			<div style= ' margin: auto;' data-dojo-type="dijit.layout.ContentPane" data-dojo-props="
				title: 'Menu 1', alwaysShowMenu: true, popup: 't2_contentMenu_01'">
				<div data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="gutters:false">
		        	<div data-dojo-type="dijit.layout.AccordionContainer"  aria-label="leading content" data-dojo-props='
						style:"width: 20%;",
						autoHeight: true,
						splitter:true,
						minSize: 120,
						region:"leading"'>
						<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Pane 1"'>
							Pane 1
						</div>
						<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Pane 2"'>
							Pane 2
						</div>
						<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Pane 3"'>
							Pane 3
						</div>
					</div>
					<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='
						style:"width:auto;",
						region: "center"'>
						Center column
					</div>
					<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='
						splitter:true,
						minSize: 120,
						style: "width:15%;",
						region: "trailing"
					'>
						<div data-dojo-type="dijit.Tree" aria-label="trailing tree navigation" data-dojo-props='
							model:treeModel, 
							autoExpand:true,
							openOnClick:true
						'>
						</div>
					</div>
					</div>
			</div>
				<div style= ' margin: auto;' data-dojo-type="dijit.layout.ContentPane" data-dojo-props="
					title: 'Menu 2', alwaysShowMenu: true, popup: 't2_contentMenu_02'">
					Empty Content...
				</div>
				<div style= ' margin: auto;' data-dojo-type="dijit.layout.ContentPane" data-dojo-props="
					title: 'Menu 3', alwaysShowMenu: true, popup: 't2_contentMenu_03'">
					Empty Content...
				</div>
			</div>

    </body>
</html>
