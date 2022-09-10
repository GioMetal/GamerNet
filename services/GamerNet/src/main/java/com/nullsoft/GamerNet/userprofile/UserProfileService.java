package com.nullsoft.GamerNet.userprofile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nullsoft.GamerNet.GamerNetApplication;

@Service
public class UserProfileService 
{
    @Autowired
    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository)
    {
        this.userProfileRepository = userProfileRepository;
    }

    public ResponseEntity<UserProfile> getUserProfile(String id)
    {
        UserProfile pf = userProfileRepository.getProfile(id);

        // checks if it's me
        if(GamerNetApplication.IsMe(id))
        {
            // if found send profile, otherwhise create it
            if(pf != null)
            {
                return ResponseEntity.status(HttpStatus.OK).body(pf);
            }
            else
            {
                userProfileRepository.createBlankProfile(id, GamerNetApplication.GetMyName());
                pf = userProfileRepository.getProfile(id);
                return ResponseEntity.status(HttpStatus.OK).body(pf);
            }
        }
        else
        {
            // if found send profile, otherwhise returns 404
            if(pf != null)
            {
                return ResponseEntity.status(HttpStatus.OK).body(pf);
            }
            else
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }
    }
}
