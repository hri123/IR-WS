<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
        <title>Change Color</title>
        <style type="text/css">
            .color {
                color: red;
                font-weight: bold;
            }

            .green {background-color: green;}
        </style>

        <script type="text/javascript">
            dojo.require("dijit.form.Button");
            dojo.addOnLoad(function(){
                console.log("page ready, can modify DOM anytime after this");
                var divA= dojo.doc.createElement("divA");
                var button= new dijit.form.Button({value: "divButton"}, dojo.byId("someDiv"));

                var handle = dojo.connect(
                    dojo.byId("someDiv"), //context
                    "onmouseover", //event
                    null, //context
                    function(evt) {console.log("mouseover event", evt);} //event
                );
                //dojo.disconnect(handle);
            });
            function changeColor() {
                dojo.query("h1").addClass("color");
            }
            function revertColor() {
                dojo.query("h1").removeClass("color");
                dojo.query("h1").addClass("green");
            }
            // use wipeout and foreach examples too
        </script>
    </head>
    <body>

        <h3>DOJO Training ....  </h3>


        <h1>Change Color</h1>

        <input type="button" value="hello" onclick="changeColor()" />
        <input type="button" value="back" onclick="revertColor()" />
        <div id="div1"></div>
        <div id="div2"></div>
        <div id="someDiv" class="large" style="color:red"></div>
    </body>
</html>