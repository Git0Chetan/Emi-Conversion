
package com.demo;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Servlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	
    	String grade = (String) request.getAttribute("grade");
    	
    	response.setContentType("text/html");
    	
    	PrintWriter out=response.getWriter();
		out.println("<html>");
		out.println("<head>");
		out.println("<title>Grade System</title>");
		out.println("<style>");
		out.println("body {");
		out.println("  font-family: Arial, sans-serif;");
		out.println("  background-color: #f1e281;");
		out.println("  margin: 0;");
		out.println("  padding: 0;");
		out.println("}");
		out.println(".container {");
		out.println("  max-width: 600px;");
		out.println("  margin: 50px auto;");
		out.println("  padding: 20px;");
		out.println("  background-color: #fff;");
		out.println("  border-radius: 10px;");
		out.println("  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);");
		out.println("}");
		out.println("h1 {");
		out.println("  text-align: center;");
		out.println("  color: #333;");
		out.println("}");
		out.println("p {");
		out.println("  text-align: center;");
		out.println("}");
		out.println("</style>");
		out.println("</head>");
		out.println("<body>");
		out.println("<div class=\"container\">");
		out.println("<h1>Welcome to Grade System</h1>");
		out.println("<p>Your Grade is: <strong>" + grade + "</strong></p>");
		out.println("</div>");
		out.println("</body>");
		out.println("</html>");
    }
}
