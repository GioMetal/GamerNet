package com.nullsoft.GamerNet.userprofile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "api/v1/user")
public class UserProfileController 
{
    @Autowired
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService)
    {
        this.userProfileService = userProfileService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable(name = "id") String id)
    {
        return userProfileService.getUserProfile(id);
    }

    @PutMapping(path = "/{id}") 
    public ResponseEntity<String> updateUserProfile(@PathVariable(name="id") String id, @RequestBody() UserProfile body)
    {
        return userProfileService.updateUserProfile(id, body);
    }
}