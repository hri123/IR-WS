<%
	response.setContentType("text/xml");
	StringBuffer buffer=new StringBuffer();
	buffer.append("<?xml version='1.0'?>");
	buffer.append("<users>");
		buffer.append("<user>");
			buffer.append("<id>");
				buffer.append("100");
			buffer.append("</id>");
			buffer.append("<name>");
				buffer.append("Rohan");
			buffer.append("</name>");
			buffer.append("<age>");
				buffer.append("23");
			buffer.append("</age>");
		buffer.append("</user>");

		buffer.append("<user>");
		buffer.append("<id>");
			buffer.append("200");
		buffer.append("</id>");
		buffer.append("<name>");
			buffer.append("Mohan");
		buffer.append("</name>");
		buffer.append("<age>");
			buffer.append("24");
		buffer.append("</age>");
	buffer.append("</user>");

	buffer.append("</users>");
	
	out.println(buffer.toString());
%>


