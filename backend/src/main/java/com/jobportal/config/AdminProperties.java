package com.jobportal.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.admin")
@Getter @Setter
public class AdminProperties {
    private String email = "admin@jobportal.com";
    private String password = "Admin@12345";
    private String fullName = "System Administrator";
}
