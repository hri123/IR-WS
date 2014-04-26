<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Widget Declarative Style</title>

		<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>

        <script type="text/javascript">
            dojo.require("dijit.form.Button");
            dojo.require("dojo.parser"); // search all the dojo specific attributes from html and instantiate them

           	// without the below line, myWidget will resolve to http://localhost:1085/dojoroot/1.8/jazz/widget/myWidget.js
           	dojo.registerModulePath("jazz", "/dojo/jazz");
           	
           	dojo.require("jazz.widget.myWidget");
            
         </script>
        <script type="text/javascript">
            dojo.addOnLoad(function(){
            
                var myWid = new jazz.widget.myWidget({}, dojo.byId("programmaticId"));
                console.debug(myWid);
            });
            function sayHi() {
                alert("Hi");
            }
        </script>
    </head>
    <body class="claro">
        <form action="#">
            <button dojoType="dijit.form.Button" onclick="sayHi()">OK</button>
            <div>
            	<div>Declarative:</div>
            	<div data-dojo-type="jazz.widget.myWidget"></div>
            </div>
            <div>
            	<div>Programmatic:</div>
	            <div id="programmaticId"></div>
            </div>
<!-- you can use the dojoType on any element, apply it on the same type so that if something goes wrong with dojo, there is a graceful degradation to html button  -->
        </form>
    </body>
</html>