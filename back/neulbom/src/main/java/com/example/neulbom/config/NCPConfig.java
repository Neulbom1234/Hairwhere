package com.example.neulbom.config;

import com.ncloud.objectstorage.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NCPConfig {

    @Value("${cloud.ncp.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.ncp.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.ncp.objectstorage.endpoint}")
    private String endPoint;

    @Bean
    public ObjectStorageService objectStorageService() {
        return ObjectStorageServiceFactory.createObjectStorageService(
            accessKey,
            secretKey,
            endPoint
        );
    }
}
