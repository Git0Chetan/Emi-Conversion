package com.demo;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.*;

@WebFilter("/grades")
public class GradesFilter implements Filter {
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
    	
        String grade;

        
        String subject1 = request.getParameter("subject1");
        String subject2 = request.getParameter("subject2");
        String subject3 = request.getParameter("subject3");

        int marks1 = Integer.parseInt(subject1);
        int marks2 = Integer.parseInt(subject2);
        int marks3 = Integer.parseInt(subject3);
        
        int totalMarks = marks1 + marks2 + marks3;
        double average = totalMarks / 3.0;
        
        PrintWriter out=response.getWriter();
        
            if (average >= 90) {
                grade = "A Grade";
            } else if (average >= 80 && average <= 89) {
                grade = "B Grade";
            } else if (average >= 70 && average <= 79) {
                grade = "C Grade";
            	out.println("C");
            } else if (average >= 60 && average <= 69) {
                grade = "D Grade";
            } else if (average >= 50 && average <= 59) {
                grade = "E Grade";
            } else {
                grade = "Error: Average below 50";
            }
            
            request.setAttribute("grade", grade);
            
        chain.doFilter(request, response);
    }
}
