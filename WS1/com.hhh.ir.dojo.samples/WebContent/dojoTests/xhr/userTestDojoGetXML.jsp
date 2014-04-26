<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
        
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

                if (xhr) {
                    xhr.open("GET", "userXML.jsp", true);
                    xhr.onreadystatechange=handleData;
                    xhr.send(null);
                }
                
            }

            function handleData() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var data= xhr.responseXML;
                    var arr= data.getElementsByTagName("user");
                    var u= arr[0];
                    var idData= u.firstChild.firstChild.data;

                    var textNode= document.createTextNode(idData);
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