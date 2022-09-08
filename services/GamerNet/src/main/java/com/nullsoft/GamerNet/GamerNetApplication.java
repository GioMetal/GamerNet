package com.nullsoft.GamerNet;

import java.util.HashMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;

@SpringBootApplication
public class GamerNetApplication {

	// returns true if the id matches the user's jwt
	public static Boolean IsMe(String id) 
	{
		SecurityContext context = SecurityContextHolder.getContext();
		Jwt j = (Jwt)context.getAuthentication().getPrincipal();
		HashMap<String, Object> map = new HashMap<>(j.getClaims());

		if(map.get("sub").toString().equals(id))
		{
			return true;
		}

		return false;
	}

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

}