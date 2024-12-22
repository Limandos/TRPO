package com.example.reports.services;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public interface AuthClient {
    Mono<AccessTokenValue> getValueByToken(String jwtToken);
}