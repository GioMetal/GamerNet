package com.nullsoft.GamerNet.userprofile;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    public ResponseEntity<String> getUserProfile(@PathVariable(name = "id") String id)
    {
        return userProfileService.getUserProfile(id);
    }
}

/*
@GetMapping(path = "/{id}")
public ResponseEntity<String> getUserProfile(@PathVariable(name = "id") String id)
{   
    
    if(GamerNetApplication.IsMe(id))
    {
        return ResponseEntity.status(HttpStatus.OK).body("Questo è il tuo profilo!");
    }
    else
    {
        return ResponseEntity.status(HttpStatus.OK).body("Questo NON è il tuo profilo!");
    }
    
}
*/