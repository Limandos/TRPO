package com.example.reports.config.interceptors;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class LogFilter implements WebFilter {
    private final RabbitTemplate rabbitTemplate;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        var request = exchange.getRequest();
        var response = exchange.getResponse();

        var locale = new Locale("fr", "FR");
        var formatter = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss", locale);
        var date = formatter.format(new Date());

        try {
            rabbitTemplate.convertAndSend("logQueue", String.format(
                    "%s: [%s] \"%s\" - %s",
                    date, request.getMethod().name(), request.getPath().value(), response.getStatusCode().value()));
        } catch (Exception e) {
            System.err.println(e);
        }

        return chain.filter(exchange);
    }
}