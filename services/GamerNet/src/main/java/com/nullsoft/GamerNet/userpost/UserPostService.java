package com.nullsoft.GamerNet.userpost;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nullsoft.GamerNet.GamerNetApplication;

@Service
public class UserPostService 
{
    @Autowired
    private final UserPostRepository userPostRepository;
    public UserPostService(UserPostRepository userPostRepository)
    {
        this.userPostRepository = userPostRepository;
    }

    public ResponseEntity<String> createNewPost(UserPost post)
    { 
        if(GamerNetApplication.IsMe(post.id_user))
        {
            
            userPostRepository.createNewPost(post.id_user, post.id_profile, post.title, post.content, post.visibility, LocalDate.now(), LocalDate.now(), LocalTime.now(), LocalTime.now(), 0L, 0L);
        }
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    public ResponseEntity<List<UserPost>> getUserPosts(String id_user)
    { 
        List<UserPost> list = userPostRepository.getUserPosts(id_user);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
}