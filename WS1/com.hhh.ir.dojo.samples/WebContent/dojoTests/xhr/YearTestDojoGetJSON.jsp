<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
    
    <jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSON</title>
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
                    xhr.open("GET", "year.json", true);
                    xhr.setRequestHeader("Content-Type", "text/json");
                    xhr.onreadystatechange=handleData;
                    xhr.send(null);
                }
                
            }

            function handleData() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    
                    var data= xhr.responseText;
                    var arr=  eval('(' + data + ')');

                    var textNode= document.createTextNode(arr);
                    var myDiv= dojo.byId("resultDiv");
                    myDiv.appendChild(textNode);
                }
            }
        </script>
    </head>
    <body>
       
        <h3>DOJO Training ....  </h3>

        <h1>JSON test</h1>

        <div id="resultDiv"></div>
        <button type="button" onclick="doXHR()">GO-XHR</button>
    </body>
</html>