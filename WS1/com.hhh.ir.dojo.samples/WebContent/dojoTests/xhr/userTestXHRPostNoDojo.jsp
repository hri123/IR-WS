<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
    	<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Simple AJAX</title>
        <style type="text/css">
            .color {
                color: red;
                font-weight: bold;
            }
            
            .green {background-color: green;}
        </style>

        <script type="text/javascript">
            function doXHR() {
                // other browsers & IE 7
                if (window.XMLHttpRequest) {
                    xhr= new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    try {
                        xhr= new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        try {
                            xhr= new ActiveXObject("Microsoft.XMLHTTP");
                        } catch (e) {
                            xhr= false;
                        }
                    }
                }
//
//                if (xhr) {
//                    xhr.open("GET", "http://localhost:8084/DojoExercises/exercises/ReturnDate.jsp", true);
//                    xhr.onreadystatechange=handleData;
//                    xhr.send(null);
//                }

                if (xhr) {
                    xhr.open("POST", "userTestXHRPost.jsp", true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange=handleData;
                    xhr.send("name=Hrishikesh");
                }
                
            }

            function handleData() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert(xhr.responseText);
                    var textNode= document.createTextNode(xhr.responseText);
                    var myDiv= dojo.byId("resultDiv");
                    myDiv.appendChild(textNode);
                }
            }
        </script>
    </head>
    <body>
       
        <h3>DOJO Training ....  </h3>

        <h1>Simple AJAX</h1>

        <div id="resultDiv"></div>
        <button type="button" onclick="doXHR()">GO-XHR</button>
    </body>
</html>