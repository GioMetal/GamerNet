package com.nullsoft.GamerNet.userpost;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPostRepository extends JpaRepository<UserPost, Long>
{
    @Transactional
    @Modifying
    @Query(value="INSERT INTO UserPost(id, id_user, id_profile, title, content,visibility, creation_date, last_edited_date, creation_time, last_edited_time, likes, dislikes) VALUES (nextval('userpost_sequence'), :id_user, :id_profile, :title, :content, :visibility, :creation_date, :last_edited_date, :creation_time, :last_edited_time, :likes, :dislikes)",
    nativeQuery =  true)
    public void createNewPost(@Param("id_user") String id_user, @Param("id_profile") String id_profile, @Param("title") String title, @Param("content") String content, @Param("visibility") Byte visibility,
    @Param("creation_date") LocalDate creation_date, @Param("last_edited_date") LocalDate last_edited_date, @Param("creation_time") LocalTime creation_time, @Param("last_edited_time") LocalTime last_edited_time,
    @Param("likes") Long likes, @Param("dislikes") Long dislikes);

    @Query(value = "SELECT new UserPost(u.id, u.id_user, u.id_profile, u.title, u.content, u.visibility, u.creation_date, u.last_edited_date, u.creation_time, u.last_edited_time, u.likes, u.dislikes) FROM UserPost u WHERE u.id_user IS ?1")
    public List<UserPost> getUserPosts(@Param("id") String id);
}
