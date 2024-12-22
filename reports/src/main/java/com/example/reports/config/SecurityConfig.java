package com.example.reports.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableReactiveMethodSecurity
@EnableWebFluxSecurity
public class SecurityConfig {
    private final AppAuthenticationManager authenticationManager;
    private final SecurityContextRepository contextRepository;

    public SecurityConfig(AppAuthenticationManager authenticationManager,
                          SecurityContextRepository contextRepository) {
        this.authenticationManager = authenticationManager;
        this.contextRepository = contextRepository;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        return http.authenticationManager(authenticationManager)
                .securityContextRepository(contextRepository)
                .authorizeExchange(authorizeExchangeSpec -> {
                    //authorizeExchangeSpec.pathMatchers("/reports/**").hasRole("ADMIN");
                    authorizeExchangeSpec.anyExchange().authenticated();
                })
                .build();
    }
}
