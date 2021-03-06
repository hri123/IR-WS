<!DOCTYPE HTML>
<html>
<head>
<style type="text/css">

/*Grid need a explicit width/height by default*/
#grid {
    width: 45em;
    height: 20em;
}

</style>
<title>Wid1Test</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>

<script type="text/javascript">
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojo.data.ItemFileWriteStore");

dojo.ready(function(){
    /*set up data store*/
    var data = {
      identifier: 'id',
      items: []
    };
    var data_list = [
      { col1: "normal", col2: false, col3: 'But are not followed by two hexadecimal', col4: 29.91},
      { col1: "important", col2: false, col3: 'Because a % sign always indicates', col4: 9.33},
      { col1: "important", col2: false, col3: 'Signs can be selectively', col4: 19.34}
    ];
    var rows = 60;
    for(var i=0, l=data_list.length; i<rows; i++){
      data.items.push(dojo.mixin({ id: i+1 }, data_list[i%l]));
    }
    var store = new dojo.data.ItemFileWriteStore({data: data});

    /*set up layout*/
    var layout = [[
      {'name': 'Column 1', 'field': 'id', 'width': '30%'},
      {'name': 'Column 2', 'field': 'col2', 'width': '30%'},
      {'name': 'Column 3', 'field': 'col3', 'width': '30%'},
      {'name': 'Column 4', 'field': 'col4', 'width': '10%'}
    ]];

    /*create a new grid:*/
    var grid = new dojox.grid.EnhancedGrid({
        id: 'grid',
        store: store,
        structure: layout,
        rowSelector: '20px'},
      document.createElement('div'));

    /*append the new grid to the div*/
    dojo.byId("gridDiv").appendChild(grid.domNode);

    /*Call startup() to render the grid*/
    grid.startup();
});

</script>
</head>
<body class="claro">

	<div id="gridDiv"></div>

</body>
</html>