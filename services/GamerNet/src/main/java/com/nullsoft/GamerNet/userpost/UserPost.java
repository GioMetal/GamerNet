package com.nullsoft.GamerNet.userpost;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "userpost")
public class UserPost 
{
    @Id
    @SequenceGenerator(name = "userpost_sequence", sequenceName = "userpost_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userpost_sequence")
    public Long id;
    @Column(length = 36)
    public String id_user;
    @Column(length = 36)
    public String id_profile;
    @Column(length = 128)
    public String title;
    @Column(length = 256)
    public String content;
    public Byte visibility;
    public LocalDate creation_date;
    public LocalDate last_edited_date;
    public LocalTime creation_time;
    public LocalTime last_edited_time;
    public Long likes;
    public Long dislikes;

    public UserPost()
    {
        
    }

    public UserPost(String id_user, String title, String content, Byte visibility)
    {
        this.id_user = id_user;
        this.title = title;
        this.content = content;
        this.visibility = visibility;
        this.creation_date = LocalDate.now();
        this.last_edited_date = LocalDate.now();
        this.creation_time = LocalTime.now();
        this.last_edited_time = LocalTime.now();
    }

    public UserPost(Long id, String id_user, String id_profile, String title, String content, Byte visibility, LocalDate creation_date, LocalDate last_edited_date, LocalTime cretion_time, LocalTime last_edited_time, Long likes, Long dislikes)
    {
        this.id=id;
        this.id_user = id_user;
        this.id_profile = id_profile;
        this.title = title;
        this.content = content;
        this.visibility = visibility;
        this.creation_date = creation_date;
        this.last_edited_date = last_edited_date;
        this.creation_time = cretion_time;
        this.last_edited_time = last_edited_time;
        this.likes = likes;
        this.dislikes = dislikes;
    }
}