package com.nullsoft.GamerNet.userprofile;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "userprofile")
public class UserProfile 
{
    @Id
    @SequenceGenerator(name = "userprofile_sequence", sequenceName = "userprofile_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userprofile_sequence")
    public Long id;
    @Column(name="id_user", nullable = false, length = 36, unique = true)
    public String id_user;
    @Column(name="username", nullable = false, length = 255)
    public String username;
    @Column(length = 1024)
    public String about;
    public Boolean sex;

    public UserProfile()
    {
        
    }

    public UserProfile(String id_user, String username)
    {
        this.id_user = id_user;
        this.username = username;
    }

    public UserProfile(Long id, String id_user, String username)
    {
        this.id = id;
        this.id_user = id_user;
        this.username = username;
    }

    public UserProfile(Long id, String id_user, String username, String about, Boolean sex)
    {
        this.id = id;
        this.id_user = id_user;
        this.username = username;
        this.about = about;
        this.sex = sex;
    }
}
