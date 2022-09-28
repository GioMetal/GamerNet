package com.nullsoft.GamerNet.userpost;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/posts")
public class UserPostController 
{
    @Autowired
    private final UserPostService userPostService;
    public UserPostController(UserPostService userPostService)
    {
        this.userPostService = userPostService;
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<List<UserPost>> getProfilePosts(@PathVariable(name = "id") String id)
    {
        return userPostService.getUserPosts(id);
    }

    @PostMapping(path = "/newpost")
    public ResponseEntity<String> createNewPost(@RequestBody UserPost post)
    {
        return userPostService.createNewPost(post);
    }
}
