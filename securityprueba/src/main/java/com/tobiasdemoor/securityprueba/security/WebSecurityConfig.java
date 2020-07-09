package com.tobiasdemoor.securityprueba.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@ComponentScan
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        super.configure(http);
            http
                    .csrf().disable()// TODO: remover, solo usado para debug
                    .authorizeRequests()
                    .antMatchers("/person/**").hasAuthority("ROLE_ADMIN")
                    .antMatchers("/callcenter").hasAnyAuthority("ROLE_ADMIN", "ROLE_CALLCENTER")
                    .anyRequest().authenticated()
                    .and()
                    .formLogin()
                    .and()
                    .httpBasic();
        }
}
