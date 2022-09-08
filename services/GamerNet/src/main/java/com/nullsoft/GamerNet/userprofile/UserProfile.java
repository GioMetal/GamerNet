package com.nullsoft.GamerNet.userprofile;

import java.lang.reflect.Array;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "userprofile")
public class UserProfile 
{
    @Id
    public Long id;
    @Column(name="id_user", nullable = false, length = 36)
    public Character[] id_user;

    public UserProfile(Character[] id_user)
    {
        this.id_user = id_user;
    }

    
}
