<%@ page language="java" %>
<%@page import="java.util.Collection"%>
<%@page import="java.util.Iterator"%>

<html> 

<head>
	<title> MainController Page </title>
</head>

<body>
<%
		int side1= (Integer)request.getAttribute("side1");		
		int side2= (Integer)request.getAttribute("side2");
		int side3= (Integer)request.getAttribute("side3");
%>

<h3>Side1:	<%=side1%> </h3>
<h3>Side2:	<%=side2%> </h3>
<h3>Side3:	<%=side3%> </h3>

</body>
</html>