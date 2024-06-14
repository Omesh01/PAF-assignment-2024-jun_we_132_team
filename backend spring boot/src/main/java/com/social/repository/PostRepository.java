package com.social.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.social.model.Post;
import com.social.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {

	List<Post> findAllByIsTwitTrueOrderByCreatedAtDesc();
	List<Post> findByRetwitUserContainsOrUser_IdAndIsTwitTrueOrderByCreatedAtDesc(User user, Long userId);
	List<Post> findByLikesContainingOrderByCreatedAtDesc(User user);
	
	@Query("SELECT t FROM Post t JOIN t.likes l WHERE l.user.id = :userId")
	List<Post> findByLikesUser_Id(Long userId);
	
//    @Query("SELECT t FROM Post t JOIN t.likes l WHERE l.user.id = :userId")
//    List<Post> findTwitsByUserIdInLikes(Long userId);

}
