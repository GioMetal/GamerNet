package com.nullsoft.GamerNet.userprofile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long>
{
    @Query(value = "SELECT new UserProfile(u.id, u.id_user, u.username, u.about, u.sex) FROM UserProfile u WHERE u.id_user IS ?1")
    public UserProfile getProfile(@Param("id") String id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO UserProfile(id, id_user, username) VALUES (nextval('userprofile_sequence'), :id_user, :username)", nativeQuery = true)
    public void createBlankProfile(@Param("id_user") String id, @Param("username") String username);
}
