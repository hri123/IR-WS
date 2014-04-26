
<%

response.setContentType("text/xml");
StringBuilder sb = new StringBuilder();

// sb.append("<?xml version=\"1.0\"?>");
sb.append("<users>");
sb.append("<user><id>100</id><name>hrishikesh</name></user>");
sb.append("</users>");
out.println(sb.toString());
%>
