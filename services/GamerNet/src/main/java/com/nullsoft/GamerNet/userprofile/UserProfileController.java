package com.nullsoft.GamerNet.userprofile;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nullsoft.GamerNet.GamerNetApplication;


@RestController
@RequestMapping(path = "api/v1/")
public class UserProfileController {

    @GetMapping(path = "user/{id}")
    public ResponseEntity<String> testTesto(@PathVariable(name = "id") String id)
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

    @GetMapping(path = "timeline")
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
