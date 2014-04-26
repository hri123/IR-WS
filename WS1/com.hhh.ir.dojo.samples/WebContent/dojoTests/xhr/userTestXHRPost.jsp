<%
	System.out.println("In user.jsp");
	// response.setContentType("text/html");
    response.setContentType("text/plain");
    String name= request.getParameter("name");
%>
Hello - <%=name%>