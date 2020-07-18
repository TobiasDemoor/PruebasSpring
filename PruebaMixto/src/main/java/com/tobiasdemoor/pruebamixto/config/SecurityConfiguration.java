package com.tobiasdemoor.pruebamixto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Profile("prod")
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        http
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
                .formLogin().loginPage("/login")
                .loginProcessingUrl("/api/login")
                .defaultSuccessUrl("/", true)
                .failureUrl("/login?error=true")
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .logoutSuccessUrl("/")
                .deleteCookies("JSESSIONID");
    }

}
