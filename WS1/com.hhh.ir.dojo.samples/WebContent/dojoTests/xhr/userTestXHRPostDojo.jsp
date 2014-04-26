<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
		<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Simple AJAX in DOJO</title>
        <style type="text/css">
        </style>

        <script type="text/javascript">

            dojo.require("dojo.NodeList-fx");
            dojo.require("dojo.NodeList-html");

            dojo.addOnLoad(function () {
                     dojo.query("#date-button-id").onclick(doXHR);
            });

            function doXHR() {

//                dojo.xhrGet({url: "http://localhost:8084/DojoExercises/exercises/ReturnDate.jsp", load: handleData});
                  var name= dojo.byId("nameId").value;
//                  dojo.xhrGet({
                  dojo.xhrPost({
                      url: "userTestXHRPost.jsp",
                      content: {name: name},
                      load: handleData
                  });
            }

            function handleData(value) {
                dojo.query("#resultDiv").html(value);
//                alert(value);
            }
        </script>
    </head>
    <body>
       
        <h3>DOJO Training ....  </h3>

        <h1>Simple AJAX in DOJO</h1>

        <div id="resultDiv"></div>
        <button type="button" id="date-button-id">GO-XHR</button>
        <input type="text" id="nameId" name="name"/>
    </body>
</html>