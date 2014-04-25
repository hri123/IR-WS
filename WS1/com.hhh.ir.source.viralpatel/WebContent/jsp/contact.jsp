<html>
<head>
	<meta charset="utf-8">
	<title>Spring 3 MVC Series - Contact Manager</title>

<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
               
<script>  

require(['dojo/_base/lang', 'dojox/grid/DataGrid', 
'dojo/data/ItemFileWriteStore', 'dojox/data/JsonRestStore', 'dojo/dom', 'dojo/domReady!'],
    function(lang, DataGrid, ItemFileWriteStore, dom){

    var jsonStore = new dojox.data.JsonRestStore({target:"/Spring3HibernateOSGi/index", idAttribute:"storeId"});

    /*set up layout*/
    var layout = [[
      {'name': 'Id', 'field': 'id', 'width': '100px'},
      {'name': 'First Name', 'field': 'firstname', 'width': '100px'},
      {'name': 'Last Name', 'field': 'lastname', 'width': '100px'},
      {'name': 'Email', 'field': 'email', 'width': '100px'},
      {'name': 'Telephone', 'field': 'telephone', 'width': '100px'},
      {'name': 'Delete', 'field': 'id', 'width': '100px', formatter: deleteFormatter}
    ]];

    /*create a new grid*/
    var grid = new DataGrid({
        id: 'grid',
        store: jsonStore,
        structure: layout,
        rowSelector: '20px'});

        /*append the new grid to the div*/
        grid.placeAt("gridDiv");

        /*Call startup() to render the grid*/
        grid.startup();
});

require(["dojo/ready", "dijit/registry", "dojo/parser", "dijit/form/Button"], function(ready, registry){
  ready(function(){
    // This function won't run until the DOM has loaded and other modules that register
    // have run.
    dojo.connect(registry.byId("myButton"), "onClick", onButtonClick);
    
  });
  
  
});

   function deleteFormatter(value) {
   
   		var str= '<a href="javascript://" onClick="onDelete(' + value + ')">delete</a>';
   		return str;
   
   }
   
   function onDelete(id) {
   		var delContactService = 
		{
		    url: "/Spring3HibernateOSGi/delete/" + id,
		  	preventCache: true,
		  	load: function(data) {
		  		console.log("inside success");
		  		var grid= dijit.registry.byId("grid");
		  		grid._refresh();
			},
		  	error: function(data) {
		  		console.log("inside failure");
			}
		};
		var deferred = dojo.xhrGet(delContactService);
   }

	function onButtonClick() {
		var firstname= dojo.byId("firstname");
		var lastname= dojo.byId("lastname");
		var email= dojo.byId("email");
		var telephone= dojo.byId("telephone");
		
		var addContactService = 
		{
		    url: "/Spring3HibernateOSGi/add",
		  	preventCache: true,
		  	load: function(data) {
		  		console.log("inside success");
		  		var grid= dijit.registry.byId("grid");
		  		grid._refresh();
			},
		  	error: function(data) {
		  		console.log("inside failure");
			}
		};
		var addContactParams = {firstname: firstname.value, lastname: lastname.value, email:email.value, telephone:telephone.value};
		addContactService.content = addContactParams;
		var deferred = dojo.xhrPost(addContactService);
		
	}
	
</script>               
</head>
<body class="claro">

<h2>Contact Manager</h2>

	<table>
	<tr>
		<td>firstname: </td>
		<td><input type="text" id="firstname"></td> 
	</tr>
	<tr>
		<td>lastname: </td>
		<td><input type="text" id="lastname"></td> 
	</tr>
	<tr>
		<td>email: </td>
		<td><input type="text" id="email"></td> 
	</tr>
	<tr>
		<td>telephone: </td>
		<td><input type="text" id="telephone"></td> 
	</tr>
	<tr>
		<td colspan="2">
			<button type="button" id="myButton" data-dojo-type="dijit/form/Button">add contacts</button>
		</td>
	</tr>
</table>	
	
<h3>Contacts</h3>


    <div id="gridDiv"></div>
</body>


</body>
</html>
