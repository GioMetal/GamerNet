package com.nullsoft.GamerNet;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;

@SpringBootApplication
public class GamerNetApplication {

	public static Boolean HasRole(String role)
	{
		SecurityContext context = SecurityContextHolder.getContext();
        Jwt j = (Jwt)context.getAuthentication().getPrincipal();
        HashMap<String, Object> map = new HashMap<>(j.getClaims());
        JSONObject resource_access =  (JSONObject)map.get("resource_access");

		if(resource_access == null)
		{
			return false;
		}

        JSONObject client = (JSONObject)resource_access.get("gamer-net-front");

		if(client == null)
		{
			return false;
		}

        JSONArray roles = (JSONArray)client.get("roles");

        if(roles.contains(role))
        {
			return true;
        }
		return false;
	}
	public static void main(String[] args) {
		SpringApplication.run(GamerNetApplication.class, args);
	}
/*
	@Bean
CorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("*"));
    configuration.addAllowedHeader("*");
    configuration.addAllowedMethod("*");
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
*/

}

