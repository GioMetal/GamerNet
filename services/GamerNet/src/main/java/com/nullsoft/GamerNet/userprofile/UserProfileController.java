package com.nullsoft.GamerNet.userprofile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nullsoft.GamerNet.GamerNetApplication;


@RestController
@RequestMapping(path = "api/v1/user")
public class UserProfileController {



    @GetMapping(path = "{id}")
    public ResponseEntity<String> testTesto()
    {
        return ResponseEntity.status(HttpStatus.OK).body("Security works");
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
