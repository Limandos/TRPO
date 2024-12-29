package com.example.reports.config.interceptors;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class LogFilter implements WebFilter {
    private final RabbitTemplate rabbitTemplate;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        var request = exchange.getRequest();
        var response = exchange.getResponse();

        rabbitTemplate.convertAndSend("logQueue", String.format(
                "%s: [%s] \"%s\" - %s",
                new Date(), request.getMethod().name(), request.getPath().value(), response.getStatusCode().value()));

        return chain.filter(exchange);
    }
}