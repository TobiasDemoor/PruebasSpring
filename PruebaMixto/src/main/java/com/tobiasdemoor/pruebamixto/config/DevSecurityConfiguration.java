package com.tobiasdemoor.pruebamixto.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SimpleSavedRequest;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Profile("dev")
@EnableWebSecurity
public class DevSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource((request -> {
                    CorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                    CorsConfiguration config = new CorsConfiguration();
                    config.addAllowedOrigin("http://localhost:3000");
                    config.addAllowedMethod(HttpMethod.DELETE);
                    config.addAllowedMethod(HttpMethod.GET);
                    config.addAllowedMethod(HttpMethod.OPTIONS);
                    config.addAllowedMethod(HttpMethod.PUT);
                    config.addAllowedMethod(HttpMethod.POST);
                    config.setAllowCredentials(true);
                    return config;
                })).and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(
                        HttpMethod.GET,
                        "/**/*.{js,html,css}"
                ).permitAll()
                .antMatchers(
                        HttpMethod.GET,
                        "/", "/login"
                ).permitAll()
                .antMatchers(
                        HttpMethod.GET,
                        "/api/user"
                ).permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("http://localhost:3000/login")
                .loginProcessingUrl("/api/login")
                .defaultSuccessUrl("http://localhost:3000/",true)
                .failureUrl("http://localhost:3000/login?error=true")
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .deleteCookies("JSESSIONID");
    }

    @Bean
    public RequestCache referRequestCache() {
        return new HttpSessionRequestCache() {
            @Override
            public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
                String referrer = request.getHeader("referer");
                if (referrer != null) {
                    request.getSession().setAttribute(
                            "SPRING_SECURITY_SAVED_REQUEST", new SimpleSavedRequest(referrer)
                    );
                }
            }
        };
    }
}