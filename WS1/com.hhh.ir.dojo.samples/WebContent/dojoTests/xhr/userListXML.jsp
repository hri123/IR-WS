<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript">
	
	var xhr;
	
	function doXHR() {

		   //other browsers & IE 7.0
		   if (window.XMLHttpRequest) {
		    	xhr = new XMLHttpRequest();
		   } else if (window.ActiveXObject) {
	 			try{
		 			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		 	  	  }catch (e) {
			 			try{
				 			xhr = new ActiveXObject("Microsoft.XMLHTTP");
			 			}catch (e) {
								xhr=false;
						}
				}
		   }

		   if(xhr){

							
			   xhr.open("GET","userList.jsp",true);
			   xhr.onreadystatechange=handleData;
			   xhr.send(null);  
		   }	
		   
	}


	function handleData(){
		document.getElementById("resultDiv")
		if(xhr.readyState==4){
			if(xhr.status==200){	
				var data=xhr.responseXML;	
				var arr=data.getElementsByTagName("user");

				var table=document.createElement("table")
				table.setAttribute("border","2px")
				table.setAttribute("bgcolor","red")

				
				for(var count=0;count<arr.length;count++){
					var tr=document.createElement("tr")
				
					var td1=document.createElement("td")
					var td2=document.createElement("td")
					var td3=document.createElement("td")
					
					var u=arr[count];

					var idData=u.childNodes[0].firstChild.data;
					var idNode=document.createTextNode(idData)
					
					var hrefNode=document.createElement("a");
					hrefNode.setAttribute("href","#")
					//hrefNode.setAttribute("onclick","alert()")
					if(window.attachEvent){
						hrefNode.attachEvent('onclick',hello,true);
					}else 	if(window.addEventListener){
						hrefNode.addEventListener('click',hello);
					}
					
					hrefNode.appendChild(idNode)			
								
										
					var nameData=u.childNodes[1].firstChild.data;
					var nameNode=document.createTextNode(nameData)
					
					var ageData=u.childNodes[2].firstChild.data;
					var ageNode=document.createTextNode(ageData)

					td1.appendChild(hrefNode)
					td2.appendChild(nameNode)
					td3.appendChild(ageNode)

					tr.appendChild(td1)
					tr.appendChild(td2)
					tr.appendChild(td3)

					table.appendChild(tr)
				}
				document.getElementById("resultDiv").appendChild(table)
			}else{
				document.getElementById("resultDiv").innerHTML="Error in communication!";
			}
		}
	}

	function hello(){
		alert('Hello');
	}
	
</script>
</head>
<body>
<center>
<div id="resultDiv"></div>
<input type="button" value="LIST"  onclick="doXHR();"/> 
</center>
</body>
</html>