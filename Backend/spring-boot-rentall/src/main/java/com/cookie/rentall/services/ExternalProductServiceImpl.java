package com.cookie.rentall.services;

import com.cookie.rentall.views.ExternalProductView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ExternalProductServiceImpl implements ExternalProductService {
    private static final String PRODUCT_REGEX = "\"@type\": \"Product\"(([\\s\\S](?!\"@type\": \"Product\"))*)\"itemReviewed\":";
    private static final String PRODUCT_URL = "https://www.mediaexpert.pl/dom-i-ogrod/kosiarki-i-podkaszarki/kosiarki-spalinowe";

    @Override
    public List<ExternalProductView> getExternalProductList() {
        List<ExternalProductView> resultList = new ArrayList<>();
        final String uri = PRODUCT_URL;
        RestTemplate restTemplate = new RestTemplate();

        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
        StringHttpMessageConverter converter = new StringHttpMessageConverter();
        converter.setSupportedMediaTypes(Arrays.asList(MediaType.TEXT_HTML, MediaType.TEXT_XML));
        messageConverters.add(converter);
        restTemplate.setMessageConverters(messageConverters);

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.TEXT_HTML));
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        String result = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).toString();
        Pattern pattern = Pattern.compile(PRODUCT_REGEX, Pattern.MULTILINE | Pattern.UNIX_LINES);
        Matcher matcher = pattern.matcher(result);
        StringBuilder sb = new StringBuilder("{");
        while (matcher.find()) {
            sb.append(matcher.group());
            sb.append("\"\"} },");
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            String pr = sb.toString().replace("@type", "type");

            try {
                resultList.add(mapper.readValue(pr, ExternalProductView.class));
                sb = new StringBuilder("{");
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return resultList;
    }
}
