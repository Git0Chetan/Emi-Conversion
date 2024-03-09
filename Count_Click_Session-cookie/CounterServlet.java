package com.demo;

import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/CounterServlet")
public class CounterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        HttpSession session = request.getSession();
        Integer sessionCount = (Integer) session.getAttribute("sessionCount");
        if (sessionCount == null) {
            sessionCount = 1;
        } else {
            sessionCount++;
        }
        session.setAttribute("sessionCount", sessionCount);
        
        
        
        Cookie[] cookies = request.getCookies();
        Cookie visitCookie = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("visitCount")) {
                    visitCookie = cookie;
                    break;
                }
            }
        }
        
        if (visitCookie == null) {
            visitCookie = new Cookie("visitCount", "1");
        } else {
            int cookieCount = Integer.parseInt(visitCookie.getValue());
            cookieCount++;
            visitCookie.setValue(Integer.toString(cookieCount));
        }
        response.addCookie(visitCookie);
        
        out.println("{ \"sessionCount\": " + sessionCount + ", \"cookieCount\": " + visitCookie.getValue() + " }");
        out.close();
    }
}
