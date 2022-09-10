package com.nullsoft.GamerNet.timeline;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.nullsoft.GamerNet.GamerNetApplication;

@RestController
@RequestMapping(path = "api/v1/timeline")

public class TimeLineController {

    @GetMapping(path = "/history")

    public ResponseEntity<String> getTimeLineHistory(@RequestParam(name = "limit") Long limit,
        @RequestParam(name = "page") Long page)
    {   
        return ResponseEntity.status(HttpStatus.OK).body("FAVOLOSO");
    }

    @GetMapping(path = "/entry/{id}")

    public ResponseEntity<String> getTimelineEntity(@PathVariable(name = "id") Long id)
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

/*
if(GamerNetApplication.HasRole("master-journo") || GamerNetApplication.HasRole("journo"))
{
    return ResponseEntity.status(HttpStatus.OK).body("FAVOLOSO");
}
else
{
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("NON HAI I RUOLI ZI");
}
*/
