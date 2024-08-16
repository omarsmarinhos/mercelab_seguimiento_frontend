package com.mercelab.seguimiento.utils;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Getter
@Component
public class WebClientUtil {

    private static String apiUrl;

    public WebClientUtil(@Value("${api.url}") String apiUrl) {
        WebClientUtil.apiUrl = apiUrl;
    }

    public static Mono<String> get(String uri) {
        return WebClient.create(apiUrl +  uri)
                .get()
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class);
    }

    public static Mono<String> post(String uri, Object body) {
        return WebClient.create(apiUrl +  uri)
                .post()
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(body))
                .retrieve()
                .bodyToMono(String.class);
    }

    public static Mono<String> putWithBody(String uri, Object body) {
        return WebClient.create(apiUrl + uri)
                .put()
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class);
    }

    public static Mono<String> putNoBody(String uri) {
        return WebClient.create(apiUrl + uri)
                .put()
                .accept(MediaType.APPLICATION_JSON)
                .retrieve().
                bodyToMono(String.class);
    }


}
