package hhb.linkedin_backend.features.authentication.filter;

import hhb.linkedin_backend.features.authentication.service.AuthenticationService;
import hhb.linkedin_backend.features.authentication.utils.JsonWebToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

// spring或扫描组件，如果组件继承HttpFilter，则会对请求进行拦截处理
@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends HttpFilter {
    private final List<String> unsecureEndpoints = Arrays.asList(
            "/api/authentication/login", "/api/authentication/register",
            "/api/authentication/send-password-reset-token",
            "/api/authentication/reset-password"
    );
    private final JsonWebToken jsonWebToken;
    private final AuthenticationService authenticationService;

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.addHeader("Access-Control-Allow-Credentials", "true");

        // cross-origin处理，前端会先通过http options访问服务器询问是否可以获取数据
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // ws
        String upgradeHeader = request.getHeader("Upgrade");

        if (unsecureEndpoints.contains(request.getRequestURI())
            || (upgradeHeader != null && upgradeHeader.equalsIgnoreCase("websocket"))
        ) {
            chain.doFilter(request, response);
            return;
        }

        try{
            // check bearer token
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && !authHeader.startsWith("Bearer ")) {
                throw new ServletException("Token missing");
            }
            String token = authHeader.substring(7);
            if (jsonWebToken.isTokenExpired(token)) {
                throw new ServletException("Token invalid");
            }
            String email = jsonWebToken.extractEmail(token);
            var user = authenticationService.getUser(email);
            request.setAttribute("AuthenticatedUser", user);
            chain.doFilter(request, response);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Invalid token or token missing\"}");
        }
    }
}
