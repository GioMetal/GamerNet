package com.nullsoft.GamerNet.userprofile;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.nullsoft.GamerNet.GamerNetApplication;


@RestController
@RequestMapping(path = "api/v1/user")
public class UserProfileController {



    @GetMapping(path = "{id}")
    public ResponseEntity<String> firstTimeLogin()
    {
        return ResponseEntity.status(HttpStatus.OK).body("Va cacaci a minchia");
    }

    @GetMapping(path = "membri")
    public ResponseEntity<String> getSuperSecretProtectedResource()
    {   
        if(GamerNetApplication.HasRole("usa"))
        {
            return ResponseEntity.status(HttpStatus.OK).body("FAVOLOSO");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("NON HAI I RUOLI ZI");
        }
       
    }
}
