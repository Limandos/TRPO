package com.example.logger;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LoggerApplication {
    @Bean
    public Queue myQueue() {
        return new Queue("logQueue", false);
    }

    @RabbitListener(queues = "logQueue")
    public void listen(String in) {
        System.out.println(in);
    }

    public static void main(String[] args) {
        SpringApplication.run(LoggerApplication.class, args);
    }
}